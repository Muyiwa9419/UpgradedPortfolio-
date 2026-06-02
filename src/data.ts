import { Project, Experience, CoachingProgram } from "./types";

export const projectsData: Project[] = [
  {
    id: "apextask",
    title: "ApexTask Workspace",
    subtitle: "High-Conversion SaaS Collaborative Hub",
    description: "A real-time workspace modeled to optimize team action rates. Engineered specifically to reduce client checkout and onboard friction, leading to a direct 28% boost in user retention and system sync.",
    tech: ["React 19", "TypeScript", "Node.js", "Express", "PostgreSQL", "Redis", "Socket.io"],
    category: "Full Stack",
    metrics: "28% Onboarding Conversion Lift • 99.9% Sync Uptime",
    highlights: [
      "Optimized collaborative layout with debounce render layers, mitigating conversion blockages.",
      "Engineered lightweight background synchronizers using PostgreSQL triggers and Redis pub/sub.",
      "Designed full screen dual-pane dashboard with fluid drawer transitions reducing checkout checkout bounce rates."
    ],
    codeSnippet: `// Live React 19 State Synchronization Hook
export function useBoardSync(boardId: string) {
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    const socket = io(\`/boards/\${boardId}\`, {
      transports: ["websocket"]
    });

    socket.on("board:update", (updatedBoard: Board) => {
      // Clean transactional update
      setBoard(prev => ({
        ...prev,
        ...updatedBoard,
        tasks: reconcileTasks(prev?.tasks, updatedBoard.tasks)
      }));
    });

    return () => { socket.disconnect(); };
  }, [boardId]);

  return board;
}`
  },
  {
    id: "quantmetrics",
    title: "QuantMetrics Engine",
    subtitle: "High-Visibility Financial Conversion Dashboard",
    description: "An analytical landing engine processing WebSocket ticks to present instant ROI visualizers. Drives trial signups by delivering critical financial trends with zero lag, transforming cold traffic into active customers.",
    tech: ["Vite", "React", "TypeScript", "d3.js", "Recharts", "Tailwind CSS"],
    category: "Frontend UI",
    metrics: "45% Trial Conversion Boost • 5,000+ ticks/sec",
    highlights: [
      "Crafted bespoke canvas rendering bridges on top of standard React lifecycle paths to achieve zero lag.",
      "Engineered smart memoization rules with useMemo and custom worker threads to compute historical EMA trends.",
      "Built fluid SEO-optimized loading structures styled with Tailwind utility classes to capture high Google visibility."
    ],
    codeSnippet: `// High-frequency canvas ticking bridge
export class CanvasTickPlotter {
  private ctx: CanvasRenderingContext2D;
  private buffer: TickPayload[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
  }

  public push(tick: TickPayload) {
    this.buffer.push(tick);
    if (this.buffer.length > 500) this.buffer.shift();
    this.requestFrameRender();
  }

  private requestFrameRender() {
    requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.drawTrendGrid();
      this.drawTickLine();
    });
  }
}`
  },
  {
    id: "echochat",
    title: "EchoChat Gateway",
    subtitle: "High-Availability Buyer Communication Relay",
    description: "A scale-out socket server cluster designed to power interactive conversion bubbles and client support hubs. Built to never drop high-value customer inquiries.",
    tech: ["Node.js", "Express", "TypeScript", "Redis", "Docker", "SocketJS"],
    category: "Client Utility",
    metrics: "Zero Dropped Leads • 20k Concurrent Channels",
    highlights: [
      "Configured distributed memory state caches on Redis to maintain user connection tracking across 4 different server nodes.",
      "Authored clean custom middleware packages for authorization, session validations and request rate-limiting.",
      "Designed and deployed container layouts inside lightweight Alpine-based staging Docker ecosystems."
    ],
    codeSnippet: `// Socket Cluster Gateway authentication layer
export const socketAuthMiddleware = async (
  socket: Socket, 
  next: (err?: Error) => void
) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication secret required"));

    const session = await redisClient.get(\`session:\${token}\`);
    if (!session) return next(new Error("Token has expired."));

    socket.data.user = JSON.parse(session);
    return next();
  } catch (err) {
    return next(new Error("Internal Gateway check failed"));
  }
};`
  }
];

export const experiencesData: Experience[] = [
  {
    id: "exp-1",
    role: "Senior Full-Stack Engineer",
    company: "CoreTech Solutions",
    period: "2024 - Present",
    description: [
      "Architect and scale multi-tenant React applications built with modern TypeScript, Tailwind, and Express backend pipelines.",
      "Redesigned data analytics platforms, reducing page hydration delay metrics by 35% and upgrading legacy standard Bootstrap layouts to pixel-perfect custom containers.",
      "Mentor standard junior engineers in modular code structures, defensive type practices, and clean automated pipelines."
    ],
    tags: ["React 19", "TypeScript", "Next.js", "Node.js", "Docker", "PostgreSQL"]
  },
  {
    id: "exp-2",
    role: "Frontend Specialist & Interaction Designer",
    company: "VisuaLabs Studio",
    period: "2022 - 2024",
    description: [
      "Crafted beautiful premium micro-interactions, responsive dashboard hubs, and immersive canvas systems.",
      "Migrating complex legacy platforms into fluid modern, single view dashboards using Motion physics and Vite builds.",
      "Spearheaded accessibility audits ensuring seamless keyboard transitions and strict ARIA integrations for visually challenged visitors."
    ],
    tags: ["Vite", "React", "motion", "Tailwind CSS", "A11Y", "d3.js"]
  },
  {
    id: "exp-3",
    role: "Full Stack Engineer",
    company: "SaaSLink Systems",
    period: "2020 - 2022",
    description: [
      "Co-designed and developed robust Node.js REST and Express Web APIs servicing over 100k daily payload actions.",
      "Configured fully isolated staging clusters utilizing Docker setups, reducing environment sync bugs by 90%.",
      "Created highly reactive frontend settings grids and historical log engines with robust state persistence."
    ],
    tags: ["Express", "MongoDB", "REST APIs", "Vite", "Git", "Tailwind"]
  }
];

export const skillsByCategory = {
  frontend: [
    { name: "React 19", level: 95 },
    { name: "TypeScript", level: 92 },
    { name: "Next.js", level: 88 },
    { name: "Tailwind CSS", level: 98 },
    { name: "motion", level: 90 },
    { name: "d3.js / Recharts", level: 82 }
  ],
  backend: [
    { name: "Node.js", level: 90 },
    { name: "Express.js", level: 94 },
    { name: "REST APIs", level: 96 },
    { name: "PostgreSQL", level: 85 },
    { name: "Redis", level: 80 },
    { name: "Python / FastAPI", level: 75 }
  ],
  cloudTools: [
    { name: "Docker", level: 82 },
    { name: "CI/CD & GitHub Actions", level: 88 },
    { name: "Vite", level: 95 },
    { name: "Git", level: 92 },
    { name: "AWS S3 / EC2", level: 78 },
    { name: "Vercel / Cloud Run", level: 90 }
  ]
};

export const coachingProgramsData: CoachingProgram[] = [
  {
    id: "coach-biz",
    title: "High-Conversion Web Engineering & CRO",
    subtitle: "Turn Idle Traffic Into Subscriptions & Safe Revenue",
    description: "A tailored consultancy block for SMEs and founders. We map out your conversion funnel, audit bottlenecks, and construct beautiful, search-optimized layouts that convert attention into transaction.",
    targetAudience: "SaaS Founders, Business Owners & Digital Agencies",
    deliverables: [
      "In-depth landing layout & friction point audit",
      "Production-ready conversion landing blueprint (TS + React 19 + Tailwind)",
      "SEO speed boost (optimizing Core Web Vitals to score 95+)",
      "Smart custom conversion-tracking metrics"
    ],
    bannerAccent: "cyan"
  },
  {
    id: "coach-devs",
    title: "Syllabus Mastery: React 19 & TypeScript",
    subtitle: "Level-Up Junior Teams Into High-Velocity Specialists",
    description: "Transform junior/mid devs into efficient engineers who write clean, type-safe, and highly modular programs. Zero theoretical fluff; purely built on collaborative real-world code bases.",
    targetAudience: "Startups, Tech Squads & High-Aspiring Coders",
    deliverables: [
      "Refactoring legacy code bases into strict declarative React states",
      "Advanced type safety structures & clean domain layers",
      "Continuous integration, lightweight Docker setups, and cloud release automation",
      "Weekly diagnostic code reviews & live troubleshooting pairs"
    ],
    bannerAccent: "emerald"
  },
  {
    id: "coach-startups",
    title: "1-on-1 Business Tech Scaling Roadmap",
    subtitle: "Launch Fluid Products Without Architectural Debt",
    description: "Get weekly high-integrity tech leadership advisory guidance. Perfect for seed-stage projects looking to deploy robust web applications on tight schedules.",
    targetAudience: "Early-Stage Technical Founders & Solo Entrepreneurs",
    deliverables: [
      "Modular database selection & schema design advice (SQL/NoSQL)",
      "High-fidelity UI mockups to production-level layouts strategy",
      "Growth strategies linked directly to technical product visibility",
      "Direct technical liaison & vendor evaluation advisory"
    ],
    bannerAccent: "amber"
  }
];

