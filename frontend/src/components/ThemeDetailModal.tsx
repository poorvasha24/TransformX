import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Shield,
  Zap,
  Target,
  Cpu,
  Layers,
  CheckCircle2,
  Terminal,
  Activity,
  ArrowRight
} from 'lucide-react';
import { SIHTheme } from '../types';
import { playClick, playPanelOpen, playThemeSelect } from '../utils/audio';

interface ThemeDetailModalProps {
  theme: SIHTheme | null;
  onClose: () => void;
  onSelectAnother: (themeId: string) => void;
  allThemes: SIHTheme[];
}

export const ThemeDetailModal: React.FC<ThemeDetailModalProps> = ({
  theme,
  onClose,
  onSelectAnother,
  allThemes,
}) => {
  if (!theme) return null;

  useEffect(() => {
    if (theme) {
      playPanelOpen();
    }
  }, [theme]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 select-none font-orbitron overflow-y-auto">
        {/* Backdrop Dark Grid Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Tactical Mission Briefing Chassis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#0a0f1d] border-2 border-[#00A3FF] p-4 sm:p-6 lg:p-8 clip-chamfer-lg shadow-[0_0_50px_rgba(0,163,255,0.3)] my-auto max-h-[90vh] overflow-y-auto pointer-events-auto"
        >
          {/* Top Armor Flange & Close Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-[#00A3FF]/30">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="font-mono text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 bg-black/80 text-[#00A3FF] border border-[#00A3FF]/50 clip-banner">
                DOM_KEY: {theme.armorCode}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-gray-400">
                <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#cc0000] animate-pulse" />
                <span>TARGET DOMAIN // SECTOR_{theme.number}</span>
              </div>
            </div>

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-1.5 px-2 bg-[#05070a] border border-[#cc0000]/60 hover:bg-[#cc0000]/20 text-[#cc0000] hover:text-white clip-chamfer transition-colors cursor-pointer flex items-center gap-1 text-[10px] sm:text-xs font-mono ml-auto"
            >
              <span>CLOSE</span>
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Main Briefing Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="font-mono text-[10px] sm:text-xs tracking-widest text-[#00A3FF] mb-1.5 sm:mb-2 font-bold uppercase">
                INNOVATION THEME #{theme.number}
              </div>
              <h3 className="text-xl xs:text-2xl sm:text-4xl font-black tracking-wider text-white uppercase">
                {theme.title}
              </h3>
            </div>

            {/* Tactical Specs Tag Box */}
            <div className="bg-black/60 border border-[#1e293b] p-2.5 sm:p-3 clip-chamfer font-mono text-[10px] sm:text-[11px] space-y-1 sm:text-right">
              <div><span className="text-gray-500">COMPLEXITY: </span><span className="text-amber-400">{theme.tacticalSpecs.complexity}</span></div>
              <div><span className="text-gray-500">SECTOR: </span><span className="text-[#00A3FF]">{theme.tacticalSpecs.deploymentSector}</span></div>
              <div><span className="text-gray-500">FREQ: </span><span className="text-[#cc0000]">{theme.tacticalSpecs.matrixFrequency}</span></div>
            </div>
          </div>

          {/* 4 CORE TACTICAL CATEGORIES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 font-sans">
            {/* 1. DOMAIN OVERVIEW */}
            <div className="bg-[#05070a] border border-[#1e293b] p-3.5 sm:p-5 clip-chamfer">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#00A3FF] tracking-wider mb-2 font-orbitron">
                <Terminal className="w-4 h-4 text-[#00A3FF]" />
                <span>DOMAIN OVERVIEW [MISSION DATA]</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {theme.domainOverview}
              </p>
            </div>

            {/* 2. POTENTIAL IMPACT */}
            <div className="bg-[#05070a] border border-[#1e293b] p-5 clip-chamfer">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#cc0000] tracking-wider mb-2 font-orbitron">
                <Zap className="w-4 h-4 text-[#cc0000]" />
                <span>POTENTIAL IMPACT [IMPACT VECTOR]</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {theme.potentialImpact}
              </p>
            </div>

            {/* 3. FOCUS AREAS */}
            <div className="bg-[#05070a] border border-[#1e293b] p-5 clip-chamfer">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 tracking-wider mb-3 font-orbitron">
                <Target className="w-4 h-4 text-amber-400" />
                <span>FOCUS AREAS [TARGET OBJECTIVES]</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-sans">
                {theme.focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. TECHNOLOGY DOMAINS */}
            <div className="bg-[#05070a] border border-[#1e293b] p-5 clip-chamfer">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-400 tracking-wider mb-3 font-orbitron">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span>TECHNOLOGY DOMAINS [TECH STACK]</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {theme.technologyDomains.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-black/60 border border-[#00A3FF]/40 text-[#00A3FF] font-mono text-xs clip-chamfer"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Theme Navigation Quick Switcher */}
          <div className="mt-8 pt-4 border-t border-[#1e293b] flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs text-gray-400">
              SWITCH MATRIX DOMAIN:
            </span>
            <div className="flex flex-wrap gap-2">
              {allThemes.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    playThemeSelect();
                    onSelectAnother(item.id);
                  }}
                  className={`px-3 py-1 text-xs font-mono clip-chamfer transition-colors cursor-pointer ${
                    item.id === theme.id
                      ? 'bg-[#cc0000] text-white font-bold'
                      : 'bg-black/60 text-gray-400 hover:text-[#00A3FF] hover:bg-[#0a0f1d] border border-[#1e293b]'
                  }`}
                >
                  #{item.number}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
