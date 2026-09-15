import React from 'react';
import { Cpu, Shield, Zap, Terminal, Radio, Heart, Instagram, Linkedin } from 'lucide-react';
import { playClick, playHover } from '../utils/audio';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onReplayIntro }) => {
  return (
    <footer className="relative bg-[#020408] border-t border-[#1e293b] select-none font-sans overflow-hidden">
      {/* Upper Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#1e293b]">
          {/* Col 1: Brand & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              {/* Spinning Mechanical Gear Bolt */}
              <div className="w-5 h-5 rounded-full border-2 border-dashed border-gray-400 animate-spin [animation-duration:4s] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#00A3FF] rounded-full" />
              </div>
              <span className="font-orbitron font-black text-xl tracking-[0.2em] drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
                <span className="text-white">TRANS</span>
                <span className="text-[#00A3FF]">FORM</span>
                <span className="text-[#cc0000]">X</span>
              </span>
            </div>

            <p className="text-sm text-gray-400 mt-2 font-mono max-w-md">
              A premier hackathon platform engineered for visionaries, builders, and robotics innovators. Powered by mechanical transformation design principles.
            </p>

            <div className="flex items-center gap-2 font-mono text-[10px] text-[#00A3FF] pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span>CORE SYSTEM STATUS: ALL CHANNELS NOMINAL</span>
            </div>

            {/* Social Logos */}
            <div className="flex items-center gap-4 sm:gap-6 pt-4 sm:pt-6">
              <a
                href="https://www.instagram.com/code_club_sairam?igsh=MXc3emp6ZDF3bmplYw%3D%3D"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#1e293b] hover:border-[#00A3FF] bg-[#0a0f1d] hover:bg-[#00A3FF]/10 flex items-center justify-center text-gray-400 hover:text-[#00A3FF] transition-all duration-300 hover:scale-110 shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(0,163,255,0.4)]"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/code-club-sairam-7095713b4"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#1e293b] hover:border-[#00A3FF] bg-[#0a0f1d] hover:bg-[#00A3FF]/10 flex items-center justify-center text-gray-400 hover:text-[#00A3FF] transition-all duration-300 hover:scale-110 shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(0,163,255,0.4)]"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-mono text-[10px] text-[#cc0000] font-bold tracking-[0.3em] uppercase mb-3">
              // COMMAND CHANNELS
            </h4>
            <ul className="space-y-2 text-xs font-mono text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  onMouseEnter={playHover}
                  className="hover:text-[#00A3FF] transition-colors cursor-pointer"
                >
                  &gt; PORTAL_HOME
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('event')}
                  onMouseEnter={playHover}
                  className="hover:text-[#00A3FF] transition-colors cursor-pointer"
                >
                  &gt; EVENT_SPECS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('themes')}
                  onMouseEnter={playHover}
                  className="hover:text-[#00A3FF] transition-colors cursor-pointer"
                >
                  &gt; SEVEN_DOMAINS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('roadmap')}
                  onMouseEnter={playHover}
                  className="hover:text-[#00A3FF] transition-colors cursor-pointer"
                >
                  &gt; MISSION_ROADMAP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('register')}
                  onMouseEnter={playHover}
                  className="hover:text-[#00A3FF] transition-colors cursor-pointer"
                >
                  &gt; INITIATE_REGISTRATION
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tactical Telemetry & Replay Intro & Socials */}
          <div>
            <h4 className="font-mono text-[10px] text-[#00A3FF] font-bold tracking-[0.3em] uppercase mb-3">
              // TACTICAL INTEL
            </h4>
            <div className="space-y-2 font-mono text-xs text-gray-400 mb-4">
              <p>MISSION DATE: 25 SEP 2026</p>
              <p>DURATION: 8 HOURS ACTIVE SPRINT</p>
              <p>SECTORS: 07 INNOVATION DOMAINS</p>
              <button
                onClick={() => {
                  playClick();
                  onReplayIntro();
                }}
                onMouseEnter={playHover}
                className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-black/40 hover:bg-[#0a0f1d] border border-[#1e293b] hover:border-[#00A3FF]/60 text-gray-300 hover:text-white text-[10px] font-mono tracking-wider transition-colors cursor-pointer"
              >
                <Radio className="w-3 h-3 text-[#cc0000]" />
                <span>REPLAY INTRO CINEMATIC</span>
              </button>
            </div>

            <h4 className="font-mono text-[10px] text-[#00A3FF] font-bold tracking-[0.3em] uppercase mb-3 mt-6">
              // COMM LINKS
            </h4>
            <div className="flex flex-col gap-2 font-mono text-xs">
              <a href="https://www.instagram.com/code_club_sairam?igsh=MXc3emp6ZDF3bmplYw%3D%3D" target="_blank" rel="noreferrer" onMouseEnter={playHover} onClick={playClick} className="text-gray-400 hover:text-[#00A3FF] transition-colors inline-block w-fit">
                &gt; INSTAGRAM_PROFILE
              </a>
              <a href="https://www.linkedin.com/in/code-club-sairam-7095713b4" target="_blank" rel="noreferrer" onMouseEnter={playHover} onClick={playClick} className="text-gray-400 hover:text-[#00A3FF] transition-colors inline-block w-fit">
                &gt; LINKEDIN_PROFILE
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-gray-500 text-center sm:text-left">
          <div>
            &copy; 2026 TRANSFORMX HACKATHON. ALL TACTICAL RIGHTS RESERVED.
          </div>
          <div className="text-[#00A3FF] font-bold text-xs">
            "Freedom is the right of all sentient beings." - Optimus Prime
          </div>
        </div>
      </div>

      {/* Sophisticated Dark Bottom Telemetry Bar */}
      <div className="bg-black border-t border-[#1e293b] py-3 px-4 sm:px-12 text-[8px] sm:text-[9px] font-mono text-gray-600 flex flex-col sm:flex-row justify-between items-center uppercase tracking-wider sm:tracking-[0.2em] gap-2 text-center sm:text-left">
        <span>SYSTEM STATUS: NOMINAL | GRID_COORD: 45.32.90 | LATENCY: 12MS</span>
        <span className="text-[#00A3FF]/60">v4.0.2_TRANSFORM</span>
      </div>
    </footer>
  );
};
