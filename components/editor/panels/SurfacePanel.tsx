"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditorStore, useIconSettings } from "@/lib/stores/editor-store";
import type { IconShape } from "@/types";
import { Square, Circle, Info, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export function SurfacePanel() {
  const iconSettings = useIconSettings();
  const { setIconShape, setNoise } = useEditorStore();

  const handleShapeChange = (value: string) => {
    setIconShape(value as IconShape);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Icon Shape Section */}
      <section aria-labelledby="shape-heading">
        <h3
          id="shape-heading"
          className="text-xs font-medium text-muted-foreground mb-3"
        >
          Icon Shape
        </h3>
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Square className="size-3" />
            Shape Type
          </Label>
          <Select value={iconSettings.shape} onValueChange={handleShapeChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ios-squircle">
                <span className="flex items-center gap-2">
                  <Square className="size-3" />
                  iOS (Squircle)
                </span>
              </SelectItem>
              <SelectItem value="android-circle">
                <span className="flex items-center gap-2">
                  <Circle className="size-3" />
                  Android (Circle)
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Noise/Texture Section */}
      <section aria-labelledby="noise-heading">
        <h3
          id="noise-heading"
          className="text-xs font-medium text-muted-foreground mb-3"
        >
          Noise/Texture
        </h3>
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Circle className="size-3" />
            Noise
          </Label>
          <Switch
            checked={iconSettings.noise}
            onCheckedChange={setNoise}
            aria-label="Toggle noise texture"
          />
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-card/50 rounded-lg p-3 border border-border">
        <div className="flex items-start gap-2">
          <Info className="size-4 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-medium">Info</h4>
            <p className="text-xs text-muted-foreground mt-1">
              New effects coming soon
            </p>
          </div>
        </div>
      </section>

      {/* Previews Section */}
      <section aria-labelledby="previews-heading">
        <div className="flex items-center justify-between mb-3">
          <h3
            id="previews-heading"
            className="text-xs font-medium text-muted-foreground"
          >
            Previews
          </h3>
          <Button variant="ghost" size="icon-sm" aria-label="Refresh previews">
            <RefreshCw className="size-3" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* iOS Preview */}
          <PreviewCard
            label="iOS"
            shape="ios-squircle"
            backgroundColor={iconSettings.backgroundColor}
          />
          {/* Android Preview */}
          <PreviewCard
            label="Android"
            shape="android-circle"
            backgroundColor={iconSettings.backgroundColor}
          />
        </div>
      </section>
    </div>
  );
}

function PreviewCard({
  label,
  shape,
  backgroundColor,
}: {
  label: string;
  shape: IconShape;
  backgroundColor: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "size-16 shadow-md flex items-center justify-center text-white text-xs font-semibold",
          shape === "android-circle" ? "rounded-full" : "rounded-2xl",
        )}
        style={{ backgroundColor }}
      >
        {/* Placeholder icon representation */}
        <span className="opacity-60">☕</span>
      </div>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
