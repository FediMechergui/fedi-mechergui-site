export const AVAILABILITY = "Open for projects and online tutoring";

export const EMAIL = "fedimechergui03@gmail.com";
export const WHATSAPP_DISPLAY = "+216 20 077 179";
export const WHATSAPP_URL = "https://wa.me/21620077179";
export const LINKEDIN_HANDLE = "fedi-mechergui-579054255";
export const LINKEDIN_URL = "https://www.linkedin.com/in/fedi-mechergui-579054255";
export const GITHUB_HANDLE = "FediMechergui";
export const GITHUB_URL = "https://github.com/FediMechergui";
export const TERMINAL_URL = "https://fedi-shell-folio.vercel.app";

export const MAILTO_PROJECT = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Start a project");
export const MAILTO_TUTORING = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Book a tutoring session");

export const NAV_LINKS = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Process", href: "#process", id: "process" },
  { label: "About", href: "#about", id: "about" },
  { label: "Tutoring", href: "#tutoring", id: "tutoring" },
] as const;

export const SOCIALS = [
  { name: "X", handle: "@fedi_mechergui", href: "https://x.com/fedi_mechergui" },
  { name: "Discord", handle: "fedimechergui", href: null },
  { name: "Instagram", handle: "@fedimechergui7", href: "https://instagram.com/fedimechergui7" },
] as const;

export const HERO = {
  headlineA: "Software your business runs on.",
  headlineB: "Built in Tunis.",
  subtext: "Web apps, ERPs, mobile apps, DevSecOps and AI for Tunisian companies and remote clients, in Arabic, English or French.",
  primary: "Start a project",
  secondary: "Book a tutoring session",
} as const;

export const PROCESS_STEPS = [
  {
    n: 1,
    title: "Scope",
    body: "A written spec (CDC) and data model before any code, the way I wrote them for more than 5 projects at Omnilink. You know what is in and what is out.",
  },
  {
    n: 2,
    title: "Build",
    body: "SCRUM sprints, each ending in a working demo on a real URL. You see progress running, not in a status report.",
  },
  {
    n: 3,
    title: "Ship",
    body: "Pipeline before launch: GitHub Actions or Jenkins, Docker, Trivy and SonarQube scans, Grafana and Prometheus dashboards. Security is a gate, not a launch-week audit.",
  },
  {
    n: 4,
    title: "Hand over",
    body: "Documentation, admin training and a recorded walkthrough. The source lives in your repositories, and your team can book tutoring to take it on.",
  },
] as const;

export type HoursTone = "ink" | "accent" | "tint";
export type HoursBar = { start: number; end: number; tone: HoursTone; value: string };
export type HoursRow = { label: string; bars: HoursBar[] };

export const ABOUT = {
  heading: "Networks first, then software.",
  p1: "I am a software engineer and networks expert in La Marsa, Tunis. I came to web through networks and security, with a Master in Networking Expertise and Cyber Security and a Cisco CCNA, so every app I ship comes with a pipeline, security scans and a monitoring dashboard, not just a front end.",
  p2: "Before that, a License in Embedded Systems and IoT at ISSAT Mateur, which is why Arduino, ESP32 and Raspberry Pi work sits alongside web and mobile. I work with Tunisian businesses on site and with international clients remotely, in Arabic, English and French.",
  groups: [
    { label: "Now", lines: ["Head of Web Development Department, Medtour, since 11/2025.", "Built the Medtour ERP and admin dashboard, 12/2025 to 03/2026."], mono: false },
    { label: "Before", lines: ["Lead Developer, SCRUM Master and System Designer, Omnilink, 07/2024 to 10/2025.", "Mentored more than 10 interns, led SCRUM cycles for more than 5 projects."], mono: false },
    { label: "Education", lines: ["Master in Networking Expertise and Cyber Security, ISI Mahdia, 2023 to 2025.", "License in Embedded Systems and IoT, ISSAT Mateur, 2020 to 2023."], mono: false },
    { label: "Certificates", lines: ["Cisco CCNA 1", "EF SET English C2", "TryHackMe Advent of Cyber", "System Design and Architectures Level 2"], mono: false },
    { label: "Languages", lines: ["Arabic, native", "English, C2", "French, B1", "German, A1"], mono: false },
    { label: "Code", lines: ["37 public repositories", "28+ projects built"], mono: true },
  ],
  hours: {
    title: "Working hours from Tunis",
    caption: "Tunisia stays on UTC+1 all year. A 09:00 to 18:00 day here overlaps at least eight hours of the office day in Paris, Berlin and London, in both seasons.",
    axisStart: 6,
    axisEnd: 22,
    ticks: [6, 9, 12, 15, 18, 21],
    rows: [
      { label: "Tunis", bars: [{ start: 9, end: 18, tone: "ink", value: "09:00 to 18:00" }] },
      {
        label: "Paris and Berlin",
        bars: [
          { start: 9, end: 18, tone: "accent", value: "winter, 09:00 to 18:00" },
          { start: 8, end: 17, tone: "tint", value: "summer, 08:00 to 17:00" },
        ],
      },
      {
        label: "London",
        bars: [
          { start: 10, end: 19, tone: "accent", value: "winter, 10:00 to 19:00" },
          { start: 9, end: 18, tone: "tint", value: "summer, 09:00 to 18:00" },
        ],
      },
    ] as HoursRow[],
  },
} as const;

export const TUTORING = {
  headline: "Open for online tutoring.",
  sub: "Live one-to-one sessions in Arabic, English or French. I teach what I ship.",
  cta: "Book a tutoring session",
  proof: "Taught intermediate Python and full-stack web to 13 to 17 year-olds at Format Bac. Led full-stack crash courses at TRY-IT Club ISIMA. Mentored more than 10 interns at Omnilink.",
  columns: [
    { title: "What I teach", items: ["Python, from basics to a first project", "Full-stack web: React, Node, databases, deployment", "DevOps: Docker, CI/CD, Kubernetes basics", "System design: specs, data models, service boundaries"] },
    { title: "Who it is for", items: ["Teenagers 13 to 17", "University students", "Junior developers and interns", "Small teams onboarding a new stack"] },
    { title: "How it runs", items: ["Live online, over video", "Weekly or one-off", "Exercises between sessions"] },
  ],
} as const;

export const CONTACT = {
  eyebrow: AVAILABILITY,
  heading: "Send the brief. You get a written scope back.",
  line: "A rough idea is enough. I work in Arabic, English and French, on site in Tunis or remote worldwide.",
} as const;

export const FOOTER = {
  descriptor: "Software engineer and networks expert. La Marsa, Tunis.",
  year: "2026",
} as const;
