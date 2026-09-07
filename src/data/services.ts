export type Service = {
  id: string;
  title: string;
  blurb: string;
  builtThisWay: string;
  icon: "Browsers" | "ChalkboardTeacher" | "DeviceMobile" | "ShieldCheck" | "Brain" | "TreeStructure";
  variant: "screenshot" | "band" | "tint" | "logos" | "plain";
  span: string;
};

export const services: Service[] = [
  {
    id: "web",
    title: "Full-stack web apps and ERPs",
    blurb: "Next.js, React or Vue on Node, NestJS, Django or .NET. Admin dashboards, payroll rules, multilingual storefronts.",
    builtThisWay: "medtour.io, Medtour ERP, PayrollHub, IRON",
    icon: "Browsers",
    variant: "screenshot",
    span: "lg:col-span-8",
  },
  {
    id: "tutoring",
    title: "Online tutoring and mentoring",
    blurb: "Python, full-stack web, DevOps and system design. Live online sessions for teenagers, students and junior developers.",
    builtThisWay: "Format Bac, TRY-IT Club ISIMA, 10+ interns at Omnilink",
    icon: "ChalkboardTeacher",
    variant: "band",
    span: "lg:col-span-4",
  },
  {
    id: "mobile",
    title: "Mobile apps",
    blurb: "React Native and Expo first, Flutter or Kotlin when native matters. Offline-first, AR and Arabic-language apps.",
    builtThisWay: "FitCoach, BeyGO, Qutrob",
    icon: "DeviceMobile",
    variant: "tint",
    span: "lg:col-span-4",
  },
  {
    id: "devsecops",
    title: "DevSecOps and cloud",
    blurb: "CI/CD on GitHub Actions or Jenkins, Docker and Kubernetes, Grafana and Prometheus, Trivy and SonarQube scans on every build.",
    builtThisWay: "THEA pipeline, Omnilink CI/CD, kubernetes-demo",
    icon: "ShieldCheck",
    variant: "logos",
    span: "lg:col-span-8",
  },
  {
    id: "ai",
    title: "AI integration",
    blurb: "RAG pipelines with Ollama, ChromaDB and pgvector, Gemini and HuggingFace models, OCR services inside real products.",
    builtThisWay: "THEA OCR, Immobilier RAG, Devclass",
    icon: "Brain",
    variant: "plain",
    span: "lg:col-span-6",
  },
  {
    id: "architecture",
    title: "System design and architecture consulting",
    blurb: "Written specs, service boundaries, data models and caching strategy before code, for your team or mine.",
    builtThisWay: "Omnilink backend, SkillVault, Quantum Bank",
    icon: "TreeStructure",
    variant: "plain",
    span: "lg:col-span-6",
  },
];

export const iotFootnote = "Also: IoT and embedded (Arduino, ESP32, Raspberry Pi) when a project touches hardware.";
