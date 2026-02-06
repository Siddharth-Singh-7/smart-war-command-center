import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Points, PointMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

function HolographicGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.15;
    }
  });

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      const r = 3;
      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(theta);
    }
    return positions;
  }, []);

  return (
    <group>
      {/* Central Globe Core */}
      <Sphere ref={meshRef} args={[2.5, 64, 64]}>
        <MeshDistortMaterial
          color="#00ffff"
          opacity={0.15}
          transparent
          wireframe
          distort={0.2}
          speed={2}
        />
      </Sphere>

      {/* Atmospheric Glow */}
      <Sphere args={[2.8, 64, 64]}>
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.05}
          wireframe
        />
      </Sphere>

      {/* Surface Points / Data Nodes */}
      <Points ref={pointsRef} positions={particlePositions}>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Scanning Rings */}
      <ScanningRing radius={3.2} speed={0.5} opacity={0.2} axis="y" />
      <ScanningRing radius={3.5} speed={-0.3} opacity={0.1} axis="x" />
      
      {/* Tactical Labels */}
      <TacticalMarker position={[1.5, 2, 1.5]} label="SECTOR 7G" risk="78%" />
      <TacticalMarker position={[-2, -1, 1]} label="GRID-04" risk="42%" />
    </group>
  );
}

function ScanningRing({ radius, speed, opacity, axis }: { radius: number; speed: number; opacity: number; axis: 'x' | 'y' }) {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation[axis] = state.clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh ref={ringRef} rotation-x={axis === 'y' ? Math.PI / 2 : 0}>
      <ringGeometry args={[radius - 0.01, radius, 128]} />
      <meshBasicMaterial color="#00ffff" transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
}

function TacticalMarker({ position, label, risk }: { position: [number, number, number], label: string, risk: string }) {
  return (
    <group position={position}>
      <Sphere args={[0.08, 16, 16]}>
        <meshBasicMaterial color={risk === '78%' ? '#ff4444' : '#00ffff'} />
      </Sphere>
      <Text
        position={[0.2, 0.2, 0]}
        fontSize={0.15}
        color="white"
        font="https://fonts.gstatic.com/s/orbitron/v25/yYqxRnd6CQ8G2kx49lC_v76l.woff"
      >
        {label}
      </Text>
      <Text
        position={[0.2, 0, 0]}
        fontSize={0.1}
        color={risk === '78%' ? '#ff4444' : '#00ffff'}
        font="https://fonts.gstatic.com/s/rajdhani/v15/L0x5DF02iFML4hGCyOCz.woff"
      >
        RISK: {risk}
      </Text>
    </group>
  );
}

export function BattlefieldViz() {
  return (
    <div className="w-full h-full relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0%,transparent_100%)] pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <HolographicGlobe />
      </Canvas>

      {/* Floating Tactical HUD Info */}
      <div className="absolute top-8 left-8 p-4 glass-panel border-primary/20 flex flex-col gap-1 pointer-events-none">
        <span className="text-[10px] text-muted-foreground uppercase">Target Analysis</span>
        <span className="text-xs font-orbitron text-primary">OBJECT_ID: B-VANGUARD</span>
        <span className="text-[10px] text-primary/60 font-mono">LAT: 42.88.10 // LON: -12.45.01</span>
      </div>

      <div className="absolute bottom-8 right-8 p-4 glass-panel border-red-glow/20 flex flex-col gap-1 pointer-events-none text-right">
        <span className="text-[10px] text-muted-foreground uppercase">Threat Confirmation</span>
        <span className="text-xs font-orbitron text-red-glow">CRITICAL_ENGAGEMENT</span>
        <span className="text-[10px] text-red-glow/60 font-mono">CONFIDENCE: 99.4%</span>
      </div>
    </div>
  );
}
