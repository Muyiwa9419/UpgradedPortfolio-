import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  ExternalLink, 
  Code2, 
  Terminal, 
  User, 
  FolderGit2, 
  ChevronRight, 
  GraduationCap, 
  Eye, 
  Mail, 
  Sliders, 
  Bot, 
  Calendar, 
  MapPin, 
  Cpu, 
  Layers, 
  FileText, 
  CheckCircle2,
  Menu,
  X,
  TrendingUp,
  Settings,
  Flame,
  BookOpen,
  Users,
  Award,
  Globe
} from "lucide-react";

import TerminalSpace from "./components/TerminalSpace";
import CodeUpgrader from "./components/CodeUpgrader";
import AIPortfolioAgent from "./components/AIPortfolioAgent";

import { projectsData, experiencesData, skillsByCategory, coachingProgramsData } from "./data";
import { Project } from "./types";

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [localTime, setLocalTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Maintain local time updates for David's workstation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("david.muyiwa.31@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const filteredProjects = filterCategory === "All"
    ? projectsData
    : projectsData.filter(p => p.category === filterCategory);

  return (
    <div className="min-h-screen bg-brand-dark-950 text-white font-sans selection:bg-brand-cyan/20 selection:text-white overflow-x-hidden antialiased">
      
      {/* Background Ambience Particles */}
      <div className="absolute top-10 left-[10%] w-[500px] h-[500px] bg-brand-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-[15%] w-[450px] h-[450px] bg-brand-emerald/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Header Translucent Navigation Bar */}
      <header className="sticky top-0 z-50 bg-brand-dark-950/70 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Mark */}
          <a href="#hero" className="flex items-center space-x-2.5 group">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-emerald p-[1px] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <span className="w-full h-full bg-brand-dark-900 rounded-[11px] flex items-center justify-center font-display font-black text-sm text-white tracking-widest tracking-tighter">
                DO
              </span>
            </span>
            <div className="hidden sm:block">
              <p className="text-sm font-display font-black leading-none text-white tracking-wide">David Olumuyiwa</p>
              <p className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider mt-0.5">Full stack upgraded</p>
            </div>
          </a>

          {/* Desktop Navigation Link Tabs */}
          <nav className="hidden md:flex items-center space-x-1.5 font-mono text-xs">
            <a href="#hero" className="px-3.5 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition">
              ~/home
            </a>
            <a href="#diagnostics" className="px-3.5 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition">
              /shell
            </a>
            <a href="#skills" className="px-3.5 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition">
              /stack
            </a>
            <a href="#upgrader" className="px-3.5 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition">
              /playground
            </a>
            <a href="#coaching" className="px-3.5 py-1.5 rounded-lg text-brand-emerald hover:text-white hover:bg-brand-emerald/10 border border-brand-emerald/10 hover:border-brand-emerald/20 transition flex items-center space-x-1 font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-brand-emerald" />
              <span>/coaching</span>
            </a>
            <a href="#projects" className="px-3.5 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition">
              /works
            </a>
            <a href="#ai-recruiter" className="px-3.5 py-1.5 rounded-lg text-brand-cyan hover:text-brand-cyan/80 bg-brand-cyan/10 border border-brand-cyan/15 hover:border-brand-cyan/30 transition shadow-sm font-bold flex items-center space-x-1.5">
              <Bot className="w-3.5 h-3.5" />
              <span>AI_recruiter</span>
            </a>
          </nav>

          {/* Right Section / Mobile trigger */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-1.5 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg font-mono text-[10px] text-gray-400">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shrink-0" />
              <span>STATION: {localTime || "00:00:00"}</span>
            </div>

            <button 
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 md:hidden text-gray-400 hover:text-white transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden sticky top-16 left-0 w-full bg-brand-dark-900 border-b border-white/10 z-40 p-6 flex flex-col space-y-4 font-mono text-sm"
          >
            <a 
              href="#hero" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-gray-400 hover:text-white flex items-center"
            >
              <ChevronRight className="w-4 h-4 mr-2 text-brand-cyan" />
              ~/home
            </a>
            <a 
              href="#diagnostics" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-gray-400 hover:text-white flex items-center"
            >
              <ChevronRight className="w-4 h-4 mr-2 text-brand-cyan" />
              /shell
            </a>
            <a 
              href="#skills" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-gray-400 hover:text-white flex items-center"
            >
              <ChevronRight className="w-4 h-4 mr-2 text-brand-cyan" />
              /stack
            </a>
            <a 
              href="#upgrader" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-gray-400 hover:text-white flex items-center"
            >
              <ChevronRight className="w-4 h-4 mr-2 text-brand-cyan" />
              /playground
            </a>
            <a 
              href="#coaching" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-brand-emerald hover:text-white flex items-center font-bold"
            >
              <ChevronRight className="w-4 h-4 mr-2 text-brand-emerald" />
              /coaching
            </a>
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-gray-400 hover:text-white flex items-center"
            >
              <ChevronRight className="w-4 h-4 mr-2 text-brand-cyan" />
              /works
            </a>
            <a 
              href="#ai-recruiter" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-brand-cyan hover:text-brand-cyan/80 bg-brand-cyan/10 border border-brand-cyan/15 rounded-lg px-4 flex items-center justify-center space-x-1.5 h-10 font-bold"
            >
              <Bot className="w-4 h-4" />
              <span>AI_recruiter</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-24 relative z-10 transition-all">
        
        {/* SECTION 1: HERO MODULE */}
        <section id="hero" className="pt-8 md:pt-16 pb-8 text-center md:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero text branding */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Launcher banner tag */}
              <div className="inline-flex items-center space-x-2.5 bg-brand-cyan/10 border border-brand-cyan/15 rounded-full px-3.5 py-1.5 text-xs text-brand-cyan font-mono select-none">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                <span className="font-bold">SYSTEM UPGRADE: v2.5 ACTIVE</span>
              </div>

              {/* Title heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                I Grow Your Business With Websites that <span className="bg-gradient-to-r from-brand-cyan to-brand-emerald bg-clip-text text-transparent">Convert</span>.
              </h1>

              {/* Pitch narrative */}
              <p className="text-sm md:text-base text-gray-400 max-w-xl leading-relaxed">
                I build blazing-fast, secure, and Google-visible web platforms tailored to amplify your brand visibility and skyrocket user conversion rates. I also offer expert full-stack coaching to empower squads with high-velocity engineering rules.
              </p>

              {/* Call-to-actions buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <a 
                  href="#ai-recruiter" 
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-cyan hover:bg-brand-cyan/85 text-black font-semibold shadow-xl transition-all flex items-center justify-center space-x-2"
                >
                  <Bot className="w-4 h-4" />
                  <span>Activate AI Advisor</span>
                </a>
                <a 
                  href="#coaching" 
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition flex items-center justify-center space-x-2"
                >
                  <TrendingUp className="w-4 h-4 text-brand-emerald" />
                  <span>Conversion & Coaching</span>
                </a>
              </div>

              {/* Stats overview overlay */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5 font-mono select-none">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">4+</p>
                  <p className="text-[10px] text-gray-500 uppercase font-black uppercase mt-1">Years Tech Experience</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">15+</p>
                  <p className="text-[10px] text-gray-500 uppercase font-black uppercase mt-1">SaaS Deployments</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">99.9%</p>
                  <p className="text-[10px] text-gray-500 uppercase font-black uppercase mt-1">System Sync Integrity</p>
                </div>
              </div>

            </div>

            {/* Quick Profile Bento Cards (Cols: 5) */}
            <div className="lg:col-span-5 bg-brand-dark-900 border border-white/5 rounded-2xl p-6 shadow-2xl relative">
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-brand-emerald">
                <User className="w-5 h-5 animate-pulse" />
              </div>
              
              <p className="text-[9px] font-mono text-gray-500 uppercase font-bold tracking-widest tracking-tighter mb-4 flex items-center">
                <Sliders className="w-3.5 h-3.5 mr-1 text-brand-cyan" />
                Workstation details
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-mono text-brand-cyan font-bold uppercase">Identity Core:</p>
                  <p className="text-base font-semibold text-white mt-1">David Muyiwa Olumuyiwa</p>
                </div>
                
                <div>
                  <p className="text-[10px] font-mono text-brand-cyan font-bold uppercase">Operations Focus:</p>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    Full-Stack Development, Highly Responsive React Engines, Type-Safe Web APIs, Database Indexation, CI/CD Pipeline Automation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-[10px] font-mono text-brand-cyan font-bold uppercase">Work Location:</p>
                    <p className="text-xs text-white mt-1 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-brand-emerald shrink-0" />
                      Global (Remote)
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-brand-cyan font-bold uppercase">Primary Stack:</p>
                    <p className="text-xs text-white mt-1">TS + React + Express</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-500">Contact directly:</span>
                  <button 
                    id="btn-copy-email-hero"
                    onClick={handleCopyEmail}
                    className="text-brand-cyan hover:underline hover:text-brand-cyan/80 transition font-bold select-none cursor-pointer"
                  >
                    {copiedEmail ? "Copied OK!" : "david.muyiwa.31@gmail.com"}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: BASH TERMINAL SHELL & INFO */}
        <motion.section
          id="diagnostics"
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-white tracking-tight flex items-center">
                <Terminal className="w-6 h-6 mr-2 text-brand-cyan" />
                Developer Command Diagnostics
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                An interactive diagnostic console connected directly to David's developer manifest.
              </p>
            </div>
          </div>

          <TerminalSpace />
        </motion.section>

        {/* SECTION 3: SKILLS DASHBOARD */}
        <motion.section
          id="skills"
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-white tracking-tight flex items-center">
                <Cpu className="w-6 h-6 mr-2 text-brand-cyan" />
                System Technologies Dashboard
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Proficiency bars displaying engineered knowledge vectors and deployment hours.
              </p>
            </div>
            <div className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider bg-white/5 border border-white/5 rounded-lg px-3 py-1 text-center">
              A11Y Standard Audited
            </div>
          </div>

          {/* Grid display for the skills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Category: Frontend UI */}
            <div className="bg-brand-dark-900 border border-white/5 rounded-2xl p-6 space-y-4">
              <span className="text-[10px] font-mono text-brand-cyan font-bold uppercase">
                /layers/frontend-ui
              </span>
              <div className="space-y-3.5">
                {skillsByCategory.frontend.map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-brand-cyan">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-brand-cyan rounded-full" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category: Backend Systems */}
            <div className="bg-brand-dark-900 border border-white/5 rounded-2xl p-6 space-y-4">
              <span className="text-[10px] font-mono text-brand-emerald font-bold uppercase">
                /systems/backend-engines
              </span>
              <div className="space-y-3.5">
                {skillsByCategory.backend.map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-brand-emerald">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-brand-emerald rounded-full" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category: DevOps Cloud & Automation */}
            <div className="bg-brand-dark-900 border border-white/5 rounded-2xl p-6 space-y-4">
              <span className="text-[10px] font-mono text-yellow-400 font-bold uppercase">
                /structures/cloud-devops
              </span>
              <div className="space-y-3.5">
                {skillsByCategory.cloudTools.map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-yellow-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.section>

        {/* SECTION 4: PLAYGROUND / OPTIMIZER ENGINE */}
        <section id="upgrader" className="space-y-6">
          <CodeUpgrader />
        </section>

        {/* SECTION 4.5: COACHING, VISIBILITY & VELOCITY ADVISORY */}
        <motion.section
          id="coaching"
          className="space-y-8 scroll-mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-b-white/5 pb-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-white tracking-tight flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-brand-emerald" />
                Coaching & Web Conversion Systems
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                How I grow clients' businesses and level up engineering squads through actionable execution rules.
              </p>
            </div>
            <div className="hidden sm:block text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider bg-white/5 border border-white/5 rounded-lg px-3 py-1">
              CONSULTING • STRATEGY • TRAININGS
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {coachingProgramsData.map((program) => {
              const borderAccentColor = 
                program.bannerAccent === "cyan" 
                  ? "border-brand-cyan/20 hover:border-brand-cyan/40 focus-within:ring-2 focus-within:ring-brand-cyan/35" 
                  : program.bannerAccent === "emerald"
                  ? "border-brand-emerald/20 hover:border-brand-emerald/40 focus-within:ring-2 focus-within:ring-brand-emerald/35"
                  : "border-amber-500/20 hover:border-amber-500/40 focus-within:ring-2 focus-within:ring-amber-500/35";
              const textAccentColor = 
                program.bannerAccent === "cyan" 
                  ? "text-brand-cyan" 
                  : program.bannerAccent === "emerald"
                  ? "text-brand-emerald"
                  : "text-amber-400";
              const bgAccentGradient = 
                program.bannerAccent === "cyan" 
                  ? "bg-brand-cyan/5" 
                  : program.bannerAccent === "emerald"
                  ? "bg-brand-emerald/5"
                  : "bg-amber-400/5";
              const iconAccent = 
                program.bannerAccent === "cyan" ? (
                  <Globe className="w-5 h-5 text-brand-cyan" />
                ) : program.bannerAccent === "emerald" ? (
                  <BookOpen className="w-5 h-5 text-brand-emerald" />
                ) : (
                  <Settings className="w-5 h-5 text-amber-400" />
                );

              return (
                <div
                  key={program.id}
                  id={`coaching-card-${program.id}`}
                  className={`bg-brand-dark-900 border rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 ${borderAccentColor} ${bgAccentGradient}`}
                >
                  <div className="p-6 space-y-4">
                    {/* Header accent identifier */}
                    <div className="flex items-center justify-between select-none">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                        {iconAccent}
                      </div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-600">
                        {program.id.toUpperCase()}
                      </span>
                    </div>

                    {/* Titles */}
                    <div>
                      <h3 className="text-base font-display font-bold text-white tracking-tight">
                        {program.title}
                      </h3>
                      <p className={`text-[11px] font-mono font-medium ${textAccentColor} mt-1`}>
                        {program.subtitle}
                      </p>
                    </div>

                    {/* Paragraph */}
                    <p className="text-xs text-gray-400 leading-relaxed pt-1">
                      {program.description}
                    </p>

                    {/* Deliverables details */}
                    <div className="space-y-2 pt-3 border-t border-white/5 select-none text-left">
                      <p className="text-[10px] font-mono font-bold uppercase text-gray-500 tracking-wide">
                        Core Program Outcomes:
                      </p>
                      <ul className="space-y-1.5 list-none">
                        {program.deliverables.map((item, iIdx) => (
                          <li key={iIdx} className="text-xs text-gray-300 leading-relaxed flex items-start gap-2">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${textAccentColor}`} />
                            <span className="text-[11px] text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions buttons footer */}
                  <div className="p-6 pt-3 border-t border-white/5 bg-brand-dark-950/40 select-none flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500 font-bold truncate max-w-[60%]">
                      FOR: {program.targetAudience}
                    </span>
                    <a
                      href="#ai-recruiter"
                      className={`text-xs font-mono font-bold ${textAccentColor} hover:underline transition flex items-center space-x-1 cursor-pointer`}
                    >
                      <span>Inquire &rarr;</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* SECTION 5: SIGNATURE PROJECT GRID */}
        <motion.section
          id="projects"
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-b-white/5 pb-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-white tracking-tight flex items-center">
                <FolderGit2 className="w-6 h-6 mr-2 text-brand-emerald" />
                Signature Architecture Works
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Vetted full scope engineering works detailed with metrics and source layouts.
              </p>
            </div>
            
            {/* Project Category Filter Chips */}
            <div className="flex items-center space-x-1.5 overflow-x-auto py-1 terminal-scroll select-none font-mono text-xs">
              {["All", "Full Stack", "Frontend UI", "Client Utility"].map((cat) => (
                <button
                  key={cat}
                  id={`btn-filter-${cat.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1 rounded-lg border transition cursor-pointer shrink-0 ${
                    filterCategory === cat
                      ? "bg-brand-emerald/10 border-brand-emerald text-brand-emerald font-bold"
                      : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid list container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => (
                <motion.div
                  key={p.id}
                  id={`project-card-${p.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-brand-dark-900 border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-emerald/30 group flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    {/* Header category and metrics */}
                    <div className="flex items-center justify-between text-[10px] font-mono select-none">
                      <span className="px-2 py-0.5 rounded bg-brand-emerald/10 border border-brand-emerald/15 text-brand-emerald font-bold uppercase">
                        {p.category}
                      </span>
                      <span className="text-gray-500 font-bold truncate max-w-[50%]">
                        {p.metrics.split("•")[0]}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-lg font-display font-bold text-white tracking-tight group-hover:text-brand-emerald transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-[11px] font-mono text-gray-500 font-medium mt-0.5">
                        {p.subtitle}
                      </p>
                    </div>

                    {/* Description body */}
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Tech items stack tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 select-none">
                      {p.tech.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-gray-400">
                          {t}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Actions buttons footer */}
                  <div className="p-6 pt-0 border-t border-white/5 bg-brand-dark-950/40 select-none flex items-center justify-between">
                    <button 
                      id={`btn-code-modal-${p.id}`}
                      onClick={() => setActiveProject(p)}
                      className="text-xs font-mono font-bold text-brand-cyan hover:text-brand-cyan/80 transition flex items-center space-x-1 hover:underline cursor-pointer"
                    >
                      <Code2 className="w-4 h-4" />
                      <span>Code Analyzer</span>
                    </button>
                    <span className="text-[10px] font-mono text-gray-500 font-black uppercase">
                      Inspect &rarr;
                    </span>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* SECTION 6: WORK HISTORY TIMELINE */}
        <section id="experience" className="space-y-6">
          <div className="flex items-end justify-between border-b border-white/5 pb-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-white tracking-tight flex items-center">
                <GraduationCap className="w-6 h-6 mr-2 text-brand-cyan" />
                Vetted Career Milestones
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                An active professional roadmap detailing engineering contributions.
              </p>
            </div>
          </div>

          <div className="space-y-12 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-[1px] before:bg-white/10">
            {experiencesData.map((exp, idx) => (
              <div key={exp.id} className="relative pl-12 group">
                
                {/* Visual marker */}
                <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-brand-dark-950 border-2 border-brand-cyan group-hover:bg-brand-cyan transition-colors" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Left row / Period details (Cols: 3) */}
                  <div className="lg:col-span-3">
                    <div className="inline-flex items-center text-xs font-mono font-black text-brand-cyan select-none bg-brand-cyan/10 border border-brand-cyan/15 px-2.5 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                      {exp.period}
                    </div>
                  </div>

                  {/* Right row / Experience details (Cols: 9) */}
                  <div className="lg:col-span-9 bg-brand-dark-900 border border-white/5 rounded-2xl p-6 shadow-md space-y-3.5">
                    <div>
                      <h4 className="text-base font-display font-bold text-white group-hover:text-brand-cyan transition-colors">
                        {exp.role}
                      </h4>
                      <p className="text-xs font-mono text-gray-500 font-bold mt-0.5">{exp.company}</p>
                    </div>

                    <ul className="space-y-2 list-none text-xs text-gray-400 leading-relaxed">
                      {exp.description.map((desc, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stack used tagging row */}
                    <div className="flex flex-wrap gap-1.5 pt-2 select-none">
                      {exp.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-brand-dark-950 border border-white/5 text-[9px] font-mono text-gray-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: AI CONSULTING & RECRUITING ADVISOR */}
        <section id="ai-recruiter" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-brand-cyan tracking-tight flex items-center">
                <Bot className="w-6 h-6 mr-2 animate-bounce" />
                David's AI Consulting & Coaching Assistant
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Converse securely with David Olumuyiwa's AI agent to verify conversion methodologies, evaluate coaching syllabus details, or coordinate consulting terms.
              </p>
            </div>
            
            <div className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider bg-white/5 border border-white/5 rounded-lg px-3 py-1 flex items-center space-x-1.5 select-none shrink-0 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping shrink-0" />
              <span>Proxy Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Guide Card (Cols: 5) */}
            <div className="lg:col-span-5 space-y-6 text-center md:text-left">
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-brand-cyan/10 text-brand-cyan uppercase tracking-wider mb-2">
                Consultancy Relay
              </span>
              <h3 className="text-xl font-display font-bold text-white tracking-tight leading-snug">
                Streamlining Technical Growth & Strategy.
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Hiring senior specialists or auditing web channels shouldn't take forever. This customized LLM agent is loaded with complete knowledge vectors about David's projects, conversion optimization, CRO strategy, and developer coaching programs. 
              </p>
              
              <div className="bg-brand-dark-900 border border-white/5 rounded-xl p-4 text-left space-y-2.5 font-mono text-xs text-gray-400 leading-loose select-none">
                <div className="flex items-center space-x-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                  <span className="font-bold">Instant CRO & Coaching Answers</span>
                </div>
                <p className="pl-6 text-[11px] leading-relaxed">
                  Interactively query specific questions on how David improves business conversion, or how his technical curriculum elevates engineering velocity metrics.
                </p>
              </div>

              {/* Direct Mail coordinates */}
              <div className="text-xs font-mono pt-4 border-t border-white/5">
                <p className="text-gray-500 uppercase font-black uppercase text-[10px]">Primary Coordinates:</p>
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <button 
                    id="btn-copy-email-cto"
                    onClick={handleCopyEmail}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition flex items-center justify-center space-x-1.5 cursor-pointer font-bold select-none text-white w-full sm:w-auto"
                  >
                    <Mail className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>{copiedEmail ? "Copied OK!" : "david.muyiwa.31@gmail.com"}</span>
                  </button>
                  <a 
                    href="https://linkedin.com" // Standard fallback, actual can look professional
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition flex items-center justify-center space-x-1.5 font-bold select-none text-white w-full sm:w-auto"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-brand-emerald" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Chat Sandbox (Cols: 7) */}
            <div className="lg:col-span-7">
              <AIPortfolioAgent />
            </div>

          </div>
        </section>

      </main>

      {/* Code Analyzer Overlay Dialog Modal Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            id="code-analyzer-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              id="code-analyzer-modal-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 18 }}
              className="bg-brand-dark-900 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Modal Header */}
              <div className="bg-brand-dark-950 p-5 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan text-xs">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-semibold text-white">
                      Source Analyzer: {activeProject.title}
                    </h3>
                    <p className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider mt-0.5">
                      Type-Safe Architectural Highlights
                    </p>
                  </div>
                </div>
                
                <button 
                  id="btn-close-modal"
                  onClick={() => setActiveProject(null)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition text-xs font-mono cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Modal Body Scrolling contents */}
              <div className="p-6 overflow-y-auto space-y-5 terminal-scroll">
                
                {/* Specific bullets highlights */}
                <div className="space-y-2">
                  <p className="text-[10px] font-mono font-bold uppercase text-brand-cyan">Problem & Contribution Highlights:</p>
                  <div className="space-y-2">
                    {activeProject.highlights.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-2 text-xs text-gray-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Syntax Colored code blocks */}
                <div className="space-y-2 select-text">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-mono font-bold uppercase text-brand-cyan">Syntactical Core Structure:</p>
                    <span className="text-[9px] font-mono text-gray-500">TYPESCRIPT • READONLY</span>
                  </div>
                  <pre className="p-4 bg-brand-dark-950 border border-white/5 rounded-xl font-mono text-[10px] sm:text-xs text-brand-cyan overflow-x-auto leading-relaxed">
                    <code>{activeProject.codeSnippet}</code>
                  </pre>
                </div>

              </div>

              {/* Modal Actions Footer */}
              <div className="bg-brand-dark-950 px-6 py-4 border-t border-white/5 text-center shrink-0">
                <p className="text-[10px] font-mono text-gray-500">
                  Designed & constructed by David Olumuyiwa • Refactoring integrity confirmed via React 19 rules.
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-brand-dark-950/45 py-12 px-6 border-t border-white/5 text-center select-none font-mono text-xs text-gray-600 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p>
            Designed & Engineered by <span className="text-gray-300 font-bold">David Olumuyiwa</span> • Portfolio Upgrade v2.5
          </p>
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com" // generic fallback
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition"
              title="GitHub Log Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com" // generic fallback
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition"
              title="LinkedIn Profile Connection"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
