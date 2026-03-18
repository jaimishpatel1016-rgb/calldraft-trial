import { useEffect, useRef } from "react";
import type { TranscriptEntry, CallStatus } from "@/hooks/use-vapi";
import { User, Headphones } from "lucide-react";
import { CallEndedBadge } from "./call-ended-badge";

function TranscriptMessage({ entry }: { entry: TranscriptEntry }) {
  const isUser = entry.role === "user";

  return (
    <div className={`flex w-full gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm ${
          isUser ? "bg-secondary text-muted-foreground" : "bg-emerald-600 text-white"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Headphones className="h-4 w-4" />}
      </div>
      
      <div
        className={`flex max-w-[85%] flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}
      >
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 px-1">
          {isUser ? "You" : "Sarah"}
        </span>
        <div
          className={`rounded-2xl px-4 py-2.5 shadow-sm ${
            isUser
              ? "rounded-tr-sm bg-primary text-primary-foreground"
              : "rounded-tl-sm border border-border bg-card text-card-foreground"
          }`}
        >
          <p className={`text-sm leading-relaxed ${!entry.isFinal ? "opacity-70" : ""}`}>
            {entry.text}
            {!entry.isFinal && (
              <span className="ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-50" />
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TranscriptPanel({ transcript, status }: { transcript: TranscriptEntry[], status: CallStatus }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript, status]);

  return (
    <div 
      className="flex h-full min-h-[400px] w-full flex-col overflow-y-auto rounded-xl border border-border bg-card/60 p-4 shadow-sm backdrop-blur-sm sm:p-6"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--color-border) transparent'
      }}
      ref={scrollRef}
    >
      {transcript.length === 0 ? (
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-muted-foreground/40">
            <Headphones className="h-8 w-8" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Waiting for conversation to begin...
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {transcript.map((entry) => (
              <TranscriptMessage key={entry.id} entry={entry} />
            ))}
          </div>

          {status === "ended" && <CallEndedBadge />}
        </div>
      )}
    </div>
  );
}
