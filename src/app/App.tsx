import { useState, useRef, useCallback, useEffect, createContext, useContext, type CSSProperties } from "react";
import {
  WebsiteInsert,
  DashboardInsert,
  AIInsert,
  lightShadow,
} from "./components/ProductInserts";
import { MagicRings } from "./components/MagicRings";
import { TextPressure } from "./components/TextPressure";
import svgPaths from "../imports/StickyNote/svg-23cgvrf8i4";
import imgGradient from "../imports/CreateSplashScreenDesign-1/55172f27dfb8ac6d015c3cf915e191ea7273ccbb.png";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
type Mouse = { x: number; y: number };

/* ── Sound system ────────────────────────────────────────────────────────*/
const SoundContext = createContext<{ enabled: boolean; toggle: () => void }>({
  enabled: false,
  toggle: () => {},
});

function useSoundContext() {
  return useContext(SoundContext);
}

let _audioCtx: AudioContext | null = null;
function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new AudioContext();
  if (_audioCtx.state === "suspended") _audioCtx.resume();
  return _audioCtx;
}

function playTone(freq: number, duration: number, volume = 0.12, type: OscillatorType = "sine") {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch { /* silent fail */ }
}

function playClickDown() {
  playTone(880, 0.06, 0.10, "sine");
  playTone(440, 0.04, 0.06, "triangle");
}

function playClickUp() {
  playTone(1200, 0.08, 0.08, "sine");
  playTone(600, 0.06, 0.04, "triangle");
}

function triggerHaptic(pattern: number | number[] = 12) {
  try { navigator?.vibrate?.(pattern); } catch { /* silent */ }
}

/* ── Sound toggle icon ───────────────────────────────────────────────────*/
function SoundToggle() {
  const { enabled, toggle } = useSoundContext();

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Desativar som" : "Ativar som"}
      style={{
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 8,
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background 0.2s ease, transform 0.15s ease",
        color: "rgba(255,255,255,0.75)",
        padding: 0,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
    >
      {enabled ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}

/* ── WhatsApp SVG icon ────────────────────────────────────────────────*/
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ── Animated gradient background ─────────────────────────────────────*/
function AnimatedGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgGradient;
    imgRef.current = img;

    let animId: number;
    let startTime = 0;

    const render = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;

      const w = canvas.width;
      const h = canvas.height;

      if (img.complete && img.naturalWidth > 0) {
        // Slow subtle pan and scale
        const scale = 1.08 + Math.sin(elapsed * 0.15) * 0.04;
        const panX = Math.sin(elapsed * 0.08) * w * 0.02;
        const panY = Math.cos(elapsed * 0.06) * h * 0.02;

        ctx.clearRect(0, 0, w, h);
        ctx.globalAlpha = 0.55;

        const dw = w * scale;
        const dh = h * scale;
        const dx = (w - dw) / 2 + panX;
        const dy = (h - dh) / 2 + panY;

        ctx.drawImage(img, dx, dy, dw, dh);

        // Subtle hue shift overlay
        const hueShift = Math.sin(elapsed * 0.1) * 0.03;
        ctx.globalAlpha = Math.abs(hueShift);
        ctx.fillStyle = hueShift > 0 ? "#1a3a6a" : "#2a1a3a";
        ctx.fillRect(0, 0, w, h);
      }

      animId = requestAnimationFrame(render);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    img.onload = () => {
      resize();
      animId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 size-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Sticky Note
   ═══════════════════════════════════════════════════════════════════════*/
function StickyNote({ mouse }: { mouse: Mouse }) {
  const sh = lightShadow(mouse, { intensity: 3.5, distance: 3.2 });

  return (
    <div className="flex justify-start mb-6">
      
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Static Insert wrapper
   ═══════════════════════════════════════════════════════════════════════*/
function StaticInsert({
  children,
  mouse,
  rotate = 0,
}: {
  children: (shadow: string) => React.ReactNode;
  mouse: Mouse;
  rotate?: number;
}) {
  const sh = lightShadow(mouse, { intensity: 2.4, distance: 2.0 });

  return (
    <span
      className="inline-block"
      style={{
        transform: `rotate(${rotate}deg)`,
        verticalAlign: "middle",
        position: "relative",
        zIndex: 2,
        cursor: "default",
      }}
    >
      {children(sh)}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CTA Button — 2D depth with zone tilt
   ═══════════════════════════════════════════════════════════════════════*/
type HoverZone = "left" | "middle" | "right" | null;

function PrimaryButton({ mouse }: { mouse: Mouse }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [zone, setZone] = useState<HoverZone>(null);
  const { enabled: soundOn } = useSoundContext();

  const detectZone = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): HoverZone => {
      const r = e.currentTarget.getBoundingClientRect();
      const rel = (e.clientX - r.left) / r.width;
      return rel < 0.33 ? "left" : rel > 0.66 ? "right" : "middle";
    },
    []
  );

  const detectTouchZone = useCallback(
    (t: React.Touch): HoverZone => {
      if (!btnRef.current) return "middle";
      const r = btnRef.current.getBoundingClientRect();
      const rel = (t.clientX - r.left) / r.width;
      return rel < 0.33 ? "left" : rel > 0.66 ? "right" : "middle";
    },
    []
  );

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => setZone(detectZone(e)),
    [detectZone]
  );

  const handlePressDown = useCallback((z: HoverZone) => {
    setPressed(true);
    setZone(z);
    triggerHaptic(15);
    if (soundOn) playClickDown();
  }, [soundOn]);

  const handlePressUp = useCallback(() => {
    setPressed(false);
    triggerHaptic(8);
    if (soundOn) playClickUp();
  }, [soundOn]);

  const width = 260;
  const height = 58;
  const raiseLevel = 8;
  const radius = 6;
  const tiltDeg = 1.6;
  const hoverDip = 2;
  const totalHeight = height + raiseLevel;

  const pressDuration = 80;
  const releaseDuration = 180;
  const motionMs = pressed ? pressDuration : releaseDuration;
  const motionEase = pressed ? "ease-in" : EASE;

  const sh = lightShadow(mouse, {
    intensity: pressed ? 1.6 : hovered ? 3.5 : 2.8,
    distance: pressed ? 1.0 : hovered ? 3.2 : 2.4,
  });

  const getSurfaceTransform = () => {
    if (pressed) {
      if (zone === "left") return `skewY(${-tiltDeg}deg) translateY(${raiseLevel}px)`;
      if (zone === "right") return `skewY(${tiltDeg}deg) translateY(${raiseLevel}px)`;
      return `translateY(${raiseLevel}px)`;
    }
    if (zone === "left") return `skewY(${-tiltDeg}deg)`;
    if (zone === "right") return `skewY(${tiltDeg}deg)`;
    if (zone === "middle") return `translateY(${hoverDip}px)`;
    return "translateY(0)";
  };

  const getGlarePosition = () => {
    if (zone === "left") return "100% 50%";
    if (zone === "right") return "0% 50%";
    return "50% 50%";
  };

  return (
    <button
      ref={btnRef}
      /* ── Desktop events ── */
      onMouseMove={onMove}
      onMouseEnter={(e) => { setHovered(true); setZone(detectZone(e)); }}
      onMouseLeave={() => { setPressed(false); setHovered(false); setZone(null); }}
      onMouseDown={(e) => handlePressDown(detectZone(e))}
      onMouseUp={handlePressUp}
      /* ── Touch / mobile events ── */
      onTouchStart={(e) => {
        e.preventDefault();
        const t = e.touches[0];
        setHovered(true);
        handlePressDown(detectTouchZone(t));
      }}
      onTouchMove={(e) => {
        const t = e.touches[0];
        setZone(detectTouchZone(t));
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        handlePressUp();
        setTimeout(() => { setHovered(false); setZone(null); }, 150);
        window.open("https://wa.me/5527996123494", "_blank");
      }}
      onClick={(e) => {
        // Prevent double-open on touch devices (touchEnd already opens)
        if ("ontouchstart" in window) { e.preventDefault(); return; }
        window.open("https://wa.me/5527996123494", "_blank");
      }}
      className="relative outline-none"
      style={{
        width,
        height: totalHeight,
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      {/* Bottom shelf */}
      <div
        style={{
          position: "absolute",
          left: 0, right: 0, bottom: 0,
          height,
          borderRadius: radius,
          background: "linear-gradient(180deg, #d4d4d4 0%, #bfbfbf 100%)",
          border: "1px solid #c8c8c8",
          boxShadow: sh,
        }}
      />

      {/* Surface */}
      <div
        style={{
          position: "absolute",
          left: 0, right: 0, top: 0,
          height,
          borderRadius: radius,
          background: "linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%)",
          border: "1px solid #c8c8c8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          overflow: "hidden",
          transform: getSurfaceTransform(),
          transformOrigin: "center",
          transition: `transform ${motionMs}ms ${motionEase}`,
          boxShadow: pressed
            ? "inset 0 1px 3px rgba(0,0,0,0.06)"
            : zone
              ? `inset 0 -1px 1px rgba(0,0,0,0.04), 0 0 ${zone !== "middle" ? "1px" : "0"} rgba(0,0,0,0.08)`
              : "inset 0 -1px 1px rgba(0,0,0,0.04)",
        }}
      >
        {/* Glare */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(90deg, transparent 10%, rgba(255,255,255,${hovered ? 0.15 : 0}) 40%, rgba(255,255,255,${hovered ? 0.2 : 0}) 50%, rgba(255,255,255,${hovered ? 0.15 : 0}) 60%, transparent 90%)`,
            backgroundSize: "200% 100%",
            backgroundPosition: getGlarePosition(),
            transition: `background-position ${releaseDuration}ms ${EASE}, opacity ${releaseDuration}ms ${EASE}`,
            opacity: pressed ? 0 : 1,
            pointerEvents: "none",
          }}
        />

        {/* Top edge highlight */}
        <div
          style={{
            position: "absolute",
            top: 0, left: radius, right: radius,
            height: 1,
            background: "rgba(255,255,255,0.9)",
            pointerEvents: "none",
          }}
        />

        <WhatsAppIcon size={15} />

        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: "#1a1a1a",
            letterSpacing: "-0.01em",
            position: "relative",
            zIndex: 1,
            userSelect: "none",
          }}
        >
          Falar no WhatsApp
        </span>
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   App
   ═══════════════════════════════════════════════════════════════════════*/
export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<Mouse>({ x: 0, y: 0 });
  const [bgHue, setBgHue] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const soundCtx = { enabled: soundOn, toggle: () => setSoundOn((p) => !p) };

  useEffect(() => {
    let animId: number;
    let start = 0;
    const loop = (time: number) => {
      if (!start) start = time;
      const elapsed = (time - start) / 1000;
      setBgHue((elapsed * 12) % 360); // ~30s full cycle
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  }, []);

  const gold = "#f5e77d";
  const light = "#ddd";

  const hlBase: CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    lineHeight: 1.05,
    letterSpacing: "-0.05em",
    margin: 0,
    fontSize: "clamp(28px, 5vw, 52px)",
    textTransform: "uppercase",
  };

  return (
    <SoundContext.Provider value={soundCtx}>
    <div
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: `hsl(${bgHue}, 87%, 46%)`, fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Animated gradient background ── */}
      <div className="absolute inset-0 z-0">
        <AnimatedGradient />
      </div>

      {/* ── Magic rings ── */}
      <div className="absolute inset-0 z-[1]">
        <MagicRings color="d3bbc2" colorTwo="dedede" ringCount={6} />
      </div>

      {/* ── Header ── */}
      <header className="relative z-10 w-full px-8 sm:px-12 lg:px-16 pt-8 sm:pt-10 flex items-center justify-between">
        <span
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.04em",
          }}
        >
          &copy; 2026 DONSC.
        </span>
        <SoundToggle />
      </header>

      {/* ── Main content — two column ── */}
      <main className="relative z-10 flex-1 flex items-center px-6 sm:px-12 lg:px-16 py-8 sm:py-12">
        <div
          className="flex flex-col lg:flex-row items-start lg:items-end gap-8 sm:gap-10 lg:gap-[72px] w-full"
          style={{ maxWidth: 1100, margin: "0 auto" }}
        >
          {/* Left column — logo + subtitle */}
          <div className="flex flex-col gap-4 sm:gap-6 shrink-0 max-w-full sm:max-w-[340px]">
            <TextPressure
              text="DONSC."
              minWeight={200}
              maxWeight={400}
              radius={180}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(48px, 8vw, 100px)",
                color: "#ffffff",
                letterSpacing: "-0.03em",
              }}
            />
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(14px, 1.6vw, 20px)",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.08px",
                margin: 0,
              }}
            >
              Projetamos experiências, ferramentas e automações que reduzem atrito e movem o negócio.
            </p>
          </div>

          {/* Right column — sticky note + headlines */}
          <div className="flex flex-col items-start w-full lg:w-auto">
            <StickyNote mouse={mouse} />

            {/* Headline rows */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(14px, 2vw, 20px)",
                width: "100%",
              }}
            >
              {/* Line 1: Sites [insert] QUE VENDEM. */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(8px, 1.6vw, 22px)",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ ...hlBase, color: light }}>Sites</span>
                <StaticInsert mouse={mouse} rotate={-1.6}>
                  {(sh) => <WebsiteInsert shadow={sh} />}
                </StaticInsert>
                <span style={{ ...hlBase, color: gold }}>que vendem.</span>
              </div>

              {/* Line 2: [insert] Sistemas QUE FUNCIONAM */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(8px, 1.6vw, 22px)",
                  flexWrap: "wrap",
                }}
              >
                <StaticInsert mouse={mouse} rotate={1.3}>
                  {(sh) => <DashboardInsert shadow={sh} />}
                </StaticInsert>
                <span style={{ ...hlBase, color: light }}>Sistemas</span>
                <span style={{ ...hlBase, color: light }}>que funcionam</span>
              </div>

              {/* Line 3: IA [insert] QUE ACELERA. */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(8px, 1.6vw, 22px)",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ ...hlBase, color: gold }}>IA</span>
                <StaticInsert mouse={mouse} rotate={-0.9}>
                  {(sh) => <AIInsert shadow={sh} />}
                </StaticInsert>
                <span style={{ ...hlBase, color: light }}>que acelera.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── CTA centered bottom ── */}
      <div className="relative z-10 flex justify-center py-8 sm:py-12 lg:pb-16">
        <PrimaryButton mouse={mouse} />
      </div>
    </div>
    </SoundContext.Provider>
  );
}
