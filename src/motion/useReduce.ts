import { useReducedMotion } from "motion/react";

/** `?static` renders every animation in its final state (screenshots, the OG image). */
export const STATIC_RENDER = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("static");

/** True when motion should collapse to its final state: OS preference or static render. */
export function useReduce(): boolean {
  return (useReducedMotion() ?? false) || STATIC_RENDER;
}
