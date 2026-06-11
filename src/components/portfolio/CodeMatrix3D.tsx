"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * CodeMatrix3D — drifting field of wireframe cubes & binary glyphs.
 * AI / CS themed ambient accent. GPU-light, instanced.
 */
function Cubes() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const COUNT = 70;
  const seeds = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 5,
        z: (Math.random() - 0.5) * 4 - 1,
        s: 0.08 + Math.random() * 0.18,
        sp: 0.2 + Math.random() * 0.8,
        ph: Math.random() * Math.PI * 2,
      })),
    [],
  );

  const tmp = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    seeds.forEach((s, i) => {
      tmp.position.set(
        s.x + Math.sin(t * 0.2 + s.ph) * 0.4,
        s.y + Math.cos(t * 0.3 + s.ph) * 0.3,
        s.z,
      );
      tmp.rotation.set(t * s.sp * 0.3, t * s.sp * 0.5, t * s.sp * 0.2);
      tmp.scale.setScalar(s.s);
      tmp.updateMatrix();
      ref.current!.setMatrixAt(i, tmp.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        color="#C76B2A"
        wireframe
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.15;
      ref.current.rotation.x += dt * 0.08;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 2]} />
      <meshBasicMaterial color="#D8B36A" wireframe transparent opacity={0.4} />
    </mesh>
  );
}

export function CodeMatrix3D({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <CoreSphere />
        <Cubes />
      </Canvas>
    </div>
  );
}
