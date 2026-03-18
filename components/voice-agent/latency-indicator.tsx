"use client"

import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface LatencyIndicatorProps {
  latency: number | null
}

export function LatencyIndicator({ latency }: LatencyIndicatorProps) {
  if (latency === null) return null

  return (
    <div className={cn(
      "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm border shadow-xs transition-all animate-in fade-in slide-in-from-right-2 duration-500",
      latency < 800 ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
      latency < 1500 ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
      "bg-red-500/10 text-red-600 border-red-500/20"
    )}>
      <Zap className="h-3 w-3 fill-current" />
      <span>{latency}ms Latency</span>
    </div>
  )
}
