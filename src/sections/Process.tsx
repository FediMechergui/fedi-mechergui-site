import { useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useReduce } from "../motion/useReduce";
import { Plate } from "../components/Plate";
import { SectionHeading } from "../components/SectionHeading";
import { rise, stagger, VIEW } from "../motion/reveal";
import { PROCESS_STEPS } from "../data/facts";

/** A 40px Whitewash plate with the step number in mono, casting the noon shadow. No tilt. */
function Marker({ n }: { n: number }) {
  return (
    <Plate tilt={false} className="h-10 w-10">
      <span className="flex h-full w-full items-center justify-center font-mono text-[0.8125rem] font-medium leading-none text-ink">{n}</span>
    </Plate>
  );
}

export function Process() {
  const reduce = useReduce();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const still = useMotionValue(1);
  const progress = reduce ? still : drawn;

  return (
    <section id="process" aria-labelledby="process-title" className="py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <motion.div variants={rise()} initial={reduce ? false : "hidden"} whileInView="show" viewport={VIEW}>
          <SectionHeading id="process-title">How I work.</SectionHeading>
        </motion.div>

        {/* Timeline: the scroll target for the drawn axis. Both axis orientations share one progress value. */}
        <div ref={ref} className="relative mt-12">
          {/* Below lg: vertical axis 20px from the left edge, drawn top to bottom */}
          <div aria-hidden className="absolute bottom-0 left-5 top-0 w-px bg-line lg:hidden" />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-accent lg:hidden"
            style={{ scaleY: progress }}
          />

          {/* lg and up: horizontal axis through the centre of the 40px marker row, drawn left to right */}
          <div aria-hidden className="absolute left-5 right-[calc(25%-38px)] top-5 hidden h-px bg-line lg:block" />
          <motion.div
            aria-hidden
            className="absolute left-5 right-[calc(25%-38px)] top-5 hidden h-px origin-left bg-accent lg:block"
            style={{ scaleX: progress }}
          />

          <motion.ol
            className="grid gap-10 lg:grid-cols-4 lg:gap-6"
            variants={stagger(0.08)}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={VIEW}
          >
            {PROCESS_STEPS.map((step) => (
              <motion.li key={step.n} variants={rise(16)} className="relative pl-16 lg:pl-0">
                {/* Marker: on the vertical line at the top of the step below lg, on the horizontal line at the column's left edge from lg */}
                <div className="absolute left-0 top-0 lg:static">
                  <Marker n={step.n} />
                </div>
                <h3 className="font-display wdth-112 flex min-h-10 items-center text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.01em] text-ink lg:mt-6 lg:block lg:min-h-0">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[65ch] text-[1.0625rem] leading-[1.55] text-muted">{step.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
