import type { ReactNode } from "react";

/** Mono 13px, accent, sentence case. The page uses exactly two. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`font-mono text-[0.8125rem] leading-6 text-accent ${className}`}>{children}</p>;
}
