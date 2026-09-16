import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle, ShieldAlert, FileText, Users, Clock, Crosshair, Award } from 'lucide-react';

const rules = [
  {
    id: 1,
    icon: <Award className="w-6 h-6 text-[#00A3FF]" />,
    title: "Leadership Requirement",
    text: "A shortlisted Skill Rack Topper must be the Team Lead."
  },
  {
    id: 2,
    icon: <Users className="w-6 h-6 text-[#cc0000]" />,
    title: "Code Club Exclusivity",
    text: "All team members must be Code Club members otherwise, the team will be disqualified."
  },
  {
    id: 3,
    icon: <CheckCircle className="w-6 h-6 text-[#00A3FF]" />,
    title: "Single Team Participation",
    text: "Each participant can be a member of only one team."
  },
  {
    id: 4,
    icon: <ShieldAlert className="w-6 h-6 text-[#cc0000]" />,
    title: "Zero Tolerance for Plagiarism",
    text: "Plagiarism, copying another team’s work, or submitting previously developed projects as the primary solution will result in disqualification."
  },
  {
    id: 5,
    icon: <Clock className="w-6 h-6 text-[#00A3FF]" />,
    title: "Strict Deadlines",
    text: "Teams must submit their project and required presentation before the official deadline."
  },
  {
    id: 6,
    icon: <FileText className="w-6 h-6 text-[#00A3FF]" />,
    title: "Official Presentation Format",
    text: "Use the official presentation template provided through the Google Form and attached on the website. All content must follow the specified format: Times New Roman, 20 pt, red colour, clear formatting, and the prescribed slide structure."
  },
  {
    id: 7,
    icon: <Crosshair className="w-6 h-6 text-[#cc0000]" />,
    title: "Domain Selection & Evaluation",
    text: "Each domain will have only 4 selected teams. Selection will be based on idea evaluation, not first-come-first-served. The earlier you submit, the earlier your idea can be evaluated. Once 4 teams are selected for a domain, that domain will be removed from the selectable options. Don’t wait until the deadline—submit early and grab your opportunity! 🚀"
  }
];

export const RulesSection: React.FC = () => {
  return (
    <section id="rules" className="py-20 relative bg-[#05070a] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-5" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 border border-[#cc0000]/30 bg-[#cc0000]/10 rounded-full mb-6"
          >
            <AlertTriangle className="w-5 h-5 text-[#cc0000] animate-pulse" />
            <span className="font-mono text-sm font-bold text-[#cc0000] tracking-widest uppercase">
              Important Protocol
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black font-orbitron tracking-tight mb-6"
          >
            RULES & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cc0000] to-[#ff4d4d]">GUIDELINES</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-mono text-sm max-w-2xl mx-auto"
          >
            Please go through the following rules carefully before registering or submitting your idea.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative p-6 bg-[#0a0f1d] border border-white/5 hover:border-[#00A3FF]/50 transition-all duration-300 rounded-lg overflow-hidden ${
                index === rules.length - 1 ? 'md:col-span-2' : ''
              }`}
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A3FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-[#00A3FF] transition-colors" />

              <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 bg-[#111827] rounded-lg border border-white/10 group-hover:border-[#00A3FF]/30 transition-colors shadow-lg">
                  {rule.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold font-mono tracking-wider mb-2 text-lg">
                    {rule.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    {rule.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center p-6 border border-[#00A3FF]/30 bg-[#00A3FF]/5 rounded-lg shadow-[0_0_30px_rgba(0,163,255,0.1)]"
        >
          <p className="font-mono text-[#00A3FF] text-lg font-bold tracking-widest uppercase">
            ✨ Read the rules carefully, prepare your best idea, and get ready to TRANSFORMX! 🤖⚡
          </p>
        </motion.div>
      </div>
    </section>
  );
};
