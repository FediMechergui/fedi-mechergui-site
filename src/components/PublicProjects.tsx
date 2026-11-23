import { useId, useState } from "react";
import { publicProjects, PUBLIC_PROJECTS_UPDATED } from "../data/publicProjects";
import { NewTab } from "./NewTab";

export function PublicProjects() {
  const id = useId();
  const [query, setQuery] = useState("");
  const matches = publicProjects.filter((project) => `${project.name} ${project.language} ${project.description}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <details className="mt-12 rounded-plate border border-line p-5 md:p-6">
      <summary className="cursor-pointer text-base font-semibold text-ink">
        Browse all {publicProjects.length} public repositories
      </summary>
      <p className="mt-3 max-w-[65ch] text-sm leading-6 text-muted">
        Apps, prototypes, experiments and learning projects. Repository snapshot: {PUBLIC_PROJECTS_UPDATED}.
      </p>
      <label htmlFor={id} className="mt-5 block text-sm font-medium text-ink">Find a project or language</label>
      <input
        id={id}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try NetForge, Python or TypeScript"
        className="mt-2 min-h-11 w-full rounded-plate border border-line bg-page px-3 text-base text-ink placeholder:text-muted sm:max-w-md"
      />
      <p role="status" className="mt-3 font-mono text-xs text-muted">{matches.length} {matches.length === 1 ? "repository" : "repositories"}</p>
      <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((project) => (
          <li key={project.name} className="min-w-0">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="block break-words text-sm font-medium text-accent underline-offset-4 hover:underline">
              {project.name}<NewTab />
            </a>
            <p className="mt-1 text-sm leading-6 text-muted">{project.description}</p>
            <span className="mt-1 block font-mono text-xs leading-5 text-muted">{project.language}</span>
          </li>
        ))}
      </ul>
      {matches.length === 0 && <p className="mt-4 text-sm text-muted">No matching repositories. Try another name or language.</p>}
    </details>
  );
}
