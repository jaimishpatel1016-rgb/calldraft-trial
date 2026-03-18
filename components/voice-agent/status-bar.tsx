import type { CallStatus } from "@/hooks/use-vapi";
import { Clock } from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

interface StatusBarProps {
  status: CallStatus;
  duration: number;
}

export function StatusBar({ status, duration }: StatusBarProps) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-xl border border-border bg-card/80 py-3 px-4 shadow-sm backdrop-blur-sm sm:w-auto sm:gap-x-6">
      <div className="flex items-center gap-2">
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            status === "active"
              ? "bg-emerald-500"
              : status === "connecting"
                ? "bg-amber-500"
                : "bg-muted-foreground/30"
          }`}
          style={
            status === "active" || status === "connecting"
              ? { animation: `pulse-dot ${status === "active" ? "2s" : "1s"} ease-in-out infinite` }
              : {}
          }
        />
        <span className="text-sm font-medium">
          {status === "idle"
            ? "Ready"
            : status === "connecting"
              ? "Connecting"
              : status === "active"
                ? "Connected"
                : "Call Ended"}
        </span>
      </div>

      {status === "active" && (
        <div className="flex items-center gap-2 border-l border-border pl-4 sm:pl-6">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono text-sm font-medium">{formatDuration(duration)}</span>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse-dot {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `
      }} />
    </div>
  );
}
