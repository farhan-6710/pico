"use client";

import * as React from "react";
import { useIconSettings, useLayers } from "@/lib/stores/editor-store";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Layer } from "@/types";
import {
  CANVAS_SIZE,
  PREVIEW_SIZE,
  IOS_SQUIRCLE_RADIUS_RATIO,
} from "@/lib/constants/canvas";

// Mini preview component - must be outside the main component
function MiniPreview({
  size,
  shape,
  backgroundColor,
  layers,
  refreshKey,
}: {
  size: number;
  shape: "ios" | "android";
  backgroundColor: string;
  layers: Layer[];
  refreshKey: number;
}) {
  // iOS squircle uses ~22.37% corner radius, Android uses full circle
  const borderRadius =
    shape === "ios" ? size * IOS_SQUIRCLE_RADIUS_RATIO : "50%";

  return (
    <div
      key={refreshKey}
      className="relative overflow-hidden shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius,
        backgroundColor,
      }}
    >
      {/* Render layers */}
      {layers
        .filter((l) => l.visible)
        .reverse()
        .map((layer) => {
          const scale = (layer.scale / 100) * (size / CANVAS_SIZE);
          const offsetX = (layer.position.x / CANVAS_SIZE) * size;
          const offsetY = (layer.position.y / CANVAS_SIZE) * size;

          if (layer.type === "svg") {
            return (
              <div
                key={layer.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) scale(${scale}) rotate(${layer.rotation}deg)`,
                  opacity: layer.opacity / 100,
                }}
                dangerouslySetInnerHTML={{ __html: layer.svgContent }}
              />
            );
          }

          if (layer.type === "image") {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={layer.id}
                src={layer.src}
                alt={layer.name}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) scale(${scale}) rotate(${layer.rotation}deg)`,
                  opacity: layer.opacity / 100,
                  maxWidth: "none",
                }}
              />
            );
          }

          if (layer.type === "text") {
            const fontSize = (layer.fontSize / CANVAS_SIZE) * size;
            return (
              <div
                key={layer.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) scale(${scale}) rotate(${layer.rotation}deg)`,
                  opacity: layer.opacity / 100,
                  fontFamily: layer.fontFamily,
                  fontSize,
                  fontWeight: layer.fontWeight,
                  color: layer.color,
                  textAlign: layer.textAlign,
                  whiteSpace: "nowrap",
                }}
              >
                {layer.text}
              </div>
            );
          }

          return null;
        })}
    </div>
  );
}

export function PreviewSection() {
  const iconSettings = useIconSettings();
  const layers = useLayers();
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleRefresh = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <section
      className="border-t border-border p-4 h-40 shrink-0"
      aria-labelledby="preview-heading"
    >
      <div className="flex items-center justify-between mb-3">
        <h3
          id="preview-heading"
          className="text-xs font-medium text-muted-foreground"
        >
          Previews
        </h3>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleRefresh}
          aria-label="Refresh previews"
        >
          <RefreshCw className="size-3" />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-6">
        {/* iOS Preview */}
        <div className="flex flex-col items-center gap-2">
          <MiniPreview
            size={PREVIEW_SIZE}
            shape="ios"
            backgroundColor={iconSettings.backgroundColor}
            layers={layers}
            refreshKey={refreshKey}
          />
          <span className="text-[10px] text-muted-foreground">iOS</span>
        </div>
        {/* Android Preview */}
        <div className="flex flex-col items-center gap-2">
          <MiniPreview
            size={PREVIEW_SIZE}
            shape="android"
            backgroundColor={iconSettings.backgroundColor}
            layers={layers}
            refreshKey={refreshKey}
          />
          <span className="text-[10px] text-muted-foreground">Android</span>
        </div>
      </div>
    </section>
  );
}
