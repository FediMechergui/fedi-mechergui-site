import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReduce } from "../motion/useReduce";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Plate } from "../components/Plate";
import { NewTab } from "../components/NewTab";
import { SectionHeading } from "../components/SectionHeading";
import { rise, stagger, VIEW } from "../motion/reveal";
import { featured, moreWork, PUBLIC_REPOS, type MoreItem, type Project } from "../data/projects";
import { GITHUB_URL } from "../data/facts";

/* Phones get a single column in the featured order; the two desktop columns keep that order within themselves. */
const ORDER = ["order-1", "order-2", "order-3", "order-4", "order-5", "order-6", "order-7", "order-8"] as const;

/* Every plate is 16:10 on phones; the desktop gallery mixes ratios. */
const FRAME: Record<Project["aspect"], string> = {
  "16/10": "aspect-[16/10]",
  "4/5": "aspect-[16/10] lg:aspect-[4/5]",
  "4/3": "aspect-[16/10] lg:aspect-[4/3]",
};

const SIZES = {
  left: "(min-width: 1280px) 700px, (min-width: 1024px) 54vw, 100vw",
  right: "(min-width: 1280px) 493px, (min-width: 1024px) 38vw, 100vw",
} as const;

const PIECE_VIEW = { once: true, amount: 0.25 } as const;
const ARROW_SPRING = { stiffness: 300, damping: 22 } as const;

/** Arrow nudge (2px right, 2px up) driven by a motion value toggled on hover or focus. No state. */
function useNudge(reduce: boolean) {
  const hover = useMotionValue(0);
  const spring = useSpring(hover, ARROW_SPRING);
  const x = useTransform(spring, [0, 1], [0, 2]);
  const y = useTransform(spring, [0, 1], [0, -2]);
  const on = () => hover.set(1);
  const off = () => hover.set(0);
  return { style: reduce ? undefined : { x, y }, on, off };
}

function Piece({ project, index }: { project: Project; index: number }) {
  const reduce = useReduce();
  const arrow = useNudge(reduce);

  const image = (
    <img
      src={project.image}
      srcSet={`${project.imageSmall} 800w, ${project.image} ${project.width}w`}
      sizes={SIZES[project.column]}
      width={project.width}
      height={project.height}
      alt={project.alt}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover object-top"
    />
  );

  return (
    <motion.article
      className={ORDER[index] ?? ""}
      variants={rise(24)}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={PIECE_VIEW}
      onPointerEnter={arrow.on}
      onPointerLeave={arrow.off}
    >
      {project.url ? (
        /* Pointer shortcut only: the named "Visit site" link below is the keyboard and screen-reader path. */
        <a href={project.url} target="_blank" rel="noopener" tabIndex={-1} aria-hidden className="block rounded-plate">
          <Plate className={FRAME[project.aspect]}>{image}</Plate>
        </a>
      ) : (
        <Plate className={FRAME[project.aspect]}>{image}</Plate>
      )}

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display wdth-112 text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.01em] text-ink">{project.title}</h3>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener"
            onFocus={arrow.on}
            onBlur={arrow.off}
            className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[0.875rem] font-medium leading-[1.45] text-accent underline-offset-4 hover:underline"
          >
            Visit site
            <span className="sr-only">: {project.title}</span>
            <NewTab />
            <motion.span aria-hidden className="inline-flex" style={arrow.style}>
              <ArrowUpRight size={16} weight="regular" />
            </motion.span>
          </a>
        )}
      </div>
      <p className="mt-1 max-w-[65ch] text-[1.0625rem] leading-[1.55] text-muted">{project.description}</p>
      <ul aria-label={`${project.title} stack`} className="mt-2 flex flex-wrap gap-x-[2ch] gap-y-1 font-mono text-[0.8125rem] leading-6 text-muted">
        {project.stack.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </motion.article>
  );
}

function MoreRow({ item }: { item: MoreItem }) {
  return (
    <motion.li variants={rise(12)} className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
      <div className="min-w-0 md:flex-1">
        <div className="lg:flex lg:items-baseline lg:gap-3">
          <span className="block shrink-0 text-[1rem] font-semibold leading-[1.45] text-ink">{item.title}</span>
          <span title={item.fact} className="mt-0.5 block min-w-0 text-[0.9375rem] leading-[1.45] text-muted lg:mt-0 lg:line-clamp-1">
            {item.fact}
          </span>
        </div>
        {item.with && item.with.length > 0 && (
          <p className="mt-1 text-[0.8125rem] leading-[1.45] text-muted">
            with{" "}
            {item.with.map((person, i) => (
              <span key={person.href}>
                {i > 0 && ", "}
                <a
                  href={person.href}
                  target="_blank"
                  rel="noopener"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {person.name}
                  <NewTab />
                </a>
              </span>
            ))}
          </p>
        )}
      </div>
      {item.link ? (
        <a
          href={item.link.href}
          target="_blank"
          rel="noopener"
          aria-label={`${item.link.label}: ${item.title} (opens in a new tab)`}
          className="shrink-0 font-mono text-[0.8125rem] leading-6 text-accent underline-offset-4 hover:underline"
        >
          {item.link.label}
        </a>
      ) : (
        <span className="shrink-0 font-mono text-[0.8125rem] leading-6 text-muted">Client work</span>
      )}
    </motion.li>
  );
}

function MoreGroup({ group, items }: { group: string; items: MoreItem[] }) {
  const reduce = useReduce();
  return (
    <motion.div variants={stagger(0.04)} initial={reduce ? false : "hidden"} whileInView="show" viewport={VIEW}>
      <motion.h4 variants={rise(12)} className="text-[0.875rem] font-medium leading-[1.45] text-muted">
        {group}
      </motion.h4>
      <ul className="mt-3 flex flex-col gap-4 border-t border-line pt-4">
        {items.map((item) => (
          <MoreRow key={item.title} item={item} />
        ))}
      </ul>
    </motion.div>
  );
}

function RepoLink() {
  const reduce = useReduce();
  const arrow = useNudge(reduce);
  return (
    <p className="mt-12">
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener"
        onPointerEnter={arrow.on}
        onPointerLeave={arrow.off}
        onFocus={arrow.on}
        onBlur={arrow.off}
        className="inline-flex items-center gap-1.5 font-mono text-[0.8125rem] leading-6 text-muted underline-offset-4 transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-accent hover:underline"
      >
        {PUBLIC_REPOS} public repositories on GitHub
        <NewTab />
        <motion.span aria-hidden className="inline-flex" style={arrow.style}>
          <ArrowUpRight size={16} weight="regular" />
        </motion.span>
      </a>
    </p>
  );
}

export function Work() {
  const reduce = useReduce();
  const left = featured.filter((p) => p.column === "left");
  const right = featured.filter((p) => p.column === "right");

  return (
    <section id="work" aria-labelledby="work-title" className="py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <motion.div variants={rise()} initial={reduce ? false : "hidden"} whileInView="show" viewport={VIEW}>
          <SectionHeading id="work-title">Selected work.</SectionHeading>
        </motion.div>

        {/* Offset two-column gallery. On phones the column wrappers dissolve (display: contents) and the order classes interleave the pieces. */}
        <div className="mt-12 flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-16">
          <div className="contents lg:col-span-7 lg:flex lg:flex-col lg:gap-16">
            {left.map((project) => (
              <Piece key={project.slug} project={project} index={featured.indexOf(project)} />
            ))}
          </div>
          <div className="contents lg:col-span-5 lg:mt-24 lg:flex lg:flex-col lg:gap-16">
            {right.map((project) => (
              <Piece key={project.slug} project={project} index={featured.indexOf(project)} />
            ))}
          </div>
        </div>

        <div className="mt-24">
          <h3 className="font-display wdth-112 text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.01em] text-ink">More work</h3>
          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {moreWork.map((group) => (
              <MoreGroup key={group.group} group={group.group} items={group.items} />
            ))}
          </div>
          <RepoLink />
        </div>
      </div>
    </section>
  );
}
