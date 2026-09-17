import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Zap,
  ArrowRight,
  Shield,
  Users,
  CheckCircle,
  ExternalLink,
  Cpu,
  Lock,
  Radio,
  FileText
} from 'lucide-react';
import { GOOGLE_FORM_URL } from '../data/eventData';
import {
  playHover,
  playRegisterClick,
  playClick
} from '../utils/audio';

export const RegisterSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleRegisterClick = () => {
    playRegisterClick();

    // Trigger Cybernetic Victory Confetti Burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#ef4444', '#3b82f6', '#ffffff', '#f59e0b']
    });

    // Open placeholder Google Form URL in new tab
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="register" className="relative py-16 sm:py-28 px-4 bg-[#05070a] border-t border-[#1e293b] overflow-hidden">
      {/* Background Energy Matrix */}
      <div className="absolute inset-0 bg-sophisticated-radial opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center">
        {/* Top Command Pill */}
        <div className="text-[10px] font-mono tracking-[0.4em] text-[#cc0000] mb-3 flex items-center justify-center gap-3 uppercase">
          <span className="w-8 h-[1px] bg-[#cc0000]/40" />
          <span>SECTION 04 // REGISTRATION CONSOLE</span>
          <span className="w-8 h-[1px] bg-[#cc0000]/40" />
        </div>

        <h2 className="font-orbitron font-black text-2xl xs:text-3xl sm:text-5xl lg:text-6xl tracking-wider text-white uppercase">
          COMMENCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cc0000] via-amber-400 to-[#00A3FF]">TRANSFORMATION</span>
        </h2>

        <p className="mt-3 sm:mt-4 max-w-xl text-gray-400 font-sans text-xs sm:text-base lg:text-lg px-2">
          Secure your squad’s slot in the ultimate arena. Register your team credentials and join the revolution.
        </p>

        {/* TRANSFORMATION CONTROL PANEL (BIG BUTTON HOUSING) */}
        <div className="mt-8 sm:mt-12 w-full max-w-2xl bg-[#0a0f1d] border-2 border-[#1e293b] p-4 sm:p-8 lg:p-12 clip-chamfer-lg shadow-[0_4px_40px_rgba(0,0,0,0.9)] relative group">
          {/* Hydraulic Safety Lock Brackets */}
          <div className="absolute top-3 left-4 flex items-center gap-2 text-gray-500 font-mono text-[9px] sm:text-[10px]">
            <Lock className="w-3 h-3 text-[#cc0000]" />
            <span className="hidden xs:inline">HYDRAULIC_CLAMPS: </span><span>DISENGAGED</span>
          </div>

          <div className="absolute top-3 right-4 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[9px] sm:text-[10px] text-emerald-400 font-semibold">FORM_LINK_READY</span>
          </div>

          {/* THE GIANT TRANSFORMATION CONTROL BUTTON */}
          <div className="my-5 sm:my-6">
            <button
              onClick={handleRegisterClick}
              onMouseEnter={() => {
                setIsHovered(true);
                playHover();
              }}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full py-4 sm:py-6 lg:py-8 bg-[#cc0000] hover:bg-[#b30000] text-white font-orbitron font-black text-sm xs:text-base sm:text-xl lg:text-2xl tracking-[0.1em] sm:tracking-[0.2em] clip-chamfer-lg shadow-[0_0_30px_rgba(204,0,0,0.6)] hover:shadow-[0_0_40px_rgba(0,163,255,0.7)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 sm:gap-4 border border-white/20 hover:border-[#00A3FF] group/btn"
            >
              {/* Dynamic Transforming Text and Icons */}
              {isHovered ? (
                <div className="relative z-10 flex items-center gap-2 sm:gap-3 text-white animate-pulse font-black">
                  <span>PROCEED TO FORM</span>
                  <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 translate-x-1 sm:translate-x-2 transition-transform text-[#00A3FF]" />
                </div>
              ) : (
                <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                  <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-amber-300" />
                  <span>INITIATE REGISTRATION</span>
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                </div>
              )}
            </button>
          </div>

          {/* Slogan */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="font-orbitron text-[#00A3FF] tracking-wider sm:tracking-[0.2em] text-xs sm:text-sm md:text-base font-bold animate-pulse px-2">
              GEAR UP. DEPLOY. CONQUER. THE FUTURE IS WRITTEN IN CODE.
            </p>
          </div>

          {/* 3 SQUAD PROTOCOL CRITERIA PILLARS */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-[#1e293b] text-left">
            <div className="bg-[#05070a] p-3 sm:p-3.5 border border-[#1e293b] clip-chamfer">
              <div className="flex items-center gap-1.5 text-[#00A3FF] font-mono text-xs font-bold mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>SQUAD SIZE</span>
              </div>
              <p className="text-xs text-gray-300">2 to 3 Operatives per Unit</p>
            </div>

            <div className="bg-[#05070a] p-3 sm:p-3.5 border border-[#1e293b] clip-chamfer">
              <div className="flex items-center gap-1.5 text-[#cc0000] font-mono text-xs font-bold mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>ENTRY FEE</span>
              </div>
              <p className="text-xs text-gray-300">No Entry Fee</p>
            </div>

            <div className="bg-[#05070a] p-3 sm:p-3.5 border border-[#1e293b] clip-chamfer">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs font-bold mb-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>ELIGIBILITY</span>
              </div>
              <p className="text-xs text-gray-300">Skillrack Toppers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
