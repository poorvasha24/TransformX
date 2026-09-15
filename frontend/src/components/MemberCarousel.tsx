import React, { useState } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { playHover, playUiBeep } from '../utils/audio';

export interface Member {
  name: string;
  role: string;
  image?: string;
  group?: string;
}

interface MemberCarouselProps {
  title: string;
  subtitle: string;
  members: Member[];
  gridMode?: boolean;
}

export const MemberCarousel: React.FC<MemberCarouselProps> = ({ title, subtitle, members, gridMode = false }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const dragX = useMotionValue(0);

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      let newX = dragX.get() - e.deltaX;
      if (newX < -15000) newX = -15000;
      if (newX > 15000) newX = 15000;
      dragX.set(newX);
    }
  };

  const duplicatedMembers = Array(4).fill(members).flat();

  const content = duplicatedMembers.map((member, index) => {
    const isEventCoordinator = member.group === 'EVENT COORDINATORS';
    const uniqueKey = `${member.name}-${member.role}-${index}`;

    return (
      <React.Fragment key={uniqueKey}>
        {index % members.length === 0 && title !== 'EVENT COORDINATORS' && (
          <div className="flex flex-col items-center justify-center mx-2 gap-2 opacity-60 flex-shrink-0 pointer-events-none">
            <div className="w-[2px] h-24 bg-gradient-to-b from-transparent to-[#00A3FF]" />
            <div className="text-[10px] font-mono text-[#00A3FF] -rotate-90 my-12 tracking-[0.3em] whitespace-nowrap">
              START SEQUENCE
            </div>
            <div className="w-[2px] h-24 bg-gradient-to-t from-transparent to-[#00A3FF]" />
          </div>
        )}
        <div
          onMouseEnter={() => {
            setIsHovered(true);
            playHover();
            playUiBeep(900 + (index % members.length) * 50);
          }}
          onMouseLeave={() => setIsHovered(false)}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          onTouchCancel={() => setIsHovered(false)}
          className={`carousel-slot group relative h-72 sm:h-80 flex-shrink-0 cursor-pointer overflow-hidden clip-chamfer border-2 border-[#1e293b] hover:border-[#00A3FF] hover:-translate-y-2 transition-all bg-[#0a0f1d] ${
            gridMode ? 'w-full' : 'w-52 min-[400px]:w-60 sm:w-64 snap-center'
          }`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
          
          {/* Member Image (Placeholder if none) */}
          <div className="absolute inset-0">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900 group-hover:bg-gray-800 transition-colors">
                <span className="text-gray-600 font-mono text-4xl font-bold">?</span>
              </div>
            )}
          </div>

          {/* Bottom Left Details (Transformers style HUD) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
            <h4 className="font-orbitron font-bold text-lg text-white uppercase truncate">{member.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-[#cc0000] rounded-full animate-pulse" />
              <p className="font-mono text-xs text-[#00A3FF] uppercase tracking-wider truncate">
                {!isEventCoordinator ? (
                  <>
                    <span className="text-base text-[#cc0000] font-extrabold drop-shadow-[0_0_4px_rgba(204,0,0,0.6)]">{member.role.charAt(0)}</span>
                    {member.role.slice(1)}
                  </>
                ) : (
                  <>{member.role}</>
                )}
              </p>
            </div>
          </div>
          
          {/* Tech Overlay corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00A3FF]/50" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00A3FF]/50" />
        </div>
      </React.Fragment>
    );
  });

  if (gridMode) {
    return (
      <div className="my-12 px-4 sm:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="text-[10px] font-mono tracking-[0.4em] text-[#cc0000] mb-3 flex items-center justify-center gap-3 uppercase">
            <span className="w-8 h-[1px] bg-[#cc0000]/40" />
            <span>{subtitle}</span>
            <span className="w-8 h-[1px] bg-[#cc0000]/40" />
          </div>
          <h2 className="font-orbitron font-black text-2xl sm:text-4xl tracking-wide text-white uppercase">{title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {members.map((member, index) => {
            const isEventCoordinator = member.group === 'EVENT COORDINATORS';
            return (
              <div key={index} className="group relative h-80 flex-shrink-0 cursor-pointer overflow-hidden clip-chamfer border-2 border-[#1e293b] hover:border-[#00A3FF] hover:-translate-y-2 transition-all bg-[#0a0f1d] w-full">
                {/* ... simple grid rendering logic if needed, although we are not using gridMode right now ... */}
                <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
                <div className="absolute inset-0">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900 group-hover:bg-gray-800 transition-colors">
                      <span className="text-gray-600 font-mono text-4xl font-bold">?</span>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <h4 className="font-orbitron font-bold text-lg text-white uppercase truncate">{member.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-[#cc0000] rounded-full animate-pulse" />
                    <p className="font-mono text-xs text-[#00A3FF] uppercase tracking-wider truncate">
                      {!isEventCoordinator ? (
                        <>
                          <span className="text-base text-[#cc0000] font-extrabold drop-shadow-[0_0_4px_rgba(204,0,0,0.6)]">{member.role.charAt(0)}</span>
                          {member.role.slice(1)}
                        </>
                      ) : (
                        <>{member.role}</>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden my-6 sm:my-12 py-4 sm:py-8">
      {(title || subtitle) && (
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8 relative z-10 px-4">
          {subtitle && (
            <div className="text-[10px] font-mono tracking-[0.4em] text-[#cc0000] mb-2 sm:mb-3 flex items-center justify-center gap-3 uppercase">
              <span className="w-8 h-[1px] bg-[#cc0000]/40" />
              <span>{subtitle}</span>
              <span className="w-8 h-[1px] bg-[#cc0000]/40" />
            </div>
          )}
          {title && (
            <h2 className="font-orbitron font-black text-xl xs:text-2xl sm:text-4xl tracking-wide text-white uppercase" dangerouslySetInnerHTML={{__html: title}}></h2>
          )}
        </div>
      )}
      
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
          <div 
            style={{ animationPlayState: isHovered ? 'paused' : undefined }}
            className={`flex gap-4 sm:gap-6 min-w-max px-4 py-4 sm:py-8 pointer-events-auto animate-marquee hover:pause-animation ${isHovered ? 'is-paused' : ''}`}
          >
            {content}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
