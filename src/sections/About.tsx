import { Fragment } from "react";
import { motion } from "motion/react";
import { useReduce } from "../motion/useReduce";
import { SectionHeading } from "../components/SectionHeading";
import { EASE, VIEW, rise, stagger } from "../motion/reveal";
import { ABOUT, type HoursTone } from "../data/facts";

const TONE: Record<HoursTone, string> = {
  ink: "bg-ink",
  accent: "bg-accent",
  tint: "bg-[var(--shadow)]",
};

const MONO = "font-mono text-[0.8125rem] leading-6";

/**
 * Working hours from Tunis: a captioned figure with no background tracks,
 * no clock and no ticker. Bars sit on a 06:00 to 22:00 Tunis-time axis and
 * grow from the left on first view, the way hours fill a workday.
 */
function WorkingHours({ reduce }: { reduce: boolean }) {
  const { title, caption, axisStart, axisEnd, ticks, rows } = ABOUT.hours;
  const span = axisEnd - axisStart;
  const pct = (hour: number) => `${((hour - axisStart) / span) * 100}%`;
  const widthPct = (start: number, end: number) => `${((end - start) / span) * 100}%`;

  // One flat list so the grow delay runs across the whole figure.
  const bars = rows.flatMap((row) =>
    row.bars.map((bar, j) => ({ row, bar, first: j === 0 })),
  );

  return (
    <figure className="mt-20">
      <figcaption>
        <p className="text-sm font-medium leading-[1.45] text-ink">{title}</p>
        <p className="mt-1 max-w-[65ch] text-sm font-medium leading-[1.45] text-muted">{caption}</p>
      </figcaption>

      <div className="mt-8 grid gap-y-3 md:grid-cols-[9rem_minmax(0,1fr)_13rem] md:items-center md:gap-x-6">
        <div aria-hidden className="hidden md:block" />
        <div aria-hidden className={`relative h-6 text-muted ${MONO}`}>
          {ticks.map((tick, i) => (
            <span
              key={tick}
              className={`absolute top-0 ${i === 0 ? "" : "-translate-x-1/2"}`}
              style={{ left: pct(tick) }}
            >
              {String(tick).padStart(2, "0")}
            </span>
          ))}
        </div>
        <div aria-hidden className="hidden md:block" />

        {bars.map(({ row, bar, first }, i) => (
          <Fragment key={`${row.label}-${bar.value}`}>
            {first ? (
              <p className={`text-ink ${MONO} ${i === 0 ? "" : "mt-4 md:mt-0"}`}>{row.label}</p>
            ) : (
              <div aria-hidden className="hidden md:block" />
            )}
            <div aria-hidden className="relative h-[6px]">
              <motion.div
                className={`absolute inset-y-0 ${TONE[bar.tone]}`}
                style={{ left: pct(bar.start), width: widthPct(bar.start, bar.end), transformOrigin: "left" }}
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              />
            </div>
            <p className={`text-muted ${MONO}`}>{bar.value}</p>
          </Fragment>
        ))}
      </div>
    </figure>
  );
}

export function About() {
  const reduce = useReduce();

  return (
    <section id="about" aria-labelledby="about-title" className="py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <motion.div
            className="lg:col-span-6"
            variants={stagger(0.06)}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={VIEW}
          >
            <motion.div variants={rise(16)}>
              <SectionHeading id="about-title">{ABOUT.heading}</SectionHeading>
            </motion.div>
            <motion.p variants={rise(16)} className="mt-8 max-w-[60ch] text-[1.125rem] leading-[1.5] text-ink">
              {ABOUT.p1}
            </motion.p>
            <motion.p variants={rise(16)} className="mt-6 max-w-[60ch] text-[1.125rem] leading-[1.5] text-ink">
              {ABOUT.p2}
            </motion.p>
          </motion.div>

          <motion.dl
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:col-span-6"
            variants={stagger(0.05)}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={VIEW}
          >
            {ABOUT.groups.map((group) => (
              <motion.div key={group.label} variants={rise(12)}>
                <dt className={`text-muted ${MONO}`}>{group.label}</dt>
                {group.lines.map((line) => (
                  <dd
                    key={line}
                    className={`mt-1 first-of-type:mt-2 ${group.mono ? `text-ink ${MONO}` : "text-[0.9375rem] leading-[1.5] text-ink"}`}
                  >
                    {line}
                  </dd>
                ))}
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <WorkingHours reduce={reduce} />
      </div>
    </section>
  );
}
