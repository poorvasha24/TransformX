import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Zap, Shield, Activity } from 'lucide-react';
import { playUiBeep } from '../utils/audio';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC = () => {
  // Target: 25 September 2026, 09:00:00 IST
  const targetDate = new Date('2026-09-25T09:00:00+05:30').getTime();
  // Round 1 Submission Target: 20 September 2026, 16:00:00 IST
  const round1TargetDate = new Date('2026-09-20T16:00:00+05:30').getTime();

  const calculateTimeLeft = (target: number): TimeLeft => {
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));
  const [round1TimeLeft, setRound1TimeLeft] = useState<TimeLeft>(calculateTimeLeft(round1TargetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
      setRound1TimeLeft(calculateTimeLeft(round1TargetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUnit = (val: number): string => {
    return val.toString().padStart(2, '0');
  };

  const formatDays = (val: number): string => {
    return val.toString();
  };

  const units = [
    { label: 'DAYS', value: formatDays(timeLeft.days), sub: 'ORBITAL CYCLES', accent: 'cyan' },
    { label: 'HOURS', value: formatUnit(timeLeft.hours), sub: 'SOLAR SEGMENTS', accent: 'blue' },
    { label: 'MINUTES', value: formatUnit(timeLeft.minutes), sub: 'CHRONO PULSES', accent: 'red' },
    { label: 'SECONDS', value: formatUnit(timeLeft.seconds), sub: 'WARP UNITS', accent: 'cyan' },
  ];

  const round1Units = [
    { label: 'DAYS', value: formatDays(round1TimeLeft.days) },
    { label: 'HOURS', value: formatUnit(round1TimeLeft.hours) },
    { label: 'MINUTES', value: formatUnit(round1TimeLeft.minutes) },
    { label: 'SECONDS', value: formatUnit(round1TimeLeft.seconds) },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-3 sm:py-4 flex flex-col items-center gap-8 sm:gap-10">
      {/* Main Event Countdown Timer */}
      <div className="w-full">
        <div className="flex flex-nowrap items-center justify-center gap-1.5 min-[360px]:gap-2 min-[400px]:gap-3 sm:gap-4 md:gap-6">
          {units.map((unit, idx) => (
            <React.Fragment key={unit.label}>
              <div className="w-16 min-[360px]:w-[70px] min-[400px]:w-20 sm:w-24 md:w-28 h-16 min-[360px]:h-[70px] min-[400px]:h-20 sm:h-24 md:h-28 flex-shrink-0 bg-[#0a0f1d] border border-[#1e293b] sm:border-2 flex flex-col items-center justify-center relative shadow-[0_4px_20px_rgba(0,0,0,0.8)] group hover:border-[#00A3FF]/60 transition-colors">
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-[#cc0000]" />

                {/* Number Value */}
                <span className="text-lg min-[360px]:text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl font-black text-white font-orbitron tracking-tight">
                  {unit.value}
                </span>

                {/* Label */}
                <span className="text-[7px] xs:text-[8px] sm:text-[9px] font-mono tracking-wider sm:tracking-widest text-gray-500 uppercase mt-0.5 sm:mt-1 font-bold">
                  {unit.label}
                </span>
              </div>

              {/* Separator Colons (Between Items) */}
              {idx < units.length - 1 && (
                <span className="hidden sm:flex text-2xl sm:text-3xl font-black text-[#00A3FF] self-center -mt-2 select-none">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Target Date HUD Sub-badge */}
        <div className="mt-3 sm:mt-4 flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-4 text-[9px] min-[360px]:text-[10px] font-mono text-gray-500 tracking-wider uppercase text-center px-2">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
            TARGET: 25 SEP 2026 // 09:00 IST
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="text-[#00A3FF]">CHRONO_STATUS: LOCKED</span>
        </div>
      </div>

      {/* Secondary Round 1 Submission Deadline Countdown */}
      <div className="w-full flex flex-col items-center mt-2 sm:mt-4 border-t border-[#1e293b]/50 pt-6 sm:pt-8">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="w-1.5 h-1.5 bg-[#cc0000] rotate-45" />
          <span className="font-mono text-[9px] sm:text-[11px] tracking-[0.2em] text-slate-300 uppercase font-bold">
            PHASE 01: SUBMISSION DEADLINE
          </span>
          <div className="w-1.5 h-1.5 bg-[#cc0000] rotate-45" />
        </div>
        
        <div className="flex flex-nowrap items-center justify-center gap-1.5 min-[360px]:gap-2 sm:gap-3">
          {round1Units.map((unit, idx) => (
            <React.Fragment key={`r1-${unit.label}`}>
              <div className="w-12 min-[360px]:w-[52px] sm:w-[68px] h-12 min-[360px]:h-[52px] sm:h-[68px] flex-shrink-0 bg-[#0a0f1d]/80 border border-[#1e293b]/80 sm:border flex flex-col items-center justify-center relative shadow-[0_2px_10px_rgba(0,0,0,0.5)] group hover:border-[#cc0000]/50 transition-colors">
                <span className="text-base sm:text-xl font-black text-slate-200 font-orbitron tracking-tight">
                  {unit.value}
                </span>
                <span className="text-[6px] sm:text-[7px] font-mono tracking-widest text-slate-500 uppercase mt-0.5 sm:mt-1 font-bold">
                  {unit.label}
                </span>
              </div>
              {idx < round1Units.length - 1 && (
                <span className="text-lg sm:text-xl font-black text-slate-700 self-center -mt-1 select-none">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <div className="mt-2.5 sm:mt-3 flex items-center justify-center text-[8px] sm:text-[9px] font-mono text-slate-500 tracking-widest uppercase text-center">
          TARGET: 20 SEP 2026 // 16:00 IST
        </div>
      </div>
    </div>
  );
};
