import React, { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Preload the truck model for immediate caching
useGLTF.preload('/truck.glb');

// 3D Peterbilt 379 Truck Model (Optimus Prime)
function TruckModel() {
  const { scene } = useGLTF('/truck.glb');

  // Clone the scene so we can safely center it and avoid mutating shared geometry
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    clone.position.sub(center);
    return clone;
  }, [scene]);

  return (
    <group rotation={[0, 0, 0]}>
      <group position={[0, 0, 0]}>
        <primitive object={clonedScene} scale={1.38} />
      </group>
    </group>
  );
}

// Dynamically updates camera zoom when responsive scale changes
function CameraController({ zoom }: { zoom: number }) {
  const { camera, invalidate } = useThree();
  useEffect(() => {
    if ('zoom' in camera) {
      (camera as THREE.OrthographicCamera).zoom = zoom;
      camera.updateProjectionMatrix();
      invalidate();
    }
  }, [camera, zoom, invalidate]);
  return null;
}

interface RobotGuardianProps {
  scrollProgress: MotionValue<number>;
  trackRef?: React.RefObject<HTMLDivElement | null>;
}

export const RobotGuardian: React.FC<RobotGuardianProps> = ({ scrollProgress, trackRef }) => {
  const [windowWidth, setWindowWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Track dimensions for responsive aspect-ratio rotation and coordinate scaling
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>(() => {
    if (typeof window !== 'undefined') {
      const w = Math.min(800, window.innerWidth * 0.8);
      const h = window.innerHeight * 4.5;
      return { width: w, height: h };
    }
    return { width: 800, height: 4800 };
  });

  const dimensionsRef = useRef(dimensions);
  dimensionsRef.current = dimensions;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateDimensions = () => {
      setWindowWidth(window.innerWidth);
      if (trackRef?.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const w = rect.width || Math.min(800, window.innerWidth * 0.8);
        const h = rect.height || (window.innerHeight * 4.5);
        setDimensions({ width: w, height: h });
      } else {
        setDimensions({
          width: Math.min(800, window.innerWidth * 0.8),
          height: window.innerHeight * 4.5,
        });
      }
    };

    updateDimensions();

    const el = trackRef?.current;
    if (typeof ResizeObserver !== 'undefined' && el) {
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const cr = entry.contentRect;
          if (cr.width > 0 && cr.height > 0) {
            setDimensions({ width: cr.width, height: cr.height });
          }
        }
      });
      ro.observe(el);
      window.addEventListener('resize', updateDimensions, { passive: true });
      return () => {
        ro.disconnect();
        window.removeEventListener('resize', updateDimensions);
      };
    } else {
      window.addEventListener('resize', updateDimensions, { passive: true });
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, [trackRef]);

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

    // Compensate for screen aspect ratio between SVG viewBox (1000 x 6000) and actual rendered pixel dimensions
    const currentDims = dimensionsRef.current;
    const aspect = (currentDims.width / 1000) / (currentDims.height / 6000);
    const dX_screen = dX * aspect;

    const angleRad = Math.atan2(dX_screen, dY);
    let angleDeg = -(angleRad * 180) / Math.PI;

    if (p > 0.95) {
      const untiltProgress = (p - 0.95) / 0.05;
      angleDeg = angleDeg * (1 - untiltProgress);
    }

    return angleDeg;
  });

  // Final heroic energy pulse state
  const isFinalStatus = useTransform(scrollProgress, [0.98, 1], [0, 1]);
  const [isFinalActive, setIsFinalActive] = useState(false);

  useEffect(() => {
    return isFinalStatus.on('change', (v) => {
      setIsFinalActive(v > 0.5);
    });
  }, [isFinalStatus]);

  return (
    <motion.div
      style={{ top: topMovement, left: leftMovement, rotate: rotation, x: "-50%", y: "-50%" }}
      className="absolute w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-64 lg:h-64 flex items-center justify-center z-[60] pointer-events-none"
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <Canvas
          orthographic
          frameloop="demand"
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 20, 0], zoom: cameraZoom, near: 0.1, far: 1000, rotation: [-Math.PI / 2, 0, 0] }}
          className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} />
          <Suspense fallback={null}>
            <TruckModel />
            <Environment preset="night" />
          </Suspense>
          <CameraController zoom={cameraZoom} />
        </Canvas>

        {/* Dynamic Status Display */}
        <motion.div
          style={{ rotate: useTransform(rotation, (r) => -r) }}
          className="absolute -bottom-2 sm:-bottom-2.5 lg:-bottom-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 sm:gap-1 bg-black/85 border border-[#00A3FF]/50 px-1.5 py-0.5 sm:px-2 sm:py-0.5 lg:px-2.5 rounded-sm backdrop-blur-md whitespace-nowrap pointer-events-none shadow-[0_0_10px_rgba(0,163,255,0.3)]"
        >
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div
              className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full animate-ping shrink-0 ${isFinalActive ? 'bg-[#cc0000]' : 'bg-[#00A3FF]'}`}
            />
            <span
              className={`font-mono text-[6.5px] sm:text-[7.5px] lg:text-[8px] tracking-tight sm:tracking-wider lg:tracking-widest font-semibold ${isFinalActive ? 'text-[#ff4500]' : 'text-[#00A3FF]'}`}
            >
              {isFinalActive
                ? (windowWidth < 640 ? "FINAL MISSION" : "FINAL MISSION UNLOCKED")
                : (windowWidth < 640 ? "OPTIMUS PRIME" : "OPTIMUS PRIME ACTIVE")}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
