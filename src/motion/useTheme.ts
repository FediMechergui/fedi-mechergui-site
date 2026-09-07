import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function storedTheme(): Theme | null {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

/** The boot script in index.html may have pinned a theme before React ran. */
function attributeTheme(): Theme | null {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "light" || t === "dark" ? t : null;
}

/** Order of truth: the pinned attribute, then localStorage.theme, then the system preference. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => attributeTheme() ?? storedTheme() ?? systemTheme());

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!storedTheme()) setTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: the toggle still applies for this session */
    }
    setTheme(next);
  }, [theme]);

  return { theme, toggle };
}
