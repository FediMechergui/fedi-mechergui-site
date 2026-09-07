import { motion } from "motion/react";
import { useReduce } from "../motion/useReduce";
import { ArrowRight, Brain, Browsers, ChalkboardTeacher, DeviceMobile, ShieldCheck, TreeStructure, type Icon } from "@phosphor-icons/react";
import { Plate } from "../components/Plate";
import { SectionHeading } from "../components/SectionHeading";
import { TechLogo } from "../components/TechLogo";
import { rise, stagger, VIEW } from "../motion/reveal";
import { iotFootnote, services, type Service } from "../data/services";
import { DEVSECOPS_LOGOS } from "../data/stack";
import { TUTORING } from "../data/facts";

const ICONS: Record<Service["icon"], Icon> = {
  Browsers,
  ChalkboardTeacher,
  DeviceMobile,
  ShieldCheck,
  Brain,
  TreeStructure,
};

/** Cell fills per variant. Only the band cell changes its text tokens. */
const FILL: Record<Service["variant"], string> = {
  screenshot: "bg-surface text-ink",
  band: "bg-band text-band-ink",
  tint: "bg-surface-2 text-ink",
  logos: "bg-surface text-ink",
  plain: "bg-surface text-ink",
};

/** The PayrollHub screenshot shown inside cell A (public/work/payrollhub.webp, 1440x900). */
const PAYROLLHUB = {
  image: "/work/payrollhub.webp",
  imageSmall: "/work/payrollhub-sm.webp",
  width: 1440,
  height: 900,
  alt: "PayrollHub landing page: payroll and HR for Tunisian enterprises.",
} as const;

/* The grid is taller than a phone viewport, so a 30% area threshold could
   never be reached on short screens. The reveal fires once the top of the
   grid is 20% into the viewport instead; the stagger still runs in reading order. */
const GRID_VIEW = { once: true, margin: "0px 0px -20% 0px" } as const;

function ServiceCell({ service }: { service: Service }) {
  const IconMark = ICONS[service.icon];
  const band = service.variant === "band";
  const secondary = band ? "text-band-ink-2" : "text-muted";

  return (
    <motion.li variants={rise(24)} className={`flex flex-col rounded-plate p-6 ${FILL[service.variant]} ${service.span}`}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display wdth-112 text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.01em]">{service.title}</h3>
        <IconMark size={24} weight="regular" aria-hidden className={`mt-0.5 shrink-0 ${secondary}`} />
      </div>

      {service.variant === "screenshot" && (
        <Plate className="mb-5 mt-4 aspect-[16/10] lg:aspect-[2/1]">
          <img
            src={PAYROLLHUB.image}
            srcSet={`${PAYROLLHUB.imageSmall} 800w, ${PAYROLLHUB.image} 1440w`}
            sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, calc(100vw - 96px)"
            width={PAYROLLHUB.width}
            height={PAYROLLHUB.height}
            alt={PAYROLLHUB.alt}
            decoding="async"
            loading="lazy"
            className="h-full w-full object-cover object-left-top"
          />
        </Plate>
      )}

      {service.variant === "logos" && (
        <ul aria-label="Tools" className="mt-4 flex flex-wrap items-center gap-5">
          {DEVSECOPS_LOGOS.map((logo) => (
            <li key={logo.name} className="inline-flex">
              <TechLogo name={logo.name} path={logo.path} size={24} />
            </li>
          ))}
        </ul>
      )}

      <p className={`max-w-[65ch] text-[1.0625rem] leading-[1.55] ${service.variant === "screenshot" ? "" : "mt-3"}`}>{service.blurb}</p>

      {band && (
        <ul aria-label="What I teach" className="mt-5 flex flex-col gap-2 text-[0.9375rem] leading-[1.5] text-band-ink">
          {TUTORING.columns[0].items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-5">
        <p className={`font-mono text-[0.8125rem] leading-[1.5] ${secondary}`}>Built this way: {service.builtThisWay}</p>
        {band && (
          <a
            href="#tutoring"
            className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium leading-none text-band-ink underline-offset-4 hover:underline focus-visible:outline-band-ink"
          >
            {TUTORING.cta}
            <ArrowRight size={16} weight="regular" aria-hidden />
          </a>
        )}
      </div>
    </motion.li>
  );
}

export function Services() {
  const reduce = useReduce();

  return (
    <section id="services" aria-labelledby="services-title" className="py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <motion.div variants={rise(24)} initial={reduce ? false : "hidden"} whileInView="show" viewport={VIEW}>
          <SectionHeading id="services-title">What I build and run.</SectionHeading>
        </motion.div>

        <motion.ul
          variants={stagger(0.07)}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={GRID_VIEW}
          className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6"
        >
          {services.map((service) => (
            <ServiceCell key={service.id} service={service} />
          ))}
        </motion.ul>

        <motion.p
          variants={rise(16)}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={VIEW}
          className="mt-6 text-[0.875rem] font-medium leading-[1.45] text-muted"
        >
          {iotFootnote}
        </motion.p>
      </div>
    </section>
  );
}
