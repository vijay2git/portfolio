"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Knot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.x += dt * 0.25;
      ref.current.rotation.y += dt * 0.35;
    }
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.9, 0.28, 220, 32]} />
      <meshStandardMaterial
        color="#C76B2A"
        metalness={0.6}
        roughness={0.25}
        emissive="#2D6A4F"
        emissiveIntensity={0.45}
        wireframe
      />
    </mesh>
  );
}

/**
 * AccentObject3D — a compact decorative 3D piece for inline use in sections.
 */
export function AccentObject3D({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 3, 3]} intensity={1.4} color="#C76B2A" />
        <pointLight position={[-3, -2, 2]} intensity={1.1} color="#2D6A4F" />
        <Knot />
      </Canvas>
    </div>
  );
}
