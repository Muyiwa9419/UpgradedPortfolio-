import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Zap, Radio, Check, RefreshCw, Layers } from "lucide-react";

export default function CodeUpgrader() {
  const [activeSpeed, setActiveSpeed] = useState<"standard" | "overclocked">("standard");
  const [physicsOn, setPhysicsOn] = useState(true);
  const [aiProxyOn, setAiProxyOn] = useState(false);
  const [stats, setStats] = useState({
    fps: 30,
    renderTime: "12.4ms",
    bundleSize: "450KB",
    loadScore: "D"
  });

  const [simulatedLoadSpeed, setSimulatedLoadSpeed] = useState<number[]>([]);

  // Calculate simulated system stats based on triggers
  useEffect(() => {
    let fps = 30;
    let renderTime = 12.4;
    let bundleSize = 450;
    let score = "C";

    if (activeSpeed === "overclocked") {
      fps = 60;
      renderTime -= 7.4;
      bundleSize -= 150;
    }

    if (physicsOn) {
      fps = activeSpeed === "overclocked" ? 120 : 60;
      renderTime -= 3.2;
      bundleSize += 40; // Physics adds tiny bundle footprint
    }

    if (aiProxyOn) {
      renderTime = Math.max(0.8, renderTime - 1.2);
      score = "A+";
    } else {
      score = fps >= 90 ? "A" : fps >= 60 ? "B" : "C";
    }

    setStats({
      fps,
      renderTime: `${renderTime.toFixed(1)}ms`,
      bundleSize: `${bundleSize}KB`,
      loadScore: score
    });

    // Seed some performance values for graphs
    const dataPoints: number[] = [];
    const iterations = 8;
    for (let i = 0; i < iterations; i++) {
      const base = fps / 2;
      const variation = Math.sin(i * 1.5) * (fps * 0.1);
      dataPoints.push(Math.round(base + variation));
    }
    setSimulatedLoadSpeed(dataPoints);

  }, [activeSpeed, physicsOn, aiProxyOn]);

  const toggleSpeed = () => {
    setActiveSpeed(prev => prev === "standard" ? "overclocked" : "standard");
  };

  return (
    <div className="bg-gradient-to-br from-brand-dark-900 to-brand-dark-950 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Top Background Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-emerald/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan/10 text-brand-cyan uppercase tracking-wider mb-2">
            Engine Playground
          </span>
          <h3 className="text-xl font-display font-bold text-white tracking-tight flex items-center">
            <Layers className="w-5 h-5 mr-2 text-brand-cyan" />
            Website Performance Engine
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Toggle features below to optimize this portfolio's rendering pipelines in real-time.
          </p>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center space-x-3 bg-white/5 border border-white/5 rounded-lg px-3 py-1.5 self-start">
          <div className="relative">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald"></span>
            </span>
          </div>
          <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
            Engine Core: ACTIVE
          </span>
        </div>
      </div>

      {/* Main Grid: Control sliders Left, Diagnostic Output Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Controls Layout (Cols: 5) */}
        <div className="lg:col-span-5 space-y-4">
          <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">
            Optimization Switchboard:
          </p>

          {/* Controller 1: CPU Clock */}
          <div 
            id="control-overclock"
            onClick={toggleSpeed}
            className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all flex items-center justify-between ${
              activeSpeed === "overclocked" 
                ? "bg-brand-cyan/15 border-brand-cyan/30 text-white shadow-lg glow-border-cyan" 
                : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${activeSpeed === "overclocked" ? "bg-brand-cyan/20 text-brand-cyan" : "bg-white/5 text-gray-400"}`}>
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white select-none">Vite Overclocking</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Accelerates bundle build trees</p>
              </div>
            </div>
            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${activeSpeed === "overclocked" ? "bg-brand-cyan" : "bg-gray-800"}`}>
              <div className={`bg-white w-3 h-3 rounded-full shadow transition-transform transform ${activeSpeed === "overclocked" ? "translate-x-4" : "translate-x-0"}`} />
            </div>
          </div>

          {/* Controller 2: motion Physics */}
          <div 
            id="control-physics"
            onClick={() => setPhysicsOn(!physicsOn)}
            className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all flex items-center justify-between ${
              physicsOn 
                ? "bg-brand-emerald/15 border-brand-emerald/30 text-white shadow-lg" 
                : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${physicsOn ? "bg-brand-emerald/20 text-brand-emerald" : "bg-white/5 text-gray-400"}`}>
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Motion Orchestrations</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Enables smooth layout transitions</p>
              </div>
            </div>
            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${physicsOn ? "bg-brand-emerald" : "bg-gray-800"}`}>
              <div className={`bg-white w-3 h-3 rounded-full shadow transition-transform transform ${physicsOn ? "translate-x-4" : "translate-x-0"}`} />
            </div>
          </div>

          {/* Controller 3: Secure AI Proxy */}
          <div 
            id="control-aiproxy"
            onClick={() => setAiProxyOn(!aiProxyOn)}
            className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all flex items-center justify-between ${
              aiProxyOn 
                ? "bg-yellow-500/15 border-yellow-500/30 text-white shadow-lg" 
                : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${aiProxyOn ? "bg-yellow-500/20 text-yellow-400" : "bg-white/5 text-gray-400"}`}>
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Client Route</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Proximity-secure routing</p>
              </div>
            </div>
            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${aiProxyOn ? "bg-yellow-500" : "bg-gray-800"}`}>
              <div className={`bg-white w-3 h-3 rounded-full shadow transition-transform transform ${aiProxyOn ? "translate-x-4" : "translate-x-0"}`} />
            </div>
          </div>
        </div>

        {/* Visualizer Statistics & Simulated Output Terminal (Cols: 7) */}
        <div className="lg:col-span-7 bg-brand-dark-950 border border-white/5 rounded-xl p-5 flex flex-col justify-between space-y-4">
          
          {/* Diagnostic Stats Header */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-mono text-gray-500 uppercase font-bold tracking-wider">
                Telemetry Diagnostics Panel
              </p>
              <div className="flex items-center space-x-1">
                <RefreshCw className="w-2.5 h-2.5 text-brand-cyan animate-spin" />
                <span className="text-[10px] font-mono text-brand-cyan">Computing...</span>
              </div>
            </div>

            {/* Numeric Stats Readout Panel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
                <p className="text-[10px] text-gray-500 font-bold uppercase font-sans">Framerate</p>
                <p className="text-lg font-mono font-bold text-brand-cyan mt-1 select-none">
                  {stats.fps} <span className="text-[10px] text-gray-500 font-normal">Hz</span>
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
                <p className="text-[10px] text-gray-500 font-bold uppercase font-sans">Hydration</p>
                <p className="text-lg font-mono font-bold text-brand-emerald mt-1 select-none">
                  {stats.renderTime}
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
                <p className="text-[10px] text-gray-500 font-bold uppercase font-sans">Weight</p>
                <p className="text-lg font-mono font-bold text-yellow-400 mt-1 select-none">
                  {stats.bundleSize}
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
                <p className="text-[10px] text-gray-500 font-bold uppercase font-sans">A11Y Rank</p>
                <p className="text-lg font-mono font-bold text-green-400 mt-1 select-none">
                  {stats.loadScore}
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Graphic Performance Bars */}
          <div className="relative">
            <p className="text-[10px] text-gray-500 mb-2.5 font-mono uppercase font-bold">
              Simulated Load Performance Curve:
            </p>
            <div className="h-16 flex items-end justify-between bg-black/30 rounded-lg p-2.5 border border-white/5">
              {simulatedLoadSpeed.map((val, idx) => (
                <motion.div
                  key={idx}
                  id={`perf-bar-${idx}`}
                  initial={{ height: "10%" }}
                  animate={{ height: `${Math.min(100, (val / 120) * 100)}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-[10%] rounded-t-sm ${
                    idx % 2 === 0 ? "bg-brand-cyan" : "bg-brand-emerald"
                  }`}
                  style={{ minHeight: "10%" }}
                />
              ))}
            </div>
          </div>

          {/* Descriptive Verdict Output */}
          <div className="text-[11px] text-gray-400 leading-relaxed font-mono pt-3 border-t border-white/5 flex items-start space-x-2">
            <Check className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
            <p>
              {stats.fps >= 90 ? (
                <span>
                  <strong className="text-white">Verdict: Highly Optimized.</strong> React 19 fiber engines are running at ultimate performance bounds. Transitions are buttery-smooth.
                </span>
              ) : stats.fps >= 60 ? (
                <span>
                  <strong className="text-white">Verdict: Great.</strong> Standard target framework metrics achieved. Layout responses are fast. Toggle Vite Overclocking for more acceleration.
                </span>
              ) : (
                <span>
                  <strong className="text-brand-cyan font-bold animate-pulse">Diagnostics: Ready.</strong> Toggle Vite overclocking or Motion parameters to accelerate active virtual assets.
                </span>
              )}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
