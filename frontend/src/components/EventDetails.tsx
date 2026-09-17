import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Coffee, Shield, Zap, Sparkles, AlertCircle, Compass, Radio } from 'lucide-react';
import { playHover, playUiBeep } from '../utils/audio';

export const EventDetails: React.FC = () => {
  return (
    <section id="event" className="relative py-16 sm:py-24 px-4 bg-[#05070a] border-t border-b border-[#1e293b] overflow-hidden">
      {/* Background Cyber Ambient */}
      <div className="absolute inset-0 bg-sophisticated-radial opacity-15 pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-red-950/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="text-[10px] font-mono tracking-[0.4em] text-[#00A3FF] mb-3 flex items-center justify-center gap-3 uppercase">
            <span className="w-8 h-[1px] bg-[#00A3FF]/40" />
            <span>SECTION 01 // MISSION PARAMETERS</span>
            <span className="w-8 h-[1px] bg-[#00A3FF]/40" />
          </div>

          <h2 className="font-orbitron font-black text-3xl sm:text-5xl tracking-wide text-white uppercase">
            EVENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-blue-400">SPECIFICATIONS</span>
          </h2>
          <p className="mt-3 max-w-xl text-gray-400 font-sans text-sm sm:text-base">
            Tactical parameters and logistical provisions engineered for peak builder performance.
          </p>
        </div>

        {/* 4 COMPACT TACTICAL MODULES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* MODULE 1: DATE OF EXECUTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => {
              playHover();
              playUiBeep(500);
            }}
            className="group relative bg-[#060a14] border border-[#1e293b] hover:border-[#00A3FF]/50 p-5 sm:p-6 clip-chamfer transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[220px] h-auto py-6 sm:h-[240px]"
          >
            <div className="absolute top-0 right-0">
              <div className="bg-[#05070a] border-b border-l border-[#00A3FF]/40 px-3 py-1 font-mono text-[9px] text-[#00A3FF] tracking-widest uppercase">
                CHRONO_SYNC
              </div>
            </div>
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#00A3FF]/40 group-hover:border-[#00A3FF] transition-colors" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#00A3FF]/40 group-hover:border-[#00A3FF] transition-colors" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#00A3FF]/40 group-hover:border-[#00A3FF] transition-colors" />

            <div className="w-16 h-16 rounded-full border border-[#00A3FF]/60 flex items-center justify-center mb-4 text-[#00A3FF] group-hover:scale-110 group-hover:bg-[#00A3FF]/10 group-hover:shadow-[0_0_15px_rgba(0,163,255,0.4)] transition-all relative">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white tracking-widest uppercase mb-2">
              DATE OF EXECUTION
            </h3>
            <p className="font-sans text-sm sm:text-base text-gray-300 mt-2 font-medium">
              September 25th, 2026
            </p>
          </motion.div>

          {/* MODULE 2: DURATION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onMouseEnter={() => {
              playHover();
              playUiBeep(700);
            }}
            className="group relative bg-[#060a14] border border-[#1e293b] hover:border-[#cc0000]/50 p-5 sm:p-6 clip-chamfer transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[220px] h-auto py-6 sm:h-[240px]"
          >
            <div className="absolute top-0 right-0">
              <div className="bg-[#05070a] border-b border-l border-[#cc0000]/40 px-3 py-1 font-mono text-[9px] text-[#cc0000] tracking-widest uppercase">
                ENDURANCE_PROTOCOL
              </div>
            </div>
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#cc0000]/40 group-hover:border-[#cc0000] transition-colors" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#cc0000]/40 group-hover:border-[#cc0000] transition-colors" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#cc0000]/40 group-hover:border-[#cc0000] transition-colors" />

            <div className="w-16 h-16 rounded-full border border-[#cc0000]/60 flex items-center justify-center mb-4 text-[#cc0000] group-hover:scale-110 group-hover:bg-[#cc0000]/10 group-hover:shadow-[0_0_15px_rgba(204,0,0,0.4)] transition-all relative">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white tracking-widest uppercase mb-2">
              DURATION
            </h3>
            <p className="font-sans text-sm sm:text-base text-gray-300 mt-2 font-medium">
              8 Hours Non-Stop
            </p>
          </motion.div>

          {/* MODULE 3: VENUE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onMouseEnter={() => {
              playHover();
              playUiBeep(900);
            }}
            className="group relative bg-[#060a14] border border-[#1e293b] hover:border-[#00A3FF]/50 p-5 sm:p-6 clip-chamfer transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[220px] h-auto py-6 sm:h-[240px]"
          >
            <div className="absolute top-0 right-0">
              <div className="bg-[#05070a] border-b border-l border-[#00A3FF]/40 px-3 py-1 font-mono text-[9px] text-[#00A3FF] tracking-widest uppercase">
                COORDINATES
              </div>
            </div>
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#00A3FF]/40 group-hover:border-[#00A3FF] transition-colors" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#00A3FF]/40 group-hover:border-[#00A3FF] transition-colors" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#00A3FF]/40 group-hover:border-[#00A3FF] transition-colors" />

            <div className="w-16 h-16 rounded-full border border-[#00A3FF]/60 flex items-center justify-center mb-4 text-[#00A3FF] group-hover:scale-110 group-hover:bg-[#00A3FF]/10 group-hover:shadow-[0_0_15px_rgba(0,163,255,0.4)] transition-all relative">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white tracking-widest uppercase mb-2">
              VENUE: GAMMA HALL
            </h3>
            <p className="font-sans text-sm sm:text-base text-gray-300 mt-2 font-medium">
              Sri Sairam Engineering College
              <br/>
              <span className="text-[#00A3FF]/80">2-3 members per team</span>
            </p>
          </motion.div>

          {/* MODULE 4: ENERGY SUPPLY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onMouseEnter={() => {
              playHover();
              playUiBeep(1100);
            }}
            className="group relative bg-[#060a14] border border-[#1e293b] hover:border-[#cc0000]/50 p-5 sm:p-6 clip-chamfer transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[220px] h-auto py-6 sm:h-[240px]"
          >
            <div className="absolute top-0 right-0">
              <div className="bg-[#05070a] border-b border-l border-[#cc0000]/40 px-3 py-1 font-mono text-[9px] text-[#cc0000] tracking-widest uppercase">
                RECHARGE_STATION
              </div>
            </div>
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#cc0000]/40 group-hover:border-[#cc0000] transition-colors" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#cc0000]/40 group-hover:border-[#cc0000] transition-colors" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#cc0000]/40 group-hover:border-[#cc0000] transition-colors" />

            <div className="w-16 h-16 rounded-full border border-[#cc0000]/60 flex items-center justify-center mb-4 text-[#cc0000] group-hover:scale-110 group-hover:bg-[#cc0000]/10 group-hover:shadow-[0_0_15px_rgba(204,0,0,0.4)] transition-all relative">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white tracking-widest uppercase mb-2">
              ENERGY SUPPLY
            </h3>
            <p className="font-sans text-sm sm:text-base text-gray-300 mt-2 font-medium">
              Snacks are provided
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
