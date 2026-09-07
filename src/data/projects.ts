export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  url: string | null;
  image: string;
  imageSmall: string;
  width: number;
  height: number;
  alt: string;
  aspect: "16/10" | "4/5" | "4/3";
  column: "left" | "right";
};

export const featured: Project[] = [
  {
    slug: "geovista",
    title: "GeoVista",
    description: "3D geomatics platform: terrain, buildings, geology and bathymetry layers, with a 2D map and a 3D viewer.",
    stack: ["Next.js 16", "Three.js", "CesiumJS", "MapLibre GL"],
    url: "https://geovista-eta.vercel.app",
    image: "/work/geovista.webp",
    imageSmall: "/work/geovista-sm.webp",
    width: 1440,
    height: 900,
    alt: "GeoVista, a 3D geomatics platform, showing the 2D map of the Mediterranean with terrain and building layers.",
    aspect: "16/10",
    column: "left",
  },
  {
    slug: "iron",
    title: "IRON",
    description: "Tunisian supplements storefront in FR, AR and EN with RTL, TND pricing and D17, Flouci, Konnect payments.",
    stack: ["React 18", "Vite", "Tailwind", "Zustand"],
    url: "https://iron-ruddy.vercel.app",
    image: "/work/iron.webp",
    imageSmall: "/work/iron-sm.webp",
    width: 1000,
    height: 1250,
    alt: "IRON storefront: a dark gym supplements shop with a French headline and product cards.",
    aspect: "4/5",
    column: "right",
  },
  {
    slug: "medtour",
    title: "medtour.io",
    description: "Public website of the travel agency Medtour: Omra and Hajj, organised trips, circuits, hotels, flights and Schengen visas, in French and Arabic.",
    stack: ["Next.js", "MongoDB", "Tailwind"],
    url: "https://medtour.io",
    image: "/work/medtour.webp",
    imageSmall: "/work/medtour-sm.webp",
    width: 1440,
    height: 900,
    alt: "medtour.io home page: MedTours travel agency in Tunisia with Omra and organised trip offers.",
    aspect: "16/10",
    column: "left",
  },
  {
    slug: "fitcoach",
    title: "FitCoach",
    description: "Offline-first Android fitness, nutrition and health app: 550-exercise library, streaks, body composition and PDF reports for a coach. No account, no internet.",
    stack: ["React Native", "Expo", "TypeScript", "SQLite"],
    url: "https://github.com/FediMechergui/FitCoach",
    image: "/work/fitcoach.webp",
    imageSmall: "/work/fitcoach-sm.webp",
    width: 1000,
    height: 1250,
    alt: "FitCoach on Android: the home screen with the check-in streak and the training screen with strength, calisthenics, cardio and sport categories.",
    aspect: "4/5",
    column: "right",
  },
  {
    slug: "payrollhub",
    title: "PayrollHub",
    description: "Payroll and HR platform for Tunisian enterprises, CNSS and IRPP compliant for 2025-2026, with payslip generation.",
    stack: ["React", "Node", "Express", "MongoDB"],
    url: "https://tunisian-payroll-landing.vercel.app",
    image: "/work/payrollhub.webp",
    imageSmall: "/work/payrollhub-sm.webp",
    width: 1440,
    height: 900,
    alt: "PayrollHub landing page: payroll and HR for Tunisian enterprises.",
    aspect: "16/10",
    column: "left",
  },
  {
    slug: "devclass",
    title: "Devclass",
    description: "Developer self-assessment: 63 questions, nine pillars, ten classes, GitHub signals and Gemini profile notes.",
    stack: ["Next.js 16", "React 19", "Auth.js", "MongoDB"],
    url: "https://devclass-eight.vercel.app",
    image: "/work/devclass.webp",
    imageSmall: "/work/devclass-sm.webp",
    width: 1600,
    height: 1200,
    alt: "Devclass home page with the live readout of questions, pillars and classes.",
    aspect: "4/3",
    column: "right",
  },
  {
    slug: "omnilink",
    title: "Omnilink",
    description: "Startup website plus the backend behind it: JS and Python microservices, Redis caching, MySQL with Firebase.",
    stack: ["Node", "Python", "Redis", "MySQL"],
    url: "https://omnilink-website-try.vercel.app",
    image: "/work/omnilink.webp",
    imageSmall: "/work/omnilink-sm.webp",
    width: 1440,
    height: 900,
    alt: "Omnilink startup website home page.",
    aspect: "16/10",
    column: "left",
  },
  {
    slug: "petshop",
    title: "Dahdiha Petshop ERP",
    description: "ERP for a Tunisian pet shop: stock and warehouses, purchases, sales, traceability and accounting in one dashboard.",
    stack: ["React", "TypeScript", "Vite", "Tailwind"],
    url: "https://dahdiha-petshop-erp.vercel.app",
    image: "/work/petshop.webp",
    imageSmall: "/work/petshop-sm.webp",
    width: 1000,
    height: 1250,
    alt: "Dahdiha Petshop ERP dashboard with stock, orders and sales charts.",
    aspect: "4/5",
    column: "right",
  },
];

export type Collaborator = { name: string; href: string };

export type MoreItem = {
  title: string;
  fact: string;
  link: { label: "GitHub" | "Live" | "APK"; href: string } | null;
  /** People credited on the project, shown as "with ..." under the fact. */
  with?: Collaborator[];
};

export const RAGHED: Collaborator = { name: "Raghed Saidani", href: "https://github.com/raghe-d78" };
export const ADEM: Collaborator = { name: "Adem Chammakhi", href: "https://github.com/AdemChammakhi" };

export const moreWork: { group: string; items: MoreItem[] }[] = [
  {
    group: "Enterprise and client work",
    items: [
      { title: "Medtour ERP", fact: "Full ERP and admin dashboard for Medtour.", link: null },
      { title: "Medtour DAM", fact: "Digital asset management platform for Medtour.", link: null },
      { title: "Medtour Unified Inbox", fact: "One inbox for Medtour's customer conversations.", link: { label: "GitHub", href: "https://github.com/AdemChammakhi/Unified-Inbox" }, with: [ADEM] },
      { title: "THEA", fact: "Financial platform, 11 microservices, AI OCR, RAG chatbot.", link: { label: "GitHub", href: "https://github.com/FediMechergui/THEA" } },
      { title: "Medianet Opportunities", fact: "Opportunities platform with Excel export.", link: null },
      { title: "SkillVault", fact: "Skills assessment platform, Angular 17, 5 services.", link: { label: "GitHub", href: "https://github.com/FediMechergui/SkillVault" } },
      { title: "Fondation Bien-etre", fact: "Wellness centre website with a contact form.", link: { label: "Live", href: "https://fondation-bien-etre-theta.vercel.app" } },
      { title: "Hotel contract workflow", fact: "16-step hotel contract form for a travel agency.", link: { label: "Live", href: "https://hoteldemo-five.vercel.app" } },
    ],
  },
  {
    group: "Apps and research",
    items: [
      { title: "BeyGO", fact: "AR mobile app exploring the 27 Beys of Tunisia.", link: { label: "GitHub", href: "https://github.com/FediMechergui/BeyGO" } },
      { title: "Qutrob", fact: "Arabic roots game built on the Lisan al-Arab inventory.", link: { label: "GitHub", href: "https://github.com/FediMechergui/Qutrob" } },
      { title: "Quantum Banking System", fact: "Quantum-classical banking: QRNG, BB84, fraud detection.", link: { label: "GitHub", href: "https://github.com/FediMechergui/quantum_bank" }, with: [RAGHED] },
      { title: "Immobilier RAG", fact: "Cognitive graph RAG for French real-estate documents.", link: { label: "GitHub", href: "https://github.com/FediMechergui/rag-immobilier" }, with: [RAGHED] },
      { title: "Doctor appointment system", fact: "Patient and appointment platform. Graduation project.", link: { label: "GitHub", href: "https://github.com/FediMechergui/doctor-appointment-system" } },
    ],
  },
];

export const PUBLIC_REPOS = 37;
