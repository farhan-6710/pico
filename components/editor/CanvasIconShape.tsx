import type { IconSettings } from "@/lib/stores/editor-store";
import Image from "next/image";

// Grid overlay component for the icon
export function CanvasIconShape({
  iconSettings,
}: {
  iconSettings: IconSettings;
}) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Image
        src={
          iconSettings.shape === "android-circle"
            ? "/android-grid.png"
            : "/ios-grid.png"
        }
        alt="Grid overlay"
        fill
        className="object-cover opacity-100"
        priority
      />
    </div>
  );
}
