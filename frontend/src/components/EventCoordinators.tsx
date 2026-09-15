import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProfileCard } from './ProfileCard';
import type { Member } from './MemberCarousel';
import { playCarouselMove, playHover, playUiBeep } from '../utils/audio';

interface EventCoordinatorsProps {
  coordinators: Member[];
  title?: string;
  subtitle?: string;
}

export const EventCoordinators: React.FC<EventCoordinatorsProps> = ({
  coordinators,
  title = 'EVENT COORDINATORS',
  subtitle = 'LOGISTICS & OPERATIONS',
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const [targetRotation, setTargetRotation] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartRotation, setDragStartRotation] = useState<number>(0);

  // Responsive radius & card dimensions
  const [dimensions, setDimensions] = useState<{ rx: number; rz: number; cardWidth: number }>({
    rx: 380,
    rz: 170,
    cardWidth: 285,
  });

  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const carouselRef = useRef<HTMLDivElement>(null);

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({ rx: 145, rz: 85, cardWidth: 205 });
      } else if (w < 1024) {
        setDimensions({ rx: 250, rz: 125, cardWidth: 245 });
      } else {
        setDimensions({ rx: 380, rz: 170, cardWidth: 285 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth circular rotation animation loop
  useEffect(() => {
    const animate = (time: number) => {
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (targetRotation !== null) {
        // Interpolate smoothly towards target rotation
        setRotation(prev => {
          const diff = targetRotation - prev;
          if (Math.abs(diff) < 0.15) {
            setTargetRotation(null);
            return targetRotation;
          }
          return prev + diff * 0.08;
        });
      } else if (!isHovered && !isDragging) {
        // Continuous slow cinematic 3D circular orbit
        const speed = (delta / 16.67) * 0.15; // ~0.15 deg per frame (~40s cycle)
        setRotation(prev => (prev + speed) % 360);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [targetRotation, isHovered, isDragging]);

  const totalCards = coordinators.length;
  const angleStep = 360 / (totalCards || 6);

  // Calculate current active front card
  const getActiveIndex = () => {
    let closestIndex = 0;
    let minDiff = Infinity;

    for (let i = 0; i < totalCards; i++) {
      const cardAngle = (i * angleStep + rotation) % 360;
      const normalizedAngle = ((cardAngle + 540) % 360) - 180;
      const diff = Math.abs(normalizedAngle);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }
    return closestIndex;
  };

  const activeIndex = getActiveIndex();

  // Rotate to specific coordinator
  const rotateToIndex = useCallback((index: number) => {
    playCarouselMove();
    playUiBeep(1000);
    const targetAngle = -index * angleStep;
    const currentNorm = rotation % 360;
    let diff = (targetAngle - currentNorm) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    setTargetRotation(rotation + diff);
  }, [angleStep, rotation]);

  const handlePrev = () => {
    playCarouselMove();
    playUiBeep(950);
    const newTarget = (targetRotation ?? rotation) + angleStep;
    setTargetRotation(newTarget);
  };

  const handleNext = () => {
    playCarouselMove();
    playUiBeep(1050);
    const newTarget = (targetRotation ?? rotation) - angleStep;
    setTargetRotation(newTarget);
  };

  // Drag / Swipe Handlers
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setDragStartRotation(targetRotation ?? rotation);
    setTargetRotation(null);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartX;
    const sensitivity = window.innerWidth < 640 ? 0.35 : 0.25;
    setRotation(dragStartRotation + deltaX * sensitivity);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest card position
    const current = rotation;
    const nearestIndex = Math.round(-current / angleStep);
    setTargetRotation(-nearestIndex * angleStep);
  };

  return (
    <section
      id="event-coordinators"
      aria-label="Event Coordinators"
      className="relative w-full my-12 sm:my-20 py-8 sm:py-14 overflow-hidden"
    >
      {/* Dynamic Background Atmosphere Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#00A3FF]/6 blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12 relative z-10">
          {subtitle && (
            <div className="text-[10px] sm:text-xs font-mono tracking-[0.4em] text-[#cc0000] mb-2 sm:mb-3 flex items-center justify-center gap-3 uppercase">
              <span className="w-8 sm:w-12 h-[1px] bg-[#cc0000]/50" />
              <span>{subtitle}</span>
              <span className="w-8 sm:w-12 h-[1px] bg-[#cc0000]/50" />
            </div>
          )}
          {title && (
            <h2 className="font-orbitron font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl tracking-wide text-white uppercase text-glow-white">
              {title}
            </h2>
          )}
          {/* Cyber Underline */}
          <div className="mt-3 flex items-center justify-center gap-1.5 opacity-60">
            <span className="w-2 h-2 bg-[#00A3FF] rotate-45" />
            <span className="w-28 sm:w-44 h-[1px] bg-gradient-to-r from-[#00A3FF] to-transparent" />
          </div>
        </div>

        {/* 3D CIRCULAR ROTATING CAROUSEL */}
        <div className="relative w-full flex flex-col items-center">
          {/* 3D Stage Container */}
          <div
            ref={carouselRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              handlePointerUp();
            }}
            onMouseDown={e => handlePointerDown(e.clientX)}
            onMouseMove={e => handlePointerMove(e.clientX)}
            onMouseUp={handlePointerUp}
            onTouchStart={e => handlePointerDown(e.touches[0].clientX)}
            onTouchMove={e => handlePointerMove(e.touches[0].clientX)}
            onTouchEnd={handlePointerUp}
            className="relative w-full h-[450px] sm:h-[500px] lg:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            style={{
              perspective: '1200px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            {/* Tactical Ambient Orbit Ring in Background */}
            <div
              className="absolute w-[300px] sm:w-[500px] lg:w-[760px] h-[140px] sm:h-[220px] lg:h-[300px] rounded-[50%] border border-[#00A3FF]/15 pointer-events-none -z-10"
              style={{
                transform: 'rotateX(75deg)',
                boxShadow: '0 0 35px rgba(0,163,255,0.06)',
              }}
              aria-hidden="true"
            />

            {/* Left / Right Interactive Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              onMouseEnter={() => playHover()}
              aria-label="Previous Coordinator"
              className="absolute left-2 sm:left-4 lg:left-8 z-30 p-2 sm:p-3 rounded-xl bg-[#0a0f1d]/85 border border-[#00A3FF]/40 text-[#00A3FF] hover:bg-[#00A3FF] hover:text-black hover:shadow-[0_0_15px_rgba(0,163,255,0.7)] transition-all backdrop-blur-md focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              onMouseEnter={() => playHover()}
              aria-label="Next Coordinator"
              className="absolute right-2 sm:right-4 lg:right-8 z-30 p-2 sm:p-3 rounded-xl bg-[#0a0f1d]/85 border border-[#00A3FF]/40 text-[#00A3FF] hover:bg-[#00A3FF] hover:text-black hover:shadow-[0_0_15px_rgba(0,163,255,0.7)] transition-all backdrop-blur-md focus:outline-none"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* The 6 Coordinators Positioned in 3D Circular Orbit */}
            {coordinators.map((coordinator, index) => {
              const cardAngle = (index * angleStep + rotation) % 360;
              const rad = (cardAngle * Math.PI) / 180;

              // 3D Elliptical Position
              const x = dimensions.rx * Math.sin(rad);
              const z = dimensions.rz * Math.cos(rad);

              // Depth calculation: cos(rad) is 1 at front, -1 at back
              const cosVal = Math.cos(rad);
              const depthFactor = (cosVal + 1) / 2; // 0 (back) to 1 (front)

              // Scale & Opacity based on depth
              const scale = 0.74 + 0.26 * depthFactor;
              const opacity = 0.5 + 0.5 * depthFactor;
              const zIndex = Math.round(depthFactor * 100) + 10;

              // Subtle 3D Y-tilt to curve naturally into amphitheater
              const rotY = -Math.sin(rad) * 22;

              const isFront = Math.abs(((cardAngle + 540) % 360) - 180) < 30;

              return (
                <div
                  key={coordinator.name || index}
                  onClick={() => {
                    if (!isFront) {
                      rotateToIndex(index);
                    }
                  }}
                  className="absolute transition-opacity duration-300"
                  style={{
                    width: `${dimensions.cardWidth}px`,
                    transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    filter: isFront ? 'none' : 'brightness(0.85)',
                    pointerEvents: isFront || Math.abs(x) > dimensions.rx * 0.4 ? 'auto' : 'none',
                    cursor: isFront ? 'default' : 'pointer',
                  }}
                >
                  <ProfileCard
                    name={coordinator.name}
                    title={coordinator.role || 'Event Coordinator'}
                    avatarUrl={coordinator.image}
                    showUserInfo={false}
                    enableTilt={isFront}
                    enableMobileTilt={false}
                    index={index}
                    className="w-full"
                  />
                </div>
              );
            })}
          </div>

          {/* Tactical Coordinator Indicator Dots & Quick Selectors */}
          <div className="flex flex-col items-center gap-2 mt-4 z-20">
            <div className="flex items-center gap-2 sm:gap-3">
              {coordinators.map((coordinator, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => rotateToIndex(idx)}
                    onMouseEnter={() => playHover()}
                    aria-label={`Select ${coordinator.name}`}
                    className={`group relative flex items-center justify-center transition-all ${
                      isActive ? 'w-8 sm:w-10' : 'w-2.5 sm:w-3'
                    } h-2.5 sm:h-3 rounded-full`}
                  >
                    <span
                      className={`w-full h-full rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-[#00A3FF] shadow-[0_0_10px_#00A3FF]'
                          : 'bg-gray-600 hover:bg-gray-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Coordinator Quick Readout (No card number) */}
            <div className="font-mono text-xs text-[#00A3FF] tracking-widest uppercase mt-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] animate-pulse" />
              <span>
                ACTIVE // {coordinators[activeIndex]?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
