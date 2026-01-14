// Dotted background pattern for the workspace
export function DottedBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, var(--dotted-background) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    />
  );
}
