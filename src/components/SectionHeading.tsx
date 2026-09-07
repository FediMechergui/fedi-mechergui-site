import type { ReactNode } from "react";

export function SectionHeading({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <h2
      id={id}
      className={`font-display wdth-118 max-w-[20ch] text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.015em] text-ink md:text-[2.75rem] ${className}`}
    >
      {children}
    </h2>
  );
}
