export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  category: "Full Stack" | "Frontend UI" | "Client Utility";
  metrics: string;
  // codeSnippet: string;
  highlights: string[];
  link?: string;
  github?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
  isFallback?: boolean;
}

export interface CoachingProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  targetAudience: string;
  deliverables: string[];
  bannerAccent: "cyan" | "emerald" | "amber";
}

