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

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

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

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
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

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-4">
      {/* Sophisticated Dark Countdown Timer Grid */}
      <div className="flex flex-nowrap items-center justify-center gap-1.5 min-[360px]:gap-2 min-[400px]:gap-3 sm:gap-4 md:gap-6">
        {units.map((unit, idx) => (
          <React.Fragment key={unit.label}>
            <div className="w-16 min-[360px]:w-[70px] min-[400px]:w-20 sm:w-24 md:w-28 h-16 min-[360px]:h-[70px] min-[400px]:h-20 sm:h-24 md:h-28 flex-shrink-0 bg-[#0a0f1d] border-2 border-[#1e293b] flex flex-col items-center justify-center relative shadow-[0_4px_20px_rgba(0,0,0,0.8)] group hover:border-[#00A3FF]/60 transition-colors">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#cc0000]" />

              {/* Number Value */}
              <span className="text-lg min-[360px]:text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl font-black text-white font-orbitron tracking-tight">
                {unit.value}
              </span>

              {/* Label */}
              <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-gray-500 uppercase mt-1 font-bold">
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
      <div className="mt-4 flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-4 text-[9px] min-[360px]:text-[10px] font-mono text-gray-500 tracking-wider uppercase text-center">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
          TARGET: 25 SEP 2026 // 09:00 IST
        </span>
        <span className="hidden sm:inline">|</span>
        <span className="text-[#00A3FF]">CHRONO_STATUS: LOCKED</span>
      </div>
    </div>
  );
};
