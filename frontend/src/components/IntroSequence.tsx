import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Center } from '@react-three/drei';
import {
  playIntroSwoosh,
  playIntroImpact,
  playIntroThunder,
  playIntroPanels,
  playIntroReveal,
  playUiBeep,
  playClick,
  setSoundEnabled,
  getSoundEnabled
} from '../utils/audio';
import { Volume2, VolumeX, FastForward, Sparkles, Shield, Zap } from 'lucide-react';

// Preload the sword model
useGLTF.preload('/optimus_sword.glb');

function SwordModel() {
  const { scene } = useGLTF('/optimus_sword.glb');

  // Polish the materials dynamically without washing out the original colors
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material.metalness = 0.8; // Very metallic
        child.material.roughness = 0.1; // Very glossy, almost mirror-like
        child.material.envMapIntensity = 2.5; // Boost environment reflections
      }
    });
  }, [scene]);

  return (
    <group position={[0, 0, 0]} scale={22} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Glossy Cinematic Lighting (No harsh white edges) */}
      <ambientLight intensity={0.8} color="#e0f7fa" />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, 5, -5]} intensity={4.0} color="#00f0ff" />
      <directionalLight position={[5, -5, 5]} intensity={4.0} color="#ef4444" />
      <pointLight position={[0, 2, 3]} intensity={1.5} color="#00f0ff" distance={15} />

      <Center>
        <primitive object={scene} />
      </Center>

      {/* Environment map for realistic metallic reflections */}
      <Environment preset="city" />
    </group>
  );
}

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  // Step 0: Dark / Ready to ignite (user clicks or auto starts)
  // Step 1: Sword Swoop & Rotation (0.0s - 1.2s)
  // Step 2: Sword Strike & Energy Slash (1.2s - 2.0s)
  // Step 3: Screen Split & Armor Panels Slide Apart (2.0s - 3.4s)
  // Step 4: TRANSFORMX Mechanical Assembly & Sequential Tagline (3.4s - 6.0s)
  // Step 5: Transition to Main Portal (6.0s+)
  const [step, setStep] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(!getSoundEnabled());
  const [activeTaglineWord, setActiveTaglineWord] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isMuted;
    setIsMuted(nextState);
    setSoundEnabled(!nextState);
  };

  const handleSkip = () => {
    playUiBeep(1200);
    onComplete();
  };

  const handleStart = () => {
    setSoundEnabled(!isMuted); // Initialize audio context
    setHasStarted(true);
    setStep(1);
    playClick();
  };

  useEffect(() => {
    // Keyboard listener for Escape to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        if (hasStarted) {
          handleSkip();
        } else {
          handleStart();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasStarted, isMuted]);

  useEffect(() => {
    if (!hasStarted) return;

    // Stage 1: Sword enters & swoops
    playIntroSwoosh();
    const t1 = setTimeout(() => {
      setStep(2); // Sword strikes
      playIntroImpact();
      playIntroThunder();
    }, 1300);

    // Stage 2: Screen Splits & Armor Panels Part
    const t2 = setTimeout(() => {
      setStep(3);
      playIntroPanels();
    }, 2200);

    // Stage 3: Title Assembles & Taglines Ignite
    const t3 = setTimeout(() => {
      setStep(4);
      playIntroReveal();
    }, 3400);

    // Tagline Word Sequential Lights
    const tWord1 = setTimeout(() => {
      setActiveTaglineWord(1);
      playUiBeep(880);
    }, 4000);

    const tWord2 = setTimeout(() => {
      setActiveTaglineWord(2);
      playUiBeep(1100);
    }, 4600);

    const tWord3 = setTimeout(() => {
      setActiveTaglineWord(3);
      playUiBeep(1320);
    }, 5200);

    // Complete Intro
    const tComplete = setTimeout(() => {
      onComplete();
    }, 8500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tWord1);
      clearTimeout(tWord2);
      clearTimeout(tWord3);
      clearTimeout(tComplete);
    };
  }, [hasStarted]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#03060c] flex items-center justify-center overflow-hidden select-none font-orbitron">
      {/* Background Cybernetic Energy Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      {/* Top HUD Controls: Sound & Skip */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-50 pointer-events-auto">
        <div className="flex items-center gap-2 sm:gap-3 bg-black/60 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 border border-cyan-500/40 clip-chamfer">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-cyan-400">
            <span className="hidden sm:inline">SYSTEM_INITIALIZATION // </span>PROTOCOL_07
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
            className="flex items-center gap-1.5 sm:gap-2 bg-[#0c1527] hover:bg-[#1a2b4c] text-cyan-400 px-2.5 sm:px-4 py-1.5 sm:py-2 border border-cyan-500/40 clip-chamfer transition-all duration-200 text-[11px] sm:text-xs font-mono tracking-wider cursor-pointer pointer-events-auto"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-red-400" />
                <span className="hidden sm:inline">AUDIO: MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="hidden sm:inline">AUDIO: ACTIVE</span>
              </>
            )}
          </button>

          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 sm:gap-2 bg-red-950/80 hover:bg-red-900 text-red-300 hover:text-white px-3 sm:px-4 py-1.5 sm:py-2 border border-red-500/60 clip-chamfer transition-all duration-200 text-[11px] sm:text-xs font-mono tracking-wider cursor-pointer pointer-events-auto group whitespace-nowrap"
          >
            <span>SKIP<span className="hidden sm:inline"> SEQUENCE [ESC]</span></span>
            <FastForward className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {!hasStarted ? (
        <div className="relative z-50 flex flex-col items-center">
          <h1 className="font-black text-3xl sm:text-5xl md:text-7xl mb-8 tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] uppercase text-center px-4">
            COMMAND PORTAL
          </h1>
          <button
            onClick={handleStart}
            className="px-12 py-4 bg-[#cc0000] hover:bg-red-500 text-white font-orbitron font-bold tracking-[0.2em] clip-chamfer text-xl transition-all hover:scale-105 shadow-[0_0_20px_#cc0000] hover:shadow-[0_0_40px_#ff0000] cursor-pointer pointer-events-auto"
          >
            START MISSION
          </button>
        </div>
      ) : (
        <>
          {/* STEP 1 & 2: THE FUTURISTIC MECHANICAL ENERGON SWORD */}
          <AnimatePresence>
            {step < 3 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                {/* The Swooping Sword Component */}
                <motion.div
                  className="relative w-24 h-[650px] flex items-center justify-center"
                  initial={{
                    x: '-120vw',
                    y: 40,
                    rotate: 90,
                    scale: 1.0,
                    filter: 'blur(12px)',
                  }}
                  animate={
                    step === 0
                      ? {
                        x: '-120vw',
                        y: 40,
                        rotate: 90,
                        scale: 1.0,
                        filter: 'blur(12px)',
                      }
                      : step === 1
                        ? {
                          x: '-40vw',
                          y: 40,
                          rotate: 90,
                          scale: 1.0,
                          filter: 'blur(0px)',
                          transition: {
                            duration: 1.1,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        }
                        : {
                          x: '50vw',
                          y: 40,
                          rotate: 90,
                          scale: 1.2,
                          filter: 'drop-shadow(0 0 50px #00f0ff) drop-shadow(0 0 70px #ef4444)',
                          transition: {
                            duration: 0.3,
                            ease: 'easeInOut',
                          },
                        }
                  }
                >
                  {/* Removed distracting Energetic Swoosh Tail & Plasma Streak */}

                  {/* 3D Sword Architecture (Optimus Inspired Mechanical Blade) */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]"
                    style={{ filter: 'drop-shadow(0px 0px 40px rgba(0,240,255,0.8)) drop-shadow(0px 0px 80px rgba(239,68,68,0.4))' }}
                  >
                    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 45 }}>
                      <React.Suspense fallback={null}>
                        <SwordModel />
                      </React.Suspense>
                    </Canvas>
                  </div>
                </motion.div>

                {/* Visual Thunder & Horizontal Screen Cut */}
                {step === 2 && (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-white pointer-events-none mix-blend-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />

                    <motion.div
                      className="absolute inset-0 bg-cyan-200/30 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0.2, 0] }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Horizontal Screen Split Beam */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-4 bg-white shadow-[0_0_60px_#fff,0_0_100px_#00f0ff] origin-left z-40 pointer-events-none"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
                      transition={{ duration: 0.4, times: [0, 0.3, 1] }}
                    />

                    {/* Horizontal Lightning Bolt Cut */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[200px] origin-center z-50 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0.2, 1, 0.5, 1, 0] }}
                      transition={{ duration: 0.6, times: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1] }}
                    >
                      <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_0_20px_#00f0ff] filter brightness-150">
                        <path
                          d="M0,100 L150,80 L150,110 L350,60 L350,90 L550,30 L550,70 L800,100"
                          stroke="#ccffff"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M100,100 L250,120 L250,90 L450,140 L450,110 L650,170 L650,130 L800,100"
                          stroke="#88ffff"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>

                    {/* Energy Sparks following the slash */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-400/40 blur-3xl pointer-events-none"
                      initial={{ scale: 0.2, opacity: 1, left: '0vw' }}
                      animate={{ scale: 3, opacity: 0, left: '100vw' }}
                      transition={{ duration: 0.4 }}
                    />
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* STEP 3: SCREEN DIVIDES INTO TWO MECHANICAL BLAST SHIELD HALVES THAT SLIDE APART */}
          <AnimatePresence>
            {step >= 2 && step <= 4 && (
              <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                {/* Left/Top Mechanical Armor Blast Shield */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#0a1120] via-[#0f172a] to-[#1e293b] border-b-4 border-cyan-400 shadow-[0_10px_30px_rgba(0,240,255,0.4)] flex flex-col justify-end p-6"
                  initial={{ y: '0%' }}
                  animate={step >= 3 ? { y: '-105%' } : { y: '0%' }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                >
                  <div className="w-full flex items-center justify-between opacity-10 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-600 text-white font-mono text-[10px] px-2 py-0.5 clip-banner font-bold tracking-widest">
                        ARMOR_SHIELD_ALPHA
                      </div>
                      <span className="font-mono text-xs text-cyan-400">HYDRAULIC_SECTOR: 01-A</span>
                    </div>
                    <div className="w-48 h-2 bg-hazard-stripes border border-red-500/40 opacity-20" />
                  </div>

                  {/* Mechanical Bolts & Joints along the seam */}
                  <div className="w-full flex justify-between px-8 text-cyan-500/20 font-mono text-[9px] opacity-10">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full border border-cyan-400/50 bg-slate-800" />
                        <span>LOK_{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right/Bottom Mechanical Armor Blast Shield */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0a1120] via-[#0f172a] to-[#1e293b] border-t-4 border-red-500 shadow-[0_-10px_30px_rgba(239,68,68,0.4)] flex flex-col justify-start p-6"
                  initial={{ y: '0%' }}
                  animate={step >= 3 ? { y: '105%' } : { y: '0%' }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                >
                  {/* Mechanical Bolts along the seam */}
                  <div className="w-full flex justify-between px-8 text-red-500/20 font-mono text-[9px] mb-2 opacity-10">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full border border-red-500/50 bg-slate-800" />
                        <span>SEC_{i + 1}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full flex items-center justify-between opacity-10">
                    <div className="w-48 h-2 bg-hazard-stripes-cyan border border-cyan-500/40 opacity-20" />
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-red-400">DISENGAGE_MATRIX: TRUE</span>
                      <div className="bg-cyan-600 text-black font-mono text-[10px] px-2 py-0.5 clip-banner font-bold tracking-widest">
                        ARMOR_SHIELD_OMEGA
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* STEP 4: REVEAL TRANSFORMX REVEAL & SEQUENTIAL TAGLINE */}
          {step >= 3 && (
            <motion.div
              className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-5xl"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Top Tactical Label */}
              <motion.div
                className="flex items-center gap-2 px-4 py-1 mb-4 bg-slate-900/90 border border-cyan-500/40 clip-chamfer font-mono text-xs tracking-widest text-cyan-400"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="w-6 h-[1px] bg-[#00A3FF]/50" />
                <span>INNOVATION BATTLEGROUND // 2026</span>
                <span className="w-6 h-[1px] bg-[#00A3FF]/50" />
              </motion.div>

              {/* MAIN TITLE: TRANSFORMX (Mechanical Glitch / Assembly) */}
              <div className="relative my-2">

                {/* GLOWING ROBOTIC EYES (BACKGROUND BOSS) */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[400px] pointer-events-none z-[-1] flex items-center justify-between px-4 sm:px-12 md:px-24 lg:px-32"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  {/* Subtle mechanical background / silhouette - Removed to keep focus on just the eyes disappearing */}

                  {/* Left Eye */}
                  <motion.div
                    className="relative w-48 sm:w-64 md:w-80 lg:w-[400px] h-24 sm:h-32 md:h-48"
                    initial={{ filter: "drop-shadow(0 0 0px rgba(0,240,255,0))", opacity: 0 }}
                    animate={{
                      opacity: [0, 0.4, 0, 0.5, 0.5, 0],
                      filter: [
                        "drop-shadow(0 0 0px rgba(0,240,255,0))",
                        "drop-shadow(0 0 15px rgba(0,240,255,0.4))",
                        "drop-shadow(0 0 0px rgba(0,240,255,0))",
                        "drop-shadow(0 0 25px rgba(0,240,255,0.6))",
                        "drop-shadow(0 0 15px rgba(0,240,255,0.4))",
                        "drop-shadow(0 0 0px rgba(0,240,255,0))"
                      ]
                    }}
                    transition={{ delay: 1.0, duration: 4.5, times: [0, 0.3, 0.4, 0.45, 0.8, 1], ease: "easeInOut" }}
                  >
                    <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                      <defs>
                        <linearGradient id="eyeGlowLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#e0ffff" />
                          <stop offset="50%" stopColor="#80e5ff" />
                          <stop offset="100%" stopColor="#00bfff" />
                        </linearGradient>
                      </defs>
                      {/* Inner Glowing Optics (Reference Image Shape) */}
                      <path
                        d="M 20 30 L 120 30 Q 160 50 190 100 Q 100 100 20 80 Z"
                        fill="url(#eyeGlowLeft)"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </motion.div>

                  {/* Right Eye */}
                  <motion.div
                    className="relative w-48 sm:w-64 md:w-80 lg:w-[400px] h-24 sm:h-32 md:h-48"
                    initial={{ filter: "drop-shadow(0 0 0px rgba(0,240,255,0))", opacity: 0 }}
                    animate={{
                      opacity: [0, 0.4, 0, 0.5, 0.5, 0],
                      filter: [
                        "drop-shadow(0 0 0px rgba(0,240,255,0))",
                        "drop-shadow(0 0 15px rgba(0,240,255,0.4))",
                        "drop-shadow(0 0 0px rgba(0,240,255,0))",
                        "drop-shadow(0 0 25px rgba(0,240,255,0.6))",
                        "drop-shadow(0 0 15px rgba(0,240,255,0.4))",
                        "drop-shadow(0 0 0px rgba(0,240,255,0))"
                      ]
                    }}
                    transition={{ delay: 1.05, duration: 4.5, times: [0, 0.3, 0.4, 0.45, 0.8, 1], ease: "easeInOut" }}
                  >
                    <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                      <defs>
                        <linearGradient id="eyeGlowRight" x1="100%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#e0ffff" />
                          <stop offset="50%" stopColor="#80e5ff" />
                          <stop offset="100%" stopColor="#00bfff" />
                        </linearGradient>
                      </defs>
                      {/* Inner Glowing Optics (Reference Image Shape Mirrored) */}
                      <path
                        d="M 180 30 L 80 30 Q 40 50 10 100 Q 100 100 180 80 Z"
                        fill="url(#eyeGlowRight)"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
                <h1 className="text-3xl min-[400px]:text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.7)] select-none whitespace-nowrap">
                  TRANSFORM<span className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-700 drop-shadow-[0_0_35px_rgba(239,68,68,0.9)]">X</span>
                </h1>

                {/* Glowing HUD Target Brackets around Title */}
                <div className="absolute -top-4 -left-6 w-8 h-8 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute -top-4 -right-6 w-8 h-8 border-t-2 border-r-2 border-red-500" />
                <div className="absolute -bottom-4 -left-6 w-8 h-8 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute -bottom-4 -right-6 w-8 h-8 border-b-2 border-r-2 border-red-500" />
              </div>

              {/* SEQUENTIAL LIGHTING TAGLINE */}
              {/* TRANSFORM -> BUILD -> DEPLOY THE FUTURE */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-sm sm:text-xl font-bold tracking-widest">
                {/* Word 1: TRANSFORM */}
                <div
                  className={`px-4 py-1.5 border clip-chamfer transition-all duration-300 ${activeTaglineWord >= 1
                    ? 'bg-red-600/30 border-red-500 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                    : 'bg-slate-900/40 border-slate-700 text-slate-500'
                    }`}
                >
                  TRANSFORM
                </div>

                <span className="text-cyan-500 text-lg">➔</span>

                {/* Word 2: BUILD */}
                <div
                  className={`px-4 py-1.5 border clip-chamfer transition-all duration-300 ${activeTaglineWord >= 2
                    ? 'bg-blue-600/30 border-blue-500 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                    : 'bg-slate-900/40 border-slate-700 text-slate-500'
                    }`}
                >
                  BUILD
                </div>

                <span className="text-cyan-500 text-lg">➔</span>

                {/* Word 3: DEPLOY THE FUTURE */}
                <div
                  className={`px-4 py-1.5 border clip-chamfer transition-all duration-300 ${activeTaglineWord >= 3
                    ? 'bg-cyan-600/30 border-cyan-400 text-cyan-200 shadow-[0_0_25px_rgba(0,240,255,0.7)]'
                    : 'bg-slate-900/40 border-slate-700 text-slate-500'
                    }`}
                >
                  DEPLOY THE FUTURE
                </div>
              </div>

              {/* Tactical Bottom Telemetry Bar */}
              <motion.div
                className="mt-8 flex flex-wrap justify-center items-center gap-2 sm:gap-6 text-slate-400 font-mono text-[10px] sm:text-xs tracking-wider px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <span className="text-cyan-400">[CORE_STATUS: OPERATIONAL]</span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span className="text-red-400">[WARP_DRIVE: SYNCHRONIZED]</span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span className="text-emerald-400">[COMMAND_READY]</span>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};
