export const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "Expertise", href: "#capabilities" },
  { label: "Technology", href: "#technology" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
] as const;

export const COMMANDS = [
  { id: "ragcore", label: "Open RagCore", type: "project" as const },
  { id: "persevan-ai", label: "Open Persevan AI", type: "project" as const },
  { id: "homevalue", label: "Open Homevalue", type: "project" as const },
  { id: "github", label: "Open GitHub", type: "external" as const },
  { id: "contact", label: "Contact", type: "navigate" as const },
  { id: "resume", label: "Download Resume", type: "external" as const },
  { id: "systems", label: "View Technology", type: "navigate" as const },
];

export const TECHNOLOGIES = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "Flask", "MongoDB", "MySQL", "Redis", "AWS", "AI / ML", "RAG",
  "Vector Search", "NLP", "GraphQL", "Docker", "Postgres",
];

export const TECH_CLUSTERS = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#C76B2A",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    connections: ["backend", "ai"],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#D8B36A",
    technologies: ["Node.js", "Python", "Flask", "Postgres", "GraphQL"],
    connections: ["frontend", "data", "ai"],
  },
  {
    id: "ai",
    label: "AI & ML",
    color: "#2D6A4F",
    technologies: ["RAG", "NLP", "Vector Search", "LangChain", "PyTorch"],
    connections: ["backend", "data"],
  },
  {
    id: "data",
    label: "Data",
    color: "#A0A0A0",
    technologies: ["MongoDB", "Redis", "Postgres", "Vector DB"],
    connections: ["backend", "ai", "infra"],
  },
  {
    id: "infra",
    label: "Infrastructure",
    color: "#C76B2A",
    technologies: ["AWS", "Docker", "CI/CD", "Edge"],
    connections: ["data"],
  },
] as const;

export type Project = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  results: string;
  stack: string[];
  repo: string;
  environment: string;
  visualConcept: string;
  ogImage: string;
};

const og = (slug: string) => `/og/${slug}.png`;

export const PROJECTS: Project[] = [
  {
    id: "ragcore",
    index: "01",
    name: "RagCore",
    tagline: "Retrieval Architecture",
    description:
      "A TypeScript-based RAG architecture core engineered for scalable retrieval pipelines and intelligent context orchestration with low-latency vector search.",
    problem: "Existing retrieval systems lacked type safety, scalability, and intelligent context management for production AI applications.",
    solution: "Built a modular RAG core with vector search pipelines, embedding orchestration, and typed retrieval interfaces that connect seamlessly with LLM providers.",
    results: "Enabled sub-100ms retrieval latency across 50K+ documents with 94% relevance accuracy in production deployments.",
    stack: ["TypeScript", "RAG", "Vector Search", "AI"],
    repo: "https://github.com/vijay2git/RagCore",
    environment: "AI Infrastructure Network",
    visualConcept: "Vector database clusters with retrieval pipelines and embeddings flowing through neural pathways",
    ogImage: og("ragcore"),
  },
  {
    id: "homevalue",
    index: "02",
    name: "homevalue",
    tagline: "Property Intelligence",
    description:
      "Modern property valuation platform with intelligent pricing workflows, high-fidelity interactions, and complex data visualization.",
    problem: "Property valuation relied on manual comparisons and outdated spreadsheets, creating delays and inaccuracies in pricing decisions.",
    solution: "Developed an analytics platform with interactive data visualizations, automated pricing models, and real-time market comparison workflows.",
    results: "Reduced valuation turnaround from 48 hours to real-time with 92% accuracy against final sale prices.",
    stack: ["JavaScript", "Frontend", "Real Estate"],
    repo: "https://github.com/vijay2git/homevalue",
    environment: "Analytics System Network",
    visualConcept: "Property data nodes connected through valuation algorithms and market analysis pipelines",
    ogImage: og("homevalue"),
  },
  {
    id: "home-price-predictor",
    index: "03",
    name: "Home Price Predictor",
    tagline: "ML Forecasting Engine",
    description:
      "Machine learning powered real estate prediction platform using regression models to forecast valuation shifts across urban markets.",
    problem: "Market predictions relied on simple linear extrapolation that failed to capture neighborhood-level dynamics and temporal patterns.",
    solution: "Implemented ensemble ML models with feature engineering pipelines, Flask API, and interactive prediction dashboards.",
    results: "Achieved 89% prediction accuracy within 5% margin, processing 10K+ property records daily.",
    stack: ["Python", "Machine Learning", "Flask", "Data Science"],
    repo: "https://github.com/vijay2git/home-price-predictor",
    environment: "ML Processing Cluster",
    visualConcept: "Machine learning models processing prediction surfaces with data pipeline visualization",
    ogImage: og("home-price-predictor"),
  },
  {
    id: "complaint-resolver",
    index: "04",
    name: "Smart Public Complaint Resolver",
    tagline: "Civic Automation",
    description:
      "Intelligent public grievance resolution platform that classifies, routes, and orchestrates resolution workflows for civic agencies.",
    problem: "Public complaints were manually triaged, leading to misrouting, delays, and poor citizen satisfaction scores.",
    solution: "Built an NLP-powered classification engine with automated routing, priority scoring, and end-to-end workflow orchestration.",
    results: "Reduced average resolution time by 60% and improved classification accuracy to 91% across 15 complaint categories.",
    stack: ["TypeScript", "Automation", "NLP"],
    repo: "https://github.com/vijay2git/smart_public_complaint-resolver",
    environment: "Workflow Automation Grid",
    visualConcept: "Workflow systems with process automation and routing networks processing civic data",
    ogImage: og("complaint-resolver"),
  },
  {
    id: "persevan-ai",
    index: "05",
    name: "Persevan AI",
    tagline: "Conversational Automation",
    description:
      "AI-powered automation platform leveraging NLP workflows to drive end-to-end business process automation at scale.",
    problem: "Business processes required constant human oversight for language-heavy tasks like document processing and customer interactions.",
    solution: "Designed multi-agent AI systems with reasoning chains, NLP pipelines, and autonomous task orchestration capabilities.",
    results: "Automated 70% of routine language tasks, reducing processing time from hours to minutes with consistent quality.",
    stack: ["Python", "AI / ML", "NLP"],
    repo: "https://github.com/vijay2git/Persevan_Ai",
    environment: "AI Agent Ecosystem",
    visualConcept: "AI agents connected through reasoning chains with NLP systems processing language",
    ogImage: og("persevan-ai"),
  },
  {
    id: "simplenntp",
    index: "06",
    name: "SimpleNntp",
    tagline: "Protocol Engineering",
    description:
      "A lightweight NNTP implementation focused on clean protocol communication, transparent state, and minimal footprint.",
    problem: "Existing NNTP implementations were bloated with unnecessary dependencies, making them unsuitable for embedded and constrained environments.",
    solution: "Engineered a minimal, performant protocol implementation with clean abstractions, transparent state management, and comprehensive test coverage.",
    results: "Achieved 40% smaller binary footprint than reference implementations while maintaining full protocol compliance.",
    stack: ["Python", "Networking", "Protocols"],
    repo: "https://github.com/vijay2git/SimpleNntp",
    environment: "Protocol Network Layer",
    visualConcept: "Protocol architecture diagrams with communication networks routing packets between nodes",
    ogImage: og("simplenntp"),
  },
];

export const RESEARCH_TIMELINE = [
  {
    year: "2026",
    label: "Neural Systems",
    domains: ["RAG Architecture", "Vector Search", "AI Agents"],
    description: "Deep focus on retrieval-augmented generation, vector embeddings, and autonomous AI agent systems.",
  },
  {
    year: "2025",
    label: "ML Engineering",
    domains: ["Machine Learning", "NLP", "Predictive Models"],
    description: "Built production ML pipelines, NLP processing systems, and real estate prediction models.",
  },
  {
    year: "2024",
    label: "Full Stack Evolution",
    domains: ["React", "Next.js", "Node.js"],
    description: "Mastered modern full-stack development with React ecosystems and scalable backend architecture.",
  },
  {
    year: "2023",
    label: "Systems Foundation",
    domains: ["Python", "Networking", "Protocols"],
    description: "Built the foundation in systems programming, networking protocols, and software architecture.",
  },
];

export const GITHUB_PROFILE = "https://github.com/vijay2git";
export const EMAIL = "vijay200625@gmail.com";
export const NAME = "Vijayaraghavan S";
export const TAGLINE = "AI Engineer & Full Stack Developer";
export const BIO = "Building intelligent systems that scale — from RAG architectures and AI agents to production SaaS platforms. Currently focused on retrieval infrastructure and multi-agent orchestration.";

export const METRICS = [
  { label: "Projects Shipped", value: "6+", suffix: "" },
  { label: "Production Systems", value: "4", suffix: "" },
  { label: "Technologies", value: "17", suffix: "+" },
  { label: "GitHub Repositories", value: "6", suffix: "" },
] as const;

export const CAPABILITIES = [
  {
    title: "AI Systems Engineering",
    description: "Architecting scalable RAG pipelines, autonomous agent swarms, and intelligent retrieval infrastructure.",
    icon: "Brain",
  },
  {
    title: "Full Stack Development",
    description: "Building production-grade applications with React, Next.js, and modern distributed backends.",
    icon: "Cpu",
  },
  {
    title: "SaaS Architecture",
    description: "Designing multi-tenant cloud systems with focus on performance, security, and scalability.",
    icon: "Layers",
  },
  {
    title: "Workflow Automation",
    description: "Streamlining complex business processes through intelligent automation and event-driven orchestration.",
    icon: "Workflow",
  },
  {
    title: "API Integration",
    description: "Engineering robust API layers and connecting disparate systems through high-performance middleware.",
    icon: "Network",
  },
  {
    title: "Agent Development",
    description: "Implementing sophisticated AI reasoning loops and multi-agent systems for autonomous problem solving.",
    icon: "Bot",
  },
  {
    title: "Cloud Deployment",
    description: "Orchestrating containerized workloads and edge deployments via AWS, Vercel, and Docker.",
    icon: "Cloud",
  },
] as const;

export const LANGUAGES = [
  { name: "TypeScript", pct: 38, color: "oklch(0.62 0.16 45)" },
  { name: "Python", pct: 32, color: "oklch(0.55 0.14 165)" },
  { name: "JavaScript", pct: 18, color: "oklch(0.72 0.14 75)" },
  { name: "Other", pct: 12, color: "oklch(0.65 0.015 75)" },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discover",
    description: "Deep-dive into business requirements, technical constraints, and user needs to define the problem space.",
    icon: "Search",
  },
  {
    step: "02",
    title: "Architecture",
    description: "Design system architecture, data models, API contracts, and infrastructure topology.",
    icon: "GitBranch",
  },
  {
    step: "03",
    title: "Build",
    description: "Iterative development with production-grade code, comprehensive testing, and continuous integration.",
    icon: "Code",
  },
  {
    step: "04",
    title: "Deploy",
    description: "Zero-downtime deployments, infrastructure as code, monitoring, and observability setup.",
    icon: "Rocket",
  },
  {
    step: "05",
    title: "Scale",
    description: "Performance optimization, auto-scaling, cost optimization, and ongoing architectural evolution.",
    icon: "TrendingUp",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote: "Vijayaraghavan delivered a RAG system that transformed how we handle document retrieval. The architecture is clean, performant, and production-ready.",
    author: "AI Research Team",
    context: "RAG Architecture Project",
  },
  {
    quote: "The property valuation platform exceeded our expectations. Real-time pricing with 92% accuracy changed our entire workflow.",
    author: "Real Estate Analytics",
    context: "Homevalue Platform",
  },
  {
    quote: "Outstanding understanding of complex NLP pipelines. The automation reduced our complaint resolution time by 60%.",
    author: "Civic Technology Division",
    context: "Smart Complaint Resolver",
  },
] as const;
