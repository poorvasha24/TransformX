import React, { Suspense, useMemo } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Preload the truck model
useGLTF.preload('/truck.glb');

function TruckModel() {
  const { scene } = useGLTF('/truck.glb');

  // Clone the scene so we can safely mutate materials or scale
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    // Center the model
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    clone.position.sub(center);
    return clone;
  }, [scene]);

  return (
    <group rotation={[0, 0, 0]}>
      {/* 
        We rotate the model on the Y axis by PI (180 degrees) or -PI/2 depending on its default orientation.
        Most models face +Z (towards camera). We want it to face "Down" on the screen which is +Z in top-down view.
        We can wrap it in a group to adjust if needed.
      */}
      <group position={[0, 0, 0]}>
        <primitive object={clonedScene} scale={1.38} />
      </group>
    </group>
  );
}

export const RobotGuardian: React.FC<{ scrollProgress: MotionValue<number> }> = ({ scrollProgress }) => {
  const [windowWidth, setWindowWidth] = React.useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cameraZoom = windowWidth < 480 ? 7 : windowWidth < 640 ? 8.5 : windowWidth < 1024 ? 12 : 16;

  // --- PATH TRACING MATH ---
  const topMovement = useTransform(scrollProgress, (p: number) => {
    const yPercent = 2.5 + p * 90;
    return `${yPercent}%`;
  });

  const leftMovement = useTransform(scrollProgress, (p: number) => {
    const t_total = p * 3;
    let segment = Math.floor(t_total);
    if (segment >= 3) segment = 2;
    const t = t_total - segment;

    const C_x = (segment % 2 === 0) ? 200 : 800;

    const factor1 = 1 - 3 * t + 3 * t * t;
    const factor2 = 3 * t - 3 * t * t;
    const x = factor1 * 500 + factor2 * C_x;

    return `${x / 10}%`;
  });

  const rotation = useTransform(scrollProgress, (p: number) => {
    const t_total = p * 3;
    let segment = Math.floor(t_total);
    if (segment >= 3) segment = 2;
    const t = t_total - segment;

    const C_x = (segment % 2 === 0) ? 200 : 800;

    const dX = (3 - 6 * t) * (C_x - 500);
    const dY = 1800;

    // Angle in radians from the vertical Y axis (downwards)
    // We want the truck to fully rotate to follow the path perfectly.
    const angleRad = Math.atan2(dX, dY);
    // Convert to degrees. Negative because DOM rotation is clockwise.
    let angleDeg = -(angleRad * 180) / Math.PI;

    // Smoothly return to an upright position as the truck parks at the final node
    if (p > 0.95) {
      const untiltProgress = (p - 0.95) / 0.05; // 0 to 1
      angleDeg = angleDeg * (1 - untiltProgress);
    }

    return angleDeg;
  });

  // Final heroic energy pulse state
  const isFinalStatus = useTransform(scrollProgress, [0.98, 1], [0, 1]);

  return (
    <motion.div
      style={{ top: topMovement, left: leftMovement, rotate: rotation, x: "-50%", y: "-50%" }}
      className="absolute w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-64 lg:h-64 flex items-center justify-center z-[60] pointer-events-none"
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <Canvas
          orthographic
          camera={{ position: [0, 20, 0], zoom: cameraZoom, near: 0.1, far: 1000, rotation: [-Math.PI / 2, 0, 0] }}
          className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
          <Suspense fallback={null}>
            <TruckModel />
            <Environment preset="night" />
          </Suspense>
        </Canvas>

        {/* Dynamic Status Display */}
        <motion.div
          style={{ rotate: useTransform(rotation, (r) => -r) }}
          className="absolute -bottom-2 sm:-bottom-2.5 lg:-bottom-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 sm:gap-1 bg-black/85 border border-[#00A3FF]/50 px-1.5 py-0.5 sm:px-2 sm:py-0.5 lg:px-2.5 rounded-sm backdrop-blur-md whitespace-nowrap pointer-events-none shadow-[0_0_10px_rgba(0,163,255,0.3)]"
        >
          <div className="flex items-center gap-1 sm:gap-1.5">
            <motion.div
              style={{ backgroundColor: useTransform(isFinalStatus, [0, 1], ['#00A3FF', '#cc0000']) }}
              className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-ping shrink-0"
            />
            <motion.span
              className="font-mono text-[6.5px] sm:text-[7.5px] lg:text-[8px] tracking-tight sm:tracking-wider lg:tracking-widest font-semibold"
              style={{ color: useTransform(isFinalStatus, [0, 1], ['#00A3FF', '#ff4500']) }}
            >
              {/* @ts-ignore - framer motion types weirdness with strings */}
              {useTransform(isFinalStatus, (v) => {
                if (windowWidth < 640) {
                  return v > 0.5 ? "FINAL MISSION" : "OPTIMUS PRIME";
                }
                return v > 0.5 ? "FINAL MISSION UNLOCKED" : "OPTIMUS PRIME ACTIVE";
              })}
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
