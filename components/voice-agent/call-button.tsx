import type { CallStatus } from "@/hooks/use-vapi";
import { Phone, PhoneOff, Loader2 } from "lucide-react";

interface CallButtonProps {
  status: CallStatus;
  onStart: () => void;
  onStop: () => void;
}

export function CallButton({ status, onStart, onStop }: CallButtonProps) {
  const isConnecting = status === "connecting";
  const isActive = status === "active";

  return (
    <div className="group relative flex items-center justify-center">
      {/* Subtle ambient glow behind the button (only visible when idle) */}
      {!isActive && !isConnecting && (
        <div className="absolute -inset-2 rounded-full bg-emerald-500/10 opacity-0 blur-xl transition-all duration-300 ease-out group-hover:bg-emerald-500/20 group-hover:opacity-100" />
      )}

      <button
        onClick={isActive ? onStop : onStart}
        disabled={isConnecting}
        className={`
          relative cursor-pointer z-10 flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-full border border-white/10 text-white transition-colors duration-300
          active:scale-95 disabled:pointer-events-none disabled:opacity-60
          shadow-md hover:shadow-lg
          ${!isActive && !isConnecting ? "bg-linear-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500" : ""}
          ${isActive ? "bg-linear-to-br from-red-500 to-red-600 hover:from-red-400 hover:to-red-500" : ""}
          ${isConnecting ? "bg-amber-500" : ""}
        `}
        style={
          isActive
            ? {
                animation: "pulse-ring 2s ease-in-out infinite",
              }
            : {}
        }
        aria-label={isActive ? "End call" : "Start call"}
      >
        <div className="transition-transform duration-300">
          {isConnecting ? (
            <Loader2 className="h-10 w-10 animate-spin opacity-90" />
          ) : isActive ? (
            <PhoneOff className="h-10 w-10 opacity-90" />
          ) : (
            <Phone className="h-10 w-10 opacity-90" />
          )}
        </div>
        
        <span className="text-xs font-semibold uppercase tracking-widest opacity-90">
          {isConnecting ? "Connecting" : isActive ? "End Call" : "Start Call"}
        </span>

        {isActive && (
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes pulse-ring {
                0%, 100% { box-shadow: 0 0 0 0 oklch(0.6 0.2 25 / 40%); }
                50% { box-shadow: 0 0 0 20px oklch(0.6 0.2 25 / 0%); }
              }
            `
          }} />
        )}
      </button>
    </div>
  );
}

