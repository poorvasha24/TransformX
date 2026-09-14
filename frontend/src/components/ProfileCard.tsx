import React, { useState, useRef, useCallback, useEffect } from 'react';
import { playHover, playUiBeep } from '../utils/audio';

export interface ProfileCardProps {
  name: string;
  title?: string;
  avatarUrl?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  index?: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title = 'EVENT COORDINATOR',
  avatarUrl,
  enableTilt = true,
  enableMobileTilt = false,
  index = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });

  useEffect(() => {
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouch(isCoarse);
    };
    checkTouch();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || (!enableTilt && !isTouch) || (isTouch && !enableMobileTilt)) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Subtle 3D tilt: max ~10 degrees
    const maxTilt = 10;
    const rotX = (y - 0.5) * -maxTilt;
    const rotY = (x - 0.5) * maxTilt;

    setTilt({ x: rotX, y: rotY });
    setGlare({
      x: x * 100,
      y: y * 100,
      opacity: 0.35,
    });
  }, [enableTilt, isTouch, enableMobileTilt]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHover();
    playUiBeep(920 + (index % 6) * 50);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  const handleFocus = () => {
    setIsHovered(true);
  };

  const handleBlur = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  const canTilt = enableTilt && (!isTouch || enableMobileTilt);

  const formattedId = `COORD // 0${(index % 9) + 1}`;

  return (
    <div
      className="relative w-full max-w-[320px] mx-auto group select-none"
      style={{
        perspective: '1000px',
      }}
    >
      {/* Dynamic behind-card ambient glow */}
      <div
        className="absolute -inset-1.5 sm:-inset-2 rounded-2xl transition-all duration-500 -z-10 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(0, 163, 255, 0.45) 0%, rgba(0, 163, 255, 0.15) 50%, transparent 75%)`
            : 'radial-gradient(circle at 50% 50%, rgba(0, 163, 255, 0.12) 0%, transparent 70%)',
          filter: isHovered ? 'blur(20px)' : 'blur(12px)',
          opacity: isHovered ? 1 : 0.6,
        }}
        aria-hidden="true"
      />

      {/* Main 3D Card Body */}
      <div
        ref={cardRef}
        tabIndex={0}
        aria-label={`${name} - ${title}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="relative w-full overflow-hidden rounded-2xl border border-[#00A3FF]/25 bg-[#0a0f1d]/90 backdrop-blur-md shadow-2xl transition-all focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/70"
        style={{
          aspectRatio: '0.718',
          transform: canTilt && isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) scale(1.02)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s ease-out, border-color 0.3s ease, box-shadow 0.3s ease'
            : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.5s ease, box-shadow 0.5s ease',
          boxShadow: isHovered
            ? '0 20px 35px -10px rgba(0, 0, 0, 0.8), 0 0 25px 2px rgba(0, 163, 255, 0.3)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 10px 0 rgba(0, 163, 255, 0.08)',
        }}
      >
        {/* Background Cybernetic Dot Texture */}
        <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" aria-hidden="true" />

        {/* Large Portrait Image Container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover object-[center_18%] brightness-[0.92] contrast-[1.06] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-100"
            />
          ) : (
            /* Futuristic Cyber Fallback Avatar (Dhayaa Shri S) */
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0e1628] to-[#060a14] relative">
              <div className="absolute inset-0 bg-cyber-grid opacity-30" />
              {/* Tactical reticle graphic */}
              <div className="relative w-28 h-28 rounded-full border border-[#00A3FF]/40 flex items-center justify-center shadow-[0_0_25px_rgba(0,163,255,0.2)]">
                <div className="absolute inset-2 rounded-full border border-dashed border-[#00A3FF]/30 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-4 rounded-full bg-[#00A3FF]/10 flex items-center justify-center backdrop-blur-sm">
                  <span className="font-orbitron text-3xl font-extrabold text-[#00A3FF] tracking-wider">
                    {name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </span>
                </div>
              </div>
              <span className="mt-4 font-mono text-[11px] tracking-[0.3em] text-[#00A3FF]/80 uppercase">
                COORDINATOR AVATAR
              </span>
            </div>
          )}

          {/* Top Vignette Overlay */}
          <div
            className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#05070a]/80 via-[#05070a]/30 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Bottom Gradient Fade for High-Contrast Typography */}
          <div
            className="absolute inset-x-0 bottom-0 h-44 sm:h-48 bg-gradient-to-t from-[#05070a] via-[#05070a]/85 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Dynamic Sheen / Glare Layer */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 300px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.3) 0%, rgba(0, 163, 255, 0.15) 45%, transparent 75%)`,
            opacity: glare.opacity,
          }}
          aria-hidden="true"
        />

        {/* Futuristic Technical Top HUD Header */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10 px-1">
          <div className="flex items-center gap-1.5 bg-[#05070a]/75 backdrop-blur-sm px-2 py-0.5 rounded border border-[#00A3FF]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse shadow-[0_0_6px_#00A3FF]" />
            <span className="font-mono text-[10px] text-[#00A3FF] tracking-widest uppercase">
              {formattedId}
            </span>
          </div>
          <div className="bg-[#05070a]/75 backdrop-blur-sm px-2 py-0.5 rounded border border-[#00A3FF]/20">
            <span className="font-mono text-[9px] text-gray-400 tracking-wider">TX // 2026</span>
          </div>
        </div>

        {/* Corner HUD Accent Brackets (TRANSFORM X signature) */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00A3FF]/60 pointer-events-none z-10 group-hover:border-[#00A3FF] transition-colors" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00A3FF]/60 pointer-events-none z-10 group-hover:border-[#00A3FF] transition-colors" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00A3FF]/60 pointer-events-none z-10 group-hover:border-[#00A3FF] transition-colors" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00A3FF]/60 pointer-events-none z-10 group-hover:border-[#00A3FF] transition-colors" />

        {/* Bottom Coordinator Information Plate */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col justify-end z-10 pointer-events-none">
          {/* Subtle Technical Border Separator */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF]/40 to-transparent mb-2.5 opacity-70 group-hover:opacity-100 transition-opacity" />

          {/* Coordinator Name */}
          <h3 className="font-orbitron font-extrabold text-base sm:text-lg text-white uppercase tracking-wider leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] truncate">
            {name}
          </h3>

          {/* Role & Technical Beacon */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#cc0000] rounded-full animate-pulse shadow-[0_0_6px_#cc0000]" />
              <p className="font-mono text-xs text-[#00A3FF] uppercase tracking-widest font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                {title}
              </p>
            </div>
            <span className="font-mono text-[9px] text-[#00A3FF]/60 tracking-wider">
              OPERATIONS
            </span>
          </div>
        </div>

        {/* Subtle hover illumination border rim */}
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#00A3FF]/50 transition-colors pointer-events-none" />
      </div>
    </div>
  );
};
