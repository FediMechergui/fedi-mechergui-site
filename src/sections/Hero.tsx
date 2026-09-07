import { motion, type Variants } from "motion/react";
import { useReduce } from "../motion/useReduce";
import { Plate } from "../components/Plate";
import { Button } from "../components/Button";
import { Eyebrow } from "../components/Eyebrow";
import { EASE } from "../motion/reveal";
import { setNeed } from "../lib/needStore";
import { AVAILABILITY, HERO } from "../data/facts";
import { featured } from "../data/projects";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
/* Scale only: the GeoVista image is the LCP candidate and must be paintable from the first frame. */
const plate: Variants = { hidden: { scale: 0.98 }, show: { scale: 1, transition: { duration: 0.8, ease: EASE } } };

function Portrait({ className = "" }: { className?: string }) {
  return (
    <Plate className={`aspect-square ${className}`}>
      <img src="/fedi.webp" width={592} height={592} alt="Fedi Mechergui." fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
    </Plate>
  );
}

export function Hero() {
  const reduce = useReduce();
  const shot = featured[0];

  return (
    <section id="top" aria-labelledby="hero-title" className="pb-12 pt-8 lg:flex lg:min-h-[calc(100dvh-64px)] lg:items-center lg:pb-16 lg:pt-14">
      <motion.div className="mx-auto w-full max-w-[1280px] px-6 md:px-8" variants={container} initial={reduce ? false : "hidden"} animate="show">
        <motion.div variants={plate} className="mb-8 w-[88px] lg:hidden">
          <Portrait />
        </motion.div>

        <motion.div variants={item}>
          <Eyebrow>{AVAILABILITY}</Eyebrow>
        </motion.div>

        <motion.h1
          id="hero-title"
          variants={item}
          className="font-display wdth-118 mt-4 text-[clamp(2.25rem,4.2vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink"
        >
          {HERO.headlineA}
          <br className="hidden md:block" /> {HERO.headlineB}
        </motion.h1>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-6">
          <div className="lg:col-span-6">
            <motion.p variants={item} className="max-w-[52ch] text-[1.125rem] leading-[1.5] text-muted">
              {HERO.subtext}
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#contact" arrow onClick={() => setNeed("project")}>
                {HERO.primary}
              </Button>
              <Button href="#tutoring" variant="secondary">
                {HERO.secondary}
              </Button>
            </motion.div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="relative lg:mb-6 lg:ml-6">
              <motion.div variants={plate}>
                <Plate className="aspect-[16/10]">
                  <img
                    src={shot.image}
                    srcSet={`${shot.imageSmall} 800w, ${shot.image} 1440w`}
                    sizes="(min-width: 1280px) 470px, (min-width: 1024px) 37vw, 100vw"
                    width={shot.width}
                    height={shot.height}
                    alt={shot.alt}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover object-left-top"
                  />
                </Plate>
              </motion.div>
              <motion.div variants={plate} className="absolute -bottom-6 -left-6 hidden w-40 lg:block">
                <Portrait />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
