import { ArrowUpRight } from "@phosphor-icons/react";
import { recentProjects } from "../data/recentProjects";
import { NewTab } from "./NewTab";

export function RecentProjects() {
  return (
    <div className="mt-10" aria-labelledby="recent-projects-title">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 id="recent-projects-title" className="font-display wdth-112 text-xl font-semibold text-ink">New in the portfolio</h3>
        <p className="font-mono text-xs leading-6 text-muted">Business tools, learning platforms and experiments</p>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recentProjects.map((project) => (
          <article key={project.title} className="flex flex-col rounded-plate border border-line bg-surface p-6">
            <p className="font-mono text-xs leading-5 text-accent">{project.category}</p>
            <h4 className="mt-3 font-display wdth-112 text-2xl font-semibold tracking-tight text-ink">{project.title}</h4>
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-muted">{project.description}</p>
            <ul aria-label={`${project.title} stack`} className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs leading-5 text-muted">
              {project.stack.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="mt-auto flex flex-wrap gap-5 pt-6 text-sm font-medium text-accent">
              <a href={project.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
                Source <span className="sr-only">for {project.title}</span><NewTab /><ArrowUpRight size={16} aria-hidden />
              </a>
              {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
                Explore <span className="sr-only">{project.title}</span><NewTab /><ArrowUpRight size={16} aria-hidden />
              </a>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
