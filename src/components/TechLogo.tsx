/**
 * Renders a monochrome brand mark from a simple-icons path in currentColor,
 * or a text chip when no mark exists for the tool.
 * Pass `labelled={false}` when a visible name follows the mark, so screen
 * readers do not hear the tool name twice.
 */
export function TechLogo({
  name,
  path,
  size = 28,
  className = "",
  labelled = true,
}: {
  name: string;
  path?: string;
  size?: number;
  className?: string;
  labelled?: boolean;
}) {
  if (!path) {
    return (
      <span className={`inline-flex h-7 items-center rounded-pill bg-surface-2 px-3 font-mono text-[0.8125rem] text-ink ${className}`}>
        {name}
      </span>
    );
  }
  if (!labelled) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className={`text-ink ${className}`}>
        <path d={path} fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} role="img" className={`text-ink ${className}`}>
      <title>{name}</title>
      <path d={path} fill="currentColor" />
    </svg>
  );
}
