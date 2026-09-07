import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReduce } from "../motion/useReduce";
import { ArrowRight } from "@phosphor-icons/react";
import { SPRING } from "../motion/reveal";
import { NewTab } from "./NewTab";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "band";
  size?: "md" | "sm";
  arrow?: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
};

const VARIANT = {
  primary: "bg-accent text-accent-ink",
  secondary: "bg-surface-2 text-ink",
  band: "bg-page text-accent",
} as const;

export function Button({ href, children, variant = "primary", size = "md", arrow = false, external = false, className = "", onClick }: Props) {
  const reduce = useReduce();
  const sizing = size === "sm" ? "h-9 px-4 text-sm" : "h-11 px-5 text-[0.9375rem]";
  return (
    <motion.a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-medium leading-none transition-[filter] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:brightness-95 ${VARIANT[variant]} ${sizing} ${className}`}
      whileHover={reduce ? undefined : { y: -1 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={SPRING}
    >
      {children}
      {external && <NewTab />}
      {arrow && <ArrowRight size={16} weight="regular" aria-hidden />}
    </motion.a>
  );
}
