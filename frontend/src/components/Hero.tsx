import React from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  Cpu,
  ChevronDown,
  Terminal,
  Activity
} from 'lucide-react';
import { playClick, playHover, playRegisterClick } from '../utils/audio';
import { CountdownTimer } from './CountdownTimer';

interface HeroProps {
  onExploreThemes: () => void;
  onInitiateRegister: () => void;
  onViewRoadmap: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreThemes,
  onInitiateRegister,
  onViewRoadmap,
}) => {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center overflow-hidden">
      {/* BACKGROUND SCI-FI MECHANICAL ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* --- LEFT ROBOT (Heroic/Blue-Red) --- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ 
            opacity: 1,
            x: 0,
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { duration: 2, delay: 0.2 },
            x: { duration: 2, ease: "easeOut" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-0 bottom-0 left-[0%] sm:left-[-10%] lg:left-[-15%] w-[45%] sm:w-[70%] lg:w-[45%] opacity-30 sm:opacity-50 lg:opacity-70 mix-blend-screen"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%), linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
            WebkitMaskComposite: 'source-in',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%), linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
            maskComposite: 'intersect'
          }}
        >
          <div className="w-full h-full bg-[url('/images/hero_robot_left.jpg')] bg-[length:250%] bg-[position:40%_15%] bg-no-repeat" />
        </motion.div>

        {/* --- RIGHT ROBOT (Dark/Intimidating) --- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ 
            opacity: 1,
            x: 0,
            y: [0, 12, 0],
          }}
          transition={{
            opacity: { duration: 2, delay: 0.4 },
            x: { duration: 2, ease: "easeOut", delay: 0.2 },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          className="absolute top-0 bottom-0 right-[0%] sm:right-[-10%] lg:right-[-10%] w-[45%] sm:w-[70%] lg:w-[45%] opacity-20 sm:opacity-40 lg:opacity-60 mix-blend-screen"
          style={{
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%), linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
            WebkitMaskComposite: 'source-in',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%), linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
            maskComposite: 'intersect'
          }}
        >
          <div className="w-full h-full bg-[url('/images/hero_robot_right.jpg')] bg-[length:250%] bg-[position:65%_15%] bg-no-repeat -scale-x-100" />
        </motion.div>

        {/* Deep space radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-red-950/15 rounded-full blur-3xl opacity-30" />

        {/* --- SUBTLE ROBOTIC EYES (GUARDIAN IN THE DARK) --- */}
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] pointer-events-none flex justify-center items-center opacity-30">
          <motion.svg
            viewBox="0 0 800 200"
            className="w-full h-full"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { delay: 1, duration: 4 } // Slow build-up
              }
            }}
          >
            {/* Faint Mechanical Silhouette / Socket Outline */}
            <motion.path
              d="M200 80 L350 70 L380 90 L350 110 L220 105 Z M600 80 L450 70 L420 90 L450 110 L580 105 Z"
              fill="none"
              stroke="#1e293b"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 2, duration: 2 }}
            />
            {/* The Optics (Eyes) */}
            <motion.g
              initial={{ opacity: 0, filter: "brightness(0.5) blur(10px)" }}
              animate={{ opacity: [0, 0.2, 0.1, 0.8, 0.5, 1], filter: "brightness(1.5) blur(4px)" }}
              transition={{
                delay: 4, // Wait for silhouette
                duration: 2, // Activation flicker
                ease: "linear",
                opacity: { times: [0, 0.2, 0.3, 0.5, 0.7, 1] } // Flicker keyframes targeted only to opacity
              }}
              onAnimationComplete={() => {
                // We'll use a CSS animation or another motion div for the idle pulse to avoid complex orchestration if possible,
                // but Framer Motion's repeating animation is fine too.
              }}
            >
              {/* Left Eye */}
              <path d="M260 85 L330 78 L345 88 L320 95 Z" fill="#00A3FF" filter="url(#glow)" />
              <path d="M275 85 L320 81 L330 88 L310 92 Z" fill="#E0F2FE" />
              {/* Right Eye */}
              <path d="M540 85 L470 78 L455 88 L480 95 Z" fill="#00A3FF" filter="url(#glow)" />
              <path d="M525 85 L480 81 L470 88 L490 92 Z" fill="#E0F2FE" />
            </motion.g>

            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </motion.svg>

          {/* Subtle Idle Pulsing Overlay (starts after activation) */}
          <motion.div
            className="absolute inset-0 bg-[#00A3FF]/10 blur-[40px] rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.1] }}
            transition={{ delay: 6, duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Animated HUD Coordinate Lines */}
        <div className="absolute top-20 left-12 font-mono text-[9px] text-[#00A3FF]/40 hidden lg:block tracking-widest">
          <p>[LOC: 28.6139° N, 77.2090° E]</p>
          <p>[SYS: MECH_KERNEL_V9.4]</p>
          <p>[POWER_OUTPUT: 1.21 GW]</p>
        </div>

        <div className="absolute top-20 right-12 font-mono text-[9px] text-[#cc0000]/50 hidden lg:block text-right tracking-widest">
          <p>[STATUS: ENERGON_NOMINAL]</p>
          <p>[SHIELD: 100% MAXIMUM]</p>
          <p>[TELEMETRY: BROADCASTING]</p>
        </div>
      </div>

      {/* HERO MAIN CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center flex flex-col items-center">
        {/* MISSION PROTOCOL ACTIVATED Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] font-mono tracking-[0.5em] text-[#00A3FF] mb-4 flex items-center justify-center gap-3 sm:gap-4 uppercase"
        >
          <span className="w-8 sm:w-12 h-[1px] bg-[#00A3FF]/40" />
          <span>MISSION PROTOCOL ACTIVATED</span>
          <span className="w-8 sm:w-12 h-[1px] bg-[#00A3FF]/40" />
        </motion.div>

        {/* MASSIVE TITULAR WORDMARK: TRANSFORMX */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative my-2 select-none"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 blur-3xl bg-[#00A3FF]/10 pointer-events-none" />

          <h1 className="font-orbitron font-black text-3xl min-[400px]:text-4xl sm:text-7xl md:text-9xl lg:text-[110px] leading-none tracking-tight sm:tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-[#4a4a4f] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            TRANSFORMX
          </h1>
        </motion.div>

        {/* SUBTITLE: TRANSFORM. BUILD. DEPLOY THE FUTURE. */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-2 text-xs min-[400px]:text-sm sm:text-lg md:text-xl font-bold tracking-[0.25em] sm:tracking-[0.4em] text-[#cc0000] uppercase font-mono text-center"
        >
          TRANSFORM. BUILD. DEPLOY THE FUTURE.
        </motion.div>

        {/* SHORT DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-4 max-w-2xl text-slate-400 font-normal text-sm sm:text-base leading-relaxed font-sans"
        >
          A premier engineering hackathon where ideas transform into intelligent solutions.
          Architect real-world solutions across 7 innovation domains.
        </motion.p>

        {/* FUTURISTIC COUNTDOWN TIMER COMPONENT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-full mt-8"
        >
          <CountdownTimer />
        </motion.div>

        {/* CTA BUTTONS GROUP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          {/* Primary CTA: INITIATE REGISTRATION (Parallelogram Clip Path) */}
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-[#cc0000] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <button
              onClick={() => {
                playRegisterClick();
                onInitiateRegister();
              }}
              onMouseEnter={playHover}
              className="relative px-8 sm:px-12 py-4 sm:py-5 bg-[#cc0000] hover:bg-[#b00000] text-white font-black tracking-[0.2em] uppercase text-sm sm:text-base border-2 border-white/20 transition-all cursor-pointer flex items-center justify-center gap-3 clip-parallelogram"
            >
              <Zap className="w-4 h-4 text-white animate-pulse" />
              <span>INITIATE REGISTRATION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent" />
          </div>

          {/* Secondary CTA: SEVEN DOMAINS */}
          <button
            onClick={() => {
              playClick();
              onExploreThemes();
            }}
            onMouseEnter={playHover}
            className="px-6 py-4 bg-[#0a0f1d] hover:bg-[#121a30] text-slate-300 hover:text-[#00A3FF] font-mono font-bold text-xs uppercase tracking-[0.2em] border border-[#1e293b] hover:border-[#00A3FF]/50 transition-all cursor-pointer flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-[#00A3FF]" />
            <span>SEVEN DOMAINS</span>
          </button>

          {/* Tertiary CTA: MISSION ROADMAP */}
          <button
            onClick={() => {
              playClick();
              onViewRoadmap();
            }}
            onMouseEnter={playHover}
            className="px-6 py-4 bg-[#0a0f1d] hover:bg-[#121a30] text-slate-400 hover:text-white font-mono font-bold text-xs uppercase tracking-[0.2em] border border-[#1e293b] hover:border-slate-600 transition-all cursor-pointer flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-slate-500" />
            <span>TIMELINE</span>
          </button>
        </motion.div>
      </div>

      {/* Downward Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => {
          playClick();
          onExploreThemes();
        }}
        className="mt-12 flex flex-col items-center gap-1 text-gray-500 hover:text-[#00A3FF] font-mono text-[10px] tracking-[0.3em] cursor-pointer transition-colors uppercase"
      >
        <span>SCROLL TO EXPLORE COMMAND DECK</span>
        <ChevronDown className="w-4 h-4 text-[#00A3FF]" />
      </motion.div>
    </section>
  );
};
