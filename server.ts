import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    // Check if key is available and not the placeholder
    if (key && key !== "MY_GEMINI_API_KEY" && key !== "") {
      try {
        geminiClient = new GoogleGenAI({
          apiKey: key,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });
      } catch (err) {
        console.error("Failed to initialize GoogleGenAI client:", err);
      }
    }
  }
  return geminiClient;
}

// David Olumuyiwa Resume details injected into Gemini's system instructions
const DAVID_SYSTEM_INSTRUCTION = `You are the specialized AI Recruiter and Consulting Agent for David Olumuyiwa, a high-caliber Fullstack Software Engineer, Business Conversion Specialist, and Technical Coach.
Your goal is to answer queries from recruiters, business clients, hiring managers, and portfolio visitors about David's skills, qualifications, background, projects, work ethics, coaching programs, and how he helps businesses grow.

David Olumuyiwa's Core Value Proposition & Mission:
"I grow clients' businesses by giving them massive online visibility through websites and digital architectures that convert visitors into revenue. In addition, I offer tailored engineering coaching and tech consulting for founders and teams seeking to accelerate their release velocity and build high-vibe products."

David Olumuyiwa's Credentials & Facts:
1. Contact Information:
   - Full Name: David Muyiwa Olumuyiwa
   - Primary Email: david.muyiwa.31@gmail.com
   - Website: http://www.davidolumuyiwa.xyz
   - Location: Active for remote engineering globally, open to hybrid/onsite in tech centers.
   - Status: Open for strategic consulting, high-impact business websites, coaching cohorts, and Senior full-stack roles.
   
2. Tech Stack Core Competencies:
   - Frontend: React 18 & 19 (Hooks, Context, Server Components, optimization), TypeScript (highly typed architectures), Next.js, Framer Motion (premium interactions), Tailwind CSS (responsive grids, fluid typography, raw utilities), HTML5/CSS3.
   - Backend: Node.js, Express, RESTful APIs, GraphQL, Microservices, Python (FastAPI, Flask).
   - Databases & Caching: PostgreSQL (highly optimized queries, schema design, indexation), MongoDB, Redis (realtime Pub/Sub & state caching).
   - DevOps & Workflows: Docker (containerized staging), Git & GitHub Actions (CI/CD), AWS (EC2, S3), Vercel, Netlify.
   - Business & Performance Optimization: High Conversion Rate Optimization (CRO), Search Engine Optimization (SEO) architectures, Speed index optimizations, Core Web Vitals audit, and Analytical funnel design (d3/Recharts tracking integrations).

3. Signature Projects & Consulting Interventions:
   - **ApexTask (Full-Stack Collaborative Agile Workspace)**: Real-time collaborative platform with real-time web sockets. Integrates highly customizable filter lanes, Gantt charting, and multi-tenant authentication. Built using React, Node.js, Express, and PostgreSQL; reduced state conflicts by 35% and maintains 99.9% uptime.
   - **QuantMetrics (Dynamic Crypto & Web Analytics Suite)**: A clean data-dense dashboard parsing 5,000+ live tick feeds using WebSockets, optimized with d3.js, custom Recharts canvases, and React memo/useCallback. Improved page performance by 40% over legacy architectures.
   - **EchoChat (Scalable Redis-backed Chat Cluster)**: Modular communication backend handling thousands of socket payloads simultaneously using Node.js clustering and Redis distributed memory locks.

4. Coaching & Advisory Offerings:
   - **Engineering Leadership & Mentorship**: Formulating modern TypeScript & React 19 standards for junior and mid-level developers, training teams to build modular layouts, and teaching automated testing practices.
   - **Business Visibility & Conversion Consulting**: Audting corporate landing interfaces, building blazing fast, highly customized digital products that drive maximum ROI, optimizing Core Web Vitals to improve Google search result positioning, and engineering intuitive analytical pipelines.
   - **The High-Velocity Playbook**: Helping early-stage technical startups implement agile structures, configure lightweight Alpine Docker environments, and establish reliable CI/CD pipelines.

Rules for your responses:
- Keep responses highly engaging, confident, and professional.
- Highlight David's focus on CRO (Conversion Rate Optimization), business visibility, and growth.
- Use clean Markdown styling with bold headings and structured bullet points to make information easily scannable for recruiters & potential consulting clients.
- Be concise. Visitors are in a hurry; never write essays unless drafting a tailored pitch letter or email response.
- If asked "Draft an email to David", write a highly polished, relevant draft recruiting or coaching inquiry email they can customize and send directly to david.muyiwa.31@gmail.com.
- Do not make up fake certifications. Stick strictly to his declared stack, consulting, and project facts.
- Speak in the third person or as David's professional agent.`;

// AI Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const ai = getGeminiClient();

  if (!ai) {
    // Elegant fallback simulation if API key is not present
    console.log("Gemini API key is not set. Generating fallback portfolio agent answer.");
    const lowerMessage = message.toLowerCase();
    let responseText = "";

    if (lowerMessage.includes("coaching") || lowerMessage.includes("mentor") || lowerMessage.includes("consult")) {
      responseText = "**David's Coaching & Advisory Programs** are built around two core pillars:\n\n1.  **For Businesses**: Website Auditing and High-Conversion Engineering. David reviews your current tech stack, layouts, and page speeds to scale page conversions and maximize organic search visibility.\n2.  **For Engineering Teams**: Actionable mentorship in TypeScript, React 19, and full-stack performance setups to transition teams from raw beginners into rapid full-stack specialists.\n\nWould you like me to draft a consulting proposal or schedule an advisory intro session?";
    } else if (lowerMessage.includes("conversion") || lowerMessage.includes("business") || lowerMessage.includes("visibility") || lowerMessage.includes("grow")) {
      responseText = "**How David Grows Client Businesses**:\n\nDavid's engineering design philosophy centers on one key goal: *Websites must yield measurable business performance.* He achieves this through:\n\n*   **Flawless Performance**: Eliminating server delays and rendering bottlenecks (improving page speeds by up to 45%), ensuring visitors don't bounce.\n*   **High-Visibility SEO**: Setting up semantic HTML, perfect metadata, and ultra-fast static paths that search bots love.\n*   **Interactive Funnel Optimization**: Integrating real-time dashboards and frictionless user flows that prompt action and secure conversions.\n\nLet me know if you would like to connect on how David can support your next business launch!";
    } else if (lowerMessage.includes("stack") || lowerMessage.includes("languages") || lowerMessage.includes("technolog")) {
      responseText = "**David Olumuyiwa's Tech Stack & Capabilities** are business-focused:\n\n*   **Frontend UI & CRO**: React (18/19), Next.js, TypeScript, Tailwind CSS, Framer Motion, d3.js analytics visualizer.\n*   **Backend & Processing**: Node.js, Express, Python, REST APIs, WebSocket tick-feed streams, Redis caching.\n*   **Databases & Ops**: PostgreSQL, MongoDB, Docker setups, Git workflow systems.\n\n*Note: Since the Live Gemini API is currently offline, this is a pre-rendered consulting agent overview.*";
    } else if (lowerMessage.includes("project") || lowerMessage.includes("experience")) {
      responseText = "David's signature engineering work focuses on dynamic UI and high-capacity pipelines:\n\n1.  **ApexTask**: A collaborative React 19 agile workspace reducing local state conflicts by 35%.\n2.  **QuantMetrics**: A WebSocket-fueled real-time financial tracking layout processing 5,000+ ticks/second.\n3.  **EchoChat**: A high-throughput socket clustering gateway configured on top of scalable Redis locks.\n\nAll optimized to secure fast loads and support high-performing conversion funnels.";
    } else if (lowerMessage.includes("email") || lowerMessage.includes("contact") || lowerMessage.includes("hire")) {
      responseText = "You can reach David Olumuyiwa directly at:\n\n*   **Email**: [david.muyiwa.31@gmail.com](mailto:david.muyiwa.31@gmail.com)\n*   **Web**: http://www.davidolumuyiwa.xyz\n\nHere is a draft consulting pitch you can copy and send:\n\n```text\nSubject: Digital Business Optimization / Custom Conversions Consultation\n\nHi David,\n\nI reviewed your upgraded portfolio and love your focus on building high-conversion websites that grow a client's business. We'd like to consult on an upcoming product deployment to gain greater online visibility.\n\nLet's get on a 15-minute intro chat next week!\n```";
    } else {
      responseText = "Hello! I am David Olumuyiwa's AI Consulting Agent. \n\nI am running in local-override mode because the `GEMINI_API_KEY` is not set yet in your secrets configuration. Ask me how David improves **business visibility**, his **high-conversion methodologies**, his **coaching cohorts**, or how to **get in touch**!";
    }

    return res.json({ response: responseText, fallback: true });
  }

  try {
    // Translate client history format to Gemini's expected Content format
    // Clients pass history as [{ sender: 'user'|'agent', text: '...' }]
    const formattedContents = [];
    
    if (history && Array.isArray(history)) {
      for (const h of history) {
        formattedContents.push({
          role: h.sender === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        });
      }
    }
    
    // Add current user message
    formattedContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const geminiResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: DAVID_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const responseText = geminiResponse.text || "I was unable to compile a response. Please ask me another question about David.";
    return res.json({ response: responseText, fallback: false });
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    return res.status(500).json({ 
      error: "Error generating response from Gemini API.", 
      details: error.message 
    });
  }
});

// Configure Vite dynamic middleware (Dev Mode) vs Static folder server (Prod Mode)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite middleware for full-stack Development hot-reloading...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Setting up Express static asset server for live Production...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

startServer();
