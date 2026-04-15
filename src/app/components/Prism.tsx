import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ---------- animated prism mesh (no external network deps) ----------
function PrismMesh({
  height = 2.5,
  baseWidth = 7.5,
  animationType = "rotate",
  scale = 3.6,
  hueShift = 0,
  timeScale = 0.5,
}: {
  height?: number;
  baseWidth?: number;
  animationType?: string;
  scale?: number;
  hueShift?: number;
  timeScale?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!mesh.current) return;
    if (animationType === "rotate") {
      mesh.current.rotation.y += delta * timeScale * 0.5;
      mesh.current.rotation.x += delta * timeScale * 0.2;
    }
  });

  const hue = ((hueShift % 360) + 360) % 360;
  const color = new THREE.Color().setHSL(hue / 360, 0.7, 0.85);

  return (
    <Float speed={timeScale * 2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} scale={scale}>
        {/* 3 radial segments → triangular prism */}
        <cylinderGeometry args={[baseWidth / 5, baseWidth / 5, height, 3]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.82}
          roughness={0.04}
          metalness={0.05}
          transmission={0.88}
          thickness={2.5}
          clearcoat={1}
          clearcoatRoughness={0.04}
          ior={1.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

// ---------- full scene (lights + mesh + post-processing) ----------
function Scene(props: {
  height?: number;
  baseWidth?: number;
  animationType?: string;
  glow?: number;
  transparent?: boolean;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  bloom?: number;
  timeScale?: number;
  noise?: number;
}) {
  const {
    height,
    baseWidth,
    animationType,
    glow = 1,
    scale,
    hueShift = 0,
    colorFrequency = 1,
    bloom = 1,
    timeScale,
  } = props;

  return (
    <>
      {/* Manual lighting — no network fetches */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[0, 8, -6]} intensity={1.0} color="#a78bfa" />
      <pointLight position={[8, -4, 4]} intensity={0.8} color="#34d399" />

      <PrismMesh
        height={height}
        baseWidth={baseWidth}
        animationType={animationType}
        scale={scale}
        hueShift={hueShift}
        timeScale={timeScale}
      />

      {/* EffectComposer always has at least one concrete effect */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          height={300}
          intensity={glow * bloom * (colorFrequency || 1)}
        />
      </EffectComposer>
    </>
  );
}

// ---------- public component ----------
export function Prism(props: Record<string, unknown>) {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Scene {...(props as any)} />
      </Suspense>
    </Canvas>
  );
}
