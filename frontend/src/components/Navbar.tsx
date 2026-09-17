import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Menu,
  X,
  Play,
  Shield,
  Radio,
  Cpu
} from 'lucide-react';
import {
  playUiBeep,
  playHover,
  playClick,
  playNavSelect,
  setSoundEnabled,
  getSoundEnabled
} from '../utils/audio';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onReplayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onReplayIntro,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(getSoundEnabled());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'HOME', code: '00' },
    { id: 'event', label: 'EVENT', code: '01' },
    { id: 'themes', label: 'THEMES', code: '02' },
    { id: 'roadmap', label: 'ROADMAP', code: '03' },
    { id: 'register', label: 'REGISTER', code: '04' },
  ];

  const handleSoundToggle = () => {
    const nextState = !isSoundOn;
    setIsSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      playUiBeep(1200);
    }
  };

  const handleItemClick = (id: string) => {
    playNavSelect();
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none bg-[#0a0f1d]/90 backdrop-blur-md border-b border-[#1e293b] px-3 sm:px-12 py-2.5 sm:py-0 sm:h-16 flex items-center justify-between">
      {/* BRAND LOGO: TRANSFORMX (Diamond Emblem) */}
      <div
        onClick={() => handleItemClick('hero')}
        onMouseEnter={playHover}
        className="pointer-events-auto flex items-center gap-2 sm:gap-3 cursor-pointer group"
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Spinning Mechanical Gear Bolt */}
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-dashed border-gray-400 animate-spin [animation-duration:4s] flex items-center justify-center group-hover:border-[#00A3FF]">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00A3FF] rounded-full" />
          </div>
          <span className="font-black tracking-[0.15em] sm:tracking-[0.2em] text-base sm:text-xl font-orbitron drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform">
            <span className="text-white">TRANS</span>
            <span className="text-[#00A3FF]">FORM</span>
            <span className="text-[#cc0000]">X</span>
          </span>
        </div>
      </div>

      {/* DESKTOP SOPHISTICATED NAV */}
      <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              onMouseEnter={playHover}
              className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors cursor-pointer py-1 font-mono ${
                isActive
                  ? 'text-[#00A3FF] border-b-2 border-[#00A3FF]'
                  : 'text-gray-500 hover:text-white border-b-2 border-transparent'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* RIGHT CONTROLS: SOUND TOGGLE & REPLAY INTRO */}
      <div className="flex items-center gap-2 sm:gap-6 pointer-events-auto">

        {/* Sophisticated Dark Sound Toggle */}
        <div
          onClick={handleSoundToggle}
          onMouseEnter={playHover}
          className="flex items-center gap-1.5 sm:gap-2 border border-[#1e293b] px-2 sm:px-3 py-1 bg-black/40 cursor-pointer hover:border-gray-700 transition-colors"
        >
          <span className="hidden xs:inline text-[9px] font-mono text-gray-500 tracking-wider">SOUND</span>
          <div className="w-7 sm:w-8 h-3 bg-[#00A3FF]/20 relative rounded-full transition-colors">
            <div
              className={`absolute top-0 w-3.5 sm:w-4 h-3 rounded-full transition-all duration-300 ${
                isSoundOn
                  ? 'right-0 bg-[#00A3FF] shadow-[0_0_8px_#00A3FF]'
                  : 'left-0 bg-gray-600'
              }`}
            />
          </div>
          <span
            className={`text-[9px] font-mono tracking-wider ${
              isSoundOn ? 'text-[#00A3FF]' : 'text-gray-600'
            }`}
          >
            {isSoundOn ? 'ON' : 'OFF'}
          </span>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => {
            playClick();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 bg-black/50 border border-[#1e293b] text-[#00A3FF] cursor-pointer touch-manipulation flex items-center justify-center"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE EXPANDABLE COMMAND HUD MENU */}
      {isMobileMenuOpen && (
        <>
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 top-[52px] bg-black/60 backdrop-blur-sm pointer-events-auto z-[-1]"
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pointer-events-auto absolute top-full left-0 right-0 bg-[#0a0f1d]/98 backdrop-blur-xl border-b border-[#1e293b] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full py-2.5 px-3 font-mono text-xs tracking-[0.2em] text-left uppercase transition-colors rounded-sm ${
                    activeSection === item.id
                      ? 'bg-[#00A3FF]/15 text-[#00A3FF] border-l-2 border-[#00A3FF] font-bold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </header>
  );
};
