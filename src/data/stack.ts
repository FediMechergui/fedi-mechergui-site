import {
  siReact, siNextdotjs, siVuedotjs, siTypescript, siTailwindcss, siThreedotjs, siCesium, siMaplibre, siVite,
  siNodedotjs, siExpress, siNestjs, siPython, siDjango, siFlask, siFastapi, siDotnet, siSpringboot,
  siMysql, siMongodb, siPostgresql, siSqlite, siRedis, siFirebase,
  siDocker, siKubernetes, siJenkins, siGithubactions, siAnsible, siNginx, siGrafana, siPrometheus,
  siCisco, siWireshark, siMetasploit, siOwasp, siSonarqubeserver, siTrivy, siOpenssl,
  siTensorflow, siPytorch, siOpencv, siOllama, siHuggingface, siQiskit, siGooglegemini,
  siExpo, siFlutter, siAndroidstudio, siKotlin,
  siArduino, siRaspberrypi, siEspressif, siC,
} from "simple-icons";

export type StackItem = { name: string; path?: string };
export type StackTab = { id: string; label: string; items: StackItem[] };

const mark = (name: string, icon: { path: string }): StackItem => ({ name, path: icon.path });
const chip = (name: string): StackItem => ({ name });

export const STACK_TABS: StackTab[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      mark("React", siReact), mark("Next.js", siNextdotjs), mark("Vue", siVuedotjs), mark("TypeScript", siTypescript),
      mark("Tailwind", siTailwindcss), mark("Three.js", siThreedotjs), mark("CesiumJS", siCesium), mark("MapLibre GL", siMaplibre), mark("Vite", siVite),
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      mark("Node.js", siNodedotjs), mark("Express", siExpress), mark("NestJS", siNestjs), mark("Python", siPython), mark("Django", siDjango),
      mark("Flask", siFlask), mark("FastAPI", siFastapi), mark(".NET", siDotnet), mark("Spring Boot", siSpringboot),
    ],
  },
  {
    id: "databases",
    label: "Databases",
    items: [
      mark("MySQL", siMysql), mark("MongoDB", siMongodb), mark("PostgreSQL", siPostgresql), chip("SQL Server"),
      mark("SQLite", siSqlite), mark("Redis", siRedis), mark("Firebase", siFirebase), chip("ChromaDB"),
    ],
  },
  {
    id: "devops",
    label: "DevOps and cloud",
    items: [
      mark("Docker", siDocker), mark("Kubernetes", siKubernetes), mark("Jenkins", siJenkins), mark("GitHub Actions", siGithubactions), mark("Ansible", siAnsible),
      chip("Azure"), chip("AWS"), mark("Nginx", siNginx), mark("Grafana", siGrafana), mark("Prometheus", siPrometheus),
    ],
  },
  {
    id: "security",
    label: "Security and networking",
    items: [
      mark("Cisco CCNA", siCisco), mark("Wireshark", siWireshark), chip("Nmap"), mark("Metasploit", siMetasploit),
      mark("OWASP ZAP", siOwasp), mark("SonarQube", siSonarqubeserver), mark("Trivy", siTrivy), mark("OpenSSL", siOpenssl),
    ],
  },
  {
    id: "ai",
    label: "AI and ML",
    items: [
      mark("TensorFlow", siTensorflow), mark("PyTorch", siPytorch), mark("OpenCV", siOpencv), mark("Ollama", siOllama),
      mark("HuggingFace", siHuggingface), mark("Qiskit", siQiskit), chip("RAG pipelines"), mark("Gemini API", siGooglegemini),
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    items: [mark("React Native", siReact), mark("Expo", siExpo), mark("Flutter", siFlutter), mark("Android Studio", siAndroidstudio), mark("Kotlin", siKotlin)],
  },
  {
    id: "iot",
    label: "IoT and embedded",
    items: [mark("Arduino", siArduino), mark("Raspberry Pi", siRaspberrypi), mark("ESP32", siEspressif), mark("Embedded C", siC)],
  },
];

export const DEVSECOPS_LOGOS: StackItem[] = [
  mark("Docker", siDocker), mark("Kubernetes", siKubernetes), mark("GitHub Actions", siGithubactions), mark("Grafana", siGrafana),
];
