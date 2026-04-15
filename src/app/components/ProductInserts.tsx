import { type CSSProperties } from "react";

/* ── Light-reactive shadow generator ──────────────────────────────────
   NO transition — updates instantly every frame for real-time tracking.
*/
export function lightShadow(
  mouse: { x: number; y: number },
  {
    intensity = 1,
    distance = 1,
  }: { intensity?: number; distance?: number } = {}
): string {
  const ox = mouse.x * -120 * distance;
  const oy = mouse.y * -120 * distance;
  const s = (v: number) => v * intensity;
  return [
    `${ox * 0.02}px ${oy * 0.02}px 0.6px rgba(0,0,0,${s(0.09)})`,
    `${ox * 0.05}px ${oy * 0.05}px 1.5px rgba(0,0,0,${s(0.08)})`,
    `${ox * 0.1}px ${oy * 0.1}px 4px rgba(0,0,0,${s(0.09)})`,
    `${ox * 0.18}px ${oy * 0.18}px 8px rgba(0,0,0,${s(0.10)})`,
    `${ox * 0.3}px ${oy * 0.3}px 16px rgba(0,0,0,${s(0.10)})`,
    `${ox * 0.5}px ${oy * 0.5}px 28px rgba(0,0,0,${s(0.09)})`,
    `${ox * 0.75}px ${oy * 0.75}px 46px rgba(0,0,0,${s(0.08)})`,
    `${ox * 1.1}px ${oy * 1.1}px 72px rgba(0,0,0,${s(0.07)})`,
    `${ox * 1.5}px ${oy * 1.5}px 105px rgba(0,0,0,${s(0.055)})`,
    `${ox * 2.0}px ${oy * 2.0}px 140px rgba(0,0,0,${s(0.04)})`,
  ].join(", ");
}

/* ── Shared keyframes ─────────────────────────────────────────────────*/
const KEYFRAMES = `
@keyframes shimmerSweep {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
@keyframes barPulse {
  0%, 100% { transform: scaleY(var(--bar-h1)); }
  50%      { transform: scaleY(var(--bar-h2)); }
}
@keyframes typingDot {
  0%, 60%, 100% { opacity: 0.15; transform: translateY(0); }
  30%           { opacity: 0.8;  transform: translateY(-1.5px); }
}
@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 3px rgba(34,197,94,0.35); }
  50%      { box-shadow: 0 0 7px rgba(34,197,94,0.65); }
}
@keyframes msgFloat {
  0%, 100% { opacity: 1; transform: translateY(0); }
  50%      { opacity: 0.85; transform: translateY(-0.5px); }
}
@keyframes scanLine {
  0%   { top: 0%; opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
@keyframes accentPulse {
  0%, 100% { opacity: 0.85; filter: brightness(1); }
  50%      { opacity: 1; filter: brightness(1.3); }
}
@keyframes accentGlow {
  0%, 100% { box-shadow: 0 0 0px rgba(91,143,217,0); }
  50%      { box-shadow: 0 0 6px rgba(91,143,217,0.4); }
}
@keyframes contentLoad {
  0%   { width: 0%; opacity: 0.4; }
  60%  { width: 100%; opacity: 1; }
  100% { width: 100%; opacity: 1; }
}
@keyframes widthPulse {
  0%, 100% { transform: scaleX(0.7); opacity: 0.5; }
  50%      { transform: scaleX(1); opacity: 1; }
}
@keyframes navDotActive {
  0%, 40%  { background: rgba(0,0,0,0.08); }
  50%, 90% { background: rgba(91,143,217,0.7); }
  100%     { background: rgba(0,0,0,0.08); }
}
@keyframes textLineType {
  0%, 10%  { width: 0%; }
  50%, 90% { width: 100%; }
  100%     { width: 0%; }
}
@keyframes chatBubbleIn {
  0%   { transform: scale(0.8) translateY(4px); opacity: 0; }
  20%  { transform: scale(1) translateY(0); opacity: 1; }
  80%  { transform: scale(1) translateY(0); opacity: 1; }
  100% { transform: scale(0.95) translateY(1px); opacity: 0.7; }
}
@keyframes progressBar {
  0%   { width: 5%; }
  50%  { width: 85%; }
  100% { width: 5%; }
}
@keyframes btnPulseClick {
  0%, 70%, 100% { transform: scale(1); }
  75%           { transform: scale(0.92); }
  82%           { transform: scale(1.04); }
}
`;

let keyframesInjected = false;
function ensureKeyframes() {
  if (keyframesInjected) return;
  keyframesInjected = true;
  const style = document.createElement("style");
  style.textContent = KEYFRAMES;
  document.head.appendChild(style);
}

const ACCENT = "#5b8fd9";

const base: CSSProperties = {
  background: "#fff",
  borderRadius: 6,
  overflow: "hidden",
  border: "1px solid rgba(0,0,0,0.05)",
  flexShrink: 0,
};

/* ═══════════════════════════════════════════════════════════════════════
   1. Website / browser
   ═══════════════════════════════════════════════════════════════════════*/
export function WebsiteInsert({
  style,
  shadow,
}: {
  style?: CSSProperties;
  shadow?: string;
}) {
  ensureKeyframes();

  return (
    <div
      style={{
        ...base,
        width: "clamp(80px, 9.5vw, 120px)",
        aspectRatio: "120 / 84",
        display: "inline-flex",
        flexDirection: "column",
        verticalAlign: "middle",
        boxShadow: shadow,
        position: "relative",
        ...style,
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          padding: "3.5px 6px",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          gap: 2.5,
          flexShrink: 0,
        }}
      >
        {[0.16, 0.08, 0.08].map((o, i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: `rgba(0,0,0,${o})`,
            }}
          />
        ))}
        <div
          style={{
            flex: 1,
            height: 8,
            borderRadius: 2.5,
            background: "rgba(0,0,0,0.025)",
            marginLeft: 3,
            display: "flex",
            alignItems: "center",
            paddingLeft: 5,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "38%",
              height: 2.5,
              borderRadius: 1,
              background: "rgba(0,0,0,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: 2.5,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "40%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                animation: "shimmerSweep 3s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* Page content */}
      <div style={{ padding: "6px 7px 7px", flex: 1, position: "relative" }}>
        {/* Nav items — one lights up in sequence */}
        <div style={{ display: "flex", gap: 5, marginBottom: 6 }}>
          {[16, 14, 11].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 3,
                borderRadius: 1.5,
                background: i === 0 ? ACCENT : "rgba(0,0,0,0.06)",
                animation: `navDotActive ${6}s ease-in-out ${i * 2}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Hero headline — types in and out */}
        <div style={{ overflow: "hidden", marginBottom: 3, height: 4 }}>
          <div style={{ height: 4, borderRadius: 1.5, background: ACCENT, transformOrigin: "left", animation: "textLineType 5s ease-in-out infinite" }} />
        </div>
        <div style={{ overflow: "hidden", marginBottom: 6, height: 4 }}>
          <div style={{ height: 4, borderRadius: 1.5, background: ACCENT, transformOrigin: "left", animation: "textLineType 5s ease-in-out 0.5s infinite", opacity: 0.7 }} />
        </div>

        {/* Body text — shimmer loading */}
        {["68%", "48%"].map((w, i) => (
          <div
            key={i}
            style={{
              width: w,
              height: 2,
              borderRadius: 1,
              background: "rgba(0,0,0,0.04)",
              marginBottom: i === 0 ? 2.5 : 6,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "50%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)",
                animation: `shimmerSweep 2s ease-in-out ${0.4 + i * 0.3}s infinite`,
              }}
            />
          </div>
        ))}

        {/* CTA button — pulses with fake click */}
        <div style={{ width: 28, height: 9, borderRadius: 2.5, background: ACCENT, animation: "btnPulseClick 4s ease-in-out infinite, accentGlow 2s ease-in-out infinite" }} />

        {/* Scanning line */}
        <div
          style={{
            position: "absolute",
            left: 4,
            right: 4,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${ACCENT}66, transparent)`,
            animation: "scanLine 3s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   2. Dashboard
   ═══════════════════════════════════════════════════════════════════════*/
const BAR_SET_A = [0.48, 0.30, 0.65, 0.38, 0.80, 0.52, 0.34, 0.92, 0.58, 0.44];
const BAR_SET_B = [0.60, 0.75, 0.40, 0.55, 0.45, 0.85, 0.70, 0.50, 0.38, 0.68];

export function DashboardInsert({
  style,
  shadow,
}: {
  style?: CSSProperties;
  shadow?: string;
}) {
  ensureKeyframes();

  return (
    <div
      style={{
        ...base,
        width: "clamp(72px, 8.5vw, 108px)",
        aspectRatio: "108 / 80",
        display: "inline-flex",
        flexDirection: "column",
        verticalAlign: "middle",
        boxShadow: shadow,
        ...style,
      }}
    >
      <div
        style={{
          padding: "4px 6px 3px",
          borderBottom: "1px solid rgba(0,0,0,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ width: 22, height: 3, borderRadius: 1.5, background: ACCENT, marginBottom: 2.5, animation: "accentPulse 2.5s ease-in-out infinite" }} />
          <div style={{ width: 36, height: 2, borderRadius: 1, background: "rgba(0,0,0,0.06)" }} />
        </div>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 7,
            fontWeight: 700,
            color: ACCENT,
            letterSpacing: "-0.03em",
            animation: "accentPulse 2s ease-in-out infinite",
          }}
        >
          +34%
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ padding: "0 6px", marginBottom: 1 }}>
        <div style={{ height: 2, borderRadius: 1, background: "rgba(0,0,0,0.04)", overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 1, background: ACCENT, animation: "progressBar 4s ease-in-out infinite" }} />
        </div>
      </div>

      <div style={{ padding: "3px 6px 6px", flex: 1, display: "flex", alignItems: "flex-end" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, width: "100%", height: "100%" }}>
          {BAR_SET_A.map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: "100%",
                transformOrigin: "bottom",
                background: i === 7 ? ACCENT : "rgba(0,0,0,0.06)",
                borderRadius: 1,
                ["--bar-h1" as string]: h,
                ["--bar-h2" as string]: BAR_SET_B[i],
                animation: `barPulse ${2 + i * 0.15}s ease-in-out ${i * 0.1}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   3. AI / chat
   ═══════════════════════════════════════════════════════════════════════*/
export function AIInsert({
  style,
  shadow,
}: {
  style?: CSSProperties;
  shadow?: string;
}) {
  ensureKeyframes();

  return (
    <div
      style={{
        ...base,
        width: "clamp(68px, 8vw, 104px)",
        aspectRatio: "104 / 78",
        display: "inline-flex",
        flexDirection: "column",
        verticalAlign: "middle",
        boxShadow: shadow,
        ...style,
      }}
    >
      <div style={{ padding: "5px 6px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: ACCENT, flexShrink: 0, animation: "accentGlow 2s ease-in-out infinite" }} />
          <div style={{ width: 20, height: 3, borderRadius: 1, background: ACCENT, animation: "accentPulse 2.5s ease-in-out 0.4s infinite" }} />
          <div style={{ flex: 1 }} />
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#22c55e",
              animation: "pulseGlow 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Incoming — appears like a real message */}
        <div
          style={{
            background: "rgba(0,0,0,0.035)",
            borderRadius: 3,
            padding: "3px 4px",
            marginBottom: 3,
            maxWidth: "78%",
            animation: "chatBubbleIn 6s ease-in-out infinite",
          }}
        >
          <div style={{ overflow: "hidden", height: 2, marginBottom: 1.5 }}>
            <div style={{ height: 2, borderRadius: 1, background: "rgba(0,0,0,0.1)", transformOrigin: "left", animation: "textLineType 6s ease-in-out 0.5s infinite" }} />
          </div>
          <div style={{ overflow: "hidden", height: 2 }}>
            <div style={{ height: 2, borderRadius: 1, background: "rgba(0,0,0,0.06)", transformOrigin: "left", animation: "textLineType 6s ease-in-out 1s infinite" }} />
          </div>
        </div>

        {/* Outgoing — appears after incoming */}
        <div
          style={{
            background: ACCENT,
            borderRadius: 3,
            padding: "3px 4px",
            marginLeft: "auto",
            maxWidth: "70%",
            animation: "chatBubbleIn 6s ease-in-out 2.5s infinite, accentGlow 3s ease-in-out infinite",
          }}
        >
          <div style={{ overflow: "hidden", height: 2, marginBottom: 1.5 }}>
            <div style={{ height: 2, borderRadius: 1, background: "rgba(255,255,255,0.3)", transformOrigin: "left", animation: "textLineType 6s ease-in-out 3s infinite" }} />
          </div>
          <div style={{ overflow: "hidden", height: 2 }}>
            <div style={{ height: 2, borderRadius: 1, background: "rgba(255,255,255,0.15)", transformOrigin: "left", animation: "textLineType 6s ease-in-out 3.5s infinite" }} />
          </div>
        </div>

        {/* Typing dots */}
        <div style={{ display: "flex", gap: 2, marginTop: 3, paddingLeft: 2 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 2.5,
                height: 2.5,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.25)",
                animation: `typingDot 0.8s ease-in-out ${i * 0.12}s infinite`,
              }}
            />
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Input */}
        <div
          style={{
            borderRadius: 3,
            border: "1px solid rgba(0,0,0,0.06)",
            padding: "2.5px 5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: 1,
              height: 6,
              background: "rgba(0,0,0,0.3)",
              animation: "cursorBlink 1s step-end infinite",
            }}
          />
          <svg width="7" height="7" viewBox="0 0 10 10" fill="none">
            <path d="M2 8L8 5L2 2v2.5L5.5 5 2 5.5V8z" fill={ACCENT} />
          </svg>
        </div>
      </div>
    </div>
  );
}
