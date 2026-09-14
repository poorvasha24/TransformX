import React from 'react';
import { motion } from 'motion/react';
import { ProfileCard } from './ProfileCard';
import type { Member } from './MemberCarousel';

interface EventCoordinatorsProps {
  coordinators: Member[];
  title?: string;
  subtitle?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export const EventCoordinators: React.FC<EventCoordinatorsProps> = ({
  coordinators,
  title = 'EVENT COORDINATORS',
  subtitle = 'LOGISTICS & OPERATIONS',
}) => {
  return (
    <section
      id="event-coordinators"
      aria-label="Event Coordinators"
      className="relative w-full my-12 sm:my-20 py-8 sm:py-12 overflow-hidden"
    >
      {/* Subtle Background Glow behind the section */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#00A3FF]/5 blur-[120px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 relative z-10">
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
          {/* Subtle Cyber Underline */}
          <div className="mt-3 flex items-center justify-center gap-1.5 opacity-60">
            <span className="w-2 h-2 bg-[#00A3FF] rotate-45" />
            <span className="w-24 sm:w-36 h-[1px] bg-gradient-to-r from-[#00A3FF] to-transparent" />
          </div>
        </div>

        {/* 6-Card Responsive Grid: Desktop 3x2, Tablet 2x3, Mobile 1x6 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 justify-items-center"
        >
          {coordinators.map((coordinator, index) => (
            <motion.div
              key={coordinator.name || index}
              variants={cardVariants}
              className="w-full flex justify-center"
            >
              <ProfileCard
                name={coordinator.name}
                title={coordinator.role || 'Event Coordinator'}
                avatarUrl={coordinator.image}
                showUserInfo={false}
                enableTilt={true}
                enableMobileTilt={false}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
