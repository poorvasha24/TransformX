import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, X, ChevronRight } from 'lucide-react';
import { COMMANDER_SCRIPTS } from '../data/eventData';
import { playClick } from '../utils/audio';

interface RobotCommanderGuideProps {
  currentSection: string;
}

type CharacterState = 'IDLE' | 'WAIT' | 'WAVE' | 'THINK' | 'FLY' | 'TRANSFORM' | 'HERO_POSE' | 'RETURN';

export const RobotCommanderGuide: React.FC<RobotCommanderGuideProps> = ({ currentSection }) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });
  const [activeLineIndex, setActiveLineIndex] = useState<number>(0);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  // Pet State Machine
  const [petState, setPetState] = useState<CharacterState>('IDLE');
  const [petPos, setPetPos] = useState({ x: 0, y: 0 });

  const script = COMMANDER_SCRIPTS[currentSection] || COMMANDER_SCRIPTS.hero;
  const currentLine = script.lines[activeLineIndex] || script.lines[0];

  useEffect(() => {
    setActiveLineIndex(0);
  }, [currentSection]);

  // Typing Effect (NO SOUND)
  useEffect(() => {
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setDisplayedText(currentLine.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 32);

    return () => clearInterval(interval);
  }, [currentLine]);

  // State Machine Logic
  useEffect(() => {
    if (!isMinimized) {
      setPetPos({ x: 0, y: 0 });
      setPetState('IDLE');
      return;
    }

    let timeout: NodeJS.Timeout;

    const transitionTo = (nextState: CharacterState, delay: number) => {
      timeout = setTimeout(() => {
        setPetState(nextState);
      }, delay);
    };

    switch (petState) {
      case 'IDLE':
        // Stay idle for a bit, then move to WAIT
        transitionTo('WAIT', 2000 + Math.random() * 2000);
        break;
        
      case 'WAIT':
        // From WAIT, pick a random major action
        const actions: CharacterState[] = ['WAVE', 'THINK', 'FLY', 'TRANSFORM', 'HERO_POSE'];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        transitionTo(randomAction, 1000 + Math.random() * 2000);
        break;
        
      case 'WAVE':
        transitionTo('RETURN', 2000);
        break;
        
      case 'THINK':
        transitionTo('RETURN', 3000);
        break;
        
      case 'HERO_POSE':
        transitionTo('RETURN', 2500);
        break;
        
      case 'TRANSFORM':
        // Move slightly while transformed
        setPetPos({ x: -100 + Math.random() * 50, y: 0 });
        transitionTo('RETURN', 3500);
        break;
        
      case 'FLY':
        // Pick a safe spot within a constrained area near the bottom right
        const randomX = -Math.random() * 150;
        const randomY = -Math.random() * 200;
        setPetPos({ x: randomX, y: randomY });
        transitionTo('RETURN', 3000);
        break;
        
      case 'RETURN':
        setPetPos({ x: 0, y: 0 });
        transitionTo('IDLE', 1000);
        break;
    }

    return () => clearTimeout(timeout);
  }, [petState, isMinimized]);

  const handleNextLine = () => {
    playClick();
    if (activeLineIndex < script.lines.length - 1) {
      setActiveLineIndex((prev) => prev + 1);
    } else {
      setActiveLineIndex(0);
    }
  };

  // Full Body SVG rendering based on state
  const renderCharacter = () => {
    if (petState === 'TRANSFORM') {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(204,0,0,0.5)]">
          <rect x="10" y="40" width="80" height="35" fill="#cc0000" rx="4" />
          <rect x="60" y="25" width="25" height="15" fill="#1e3a8a" rx="2" />
          <rect x="65" y="28" width="15" height="10" fill="#93c5fd" />
          <circle cx="25" cy="75" r="12" fill="#111" stroke="#475569" strokeWidth="3" />
          <circle cx="75" cy="75" r="12" fill="#111" stroke="#475569" strokeWidth="3" />
          <rect x="85" y="45" width="5" height="15" fill="#eab308" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,163,255,0.5)] overflow-visible">
        <defs>
          <linearGradient id="helmBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="metalSilver" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="chestRed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="eyeGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#00A3FF" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Head Animation Group */}
        <g className={`transition-transform duration-500 ${
          petState === 'THINK' ? 'translate-y-1 rotate-[5deg]' : 
          petState === 'WAVE' ? 'rotate-[-5deg]' :
          petState === 'IDLE' ? 'animate-[bounce_3s_ease-in-out_infinite]' : ''
        }`}>
          {/* Head Elements */}
          <polygon points="35,15 45,20 42,0 38,0" fill="url(#metalSilver)" />
          <polygon points="65,15 55,20 58,0 62,0" fill="url(#metalSilver)" />
          <path d="M 40 20 C 40 -5 60 -5 60 20 L 65 30 L 35 30 Z" fill="url(#helmBlue)" stroke="#1e3a8a" strokeWidth="1" />
          <polygon points="50,0 55,0 52,10 48,10" fill="url(#metalSilver)" />
          <polygon points="40,25 60,25 58,45 42,45" fill="#1e293b" />
          <g className="animate-[pulse_3s_ease-in-out_infinite]">
            <polygon points="42,22 48,25 48,22 42,20" fill="url(#eyeGlow)" filter="url(#glow)" />
            <polygon points="58,22 52,25 52,22 58,20" fill="url(#eyeGlow)" filter="url(#glow)" />
          </g>
          <g className={`transition-transform duration-100 ${isTyping ? 'translate-y-1' : ''}`}>
            <polygon points="45,30 55,30 52,45 48,45" fill="url(#metalSilver)" stroke="#475569" strokeWidth="0.5" />
            <line x1="47" y1="35" x2="53" y2="35" stroke="#334155" strokeWidth="1" />
          </g>
        </g>

        {/* Torso */}
        <path d="M 35 45 C 35 45 40 40 50 40 C 60 40 65 45 65 45 L 60 70 L 40 70 Z" fill="url(#chestRed)" stroke="#7f1d1d" strokeWidth="1" />
        <rect x="45" y="45" width="10" height="8" fill="#1e293b" />
        <circle cx="50" cy="50" r="3" fill="#00f0ff" filter="url(#glow)" />
        
        {/* Waist & Pelvis */}
        <polygon points="42,70 58,70 55,80 45,80" fill="url(#metalSilver)" />

        {/* Legs */}
        <rect x="42" y="80" width="6" height="20" fill="url(#helmBlue)" />
        <rect x="52" y="80" width="6" height="20" fill="url(#helmBlue)" />
        <polygon points="40,100 48,100 48,105 40,105" fill="#111" />
        <polygon points="52,100 60,100 60,105 52,105" fill="#111" />

        {/* Left Arm */}
        <g className={`origin-[35px_45px] transition-transform duration-500 ${
          petState === 'WAVE' ? 'rotate-[-120deg] origin-[35px_45px] animate-[pulse_0.5s_ease-in-out_infinite]' :
          petState === 'HERO_POSE' ? 'rotate-[-30deg]' :
          petState === 'THINK' ? 'rotate-[-135deg] translate-y-[-5px]' : ''
        }`}>
          <rect x="25" y="45" width="10" height="25" rx="3" fill="url(#metalSilver)" />
          <polygon points="25,45 35,45 30,55" fill="url(#helmBlue)" />
          {petState === 'HERO_POSE' && (
             <rect x="15" y="65" width="25" height="6" fill="#111" />
          )}
        </g>

        {/* Right Arm */}
        <g className={`origin-[65px_45px] transition-transform duration-500 ${
          petState === 'HERO_POSE' ? 'rotate-[30deg]' : ''
        }`}>
          <rect x="65" y="45" width="10" height="25" rx="3" fill="url(#metalSilver)" />
          <polygon points="65,45 75,45 70,55" fill="url(#helmBlue)" />
        </g>

        {/* Jetpack Flames */}
        {petState === 'FLY' && (
          <g className="animate-pulse">
            <polygon points="35,60 40,90 45,60" fill="#f59e0b" />
            <polygon points="55,60 60,90 65,60" fill="#f59e0b" />
            <polygon points="37,60 40,80 43,60" fill="#fef08a" />
            <polygon points="57,60 60,80 63,60" fill="#fef08a" />
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-none select-none font-orbitron max-w-[calc(100vw-2rem)]">
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            className="mb-3 max-w-[calc(100vw-2rem)] sm:max-w-md w-full bg-black/85 border border-[#00A3FF]/40 p-4 backdrop-blur-md relative clip-commander-bubble shadow-[0_0_30px_rgba(0,0,0,0.9)] pointer-events-auto"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#00A3FF]" />
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#00A3FF]/20">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-ping" />
                <span className="text-[9px] font-mono text-[#00A3FF] tracking-widest uppercase font-bold">
                  PRIME_COMMANDER // {script.title}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    playClick();
                    setIsMinimized(true);
                  }}
                  title="Minimize Commander"
                  className="p-1 text-gray-400 hover:text-[#cc0000] transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="min-h-[44px] flex items-center font-mono text-xs text-gray-300 tracking-wide leading-relaxed">
              <span className="text-[#cc0000] font-bold mr-1.5">&gt;</span>
              <span>{displayedText}</span>
              {isTyping && <span className="inline-block w-2 h-3 bg-[#00A3FF] ml-1 animate-pulse" />}
            </div>

            <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#1e293b]">
              <span className="font-mono text-[9px] text-gray-500 tracking-widest">
                LOG: {activeLineIndex + 1}/{script.lines.length}
              </span>
              <button
                onClick={handleNextLine}
                className="flex items-center gap-1 px-3 py-1 bg-[#0a0f1d] hover:bg-[#121a30] border border-[#00A3FF]/40 text-[#00A3FF] hover:text-white text-[9px] font-mono tracking-wider transition-all cursor-pointer"
              >
                <span>NEXT INTEL</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="pointer-events-auto"
        animate={{ x: petPos.x, y: petPos.y }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      >
        <button
          onClick={() => {
            playClick();
            setIsMinimized(!isMinimized);
          }}
          className="group relative cursor-pointer focus:outline-none flex items-center justify-center"
          title="Toggle Tactical Commander Guide"
        >
          <div className="absolute inset-0 bg-[#00A3FF]/20 group-hover:bg-[#cc0000]/30 blur-md transition-colors" />

          <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gray-900 border-2 border-[#00A3FF] group-hover:border-[#cc0000] p-1 clip-octagon shadow-[0_0_20px_rgba(0,163,255,0.4)] transition-all duration-300 flex items-center justify-center">
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#cc0000]" />

            {renderCharacter()}

            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00A3FF] shadow-[0_0_8px_#00A3FF] animate-pulse" />
          </div>

          {isMinimized && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#cc0000] flex items-center justify-center text-[9px] font-bold text-white border border-black shadow-[0_0_10px_#cc0000]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
            >
              !
            </motion.div>
          )}
        </button>
      </motion.div>
    </div>
  );
};
