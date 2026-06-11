"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Shared Types ───────────────────────────────────────────────────────────

export type CinematicVariant = "neural-core" | "universe" | "research-lab";

// ─── Viewport observer — only render Canvas when section is visible ──────

function useInViewport(): [boolean, (el: HTMLDivElement | null) => void] {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        else setVisible(false);
      },
      { threshold: 0, rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const setRef = useCallback((el: HTMLDivElement | null) => {
    ref.current = el;
  }, []);

  return [visible, setRef];
}

// ─── Throttled frame counter — skip every other frame ────────────────────

function useThrottledFrame(cb: (state: any, delta: number) => void, everyN = 2) {
  const frameCount = useRef(0);
  useFrame((state, delta) => {
    frameCount.current++;
    if (frameCount.current % everyN !== 0) return;
    cb(state, delta);
  });
}

// ─── Neural Core Scene (Hero) ─────────────────────────────────────────────

function NeuralCoreEnvironment() {
  const group = useRef<THREE.Group>(null);

  const coreUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#C76B2A") },
      uColor2: { value: new THREE.Color("#D8B36A") },
      uColor3: { value: new THREE.Color("#2D6A4F") },
    }),
    [],
  );

  // Reduced: 4 layers x 8 nodes (was 6x12)
  const { linePositions } = useMemo(() => {
    const points: number[] = [];
    const layers = 4;
    const nodesPerLayer = 8;
    for (let l = 0; l < layers; l++) {
      const radius = 1.5 + l * 0.8;
      const yOffset = (l - layers / 2) * 0.7;
      for (let n = 0; n < nodesPerLayer; n++) {
        const angle = (n / nodesPerLayer) * Math.PI * 2 + l * 0.3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        points.push(0, yOffset, 0, x, yOffset, z);
      }
    }
    return { linePositions: new Float32Array(points) };
  }, []);

  // Reduced: 150 particles (was 400)
  const particlePositions = useMemo(() => {
    const count = 150;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 1.5 + Math.random() * 4;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  // Reduced: 300 dust (was 600)
  const dustPositions = useMemo(
    () => new Float32Array(Array.from({ length: 300 }, () => (Math.random() - 0.5) * 12)),
    [],
  );

  useThrottledFrame((state, delta) => {
    coreUniforms.uTime.value += delta * 0.5;
    if (group.current) {
      group.current.rotation.y += delta * 0.08;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <torusKnotGeometry args={[0.8, 0.25, 64, 16]} /> {/* was 128,32 */}
        <shaderMaterial uniforms={coreUniforms} vertexShader={VERT_PULSE} fragmentShader={FRAG_PULSE} transparent blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 24, 24]} /> {/* was 32 */}
        <meshBasicMaterial color="#C76B2A" transparent opacity={0.12} />
      </mesh>
      {linePositions.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#C76B2A" transparent opacity={0.1} />
        </lineSegments>
      )}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#D8B36A" transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.012} color="#2D6A4F" transparent opacity={0.2} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

// ─── Universe Scene (Projects) ────────────────────────────────────────────

function UniverseEnvironment() {
  const group = useRef<THREE.Group>(null);
  const starRef = useRef<THREE.Points>(null);

  // Reduced: 6 planets (was 12)
  const planets = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5 - 1,
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.4,
      color: [new THREE.Color("#C76B2A"), new THREE.Color("#D8B36A"), new THREE.Color("#2D6A4F")][Math.floor(Math.random() * 3)],
      speed: 0.2 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
      type: Math.floor(Math.random() * 3),
    }));
  }, []);

  const { connectionPositions } = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        if (Math.random() > 0.5) continue;
        points.push(...planets[i].position, ...planets[j].position);
      }
    }
    return { connectionPositions: new Float32Array(points) };
  }, [planets]);

  // Reduced: 600 stars (was 1500)
  const starPositions = useMemo(
    () => new Float32Array(Array.from({ length: 600 }, () => (Math.random() - 0.5) * 25)),
    [],
  );

  const geometries = useMemo(
    () => [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
    ],
    [],
  );

  useThrottledFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.02;
    if (starRef.current) starRef.current.rotation.y += delta * 0.003;
  });

  return (
    <group ref={group}>
      {connectionPositions.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[connectionPositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#D8B36A" transparent opacity={0.06} />
        </lineSegments>
      )}
      {planets.map((p, i) => (
        <Planet key={i} geometry={geometries[p.type]} position={p.position} scale={p.scale} color={p.color} speed={p.speed} offset={p.offset} />
      ))}
      <points ref={starRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#F5F1EA" transparent opacity={0.3} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

function Planet({ geometry, position, scale, color, speed, offset }: {
  geometry: THREE.BufferGeometry; position: [number, number, number]; scale: number;
  color: THREE.Color; speed: number; offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useThrottledFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * 0.3;
      ref.current.rotation.y += delta * speed * 0.5;
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref} scale={scale}>
        <primitive object={geometry} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// ─── Research Lab Scene (About) ────────────────────────────────────────────

function ResearchEnvironment() {
  const group = useRef<THREE.Group>(null);

  // Reduced: 4 layers (was 5)
  const treeData = useMemo(() => {
    const layers = 4;
    const nodes: { pos: THREE.Vector3; layer: number; color: THREE.Color }[] = [];
    const edges: number[] = [];
    const layerColors = [
      new THREE.Color("#2D6A4F"), new THREE.Color("#C76B2A"),
      new THREE.Color("#D8B36A"), new THREE.Color("#C76B2A"),
    ];
    for (let l = 0; l < layers; l++) {
      const nodesInLayer = Math.min(1 + l, 5);
      const spread = 0.5 + l * 0.4;
      for (let n = 0; n < nodesInLayer; n++) {
        const angle = (n / nodesInLayer) * Math.PI * 2;
        const radius = spread * 0.7;
        const pos = new THREE.Vector3(Math.cos(angle) * radius, (l - layers / 2) * 0.7, Math.sin(angle) * radius);
        nodes.push({ pos, layer: l, color: layerColors[l] });
        if (l > 0) {
          const parentNodes = nodes.filter((nd) => nd.layer === l - 1);
          if (parentNodes.length > 0) {
            const parent = parentNodes[Math.floor(Math.random() * parentNodes.length)];
            edges.push(pos.x, pos.y, pos.z, parent.pos.x, parent.pos.y, parent.pos.z);
          }
        }
      }
    }
    return { nodes, edgePositions: new Float32Array(edges) };
  }, []);

  // Reduced: 300 dust (was 498)
  const dustPositions = useMemo(
    () => new Float32Array(Array.from({ length: 300 }, () => (Math.random() - 0.5) * 8)),
    [],
  );

  useThrottledFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.04;
  });

  return (
    <group ref={group}>
      {treeData.edgePositions.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[treeData.edgePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#C76B2A" transparent opacity={0.12} />
        </lineSegments>
      )}
      {treeData.nodes.map((node, i) => (
        <ResearchNode key={i} position={node.pos} color={node.color} layer={node.layer} />
      ))}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.015} color="#D8B36A" transparent opacity={0.15} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

function ResearchNode({ position, color, layer }: { position: THREE.Vector3; color: THREE.Color; layer: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useThrottledFrame((state) => {
    const pulse = 0.3 + Math.sin(state.clock.elapsedTime * (0.5 + layer * 0.2) + position.x) * 0.3;
    if (ref.current) (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + pulse * 0.3;
  }, 3);

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// ─── Shared Shaders ─────────────────────────────────────────────────────

const VERT_PULSE = /* glsl */ `
  precision mediump float;
  uniform float uTime;
  varying vec3 vPos;
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    float wave = sin(position.x * 2.0 + uTime) * 0.03
               + cos(position.y * 2.5 + uTime * 0.7) * 0.03;
    vec3 pos = position + normal * wave;
    vPos = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAG_PULSE = /* glsl */ `
  precision mediump float;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.0);
    float band = sin(vPos.y * 3.0 + uTime * 0.5) * 0.5 + 0.5;
    vec3 col = mix(uColor1, uColor2, band);
    col = mix(col, vec3(0.96, 0.94, 0.92), fresnel * 0.4);
    gl_FragColor = vec4(col, 0.5 + fresnel * 0.25);
  }
`;

// ─── Camera Controller ────────────────────────────────────────────────────

function CameraController({ variant }: { variant: CinematicVariant }) {
  const { camera } = useThree();
  const lookTarget = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    switch (variant) {
      case "neural-core": camera.position.set(0, 0.5, 4.5); break;
      case "universe": camera.position.set(0, 0, 6); break;
      case "research-lab": camera.position.set(0, 0.5, 5); break;
    }
    camera.lookAt(0, 0, 0);
  }, [variant, camera]);

  useThrottledFrame((state) => {
    const t = state.clock.elapsedTime;
    const radius = variant === "neural-core" ? 4.5 : variant === "universe" ? 6 : 5;
    camera.position.x = Math.sin(t * 0.06) * radius * 0.25;
    camera.position.z = radius - Math.sin(t * 0.04) * radius * 0.1;
    camera.position.y = 0.5 + Math.sin(t * 0.08) * 0.2;
    lookTarget.set(Math.sin(t * 0.02) * 0.2, Math.sin(t * 0.04) * 0.15, 0);
    camera.lookAt(lookTarget);
  }, 2);

  return null;
}

// ─── Environment Selection ────────────────────────────────────────────────

function Environment({ variant }: { variant: CinematicVariant }) {
  switch (variant) {
    case "neural-core": return <NeuralCoreEnvironment />;
    case "universe": return <UniverseEnvironment />;
    case "research-lab": return <ResearchEnvironment />;
  }
}

// ─── Main CinematicBackground Component ────────────────────────────────────

export function CinematicBackground({ variant }: { variant: CinematicVariant }) {
  const [mounted, setMounted] = useState(false);
  const [visible, viewportRef] = useInViewport();

  useEffect(() => setMounted(true), []);

  // Don't render anything during SSR
  if (!mounted) return null;

  return (
    <div ref={viewportRef} aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
      {visible && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "low-power",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.8,
          }}
          dpr={[1, 1.2]}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[3, 3, 3]} intensity={0.4} color="#C76B2A" />
          <directionalLight position={[-3, -2, 2]} intensity={0.2} color="#2D6A4F" />
          <CameraController variant={variant} />
          <Environment variant={variant} />
        </Canvas>
      )}
    </div>
  );
}
