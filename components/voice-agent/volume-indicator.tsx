export function VolumeIndicator({ level }: { level: number }) {
  const bars = 30; // Increased number of bars for better visual effect
  // Smooth out the level so it's not jumping as violently
  const activeBars = Math.round(Math.min(level * 1.5, 1) * bars);

  return (
    <div className="flex h-12 items-center justify-center gap-1" aria-label={`Volume level: ${Math.round(level * 100)}%`}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`w-1.5 rounded-full transition-all duration-150 ease-out ${
            i < activeBars ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-muted-foreground/15"
          }`}
          style={{
            height: i < activeBars ? `${20 + (i / bars) * 80}%` : "20%",
            transform: i < activeBars ? `scaleY(${1 + (level * 0.5)})` : "scaleY(1)",
          }}
        />
      ))}
    </div>
  );
}
