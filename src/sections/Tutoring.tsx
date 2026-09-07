import { motion } from "motion/react";
import { useReduce } from "../motion/useReduce";
import { Button } from "../components/Button";
import { EASE, VIEW } from "../motion/reveal";
import { setNeed } from "../lib/needStore";
import { TUTORING } from "../data/facts";

/**
 * The page's one full-bleed colour block: Sidi Bou Blue edge to edge with a
 * 5/7 split inside. Statement, CTA and proof on the left; three plain text
 * columns (no cards, no hairlines) on the right. The whole inner block rises
 * once as one unit, with no stagger.
 */
export function Tutoring() {
  const reduce = useReduce();

  return (
    <section id="tutoring" aria-labelledby="tutoring-title" className="bg-band py-16 md:py-20 lg:py-24">
      <motion.div
        className="mx-auto max-w-[1280px] px-6 md:px-8"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEW}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <h2
              id="tutoring-title"
              className="font-display wdth-118 max-w-[16ch] text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.015em] text-band-ink md:text-[2.75rem]"
            >
              {TUTORING.headline}
            </h2>
            <p className="mt-5 max-w-[60ch] text-[1.125rem] leading-[1.5] text-band-ink">{TUTORING.sub}</p>
            <div className="mt-8">
              <Button variant="band" arrow href="#contact" onClick={() => setNeed("tutoring")} className="w-full focus-visible:outline-band-ink sm:w-auto">
                {TUTORING.cta}
              </Button>
            </div>
            <p className="mt-8 max-w-[44ch] text-[0.875rem] font-medium leading-[1.45] text-band-ink-2">{TUTORING.proof}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:col-span-7 lg:col-start-6">
            {TUTORING.columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-display wdth-112 text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.01em] text-band-ink">
                  {column.title}
                </h3>
                <ul className="mt-4 flex list-none flex-col gap-2 p-0">
                  {column.items.map((item) => (
                    <li key={item} className="text-[1rem] leading-[1.55] text-band-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
