import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Command, HelpCircle, ChevronRight, CornerDownLeft } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "command" | "output" | "error" | "system";
  text: string | React.ReactNode;
}

const COMMAND_SUGGESTIONS = [
  { label: "/about", description: "Who is David?" },
  { label: "/tech", description: "View skills & stack" },
  { label: "/coaching", description: "Advisory & conversion setup" },
  { label: "/projects", description: "Explore major works" },
  { label: "/resume", description: "Work history highlights" },
  { label: "/contact", description: "Get email credentials" },
  { label: "/clear", description: "Flush logs" }
];

export default function TerminalSpace() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: "init-1",
      type: "system",
      text: "Initializing David Olumuyiwa Portfolio Shell v2.5..."
    },
    {
      id: "init-2",
      type: "system",
      text: "Type a command or click one of the quick suggestions below to run system diagnostics."
    }
  ]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommandRun = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLines: TerminalLine[] = [
      { id: `cmd-${Date.now()}`, type: "command", text: `root@david-shell:~$ ${cmd}` }
    ];

    switch (trimmed) {
      case "help":
      case "/help":
        newLines.push({
          id: `out-${Date.now()}-1`,
          type: "output",
          text: (
            <div className="space-y-1 pl-2">
              <p className="text-yellow-400 font-semibold">Available Operations Console:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs mt-1 text-gray-300">
                <p><span className="text-brand-cyan">/about</span> - Interactive background bio & CRO goals</p>
                <p><span className="text-brand-cyan">/tech</span> - Output current runtime certifications</p>
                <p><span className="text-brand-cyan">/coaching</span> - High-conversion programs & syllabus</p>
                <p><span className="text-brand-cyan">/projects</span> - Display signature projects</p>
                <p><span className="text-brand-cyan">/resume</span> - Timeline experiences</p>
                <p><span className="text-brand-cyan">/contact</span> - David's verified correspondence</p>
                <p><span className="text-brand-cyan">/clear</span> - Purge display buffers</p>
              </div>
            </div>
          )
        });
        break;

      case "/about":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: (
            <div className="pl-2 space-y-1 text-gray-300 text-xs">
              <p className="text-brand-emerald font-semibold text-sm">## Advisor & Builder: David Olumuyiwa</p>
              <p className="mt-1">
                I help companies grow their business by building <span className="text-white font-medium">high-visibility websites that convert</span> cold clicks into paying customers.
              </p>
              <p>
                David pairs advanced engineering rules (TypeScript, React 19, structured database indexes) with CRO (Conversion Rate Optimization) funnels to increase buyer trust.
              </p>
              <p className="text-gray-400">Focus: Brand Visibility, Peak Performance & Technical Coaching.</p>
            </div>
          )
        });
        break;

      case "/coaching":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: (
            <div className="pl-2 space-y-2 text-xs text-gray-300">
              <p className="text-brand-emerald font-semibold">## Systems & Velocity Advisories Loaded:</p>
              <div className="space-y-2">
                <div>
                  <p className="text-white font-bold">1. High-Conversion Web Audits</p>
                  <p className="pl-2 text-gray-400">Auditing and converting user landing paths. Standard Core Web Vitals targets: 95+ speed score.</p>
                </div>
                <div>
                  <p className="text-white font-bold">2. Team Syllabus Mastery</p>
                  <p className="pl-2 text-gray-400">Guiding dev cohorts on React 19 architectures, type-safe structures, and robust Docker pipelines.</p>
                </div>
                <div>
                  <p className="text-white font-bold">3. 1-on-1 Launch Roadmapping</p>
                  <p className="pl-2 text-gray-400">Advising seed-stage tech architectures and scaling systems without structural technical debt.</p>
                </div>
              </div>
            </div>
          )
        });
        break;

      case "/tech":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: (
            <div className="pl-2 space-y-2 text-xs text-gray-300">
              <p className="text-brand-emerald font-semibold">## Systems Technologies Module successfully compiled:</p>
              <div>
                <p className="text-brand-cyan font-medium">SYSTEM_LAYERS (Frontend):</p>
                <p className="pl-2 text-gray-300">React 18/19, TypeScript, motion (Framer), Next.js, Tailwind CSS (v4), d3.js, HTML5-spec, WebSockets</p>
              </div>
              <div>
                <p className="text-brand-cyan font-medium">SERVER_ENGINES (Backend):</p>
                <p className="pl-2 text-gray-300">Node.js, Express, REST APIs, Python (FastAPI), Redis Memory Store</p>
              </div>
              <div>
                <p className="text-brand-cyan font-medium">STRUCTURES (Databases & DevOps):</p>
                <p className="pl-2 text-gray-300">PostgreSQL (indexing, transaction lock), MongoDB, Docker, Git, CI/CD, AWS</p>
              </div>
            </div>
          )
        });
        break;

      case "/projects":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: (
            <div className="pl-2 space-y-2 text-xs text-gray-300">
              <p className="text-brand-emerald font-semibold">## Directory Listing /projects:</p>
              <div className="space-y-2">
                <div>
                  <p className="text-white font-bold">1. ApexTask Agile Platform</p>
                  <p className="pl-2 text-gray-400">Collaboration Board • React, Node.js + Express, Postgres</p>
                  <p className="pl-2 text-brand-cyan">Uptime: 99.9% Sync Integrity</p>
                </div>
                <div>
                  <p className="text-white font-bold">2. QuantMetrics Suite</p>
                  <p className="pl-2 text-gray-400">Reactive Data Visualizations • React, d3, custom WebSockets</p>
                  <p className="pl-2 text-brand-cyan">Throughput: 5,000+ ticks/sec computed on active frame</p>
                </div>
                <div>
                  <p className="text-white font-bold">3. EchoChat Gateway</p>
                  <p className="pl-2 text-gray-400">Redis-backed Distributed Message Gateway • Docker, Microservices</p>
                </div>
              </div>
            </div>
          )
        });
        break;

      case "/resume":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: (
            <div className="pl-2 space-y-2 text-xs text-gray-300">
              <p className="text-brand-emerald font-semibold">## Deployment History Timeline:</p>
              <div className="border-l border-brand-cyan/20 pl-3 ml-1 space-y-2">
                <div>
                  <p className="text-white font-medium">CoreTech Solutions — Senior Full-Stack Engineer [2024-Present]</p>
                  <p className="text-gray-400 font-mono text-[10px]">React 19 / Node / Postgres</p>
                </div>
                <div>
                  <p className="text-white font-medium">VisuaLabs Studio — Frontend Architect [2022-2024]</p>
                  <p className="text-gray-400 font-mono text-[10px]">Vite / motion / Tailwind / A11Y</p>
                </div>
                <div>
                  <p className="text-white font-medium">SaaSLink Systems — Full Stack Engineer [2020-2022]</p>
                  <p className="text-gray-400 font-mono text-[10px]">Express APIs / MongoDB / CI / CD</p>
                </div>
              </div>
            </div>
          )
        });
        break;

      case "/contact":
        newLines.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: (
            <div className="pl-2 space-y-1 text-xs text-gray-300">
              <p className="text-brand-emerald font-semibold">## Secure Verification Protocols Loaded:</p>
              <p>Email: <a href="mailto:david.muyiwa.31@gmail.com" className="text-brand-cyan hover:underline font-mono">david.muyiwa.31@gmail.com</a></p>
              <p>Domain: <a href="http://www.davidolumuyiwa.xyz" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline font-mono">www.davidolumuyiwa.xyz</a></p>
              <p className="text-gray-500 text-[10px]">Use the AI Recruiting Agent in the sidebar to automate a complete pitch message.</p>
            </div>
          )
        });
        break;

      case "/clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newLines.push({
          id: `out-err-${Date.now()}`,
          type: "error",
          text: `sys-err: Command '${cmd}' not recognized. Type '/help' for active shell options.`
        });
        break;
    }

    setHistory(prev => [...prev, ...newLines]);
    setInputVal("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommandRun(inputVal);
  };

  return (
    <div className="bg-brand-dark-900 border border-white/10 rounded-xl overflow-hidden font-mono shadow-2xl flex flex-col h-[340px] md:h-[380px]">
      {/* Terminal Title Bar */}
      <div className="bg-brand-dark-950 px-4 py-2 flex items-center justify-between border-b border-white/5 select-none shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <p className="text-[10px] text-gray-500 font-bold flex items-center tracking-wider uppercase">
          <Terminal className="w-3 h-3 mr-1.5 text-brand-cyan" />
          david-workstation-diagnostics
        </p>
        <span className="w-6 text-right text-gray-600 text-xs">sh</span>
      </div>

      {/* Terminal Command Output Logs */}
      <div className="flex-1 p-4 overflow-y-auto text-xs space-y-3 terminal-scroll bg-gradient-to-b from-brand-dark-900 to-brand-dark-950">
        <AnimatePresence initial={false}>
          {history.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`leading-relaxed ${
                line.type === "command"
                  ? "text-brand-cyan font-bold"
                  : line.type === "error"
                  ? "text-red-400 font-medium"
                  : line.type === "system"
                  ? "text-brand-emerald/70 font-semibold italic"
                  : "text-gray-300"
              }`}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={consoleBottomRef} />
      </div>

      {/* Interactive Command Suggestion Quick-Chips */}
      <div className="bg-brand-dark-950 p-2 border-t border-white/5 flex items-center space-x-1.5 overflow-x-auto shrink-0 select-none terminal-scroll">
        <span className="text-[9px] text-gray-600 uppercase font-black uppercase shrink-0 px-1">
          Quick:
        </span>
        {COMMAND_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion.label}
            id={`btn-chip-${suggestion.label.replace("/", "")}`}
            onClick={() => handleCommandRun(suggestion.label)}
            className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-gray-400 hover:text-brand-cyan hover:bg-brand-cyan/10 hover:border-brand-cyan/20 cursor-pointer transition shrink-0"
            title={suggestion.description}
          >
            {suggestion.label}
          </button>
        ))}
      </div>

      {/* Active Shell Prompt Input */}
      <form
        onSubmit={handleFormSubmit}
        className="bg-brand-dark-950 px-4 py-2 border-t border-white/5 flex items-center space-x-2 shrink-0"
      >
        <ChevronRight className="w-4 h-4 text-brand-cyan animate-pulse shrink-0" />
        <span className="text-brand-emerald text-xs font-bold shrink-0">root@david:~$</span>
        <input
          type="text"
          id="terminal-input-prompt"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type an upgraded command (e.g. /tech)..."
          className="bg-transparent text-white outline-none flex-grow text-xs font-mono font-bold selection:bg-brand-cyan/35 selection:text-white"
          autoComplete="off"
        />
        <button
          type="submit"
          id="terminal-btn-enter"
          className="p-1 rounded text-gray-500 hover:text-brand-cyan hover:bg-white/5 transition"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
