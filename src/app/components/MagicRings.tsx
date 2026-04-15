interface MagicRingsProps {
  color?: string;
  colorTwo?: string;
  ringCount?: number;
}

export function MagicRings({
  color = "d3bbc2",
  colorTwo = "dedede",
  ringCount = 5,
}: MagicRingsProps) {
  const c1 = `#${color}`;
  const c2 = `#${colorTwo}`;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {Array.from({ length: ringCount }).map((_, i) => {
        const size = 300 + i * 180;
        const opacity = Math.max(0.16 - i * 0.022, 0.03);
        const borderColor = i % 2 === 0 ? c1 : c2;
        const duration = 8 + i * 1.5;
        const delay = i * 0.6;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              border: `1px solid ${borderColor}`,
              opacity,
              animation: `magicRingPulse ${duration}s ease-in-out ${delay}s infinite`,
              ["--ring-opacity" as string]: opacity,
            }}
          />
        );
      })}
      <style>{`
        @keyframes magicRingPulse {
          0%, 100% { transform: scale(1); opacity: var(--ring-opacity); }
          50% { transform: scale(1.03); opacity: calc(var(--ring-opacity) * 1.4); }
        }
      `}</style>
    </div>
  );
}
