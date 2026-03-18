"use client"

import { PhoneOff } from "lucide-react"

export function CallEndedBadge() {
  return (
    <div className="flex items-center justify-center py-4 animate-in fade-in zoom-in duration-700">
      <div className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-[12px] font-semibold text-muted-foreground shadow-sm">
        <PhoneOff className="h-3 w-3" />
        <span>Call Ended</span>
      </div>
    </div>
  )
}
