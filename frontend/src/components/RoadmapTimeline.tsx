import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';
import { Calendar, Clock, Flame } from 'lucide-react';
import { ROADMAP_MILESTONES } from '../data/eventData';
import { playHover, playRoadmapActivate } from '../utils/audio';
import { RobotGuardian } from './RobotGuardian';

const CheckpointNode = ({ isFinal, progress, activationThreshold }: { isFinal?: boolean, progress: any, activationThreshold: number }) => {
  // Activate when scroll progress passes the threshold
  const startOffset = Math.max(0, activationThreshold - 0.05);
  const endOffset = Math.max(startOffset + 0.01, activationThreshold);
  const scale = useTransform(progress, [startOffset, endOffset], [0.5, 1]);
  const opacity = useTransform(progress, [startOffset, endOffset], [0.2, 1]);

  return (
    <motion.div
      style={{ scale, opacity }}
      animate={{ y: [-5, 5, -5] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className="absolute left-1/2 -translate-x-1/2 -translate-y-full w-20 h-24 z-10 flex items-center justify-center pointer-events-none"
    >
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,163,255,0.6)]">
        <defs>
          <linearGradient id="pinGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00A3FF" />
            <stop offset="100%" stopColor="#cc0000" />
          </linearGradient>
          <linearGradient id="pinGradientFinal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff4500" />
            <stop offset="100%" stopColor="#cc0000" />
          </linearGradient>
        </defs>

        {isFinal ? (
          <g>
            <path d="M50 110 L30 60 C15 30 25 5 50 5 C75 5 85 30 70 60 Z" fill="#05070a" stroke="url(#pinGradientFinal)" strokeWidth="3" />
            <circle cx="50" cy="35" r="12" fill="url(#pinGradientFinal)" />
            <ellipse cx="50" cy="115" rx="20" ry="5" fill="none" stroke="url(#pinGradientFinal)" strokeWidth="2" opacity="0.6" />
          </g>
        ) : (
          <g>
            <path d="M50 110 L35 70 C20 40 30 15 50 15 C70 15 80 40 65 70 Z" fill="#05070a" stroke="url(#pinGradient)" strokeWidth="2" />
            <circle cx="50" cy="40" r="8" fill="url(#pinGradient)" />
            <ellipse cx="50" cy="115" rx="15" ry="4" fill="none" stroke="url(#pinGradient)" strokeWidth="1.5" opacity="0.6" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};

const RoadmapTitle = () => {
  return (
    <div className="relative w-full max-w-4xl z-50 flex flex-col items-center pointer-events-none mx-auto">
      {/* Small Cybertronian Interface Lines */}
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-16 h-px bg-[#00A3FF] origin-right"
        />
        <div className="w-1 h-1 bg-[#cc0000] rounded-full animate-pulse" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-16 h-px bg-[#00A3FF] origin-left"
        />
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="font-mono text-xs text-[#00A3FF] tracking-[0.3em] mb-4 text-center"
      >
        TRANSMISSION RECEIVED // TRACK THE PATH TO QUANTUM ARENA
      </motion.p>

      {/* Main Title Container */}
      <div className="relative overflow-hidden group">
        {/* Blue Scanning Line */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 100, opacity: [0, 1, 0] }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1.5, ease: "linear" }}
          className="absolute left-0 w-full h-0.5 bg-[#00A3FF] shadow-[0_0_15px_#00A3FF] z-10"
        />

        <motion.h2
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
          className="font-orbitron font-bold text-4xl md:text-5xl text-white text-center tracking-widest relative"
        >
          PRIME <span className="text-gray-300">MISSION</span> PROTOCOL
        </motion.h2>

        {/* Subtle Blue Energy Pulse through title */}
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: "200%" }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 2, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#00A3FF]/20 to-transparent skew-x-12 mix-blend-screen pointer-events-none"
        />
      </div>

      {/* Red Accent beneath PROTOCOL */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="w-32 h-1 bg-gradient-to-r from-transparent via-[#cc0000] to-transparent mt-2"
      />
    </div>
  );
};

export const RoadmapTimeline: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress for drawing the path energy
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // State to track the current active checkpoint based on scroll progress
  const [activeIndex, setActiveIndex] = useState(0);

  // Update activeIndex based on the glowing line progress.
  // There are 5 segments, so checkpoints are exactly at p = 0, 0.2, 0.4, 0.6, 0.8, 1.0.
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    // Checkpoints are at 0, 0.2, 0.4, 0.6, 0.8, 1.0.
    // Brighten a little bit BEFORE the robot arrives (when latest is within 0.1 of the checkpoint)
    const index = Math.min(5, Math.floor((latest + 0.05) / 0.2));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // Map 4 milestones to fixed percentage heights (y-axis of the map).
  // Total 3 segments, so gaps are 30%.
  const checkpointPositions = [2.5, 32.5, 62.5, 92.5];

  return (
    <div id="roadmap" className="flex flex-col w-full bg-[#05070a] scroll-mt-24 pt-12">
      {/* Title Section placed in standard document flow to prevent overlap */}
      <section className="bg-[#05070a] pt-12 pb-48 flex justify-center border-t border-[#1e293b]">
        <RoadmapTitle />
      </section>

      {/* 450vh Scrollable Map Container - Ensures all checkpoints fit comfortably while being shorter */}
      <section
        ref={containerRef}
        style={{ height: '450vh' }}
        className="relative w-full bg-[#05070a] border-b border-[#1e293b] pb-32"
      >

        {/* Background Environment Layers (Fixed while scrolling through the map) */}
        <div className="sticky top-0 left-0 w-full h-screen pointer-events-none z-0">
          <div className="absolute inset-0 bg-sophisticated-radial opacity-20" />
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-red-950/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-cyber-grid opacity-10" />
        </div>

        {/* CONTINUOUS SVG PATH (The Track) */}
        {/* We use a very tall SVG that aligns perfectly with the container's height */}
        <div
          ref={trackContainerRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-[800px] h-full pointer-events-none z-0"
        >

          {/* THE ABSOLUTE POSITIONED ROBOT (Traces the path and scrolls down) */}
          <RobotGuardian scrollProgress={smoothProgress} trackRef={trackContainerRef} />

          <svg
            viewBox="0 0 1000 6000"
            preserveAspectRatio="none"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(0,163,255,0.3)]"
          >
            {/* --- ENVIRONMENT LAYER --- */}
            {/* Cybertronian Structures & Terrain */}
            <path d="M 50,400 L 250,500 L 150,700 Z" fill="#080c16" stroke="#1e293b" strokeWidth="2" opacity="0.6" />
            <path d="M 800,1000 L 950,900 L 900,1200 Z" fill="#080c16" stroke="#1e293b" strokeWidth="2" opacity="0.6" />
            <path d="M 50,1800 L 300,1900 L 200,2100 Z" fill="#080c16" stroke="#1e293b" strokeWidth="2" opacity="0.6" />
            <path d="M 700,2800 L 950,2900 L 850,3200 Z" fill="#080c16" stroke="#1e293b" strokeWidth="2" opacity="0.6" />
            <path d="M 50,4000 L 300,3900 L 200,4300 Z" fill="#080c16" stroke="#1e293b" strokeWidth="2" opacity="0.6" />
            <path d="M 750,5000 L 950,4900 L 900,5200 Z" fill="#080c16" stroke="#1e293b" strokeWidth="2" opacity="0.6" />

            {/* Glowing Energy Fissures */}
            <path d="M 150,500 Q 250,650 150,750" fill="none" stroke="#00A3FF" strokeWidth="4" opacity="0.3" filter="url(#pathEnergyBlur)" />
            <path d="M 850,1100 Q 800,1150 900,1250" fill="none" stroke="#00A3FF" strokeWidth="4" opacity="0.3" filter="url(#pathEnergyBlur)" />
            <path d="M 150,2000 Q 250,2050 150,2150" fill="none" stroke="#00A3FF" strokeWidth="4" opacity="0.3" filter="url(#pathEnergyBlur)" />
            <path d="M 850,3000 Q 800,3050 900,3150" fill="none" stroke="#00A3FF" strokeWidth="4" opacity="0.3" filter="url(#pathEnergyBlur)" />
            <path d="M 150,4100 Q 250,4150 150,4250" fill="none" stroke="#00A3FF" strokeWidth="4" opacity="0.3" filter="url(#pathEnergyBlur)" />
            <path d="M 850,5100 Q 800,5150 900,5250" fill="none" stroke="#cc0000" strokeWidth="4" opacity="0.3" filter="url(#pathEnergyBlur)" />
            {/* Background Track Structure - Intersects X=500 exactly at all 4 checkpoints */}
            <path
              d="M 500,150 
               C 200,750 200,1350 500,1950 
               C 800,2550 800,3150 500,3750 
               C 200,4350 200,4950 500,5550"
              fill="none"
              stroke="#1e293b"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <path
              d="M 500,150 
               C 200,750 200,1350 500,1950 
               C 800,2550 800,3150 500,3750 
               C 200,4350 200,4950 500,5550"
              fill="none"
              stroke="#0a0f1d"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Glowing Energy Core of the Track (Draws based on scroll) */}
            <motion.path
              d="M 500,150 
               C 200,750 200,1350 500,1950 
               C 800,2550 800,3150 500,3750 
               C 200,4350 200,4950 500,5550"
              fill="none"
              stroke="url(#pathEnergy)"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ pathLength: smoothProgress }}
            />
            <defs>
              <linearGradient id="pathEnergy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00A3FF" />
                <stop offset="25%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#00A3FF" />
                <stop offset="75%" stopColor="#cc0000" />
                <stop offset="100%" stopColor="#ff4500" />
              </linearGradient>
              <filter id="pathEnergyBlur">
                <feGaussianBlur stdDeviation="15" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="finalGlow">
                <feGaussianBlur stdDeviation="30" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* FINAL DESTINATION VISUAL: QUANTUM ARENA (Y=5550) */}
            <motion.g
              style={{ opacity: useTransform(smoothProgress, [0.9, 1], [0, 1]) }}
              className="transition-opacity duration-1000"
            >
              {/* Massive Ground Glow */}
              <ellipse cx="500" cy="5550" rx="300" ry="80" fill="#cc0000" opacity="0.15" filter="url(#finalGlow)" />
              <ellipse cx="500" cy="5550" rx="150" ry="40" fill="#ff4500" opacity="0.3" filter="url(#finalGlow)" />

              {/* The Arena Portal */}
              <circle cx="500" cy="5550" r="40" fill="#05070a" stroke="#ff4500" strokeWidth="8" filter="url(#pathEnergyBlur)" />
              <circle cx="500" cy="5550" r="20" fill="#cc0000" />
              <circle cx="500" cy="5550" r="10" fill="#fff" filter="url(#pathEnergyBlur)" />

              {/* Energetic Rings */}
              <ellipse cx="500" cy="5550" rx="120" ry="30" fill="none" stroke="#00A3FF" strokeWidth="4" opacity="0.4" strokeDasharray="20 10" />
              <ellipse cx="500" cy="5550" rx="200" ry="50" fill="none" stroke="#cc0000" strokeWidth="2" opacity="0.2" strokeDasharray="30 15" />
            </motion.g>
          </svg>
        </div>

        {/* CHECKPOINTS AND MISSION CARDS */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none z-10">
          {ROADMAP_MILESTONES.map((milestone, idx) => {
            const isEven = idx % 2 === 0;
            const topPercent = checkpointPositions[idx];
            // We convert top percentage to a rough scroll threshold (0 to 1)
            const activationThreshold = (topPercent / 100) - 0.15; // Trigger entry fade-in slightly before reaching it

            // Determine active state based on activeIndex
            const state = idx > activeIndex ? 'INACTIVE' : idx === activeIndex ? 'ACTIVE' : 'COMPLETED';

            return (
              <div key={milestone.phaseId} className="absolute w-full flex items-center justify-center pointer-events-auto" style={{ top: `${topPercent}%` }}>
                {/* The Node on the Path */}
                <CheckpointNode isFinal={milestone.isFinal} progress={scrollYProgress} activationThreshold={activationThreshold} />

                {/* Mission Card connected to the node */}
                <div className={`absolute top-1/2 -translate-y-1/2 mt-20 md:mt-0 ${milestone.isFinal ? 'md:left-[55%]' : isEven ? 'md:left-[55%]' : 'md:right-[55%]'} left-1/2 -translate-x-1/2 md:translate-x-0 w-[85vw] md:w-[40vw] max-w-[320px] md:max-w-[500px] z-50`}>
                  <motion.div
                    initial={{ opacity: 0, x: (milestone.isFinal || isEven) ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    onMouseEnter={() => playHover()}
                    onClick={() => playRoadmapActivate()}
                    className={`backdrop-blur-xl border-2 cursor-pointer p-6 clip-chamfer transition-all duration-700 group hover:-translate-y-1 ${state === 'INACTIVE'
                        ? 'bg-[#0a1128]/60 border-[#1e293b] shadow-none opacity-90'
                        : state === 'ACTIVE'
                          ? milestone.isFinal
                            ? 'bg-gradient-to-br from-red-950/90 to-[#0a0202] border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.6)] scale-105'
                            : 'bg-gradient-to-br from-[#0a1128]/90 to-[#05070a] border-[#00A3FF] shadow-[0_0_35px_rgba(0,163,255,0.5)] scale-105'
                          : // COMPLETED
                          milestone.isFinal
                            ? 'bg-red-950/60 border-red-800 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                            : 'bg-[#0a1128]/70 border-[#00A3FF]/40 shadow-[0_0_15px_rgba(0,163,255,0.2)]'
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-3">
                      <span className={`font-mono text-xs font-bold px-2.5 py-0.5 clip-banner transition-colors duration-500 ${state === 'ACTIVE'
                          ? milestone.isFinal ? 'bg-[#cc0000] text-white shadow-[0_0_10px_#cc0000]' : 'bg-[#00A3FF] text-[#05070a] shadow-[0_0_10px_#00A3FF]'
                          : 'bg-gray-900 text-gray-500 border border-gray-800'
                        }`}>
                        {milestone.phaseCode}
                      </span>
                      {milestone.status && (
                        <span className={`font-mono text-[9px] px-2 py-0.5 border transition-colors duration-500 ${state === 'ACTIVE'
                            ? 'text-amber-400 bg-amber-950/40 border-amber-500/50'
                            : 'text-gray-600 bg-gray-900/40 border-gray-800'
                          }`}>
                          [{milestone.status}]
                        </span>
                      )}
                    </div>

                    <h3 className={`font-orbitron font-bold text-base md:text-xl mb-2 transition-colors duration-500 ${state === 'ACTIVE'
                        ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                        : state === 'COMPLETED' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      {milestone.title}
                    </h3>
                    <p className={`font-mono text-xs sm:text-sm mb-4 leading-relaxed transition-colors duration-500 ${state === 'ACTIVE' ? 'text-blue-100' : state === 'COMPLETED' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                      {milestone.description}
                    </p>

                    <div className={`flex flex-wrap items-center gap-4 border-t pt-4 transition-colors duration-500 ${state === 'ACTIVE' ? 'border-[#3b82f6]/40' : 'border-gray-800'
                      }`}>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border font-mono text-xs transition-all duration-500 ${state === 'ACTIVE'
                          ? milestone.isFinal ? 'bg-red-950/50 border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)] text-red-200' : 'bg-[#0a1128]/80 border-[#00A3FF]/50 shadow-[0_0_10px_rgba(0,163,255,0.2)] text-[#e0f2fe]'
                          : 'bg-gray-900/50 border-gray-800 text-gray-500'
                        }`}>
                        <Calendar className={`w-3.5 h-3.5 ${state === 'ACTIVE' ? (milestone.isFinal ? 'text-red-400' : 'text-[#00A3FF]') : 'text-gray-600'}`} />
                        <span>{milestone.date}</span>
                      </div>
                      {milestone.time && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border font-mono text-xs transition-all duration-500 ${state === 'ACTIVE'
                            ? 'bg-[#0a1128]/80 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)] text-amber-100'
                            : 'bg-gray-900/50 border-gray-800 text-gray-500'
                          }`}>
                          <Clock className={`w-3.5 h-3.5 ${state === 'ACTIVE' ? 'text-amber-400' : 'text-gray-600'}`} />
                          <span>{milestone.time}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Mechanical Connector Line from Card to Node (Desktop Only) */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    style={{
                      transformOrigin: (milestone.isFinal || isEven) ? 'left' : 'right'
                    }}
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${(milestone.isFinal || isEven) ? 'right-[100%] w-12' : 'left-[100%] w-12'} h-0.5 transition-colors duration-500 ${state === 'ACTIVE' ? (milestone.isFinal ? 'bg-red-500' : 'bg-[#00A3FF]') : 'bg-gray-700'
                      }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </section>
    </div>
  );
};
