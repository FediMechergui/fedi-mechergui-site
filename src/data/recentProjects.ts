export type RecentProject = {
  title: string;
  category: string;
  description: string;
  stack: string[];
  href: string;
  demo?: string;
};

export const recentProjects: RecentProject[] = [
  {
    "title": "Zenlo",
    "category": "Business software · Pilot",
    "description": "Rental agency operations for Tunisia: fleet planning, inspections, contracts, payments and a customer portal, with company-scoped access.",
    "stack": [
      "React 19",
      "TypeScript",
      "Cloudflare D1 / R2"
    ],
    "href": "https://github.com/FediMechergui/zenlo"
  },
  {
    "title": "NetForge",
    "category": "Networks · Learning platform",
    "description": "A deterministic network simulator in the browser, with packet inspection, three CCNA course paths and 56 self-grading labs.",
    "stack": [
      "TypeScript",
      "React",
      "PixiJS"
    ],
    "href": "https://github.com/FediMechergui/netforge",
    "demo": "https://net-fm.netlify.app"
  },
  {
    "title": "MLibrary",
    "category": "Web + Android · Reading",
    "description": "Multilingual book discovery and reading, with an offline shelf, EPUB and PDF support, OCR tools and saved quotes.",
    "stack": [
      "React",
      "Capacitor",
      "Netlify"
    ],
    "href": "https://github.com/FediMechergui/MLibrary",
    "demo": "https://mlibrary-fedimechergui.netlify.app"
  },
  {
    "title": "Mémora",
    "category": "Web + Android · Revision",
    "description": "French study app with flashcards, spaced repetition, quizzes, self-assessed exams and multiplayer revision rooms.",
    "stack": [
      "React",
      "TypeScript",
      "Capacitor"
    ],
    "href": "https://github.com/FediMechergui/memorycardsrevision"
  },
  {
    "title": "THE VAULT",
    "category": "Computer vision · Local demo",
    "description": "A local biometric demonstration combining a Flutter Android client, MediaPipe tracking and MATLAB scoring for face, motion and air-signature checks.",
    "stack": [
      "Flutter",
      "Python / MediaPipe",
      "MATLAB"
    ],
    "href": "https://github.com/FediMechergui/the-vault"
  },
  {
    "title": "Dahsha",
    "category": "Bilingual web app · Discovery",
    "description": "Arabic and English documentary discovery, organised by show and topic, with a responsive viewing experience.",
    "stack": [
      "React",
      "Vite",
      "Capacitor"
    ],
    "href": "https://github.com/FediMechergui/dahsha",
    "demo": "https://dahsha.netlify.app"
  }
];
