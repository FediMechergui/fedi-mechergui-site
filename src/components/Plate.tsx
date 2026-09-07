import { useEffect, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useSun } from "../motion/SunProvider";
import { useMediaQuery } from "../motion/useMediaQuery";

type Props = {
  children: ReactNode;
  /** Sizing and aspect ratio from the caller, for example "aspect-[16/10]" */
  className?: string;
  /** Classes for the inner surface */
  innerClassName?: string;
  /** Pointer tilt, on by default; off for the process markers */
  tilt?: boolean;
  /** Shadow offset clamp; defaults to 22 on desktop and 8 on phones */
  maxOffset?: number;
};

/**
 * A plain Whitewash slab with a hard-edged shadow plane behind it.
 * The shadow direction comes from the shared SunProvider; hovering
 * extends the shadow by 4px and tilts the slab up to 3deg.
 */
export function Plate({ children, className = "", innerClassName = "", tilt = true, maxOffset }: Props) {
  const sun = useSun();
  const desktop = useMediaQuery("(min-width: 768px)");
  const limit = maxOffset ?? (desktop ? 22 : 8);
  const limitMv = useMotionValue(limit);
  useEffect(() => {
    limitMv.set(limit);
  }, [limit, limitMv]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const hover = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const sh = useSpring(hover, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-3, 3]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [3, -3]);
  const shadowX = useTransform(() => {
    const l = limitMv.get();
    return Math.max(-l, Math.min(l, sun.x.get() + sh.get() * 4));
  });
  const shadowY = useTransform(() => {
    const l = limitMv.get();
    return Math.max(-l, Math.min(l, sun.y.get() + sh.get() * 4));
  });

  const interactive = tilt && desktop && !sun.reduce;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (interactive && e.pointerType === "mouse") hover.set(1);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
    hover.set(0);
  };

  return (
    <div className={`relative ${className}`} style={{ perspective: 900 }}>
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-plate bg-[var(--shadow)]"
        style={{ x: shadowX, y: shadowY }}
      />
      <motion.div
        className={`relative h-full w-full overflow-hidden rounded-plate bg-surface ${interactive ? "hover:will-change-transform" : ""} ${innerClassName}`}
        style={interactive ? { rotateX, rotateY } : undefined}
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
      >
        {children}
      </motion.div>
    </div>
  );
}
