import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useReduce } from "../motion/useReduce";
import { Moon, Sun } from "@phosphor-icons/react";
import { Button } from "../components/Button";
import { useTheme, type Theme } from "../motion/useTheme";
import { rise, stagger } from "../motion/reveal";
import { EMAIL, NAV_LINKS } from "../data/facts";

const BAR_SPRING = { type: "spring", stiffness: 300, damping: 24 } as const;

function ThemeToggle({ theme, toggle, reduce }: { theme: Theme; toggle: () => void; reduce: boolean }) {
  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-pill text-ink transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-surface-2"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="inline-flex"
          initial={reduce ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Icon size={20} weight="regular" aria-hidden />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Nav() {
  const reduce = useReduce();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const backdrop = useTransform(scrollY, [0, 80], [0, 1]);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  /* Why the sheet closed: after following a link, focus should stay with the target section. */
  const closedByLink = useRef(false);

  // Active section: the section crossing a thin band around the viewport centre.
  useEffect(() => {
    const targets = NAV_LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setActive(id);
          else setActive((current) => (current === id ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Mobile sheet: lock body scroll, make the page behind it inert, close on Escape, manage focus.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const behind = [document.getElementById("main"), document.querySelector("footer")].filter((el): el is HTMLElement => el !== null);
    behind.forEach((el) => el.setAttribute("inert", ""));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    closedByLink.current = false;
    firstLinkRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      behind.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
      if (!closedByLink.current) burgerRef.current?.focus();
    };
  }, [open]);

  const closeByLink = () => {
    closedByLink.current = true;
    setOpen(false);
  };

  return (
    <header className={`sticky top-0 z-10 ${open ? "bg-surface" : ""}`}>
      <motion.div aria-hidden className="absolute inset-0 border-b border-line bg-page/90 backdrop-blur-md" style={{ opacity: open ? 0 : backdrop }} />
      <div className="relative mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 md:px-8">
        <a href="#top" className="font-display wdth-118 text-[1.0625rem] font-semibold leading-none tracking-[-0.01em] text-ink">
          Fedi Mechergui
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                className={`text-sm font-medium leading-none transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-accent ${isActive ? "text-accent" : "text-ink"}`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} toggle={toggle} reduce={reduce} />
          <div className="hidden lg:block">
            <Button href="#contact" size="sm">
              Start a project
            </Button>
          </div>
          <button
            ref={burgerRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-pill text-ink transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-surface-2 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-4 w-5" aria-hidden>
              <motion.span
                className="absolute left-0 top-[3px] block h-[2px] w-5 rounded-pill bg-ink"
                animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
                transition={reduce ? { duration: 0 } : BAR_SPRING}
              />
              <motion.span
                className="absolute left-0 top-[11px] block h-[2px] w-5 rounded-pill bg-ink"
                animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
                transition={reduce ? { duration: 0 } : BAR_SPRING}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-x-0 bottom-0 top-16 z-20 flex flex-col overflow-y-auto bg-surface px-6 pb-8 pt-6 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.1 : 0.2 }}
          >
            <Button href="#contact" className="w-full" onClick={closeByLink}>
              Start a project
            </Button>
            <motion.ul variants={stagger(0.05, 0.05)} initial={reduce ? false : "hidden"} animate="show" className="mt-8 flex flex-col gap-5">
              {NAV_LINKS.map((link, i) => (
                <motion.li key={link.id} variants={rise(12)}>
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={closeByLink}
                    className="font-display wdth-118 text-[2rem] font-semibold leading-tight text-ink"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <p className="mt-auto pt-10 font-mono text-[0.8125rem] text-muted">{EMAIL}</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
