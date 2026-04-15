import { useRef, useEffect, useState, useCallback } from "react";

interface TextPressureProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  minWeight?: number;
  maxWeight?: number;
  radius?: number;
}

export function TextPressure({
  text,
  className = "",
  style,
  minWeight = 100,
  maxWeight = 900,
  radius = 200,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [weights, setWeights] = useState<number[]>(
    () => new Array(text.length).fill(minWeight)
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;
      const spans = containerRef.current.querySelectorAll<HTMLSpanElement>(
        "[data-char]"
      );
      const newWeights: number[] = [];

      spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;
        const dist = Math.sqrt(
          (e.clientX - charCenterX) ** 2 + (e.clientY - charCenterY) ** 2
        );
        const t = Math.max(0, 1 - dist / radius);
        // Ease out cubic for smoother falloff
        const eased = 1 - (1 - t) * (1 - t) * (1 - t);
        newWeights.push(Math.round(minWeight + (maxWeight - minWeight) * eased));
      });

      setWeights(newWeights);
    },
    [minWeight, maxWeight, radius]
  );

  const handleMouseLeave = useCallback(() => {
    setWeights(new Array(text.length).fill(minWeight));
  }, [text.length, minWeight]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ display: "inline-flex", ...style }}
      onMouseLeave={handleMouseLeave}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          data-char
          style={{
            fontVariationSettings: `'wght' ${weights[i]}`,
            fontWeight: weights[i],
            transition: "font-weight 0.15s ease-out, font-variation-settings 0.15s ease-out",
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
