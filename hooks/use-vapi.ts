"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

// ── Types ────────────────────────────────────────────────────────────────────

export type CallStatus = "idle" | "connecting" | "active" | "ended";

export interface TranscriptEntry {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: number;
  isFinal: boolean;
}

export interface UseVapiReturn {
  callStatus: CallStatus;
  transcript: TranscriptEntry[];
  latency: number | null;
  isMuted: boolean;
  volumeLevel: number;
  error: string | null;
  callDuration: number;
  startCall: () => void;
  stopCall: () => void;
  toggleMute: () => void;
}

// ── System Prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are Sarah, the virtual receptionist for Anderson Heating & Cooling, an HVAC company in Dallas, TX.

Your job is to:
- Greet callers warmly
- Ask what they need help with
- Collect their name, phone number, and address
- Describe the issue
- Offer to book an appointment (suggest tomorrow at 10 AM)
- Confirm the booking and say goodbye

Business hours: Mon-Fri 8AM-6PM, Emergency 24/7
Services: AC repair, heating repair, installation, maintenance, duct cleaning
Service call fee: $89

Keep responses short and conversational. This is a phone call, not an essay.`;

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useVapi(): UseVapiReturn {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [latency, setLatency] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [callDuration, setCallDuration] = useState(0);

  const vapiRef = useRef<Vapi | null>(null);
  const callStartTimeRef = useRef<number | null>(null);
  const userSpeechEndTimeRef = useRef<number | null>(null);
  const durationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize Vapi instance
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!publicKey) {
      setError("Missing NEXT_PUBLIC_VAPI_PUBLIC_KEY environment variable");
      return;
    }

    const vapi = new Vapi(publicKey);
    vapiRef.current = vapi;

    // ── Event Listeners ──────────────────────────────────────────────────

    vapi.on("call-start", () => {
      setCallStatus("active");
      setError(null);
      callStartTimeRef.current = Date.now();

      // Start duration timer
      durationIntervalRef.current = setInterval(() => {
        if (callStartTimeRef.current) {
          setCallDuration(Math.floor((Date.now() - callStartTimeRef.current) / 1000));
        }
      }, 1000);
    });

    vapi.on("call-end", () => {
      setCallStatus("ended");
      setVolumeLevel(0);
      setLatency(null);

      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }

      // Auto-reset to idle after a short delay
      setTimeout(() => setCallStatus("idle"), 2000);
    });

    vapi.on("speech-start", () => {
      // Assistant started speaking — calculate latency
      if (userSpeechEndTimeRef.current) {
        const responseTime = Date.now() - userSpeechEndTimeRef.current;
        setLatency(responseTime);
        userSpeechEndTimeRef.current = null;
      }
    });

    vapi.on("speech-end", () => {
      // User finished speaking — record timestamp for latency calc
      userSpeechEndTimeRef.current = Date.now();
    });

    vapi.on("volume-level", (level: number) => {
      setVolumeLevel(level);
    });

    vapi.on("message", (message: Record<string, unknown>) => {
      if (message.type === "transcript") {
        const role = message.role as "user" | "assistant";
        const text = message.transcript as string;
        const isFinal = message.transcriptType === "final";

        if (!text) return;

        setTranscript((prev) => {
          // For partial transcripts, update the last entry of the same role
          if (!isFinal) {
            const lastIndex = prev.length - 1;
            if (lastIndex >= 0 && prev[lastIndex].role === role && !prev[lastIndex].isFinal) {
              const updated = [...prev];
              updated[lastIndex] = {
                ...updated[lastIndex],
                text,
                timestamp: Date.now(),
              };
              return updated;
            }
            // New partial transcript
            return [
              ...prev,
              {
                id: `${Date.now()}-${role}-${Math.random().toString(36).slice(2, 7)}`,
                role,
                text,
                timestamp: Date.now(),
                isFinal: false,
              },
            ];
          }

          // Final transcript — replace partial or add new
          const lastIndex = prev.length - 1;
          if (lastIndex >= 0 && prev[lastIndex].role === role && !prev[lastIndex].isFinal) {
            const updated = [...prev];
            updated[lastIndex] = {
              ...updated[lastIndex],
              text,
              timestamp: Date.now(),
              isFinal: true,
            };
            return updated;
          }

          return [
            ...prev,
            {
              id: `${Date.now()}-${role}-${Math.random().toString(36).slice(2, 7)}`,
              role,
              text,
              timestamp: Date.now(),
              isFinal: true,
            },
          ];
        });
      }
    });

    vapi.on("error", (err: unknown) => {
      console.error("Vapi error:", err);
      const errorMessage =
        err instanceof Error ? err.message : typeof err === "object" && err !== null && "message" in err ? String((err as { message: unknown }).message) : "An unexpected error occurred";
      setError(errorMessage);
    });

    return () => {
      vapi.stop();
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, []);

  // ── Actions ──────────────────────────────────────────────────────────────

  const startCall = useCallback(() => {
    if (!vapiRef.current) return;

    setCallStatus("connecting");
    setTranscript([]);
    setLatency(null);
    setError(null);
    setCallDuration(0);
    setIsMuted(false);

    vapiRef.current.start({
      model: {
        provider: "openai",
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
        ],
      },
      voice: {
        provider: "11labs",
        voiceId: "21m00Tcm4TlvDq8ikWAM", // Rachel — natural female voice
      },
      firstMessage: "Hi there! Thanks for calling Anderson Heating and Cooling. This is Sarah, how can I help you today?",
      name: "Sarah",
    });
  }, []);

  const stopCall = useCallback(() => {
    if (!vapiRef.current) return;
    vapiRef.current.stop();
  }, []);

  const toggleMute = useCallback(() => {
    if (!vapiRef.current) return;
    const newMuted = !isMuted;
    vapiRef.current.setMuted(newMuted);
    setIsMuted(newMuted);
  }, [isMuted]);

  return {
    callStatus,
    transcript,
    latency,
    isMuted,
    volumeLevel,
    error,
    callDuration,
    startCall,
    stopCall,
    toggleMute,
  };
}
