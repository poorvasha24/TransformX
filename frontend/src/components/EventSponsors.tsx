import React from 'react';
import { motion } from 'motion/react';
import { playHover, playUiBeep } from '../utils/audio';

export const EventSponsors: React.FC = () => {
  return (
    <section className="bg-[#05070a] py-12 sm:py-16 px-4 border-b border-[#1e293b] relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Cybernetic Elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-6 sm:mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 sm:gap-3 mb-2"
          >
            <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-[#00A3FF]" />
            <span className="font-mono text-[#00A3FF] text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] font-bold uppercase">
              STRATEGIC ALLIANCE
            </span>
            <div className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-[#00A3FF]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-2xl xs:text-3xl sm:text-4xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400 tracking-wider uppercase"
          >
            EVENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-blue-400">SPONSORS</span>
          </motion.h2>
        </div>

        {/* Sponsor Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onMouseEnter={() => {
            playHover();
            playUiBeep(600);
          }}
          className="group relative bg-[#060a14] border border-[#1e293b] hover:border-[#00A3FF]/50 p-6 sm:p-8 clip-chamfer transition-all duration-300 flex flex-col items-center justify-center text-center max-w-sm sm:max-w-md w-full shadow-[0_0_20px_rgba(0,163,255,0.08)] hover:shadow-[0_0_30px_rgba(0,163,255,0.25)]"
        >
          {/* Cybernetic Tech Badge */}
          <div className="absolute top-0 right-0">
            <div className="bg-[#05070a] border-b border-l border-[#00A3FF]/40 px-3 py-1 font-mono text-[8px] sm:text-[9px] text-[#00A3FF] tracking-widest uppercase">
              TITLE_SPONSOR
            </div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#00A3FF]/40 group-hover:border-[#00A3FF] transition-colors" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#00A3FF]/40 group-hover:border-[#00A3FF] transition-colors" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#00A3FF]/40 group-hover:border-[#00A3FF] transition-colors" />

          {/* Logo Frame */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-xl overflow-hidden border border-[#1e293b] group-hover:border-[#00A3FF]/50 transition-all duration-300 bg-[#070b16] flex items-center justify-center p-2 shadow-inner group-hover:shadow-[0_0_20px_rgba(0,163,255,0.2)]">
            <img
              src="/images/wyntrix.jpeg"
              alt="Wyntrix Innovations (OPC) Private Limited"
              className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Sponsor Name & Details */}
          <div className="mt-4 sm:mt-5">
            <h3 className="font-orbitron font-bold text-base sm:text-lg md:text-xl text-white tracking-wide uppercase group-hover:text-[#00A3FF] transition-colors">
              Wyntrix Innovations
            </h3>
            <p className="font-mono text-xs sm:text-sm text-gray-400 tracking-wider mt-1">
              (OPC) Private Limited
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
