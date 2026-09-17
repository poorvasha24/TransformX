import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  playIntroPanels,
  playIntroReveal,
  playUiBeep,
  playClick,
  setSoundEnabled,
  getSoundEnabled,
  startBackgroundMusic
} from '../utils/audio';
import { Volume2, VolumeX, FastForward } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  // step 0: Command Portal (Start Mission button)
  // step 1: Video playing
  // step 2: Panels sliding apart
  // step 3: Title and taglines reveal
  const [step, setStep] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(!getSoundEnabled());
  const [activeTaglineWord, setActiveTaglineWord] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isMuted;
    setIsMuted(nextState);
    setSoundEnabled(!nextState, false); // Don't start bg music here, wait for video
    if (videoRef.current) {
      videoRef.current.muted = nextState;
    }
  };

  const handleSkip = () => {
    playUiBeep(1200);
    startBackgroundMusic();
    onComplete();
  };

  const handleStart = () => {
    setSoundEnabled(!isMuted, false); // Initialize audio context, but don't start bg music
    setHasStarted(true);
    setStep(1);
    playClick();
  };

  const handleVideoEnded = () => {
    startBackgroundMusic(); // Start background music after video ends
    setStep(2);
    playIntroPanels();

    setTimeout(() => {
      setStep(3);
      playIntroReveal();
    }, 1200);

    setTimeout(() => { setActiveTaglineWord(1); playUiBeep(880); }, 1800);
    setTimeout(() => { setActiveTaglineWord(2); playUiBeep(1100); }, 2400);
    setTimeout(() => { setActiveTaglineWord(3); playUiBeep(1320); }, 3000);

    setTimeout(() => {
      onComplete();
    }, 6500);
  };

  useEffect(() => {
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
  }, [hasStarted]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#03060c] flex items-center justify-center overflow-hidden select-none font-orbitron">
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-50 pointer-events-auto">
        <div className="flex items-center gap-2 sm:gap-3 bg-black/60 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 border border-cyan-500/40 clip-chamfer">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="font-mono text-[10px] sm:text-xs tracking-wider sm:tracking-widest text-cyan-400">
            <span className="hidden sm:inline">SYSTEM_INITIALIZATION // </span>PROTOCOL_07
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
            className="flex items-center gap-1.5 sm:gap-2 bg-[#0c1527] hover:bg-[#1a2b4c] text-cyan-400 px-2.5 sm:px-4 py-1.5 sm:py-2 border border-cyan-500/40 clip-chamfer transition-all duration-200 text-[10.5px] sm:text-xs font-mono tracking-wider cursor-pointer pointer-events-auto"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
                <span className="hidden sm:inline">AUDIO: MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-pulse" />
                <span className="hidden sm:inline">AUDIO: ACTIVE</span>
              </>
            )}
          </button>

          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 sm:gap-2 bg-red-950/80 hover:bg-red-900 text-red-300 hover:text-white px-3 sm:px-4 py-1.5 sm:py-2 border border-red-500/60 clip-chamfer transition-all duration-200 text-[10.5px] sm:text-xs font-mono tracking-wider cursor-pointer pointer-events-auto group whitespace-nowrap"
          >
            <span>SKIP<span className="hidden sm:inline"> SEQUENCE [ESC]</span></span>
            <FastForward className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {!hasStarted ? (
        <div className="relative z-50 flex flex-col items-center px-4 text-center">
          <h1 className="font-black text-3xl sm:text-6xl md:text-7xl mb-6 sm:mb-8 tracking-wider sm:tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] uppercase">
            COMMAND PORTAL
          </h1>
          <button
            onClick={handleStart}
            className="px-8 sm:px-12 py-3.5 sm:py-4 bg-[#cc0000] hover:bg-red-500 text-white font-orbitron font-bold tracking-[0.2em] clip-chamfer text-base sm:text-xl transition-all hover:scale-105 shadow-[0_0_20px_#cc0000] hover:shadow-[0_0_40px_#ff0000] cursor-pointer pointer-events-auto"
          >
            START MISSION
          </button>
        </div>
      ) : (
        <>
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black z-40 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
              >
                {/* Mobile Top Animated Text */}
                <motion.div
                  className="sm:hidden absolute top-24 left-0 right-0 flex justify-center z-50 pointer-events-none"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <h2 className="font-orbitron font-black text-3xl tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00A3FF] drop-shadow-[0_0_15px_rgba(0,163,255,0.8)] animate-pulse">
                    TRANSFORMX
                  </h2>
                </motion.div>

                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted={isMuted}
                  onEnded={handleVideoEnded}
                  className="w-full h-full object-contain sm:object-cover"
                  src="/videos/intro.mp4"
                />

                {/* Mobile Bottom Animated Quote */}
                <motion.div
                  className="sm:hidden absolute bottom-24 left-4 right-4 flex justify-center z-50 pointer-events-none text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#00A3FF]/10 blur-md rounded-full animate-pulse" />
                    <p className="relative font-mono text-[10px] xs:text-xs tracking-[0.2em] text-[#00A3FF] drop-shadow-[0_0_8px_rgba(0,163,255,0.8)] border-t border-b border-[#00A3FF]/40 py-2">
                      "TRANSFORM. BUILD. DEPLOY THE FUTURE."
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 2 && step <= 3 && (
              <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#0a1120] via-[#0f172a] to-[#1e293b] border-b-4 border-cyan-400 shadow-[0_10px_30px_rgba(0,240,255,0.4)] flex flex-col justify-end p-6"
                  initial={{ y: '0%' }}
                  animate={{ y: '-105%' }}
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
                  <div className="w-full flex justify-between px-8 text-cyan-500/20 font-mono text-[9px] opacity-10">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full border border-cyan-400/50 bg-slate-800" />
                        <span>LOK_{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0a1120] via-[#0f172a] to-[#1e293b] border-t-4 border-red-500 shadow-[0_-10px_30px_rgba(239,68,68,0.4)] flex flex-col justify-start p-6"
                  initial={{ y: '0%' }}
                  animate={{ y: '105%' }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                >
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

          {step >= 3 && (
            <motion.div
              className="relative z-20 flex flex-col items-center justify-center text-center px-3 sm:px-6 w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                className="flex items-center gap-2 px-2.5 sm:px-4 py-1 mb-3 sm:mb-4 bg-slate-900/90 border border-cyan-500/40 clip-chamfer font-mono text-[9px] sm:text-xs tracking-wider sm:tracking-widest text-cyan-400"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="w-3 sm:w-6 h-[1px] bg-[#00A3FF]/50" />
                <span>INNOVATION BATTLEGROUND // 2026</span>
                <span className="w-3 sm:w-6 h-[1px] bg-[#00A3FF]/50" />
              </motion.div>

              <div className="relative my-2">
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[300px] sm:h-[400px] pointer-events-none z-[-1] flex items-center justify-between px-2 sm:px-12 md:px-24 lg:px-32"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <motion.div
                    className="relative w-28 xs:w-36 sm:w-64 md:w-80 lg:w-[400px] h-14 xs:h-20 sm:h-32 md:h-48"
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
                      <path
                        d="M 20 30 L 120 30 Q 160 50 190 100 Q 100 100 20 80 Z"
                        fill="url(#eyeGlowLeft)"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </motion.div>
                  <motion.div
                    className="relative w-28 xs:w-36 sm:w-64 md:w-80 lg:w-[400px] h-14 xs:h-20 sm:h-32 md:h-48"
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
                      <path
                        d="M 180 30 L 80 30 Q 40 50 10 100 Q 100 100 180 80 Z"
                        fill="url(#eyeGlowRight)"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
                <h1 className="intro-title-responsive font-black tracking-normal sm:tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 drop-shadow-[0_0_20px_rgba(0,240,255,0.7)] sm:drop-shadow-[0_0_35px_rgba(0,240,255,0.7)] select-none whitespace-nowrap">
                  TRANSFORM<span className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-700 drop-shadow-[0_0_20px_rgba(239,68,68,0.9)] sm:drop-shadow-[0_0_35px_rgba(239,68,68,0.9)]">X</span>
                </h1>
                <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-6 w-4 sm:w-8 h-4 sm:h-8 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-6 w-4 sm:w-8 h-4 sm:h-8 border-t-2 border-r-2 border-red-500" />
                <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-6 w-4 sm:w-8 h-4 sm:h-8 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-6 w-4 sm:w-8 h-4 sm:h-8 border-b-2 border-r-2 border-red-500" />
              </div>

              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 md:gap-6 font-mono text-[10px] sm:text-lg md:text-xl font-bold tracking-wider sm:tracking-widest">
                <div
                  className={`px-2 sm:px-4 py-1 sm:py-1.5 border clip-chamfer transition-all duration-300 ${activeTaglineWord >= 1
                    ? 'bg-red-600/30 border-red-500 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                    : 'bg-slate-900/40 border-slate-700 text-slate-500'
                    }`}
                >
                  TRANSFORM
                </div>
                <span className="text-cyan-500 text-xs sm:text-lg">➔</span>
                <div
                  className={`px-2 sm:px-4 py-1 sm:py-1.5 border clip-chamfer transition-all duration-300 ${activeTaglineWord >= 2
                    ? 'bg-blue-600/30 border-blue-500 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                    : 'bg-slate-900/40 border-slate-700 text-slate-500'
                    }`}
                >
                  BUILD
                </div>
                <span className="text-cyan-500 text-xs sm:text-lg">➔</span>
                <div
                  className={`px-2 sm:px-4 py-1 sm:py-1.5 border clip-chamfer transition-all duration-300 ${activeTaglineWord >= 3
                    ? 'bg-cyan-600/30 border-cyan-400 text-cyan-200 shadow-[0_0_25px_rgba(0,240,255,0.7)]'
                    : 'bg-slate-900/40 border-slate-700 text-slate-500'
                    }`}
                >
                  DEPLOY THE FUTURE
                </div>
              </div>

              <motion.div
                className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-slate-400 font-mono text-[9.5px] sm:text-xs tracking-wider px-2"
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
