import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useScroll, useTransform, useMotionValue, type MotionValue } from "motion/react";
import { useReduce } from "./useReduce";

/**
 * One light source for the whole page. Every Plate binds its shadow plane to
 * these two motion values, so scrolling moves the sun from morning to
 * afternoon and every shadow on the page swings together.
 */
export type Sun = { x: MotionValue<number>; y: MotionValue<number>; reduce: boolean };

const SunContext = createContext<Sun | null>(null);

export function SunProvider({ children }: { children: ReactNode }) {
  const reduce = useReduce();
  const { scrollYProgress } = useScroll();
  const liveX = useTransform(scrollYProgress, [0, 1], [-14, 22]);
  const liveY = useTransform(scrollYProgress, [0, 1], [10, 18]);
  const staticX = useMotionValue(12);
  const staticY = useMotionValue(12);
  const value = useMemo<Sun>(
    () => (reduce ? { x: staticX, y: staticY, reduce } : { x: liveX, y: liveY, reduce }),
    [reduce, liveX, liveY, staticX, staticY],
  );
  return <SunContext.Provider value={value}>{children}</SunContext.Provider>;
}

export function useSun(): Sun {
  const sun = useContext(SunContext);
  if (!sun) throw new Error("useSun must be used inside SunProvider");
  return sun;
}
