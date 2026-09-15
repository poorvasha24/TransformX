import React, { useState, useEffect } from 'react';
import { IntroSequence } from './components/IntroSequence';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventDetails } from './components/EventDetails';
import { EventHighlights } from './components/EventHighlights';
import { EventSponsors } from './components/EventSponsors';
import { ThemesSection } from './components/ThemesSection';
import { RoadmapTimeline } from './components/RoadmapTimeline';
import { RegisterSection } from './components/RegisterSection';
import { RobotCommanderGuide } from './components/RobotCommanderGuide';
import { Footer } from './components/Footer';
import { AboutSection } from './components/AboutSection';
import { MemberCarousel } from './components/MemberCarousel';
import type { Member } from './components/MemberCarousel';
import { EventCoordinators } from './components/EventCoordinators';

const generateMembers = (count: number, prefix: string): Member[] => {
  return Array.from({ length: count }).map((_, i) => ({
    name: `${prefix} ${i + 1}`,
    role: `ROLE_${Math.floor(Math.random() * 1000)}`
  }));
};

const coreMembers = generateMembers(5, 'Scope Member').map((member, index) => {
  if (index === 0) { return { name: 'Dr. S. Vidya', role: 'Strategist', image: '/images/CODE CLUB.png' }; }
  if (index === 1) { return { name: 'Dr. B. Latha', role: 'Captain', image: '/images/CODE CLUB (1).png' }; }
  if (index === 2) { return { name: 'Dr. M. Nithya', role: 'Organizer', image: '/images/CODE CLUB (2).png' }; }
  if (index === 3) { return { name: 'Dr. G. Manimala', role: 'Propagator', image: '/images/CODE CLUB (3).png' }; }
  if (index === 4) { return { name: 'Dr. J. M Nandhini', role: 'Executor', image: '/images/CODE CLUB (4).png' }; }
  return member;
});

const magicMembers = generateMembers(5, 'Magic Member').map((member, index) => {
  if (index === 0) { return { name: 'Haswin Singh A K', role: 'Master Mind', image: '/images/WhatsApp Image 2026-09-05 at 4.21.14 PM.jpeg' }; }
  if (index === 1) { return { name: 'Ram Murugan G', role: 'Advocate', image: '/images/WhatsApp Image 2026-09-05 at 4.19.50 PM.jpeg' }; }
  if (index === 2) { return { name: 'Keerthivasan', role: 'Guide', image: '/images/WhatsApp Image 2026-09-06 at 2.23.23 PM.jpeg' }; }
  if (index === 3) { return { name: 'Kavinayaa V', role: 'Influencer', image: '/images/WhatsApp Image 2026-09-05 at 2.50.33 PM.jpeg' }; }
  if (index === 4) { return { name: 'Gunagaran S K', role: 'Communicator', image: '/images/WhatsApp Image 2026-09-05 at 6.11.37 PM (1).jpeg' }; }
  return member;
});

const prospectiveMembers = generateMembers(5, 'Prospective Member').map((member, index) => {
  if (index === 0) { // 1st member
    return {
      name: 'Sesh Hari Narayan',
      role: 'Mastermind',
      image: '/images/WhatsApp Image 2026-09-05 at 5.54.39 PM.jpeg'
    };
  }
  if (index === 1) { // 2nd member
    return {
      name: 'Narmadha S D',
      role: 'Advocate',
      image: '/images/Narmadha S D.jpg'
    };
  }
  if (index === 2) { return { name: 'Sri Hariharan R', role: 'Guide', image: '/images/WhatsApp Image 2026-09-05 at 4.19.32 PM.jpeg' }; }
  if (index === 3) { return { name: 'Rajiv G', role: 'Influencer', image: '/images/WhatsApp Image 2026-09-05 at 4.24.21 PM.jpeg' }; }
  if (index === 4) { return { name: 'Lipiga T', role: 'Communicator', image: '/images/WhatsApp Image 2026-09-06 at 1.41.46 PM.jpeg' }; }
  return member;
});

const eventCoordinators = generateMembers(6, 'Event Coordinator').map((member, index) => {
  if (index === 0) { return { name: 'Poorvasha K', role: 'Event Coordinator', image: '/images/poorvasha.jpeg' }; }
  if (index === 1) { return { name: 'Dhayaa Shri S', role: 'Event Coordinator', image: '' }; }
  if (index === 2) { return { name: 'Darshana S', role: 'Event Coordinator', image: '/images/dharshana.jpeg' }; }
  if (index === 3) { return { name: 'Megesh L', role: 'Event Coordinator', image: '/images/megesg.jpeg' }; }
  if (index === 4) { return { name: 'Praveen Kumar R', role: 'Event Coordinator', image: '/images/praveen.jpeg' }; }
  if (index === 5) { return { name: 'Harsharani R B', role: 'Event Coordinator', image: '/images/harshu.jpeg' }; }
  return member;
});

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track active section on scroll without layout thrashing
  useEffect(() => {
    let ticking = false;
    const sections = ['hero', 'event', 'themes', 'roadmap', 'about', 'register'];

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-[#e0e0e0] font-sans selection:bg-[#00A3FF] selection:text-black relative overflow-x-hidden">
      {/* Background Sophisticated Dark Radial Grid */}
      <div className="fixed inset-0 bg-sophisticated-radial opacity-20 pointer-events-none z-0" />

      {/* Futuristic Corner HUD Target Brackets */}
      <div className="fixed inset-0 pointer-events-none z-30 hidden sm:block">
        <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#00A3FF] opacity-40" />
        <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#00A3FF] opacity-40" />
        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#00A3FF] opacity-40" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#00A3FF] opacity-40" />
      </div>

      {/* Custom Targeting Reticle Cursor */}
      <CustomCursor />

      {/* Cinematic Full-Screen Intro Sequence */}
      {showIntro ? (
        <IntroSequence onComplete={() => setShowIntro(false)} />
      ) : (
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Floating Mechanical HUD Navigation */}
          <Navbar
            activeSection={activeSection}
            onNavigate={scrollToSection}
            onReplayIntro={handleReplayIntro}
          />

          {/* Main Content Stream */}
          <main className="flex-1">
            {/* Hero Section */}
            <Hero
              onExploreThemes={() => scrollToSection('themes')}
              onInitiateRegister={() => scrollToSection('register')}
              onViewRoadmap={() => scrollToSection('roadmap')}
            />

            {/* Event Details Section */}
            <EventDetails />

            {/* Event Highlights Section */}
            <EventHighlights />

            {/* Event Sponsors Section */}
            <EventSponsors />

            {/* SIH 7 Themes Innovation Matrix */}
            <ThemesSection />

            {/* Roadmap Timeline Section */}
            <RoadmapTimeline />

            {/* About Section */}
            <AboutSection />

            {/* Member Carousels & Event Coordinators */}
            <MemberCarousel title="SCOPE MEMBERS" subtitle="CORE LEADERSHIP TEAM" members={coreMembers.map(m => ({ ...m, group: 'SCOPE MEMBERS' }))} gridMode={false} />
            <EventCoordinators coordinators={eventCoordinators} />
            <MemberCarousel title="MAGIC MEMBERS" subtitle="INNOVATION & STRATEGY" members={magicMembers.map(m => ({ ...m, group: 'MAGIC MEMBERS' }))} gridMode={false} />
            <MemberCarousel title="PROSPECTIVE MAGIC MEMBERS" subtitle="FUTURE INITIATIVES" members={prospectiveMembers.map(m => ({ ...m, group: 'PROSPECTIVE MAGIC MEMBERS' }))} gridMode={false} />

            {/* Register Section */}
            <RegisterSection />
          </main>

          {/* Interactive Pixel-Art Robot Commander Guide */}
          <RobotCommanderGuide currentSection={activeSection} />

          {/* Tactical Command Footer */}
          <Footer
            onNavigate={scrollToSection}
            onReplayIntro={handleReplayIntro}
          />
        </div>
      )}
    </div>
  );
}
