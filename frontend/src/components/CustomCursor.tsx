import React, { useEffect, useState, useRef } from 'react';
import { playClick } from '../utils/audio';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const trailRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only enable cursor on devices that actually have a fine pointer (mouse/trackpad)
    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;
    if (isTouchOnly || window.innerWidth < 768) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    let rafId: number | null = null;
    let latestX = -100;
    let latestY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setPos({ x: latestX, y: latestY });
          trailRef.current = [
            { x: latestX, y: latestY },
            ...(trailRef.current.slice(0, 5))
          ];
          rafId = null;
        });
      }

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('button, a, input, [role="button"], .clickable, .interactive-mech');
        setIsHovered(isClickable);
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      playClick();
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Energy trail dots */}
      {trailRef.current.map((point, idx) => (
        <div
          key={idx}
          className="absolute rounded-full pointer-events-none transition-opacity duration-150"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${Math.max(2, 6 - idx)}px`,
            height: `${Math.max(2, 6 - idx)}px`,
            transform: 'translate(-50%, -50%)',
            backgroundColor: isHovered ? '#cc0000' : '#00A3FF',
            opacity: ((5 - idx) / 5) * 0.4,
            boxShadow: isHovered
              ? '0 0 8px rgba(204, 0, 0, 0.8)'
              : '0 0 8px rgba(0, 163, 255, 0.8)',
          }}
        />
      ))}

      {/* Main Targeting Reticle Container */}
      <div
        className="absolute pointer-events-none transition-transform duration-100 ease-out flex items-center justify-center w-12 h-12"
        style={{
          left: `${pos.x - 24}px`, // 24 is half of 48 (w-12)
          top: `${pos.y - 24}px`,
          transform: `scale(${isClicked ? 0.85 : isHovered ? 1.3 : 1})`,
        }}
      >
        {/* Center glowing precision dot */}
        <div
          className={`rounded-full transition-colors duration-200 absolute ${
            isHovered ? 'w-2 h-2 bg-[#cc0000] shadow-[0_0_12px_#cc0000]' : 'w-1.5 h-1.5 bg-[#00A3FF] shadow-[0_0_10px_#00A3FF]'
          }`}
        />

        {/* Rotating Outer Reticle Rings */}
        <div
          className={`w-10 h-10 rounded-full border border-dashed transition-all duration-300 animate-spin absolute ${
            isHovered
              ? 'border-[#cc0000] scale-125 opacity-90 [animation-duration:3s]'
              : 'border-[#00A3FF]/50 opacity-60 [animation-duration:8s]'
          }`}
        />

        {/* Crosshair Brackets: Top-Left */}
        <div
          className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 transition-all duration-200 ${
            isHovered ? 'border-[#cc0000] -translate-x-1 -translate-y-1' : 'border-[#00A3FF]'
          }`}
        />
        {/* Top-Right */}
        <div
          className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 transition-all duration-200 ${
            isHovered ? 'border-[#cc0000] translate-x-1 -translate-y-1' : 'border-[#00A3FF]'
          }`}
        />
        {/* Bottom-Left */}
        <div
          className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 transition-all duration-200 ${
            isHovered ? 'border-[#cc0000] -translate-x-1 translate-y-1' : 'border-[#00A3FF]'
          }`}
        />
        {/* Bottom-Right */}
        <div
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 transition-all duration-200 ${
            isHovered ? 'border-[#cc0000] translate-x-1 translate-y-1' : 'border-[#00A3FF]'
          }`}
        />

        {/* Tactical HUD Coordinates Readout */}
        {isHovered && (
          <div className="absolute top-12 left-12 font-mono text-[9px] tracking-widest text-[#cc0000] whitespace-nowrap bg-black/90 px-1.5 py-0.5 border border-[#cc0000]/40 clip-chamfer">
            TARGET_LOCKED [X:{Math.round(pos.x)} Y:{Math.round(pos.y)}]
          </div>
        )}
      </div>
    </div>
  );
};
