import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Trophy, Briefcase } from 'lucide-react';
import { playHover, playUiBeep } from '../utils/audio';

export const EventHighlights: React.FC = () => {
  return (
    <section className="bg-[#05070a] pt-4 pb-16 sm:pb-24 flex justify-center border-b border-[#1e293b]">
      <div className="max-w-7xl w-full px-4 sm:px-6">
        <div className="flex flex-col items-center mb-8 sm:mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 sm:gap-3 mb-2"
          >
            <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-[#00A3FF]"></div>
            <span className="font-mono text-[#00A3FF] text-xs sm:text-sm tracking-widest font-bold uppercase">OUTCOME METRICS</span>
            <div className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-[#00A3FF]"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-2xl xs:text-3xl md:text-5xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400 tracking-wider text-center uppercase"
          >
            EVENT HIGHLIGHTS
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Box 1: AI Evaluation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => {
              playHover();
              playUiBeep(500);
            }}
            className="group relative bg-[#060a14] border border-[#1e293b] hover:border-[#00A3FF]/50 p-6 clip-chamfer transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[220px]"
          >
            <div className="absolute top-0 right-0">
              <div className="bg-[#05070a] border-b border-l border-[#00A3FF]/40 px-3 py-1 font-mono text-[9px] text-[#00A3FF] tracking-widest uppercase">
                ALGORITHM_SYNC
              </div>
            </div>
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#00A3FF]/40 group-hover:border-[#00A3FF] transition-colors" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#00A3FF]/40 group-hover:border-[#00A3FF] transition-colors" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#00A3FF]/40 group-hover:border-[#00A3FF] transition-colors" />

            <div className="w-16 h-16 rounded-full border border-[#00A3FF]/60 flex items-center justify-center mb-4 text-[#00A3FF] group-hover:scale-110 group-hover:bg-[#00A3FF]/10 group-hover:shadow-[0_0_15px_rgba(0,163,255,0.4)] transition-all relative">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white tracking-widest uppercase mb-2">
              AI EVALUATION
            </h3>
            <p className="font-sans text-sm sm:text-base text-gray-300 mt-2 font-medium">
              PPTs will be comprehensively evaluated by advanced AI systems.
            </p>
          </motion.div>

          {/* Box 2: Advancement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onMouseEnter={() => {
              playHover();
              playUiBeep(700);
            }}
            className="group relative bg-[#060a14] border border-[#1e293b] hover:border-[#cc0000]/50 p-6 clip-chamfer transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[220px]"
          >
            <div className="absolute top-0 right-0">
              <div className="bg-[#05070a] border-b border-l border-[#cc0000]/40 px-3 py-1 font-mono text-[9px] text-[#cc0000] tracking-widest uppercase">
                ACHIEVEMENT_NODE
              </div>
            </div>
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#cc0000]/40 group-hover:border-[#cc0000] transition-colors" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#cc0000]/40 group-hover:border-[#cc0000] transition-colors" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#cc0000]/40 group-hover:border-[#cc0000] transition-colors" />

            <div className="w-16 h-16 rounded-full border border-[#cc0000]/60 flex items-center justify-center mb-4 text-[#cc0000] group-hover:scale-110 group-hover:bg-[#cc0000]/10 group-hover:shadow-[0_0_15px_rgba(204,0,0,0.4)] transition-all relative">
              <Trophy className="w-7 h-7" />
            </div>
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white tracking-widest uppercase mb-2">
              ADVANCEMENT
            </h3>
            <p className="font-sans text-sm sm:text-base text-gray-300 mt-2 font-medium">
              Winners will be taken forward to participate in further exclusive events.
            </p>
          </motion.div>

          {/* Box 3: Career Path */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onMouseEnter={() => {
              playHover();
              playUiBeep(900);
            }}
            className="group relative bg-[#060a14] border border-[#1e293b] hover:border-emerald-400/50 p-6 clip-chamfer transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[220px]"
          >
            <div className="absolute top-0 right-0">
              <div className="bg-[#05070a] border-b border-l border-emerald-400/40 px-3 py-1 font-mono text-[9px] text-emerald-400 tracking-widest uppercase">
                CAREER_PATHWAY
              </div>
            </div>
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-emerald-400/40 group-hover:border-emerald-400 transition-colors" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-emerald-400/40 group-hover:border-emerald-400 transition-colors" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-emerald-400/40 group-hover:border-emerald-400 transition-colors" />

            <div className="w-16 h-16 rounded-full border border-emerald-400/60 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-400/10 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] transition-all relative">
              <Briefcase className="w-7 h-7" />
            </div>
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white tracking-widest uppercase mb-2">
              CAREER PATH
            </h3>
            <p className="font-sans text-sm sm:text-base text-gray-300 mt-2 font-medium">
              Internship opportunities will be provided to the top-performing talent.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
