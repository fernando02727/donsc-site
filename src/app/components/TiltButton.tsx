import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "motion/react";

export function TiltButton({ 
  children, 
  onClick 
}: { 
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  // Mouse position relative to center of button (range: -1 to 1)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-1, 1], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-1, 1], [-15, 15]), springConfig);

  // Shine effect position
  const shineX = useSpring(useTransform(x, [-1, 1], [100, 0]), springConfig);
  const shineY = useSpring(useTransform(y, [-1, 1], [100, 0]), springConfig);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate distance from center (normalized to -1..1)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const posX = (e.clientX - centerX) / (rect.width / 2);
    const posY = (e.clientY - centerY) / (rect.height / 2);
    
    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98, rotateX: 0, rotateY: 0 }}
      className="relative flex items-center justify-center gap-2 overflow-hidden rounded-sm bg-white text-black px-10 py-4 text-base font-medium shadow-lg transition-shadow hover:shadow-xl border border-black/10"
    >
      <span className="z-10">{children}</span>

      {/* Subtle shine effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 mix-blend-overlay transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at center, rgba(0,0,0,0.05) 0%, transparent 60%)",
          opacity: isHovered ? 0.3 : 0,
          left: useTransform(shineX, (val) => `${val}%`),
          top: useTransform(shineY, (val) => `${val}%`),
          width: "200%",
          height: "200%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </motion.button>
  );
}