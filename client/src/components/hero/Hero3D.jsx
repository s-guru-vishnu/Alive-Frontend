import React, { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion, useLowEndDevice } from '../../hooks/useReducedMotion';

// Lazy load the 3D scene component
const BloodDropScene = lazy(() => import('./BloodDropScene'));

/**
 * Hero 3D Component
 * Lightweight 3D animation with fallback
 */
const Hero3D = () => {
  const prefersReducedMotion = useReducedMotion();
  const isLowEnd = useLowEndDevice();
  const [webglSupported, setWebglSupported] = React.useState(false);

  // Check WebGL support
  React.useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setWebglSupported(!!gl);
  }, []);

  // Fallback static image if WebGL not supported or reduced motion
  if (prefersReducedMotion || isLowEnd || !webglSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full opacity-20 blur-3xl"></div>
          <div className="relative w-full h-full flex items-center justify-center">
            <svg className="w-48 h-48 md:w-64 md:h-64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 8C28 8 24 10 22 14C20 18 18 22 18 28C18 36 22 42 28 48C30 50 32 52 32 52C32 52 34 50 36 48C42 42 46 36 46 28C46 22 44 18 42 14C40 10 36 8 32 8Z" fill="#DC2626"/>
              <path d="M32 12C29 12 26 13.5 24.5 16.5C23 19.5 21.5 22.5 21.5 28C21.5 34.5 24.5 39.5 29.5 44C30.5 45 31.5 46 32 46.5C32.5 46 33.5 45 34.5 44C39.5 39.5 42.5 34.5 42.5 28C42.5 22.5 41 19.5 39.5 16.5C38 13.5 35 12 32 12Z" fill="#EF4444"/>
              <circle cx="32" cy="26" r="3" fill="#FFFFFF"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Limit pixel ratio for performance
      >
        <Suspense fallback={null}>
          <BloodDropScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
