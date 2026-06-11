"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * NeuralNetwork3D — a rotating 3-layer perceptron rendered as glowing nodes
 * with animated synaptic edges. AI / CS themed accent for inline use.
 */
function Net() {
  const group = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { nodes, edgePositions } = useMemo(() => {
    const layers = [4, 6, 6, 3];
    const spacingX = 1.4;
    const nodes: { pos: THREE.Vector3; layer: number }[] = [];
    layers.forEach((count, li) => {
      const x = (li - (layers.length - 1) / 2) * spacingX;
      for (let i = 0; i < count; i++) {
        const y = (i - (count - 1) / 2) * 0.55;
        nodes.push({ pos: new THREE.Vector3(x, y, 0), layer: li });
      }
    });
    const edges: number[] = [];
    for (let li = 0; li < layers.length - 1; li++) {
      const a = nodes.filter((n) => n.layer === li);
      const b = nodes.filter((n) => n.layer === li + 1);
      a.forEach((na) =>
        b.forEach((nb) => {
          edges.push(na.pos.x, na.pos.y, na.pos.z, nb.pos.x, nb.pos.y, nb.pos.z);
        }),
      );
    }
    return { nodes, edgePositions: new Float32Array(edges) };
  }, []);

  useFrame((state, dt) => {
    if (group.current) {
      group.current.rotation.y += dt * 0.25;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
    if (linesRef.current) {
      const m = linesRef.current.material as THREE.LineBasicMaterial;
      m.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 1.6) * 0.15;
    }
  });

  return (
    <group ref={group}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#C76B2A" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial
            color={n.layer % 2 === 0 ? "#C76B2A" : "#D8B36A"}
            emissive="#C76B2A"
            emissiveIntensity={0.9}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

export function NeuralNetwork3D({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1.4} color="#C76B2A" />
        <pointLight position={[-3, -2, 2]} intensity={1.0} color="#2D6A4F" />
        <Net />
      </Canvas>
    </div>
  );
}
