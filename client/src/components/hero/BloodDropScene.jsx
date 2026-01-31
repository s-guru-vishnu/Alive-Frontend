import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

/**
 * 3D Blood Drop Scene
 * Lightweight rotating and floating animation
 */
const BloodDropScene = () => {
  const meshRef = useRef();

  // Smooth rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
      
      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <>
      {/* Ambient light for soft illumination */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      
      {/* Main blood drop shape */}
      <group ref={meshRef} position={[0, 0, 0]}>
        <Sphere args={[1.5, 32, 32]} scale={[1, 1.3, 1]}>
          <MeshDistortMaterial
            color="#DC2626"
            attach="material"
            distort={0.2}
            speed={1}
            roughness={0.3}
            metalness={0.1}
            transparent
            opacity={0.9}
          />
        </Sphere>
        
        {/* Inner glow */}
        <Sphere args={[1.2, 32, 32]} scale={[0.9, 1.1, 0.9]}>
          <meshStandardMaterial
            color="#EF4444"
            transparent
            opacity={0.3}
            emissive="#DC2626"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </group>
    </>
  );
};

export default BloodDropScene;
