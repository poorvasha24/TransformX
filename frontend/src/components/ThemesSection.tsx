import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import {
  Bot,
  Cpu,
  ShieldCheck,
  GraduationCap,
  Car,
  Zap,
  Flame,
  Layers,
  Sparkles,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { SIHTheme } from '../types';
import { SIH_THEMES } from '../data/eventData';
import { ThemeDetailModal } from './ThemeDetailModal';
import { playHover, playUiBeep, playThemeSelect, playCarouselMove } from '../utils/audio';

export const ThemesSection: React.FC = () => {
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const dragX = useMotionValue(0);

  const handleWheel = (e: React.WheelEvent) => {
    // If the scroll is mostly horizontal, capture it to move the carousel
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      let newX = dragX.get() - e.deltaX;

      // Expand limits massively so the user can scroll continuously
      if (newX < -15000) newX = -15000;
      if (newX > 15000) newX = 15000;

      dragX.set(newX);
    }
  };

  // Generate 4 sets of themes for infinite seamless marquee looping
  const duplicatedThemes = Array(4).fill(SIH_THEMES).flat();

  const selectedTheme = SIH_THEMES.find((t) => t.id === selectedThemeId) || null;

  const handleOpenTheme = (themeId: string) => {
    playThemeSelect();
    setSelectedThemeId(themeId);
  };

  const getThemeIcon = (type: SIHTheme['iconType']) => {
    switch (type) {
      case 'automation':
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'robotics':
        return <Bot className="w-6 h-6 text-red-400" />;
      case 'blockchain':
        return <ShieldCheck className="w-6 h-6 text-blue-400" />;
      case 'education':
        return <GraduationCap className="w-6 h-6 text-amber-400" />;
      case 'vehicles':
        return <Car className="w-6 h-6 text-red-500" />;
      case 'energy':
        return <Zap className="w-6 h-6 text-cyan-300" />;
      case 'disaster':
        return <Flame className="w-6 h-6 text-amber-500" />;
      default:
        return <Layers className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="themes" className="relative py-16 sm:py-24 px-4 bg-[#05070a] border-t border-b border-[#1e293b] overflow-hidden">
      {/* Background Cybernetic Ring Matrix */}
      <div className="absolute inset-0 bg-sophisticated-radial opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#00A3FF]/10 pointer-events-none animate-spin [animation-duration:120s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-[#cc0000]/10 pointer-events-none animate-spin [animation-duration:160s] [animation-direction:reverse]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
          <div className="text-[10px] font-mono tracking-[0.4em] text-[#cc0000] mb-3 flex items-center justify-center gap-3 uppercase">
            <span className="w-8 h-[1px] bg-[#00A3FF]/40" />
            <span>SECTION 02 // SEVEN DOMAINS</span>
            <span className="w-8 h-[1px] bg-[#00A3FF]/40" />
          </div>

          <h2 className="font-orbitron font-black text-2xl xs:text-3xl sm:text-5xl tracking-wide text-white uppercase">
            SIH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cc0000] via-amber-400 to-[#00A3FF]">INNOVATION MATRIX</span>
          </h2>
          <p className="mt-3 max-w-2xl text-gray-400 font-sans text-xs sm:text-base px-2">
            Select an armored mission bay to unlock tactical blueprints, technical parameters, and impact vectors.
          </p>
        </div>

        {/* 7 INTERACTIVE MECHANICAL MODULES IN DYNAMIC HORIZONTAL CAROUSEL */}
        <div
          className="relative overflow-hidden pause-marquee"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          onTouchCancel={() => setIsHovered(false)}
          onWheel={handleWheel}
        >

          {/* Draggable Parent Wrapper */}
          <motion.div
            drag="x"
            style={{ x: dragX }}
            dragConstraints={{ left: -3000, right: 3000 }}
            dragElastic={0.15}
            onDragStart={() => setIsHovered(true)}
            onDragEnd={() => setIsHovered(false)}
            className="cursor-grab active:cursor-grabbing touch-pan-y"
          >
            {/* Continuous Moving Carousel */}
            <motion.div
              style={{ animationPlayState: (isHovered || selectedThemeId) ? 'paused' : undefined }}
              className={`flex gap-4 sm:gap-6 min-w-max px-4 py-6 sm:py-8 pointer-events-auto animate-marquee hover:pause-animation ${(isHovered || selectedThemeId) ? 'is-paused' : ''}`}
            >
              {duplicatedThemes.map((theme, index) => {
                // Give specific visual character to different slots
                const isRedAccent = theme.accentColor === 'red';
                const isAmberAccent = theme.accentColor === 'amber';

                // Generate a truly unique key since we are duplicating the array
                const uniqueKey = `${theme.id}-${index}`;

                return (
                  <React.Fragment key={uniqueKey}>
                    {index % 7 === 0 && (
                      <div className="flex flex-col items-center justify-center mx-2 gap-2 opacity-60 flex-shrink-0 pointer-events-none">
                        <div className="w-[2px] h-24 bg-gradient-to-b from-transparent to-[#00A3FF]" />
                        <div className="text-[10px] font-mono text-[#00A3FF] -rotate-90 my-12 tracking-[0.3em] whitespace-nowrap">
                          START SEQUENCE
                        </div>
                        <div className="w-[2px] h-24 bg-gradient-to-t from-transparent to-[#00A3FF]" />
                      </div>
                    )}
                    <div
                      onClick={() => handleOpenTheme(theme.id)}
                      onMouseEnter={() => {
                        setIsHovered(true);
                        playHover();
                        playUiBeep(800 + (index % 7) * 80);
                      }}
                      onMouseLeave={() => setIsHovered(false)}
                      onPointerEnter={() => setIsHovered(true)}
                      onPointerLeave={() => setIsHovered(false)}
                      onTouchStart={() => setIsHovered(true)}
                      onTouchEnd={() => setIsHovered(false)}
                      onTouchCancel={() => setIsHovered(false)}
                      className={`carousel-slot group relative bg-[#0a0f1d] border-2 w-[82vw] sm:w-[45vw] md:w-[28vw] max-w-[360px] flex-shrink-0 cursor-pointer ${isRedAccent
                        ? 'border-[#1e293b] hover:border-[#cc0000] hover:shadow-[0_0_25px_rgba(204,0,0,0.3)]'
                        : isAmberAccent
                          ? 'border-[#1e293b] hover:border-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                          : 'border-[#1e293b] hover:border-[#00A3FF] hover:shadow-[0_0_25px_rgba(0,163,255,0.2)]'
                        } transition-all duration-300 overflow-hidden clip-chamfer hover:-translate-y-2`}
                    >
                      {/* Background Grid Pattern */}
                      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />

                      <div className="p-6 relative z-10 h-full flex flex-col">
                        {/* Top Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 text-[10px] font-mono tracking-widest ${isRedAccent ? 'bg-[#cc0000]/20 text-[#cc0000]' :
                              isAmberAccent ? 'bg-amber-500/20 text-amber-400' :
                                'bg-[#00A3FF]/20 text-[#00A3FF]'
                              }`}>
                              DOM_0{(index % 7) + 1}
                            </span>
                            <span className="text-gray-500 text-[10px] font-mono">{theme.id.slice(0, 8).toUpperCase()}</span>
                          </div>
                          <Maximize2 className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                        </div>

                        {/* Icon & Title */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-3 rounded-lg bg-[#05070a] border border-[#1e293b] group-hover:scale-110 transition-transform ${isRedAccent ? 'group-hover:border-[#cc0000]' :
                            isAmberAccent ? 'group-hover:border-amber-400' :
                              'group-hover:border-[#00A3FF]'
                            }`}>
                            {getThemeIcon(theme.iconType)}
                          </div>
                          <h3 className="font-orbitron font-bold text-lg sm:text-xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all uppercase">
                            {theme.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-sm font-sans flex-grow">
                          {theme.shortDescription}
                        </p>

                        {/* Decorative Footer */}
                        <div className="mt-6 pt-4 border-t border-[#1e293b] flex items-center justify-between">
                          <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase truncate max-w-[150px]">
                            {theme.tacticalSpecs.deploymentSector}
                          </span>
                          <span className={`text-xs font-bold font-mono uppercase flex items-center gap-1 ${isRedAccent ? 'text-[#cc0000]' :
                            isAmberAccent ? 'text-amber-400' :
                              'text-[#00A3FF]'
                            }`}>
                            DECRYPT <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* DETAILED TACTICAL MISSION BRIEFING MODAL */}
      <ThemeDetailModal
        theme={selectedTheme}
        onClose={() => setSelectedThemeId(null)}
        onSelectAnother={(newId) => setSelectedThemeId(newId)}
        allThemes={SIH_THEMES}
      />
    </section>
  );
};
