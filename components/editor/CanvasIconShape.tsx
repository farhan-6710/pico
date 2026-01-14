import type { IconSettings } from "@/lib/stores/editor-store";

// Grid overlay component for the icon
export function CanvasIconShape({
  iconSettings,
}: {
  iconSettings: IconSettings;
}) {
  return (
    <div
      className="absolute inset-0 z-1 pointer-events-none"
      style={{
        backgroundImage: `url(/${
          iconSettings.shape === "android-circle"
            ? "android-grid.png"
            : "ios-grid.png"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
