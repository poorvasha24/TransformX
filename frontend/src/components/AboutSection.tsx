import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield } from 'lucide-react';
import { playHover, playClick } from '../utils/audio';

export const AboutSection: React.FC = () => {
  const logos = [
    { src: '/Code_club_SSEC.jpg', alt: 'Code Club SSEC Logo' }
  ];

  return (
    <section id="about" className="relative py-16 sm:py-24 px-4 bg-[#05070a] border-t border-b border-[#1e293b] overflow-hidden">
      {/* Background Cybernetic Elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-8 sm:gap-12">
        {/* Left Side: Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/3 flex justify-center"
        >
          <div className="relative group w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64">
            {/* The Blur Glow Layer - Outside the clipping mask! */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#cc0000] to-[#00A3FF] blur-2xl opacity-40 group-hover:opacity-70 transition-opacity rounded-full" />

            {/* The actual clipping mask for the images and border */}
            <div className="absolute inset-0 rounded-full border-4 border-[#1e293b] shadow-[0_0_20px_rgba(0,163,255,0.3)] group-hover:border-[#00A3FF] transition-all overflow-hidden bg-[#0a0f1d] z-10">
              <motion.img
                src={logos[0].src}
                alt={logos[0].alt}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-2/3 text-center md:text-left"
        >
          <div className="text-[10px] font-mono tracking-[0.4em] text-[#00A3FF] mb-3 flex items-center justify-center md:justify-start gap-3 uppercase">
            <Shield className="w-4 h-4" />
            <span>ORIGIN IDENTITY</span>
          </div>

          <h2 className="font-orbitron font-black text-2xl xs:text-3xl sm:text-5xl tracking-wide text-white uppercase mb-4 sm:mb-6">
            ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cc0000] to-[#00A3FF]">TRANSFORMX</span>
          </h2>

          <div className="space-y-4 text-gray-400 font-sans text-xs sm:text-base leading-relaxed text-left">
            <p>
              TransformX is a one-day hackathon organized by the Code Club of Sri Sairam Engineering College, inspired by the spirit of the Smart India Hackathon (SIH). The event brings together passionate innovators, developers, and problem-solvers to tackle real-world challenges through technology and creativity.
            </p>
            <p>
              Participants will work on SIH-inspired problem statements, transforming ideas into practical and impactful solutions within an intense one-day challenge. From identifying problems to building and presenting prototypes, TransformX encourages teamwork, innovation, critical thinking, and the spirit of building solutions that can create real-world impact.
            </p>
            <p className="font-orbitron text-[#00A3FF] font-bold text-base sm:text-lg mt-4">
              One Day. One Challenge. One Transformation.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 flex justify-center md:justify-start">
            <a
              href="https://sairam.edu.in/code-club-2/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#cc0000] to-[#cc0000]/80 text-white font-mono font-bold tracking-wider px-6 py-3 uppercase hover:shadow-[0_0_15px_rgba(204,0,0,0.5)] transition-all group clip-chamfer cursor-pointer w-full sm:w-auto"
            >
              <span>KNOW MORE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
