import { useSyncExternalStore } from "react";

/** What the visitor wants from the contact form. Preselected by the tutoring CTAs. */
export type Need = "project" | "tutoring";

let current: Need = "project";
const listeners = new Set<() => void>();

export function setNeed(next: Need) {
  if (next === current) return;
  current = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useNeed(): Need {
  return useSyncExternalStore(subscribe, () => current, () => "project");
}
