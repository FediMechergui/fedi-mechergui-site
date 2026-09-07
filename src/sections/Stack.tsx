import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReduce } from "../motion/useReduce";
import { SectionHeading } from "../components/SectionHeading";
import { TechLogo } from "../components/TechLogo";
import { EASE, VIEW, rise } from "../motion/reveal";
import { STACK_TABS, type StackItem } from "../data/stack";

const INDICATOR_SPRING = { type: "spring", stiffness: 400, damping: 32 } as const;
const PANEL_ID = "stack-panel";

function StackEntry({ item }: { item: StackItem }) {
  return (
    <li className="flex flex-col items-center gap-2 text-center">
      <TechLogo name={item.name} path={item.path} labelled={false} />
      {item.path && <span className="font-mono text-[0.8125rem] leading-6 text-muted">{item.name}</span>}
    </li>
  );
}

export function Stack() {
  const reduce = useReduce();
  const [index, setIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = STACK_TABS[index];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const count = STACK_TABS.length;
    let next: number;
    switch (e.key) {
      case "ArrowRight":
        next = (index + 1) % count;
        break;
      case "ArrowLeft":
        next = (index - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    setIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="stack" aria-labelledby="stack-title" className="py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <motion.div variants={rise(16)} initial={reduce ? false : "hidden"} whileInView="show" viewport={VIEW}>
          <SectionHeading id="stack-title">Stack.</SectionHeading>

          <div
            role="tablist"
            aria-label="Stack groups"
            onKeyDown={onKeyDown}
            className="-mx-6 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 py-1 scroll-pl-6 [scrollbar-width:none] md:-mx-8 md:px-8 md:scroll-pl-8 lg:-mx-1 lg:px-1 lg:scroll-pl-1 [&::-webkit-scrollbar]:hidden"
          >
            {STACK_TABS.map((tab, i) => {
              const selected = i === index;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`stack-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={PANEL_ID}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setIndex(i)}
                  className={`relative shrink-0 snap-start whitespace-nowrap rounded-pill py-3 text-sm font-medium leading-none transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    selected ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {tab.label}
                  {selected && (
                    <motion.span
                      layoutId="stack-indicator"
                      aria-hidden
                      className="absolute -bottom-px left-0 right-0 h-0.5 bg-accent"
                      transition={reduce ? { duration: 0 } : INDICATOR_SPRING}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div
          role="tabpanel"
          id={PANEL_ID}
          aria-labelledby={`stack-tab-${active.id}`}
          tabIndex={0}
          className="mt-6 rounded-plate bg-surface p-6 md:min-h-[12rem]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={active.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={reduce ? { duration: 0.1 } : { duration: 0.18, ease: EASE }}
              className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6"
            >
              {active.items.map((item) => (
                <StackEntry key={item.name} item={item} />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
