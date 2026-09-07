import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import "./styles/app.css";
import { SunProvider } from "./motion/SunProvider";
import App from "./App";

/** `?static` renders every animation in its final state (used for screenshots and the OG image). */
const staticRender = new URLSearchParams(window.location.search).has("static");
if (staticRender) document.documentElement.setAttribute("data-static", "");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion={staticRender ? "always" : "user"}>
      <SunProvider>
        <App />
      </SunProvider>
    </MotionConfig>
  </StrictMode>,
);
