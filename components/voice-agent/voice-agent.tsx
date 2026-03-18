"use client"

import { useVapi } from "@/hooks/use-vapi"
import { CallButton } from "./call-button"
import { StatusBar } from "./status-bar"
import { VolumeIndicator } from "./volume-indicator"
import { TranscriptPanel } from "./transcript-panel"
import { Phone, Mic, MicOff, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export function VoiceAgent() {
  const {
    callStatus,
    transcript,
    isMuted,
    volumeLevel,
    error,
    callDuration,
    startCall,
    stopCall,
    toggleMute,
  } = useVapi()

  return (
    <div className="relative flex min-h-screen w-full bg-background dark:bg-zinc-950">
      {/* Ambient glowing background when active */}
      <div
        className={`pointer-events-none fixed inset-0 transition-opacity duration-1000 ${
          callStatus === "active" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at 50% 10%, oklch(0.55 0.15 160 / 6%) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 p-4 py-8 sm:p-8 lg:flex-row lg:p-12">
        {/* Left Column: Controls & Info */}
        <div className="flex w-full flex-col gap-8 lg:w-1/3 lg:min-w-[400px]">
          {/* Header */}
          <header className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 text-white shadow-lg">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    CallDraft
                  </h1>
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    Anderson Heating & Cooling
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Talk to Sarah, your AI virtual receptionist. She can answer
              questions and schedule appointments.
            </p>
          </header>

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-medium text-red-600 shadow-sm backdrop-blur-sm dark:text-red-400">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Main Controls Card */}
          <div className="flex flex-col items-center gap-8 rounded-2xl border border-border bg-card p-8 shadow-xl">
            <CallButton
              status={callStatus}
              onStart={startCall}
              onStop={stopCall}
            />

            {/* Mute Button (Only visible during active call) */}
            <div
              className={`h-10 transition-all duration-300 ${callStatus === "active" ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              {callStatus === "active" && (
                <Button
                  variant={isMuted ? "destructive" : "secondary"}
                  onClick={toggleMute}
                  className={`rounded-full px-6 shadow-sm ${isMuted ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/30' : ''}`}
                >
                  {isMuted ? (
                    <MicOff className="mr-2 h-4 w-4" />
                  ) : (
                    <Mic className="mr-2 h-4 w-4" />
                  )}
                  {isMuted ? "Microphone Muted" : "Mute Microphone"}
                </Button>
              )}
            </div>

            {/* Status Info */}
            <div className="mt-4 w-full">
              <StatusBar
                status={callStatus}
                duration={callDuration}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Transcript & Visualizer */}
        <div className="flex w-full flex-1 flex-col gap-6 lg:h-[calc(100vh-6rem)]">
          {/* Audio Visualizer (above transcript) */}
          {callStatus === "active" && (
            <div className="flex h-16 w-full items-center justify-center rounded-xl border border-border bg-card shadow-sm">
              <VolumeIndicator level={volumeLevel} />
            </div>
          )}

          {/* Transcript Area */}
          <div className="flex min-h-[500px] w-full flex-1 flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
                Conversation Transcript
              </h2>
            </div>
            <div className="relative flex-1 overflow-hidden">
              <TranscriptPanel transcript={transcript} status={callStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
