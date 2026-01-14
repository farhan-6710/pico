"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SliderField } from "@/components/shared/form";
import { useEditorStore, useSelectedLayer } from "@/lib/stores/editor-store";
import type { BlendMode } from "@/types";
import {
  Move,
  Maximize2,
  RotateCw,
  Eye,
  Blend,
  Minus,
  Plus,
} from "lucide-react";

const BLEND_MODES: { value: BlendMode; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "multiply", label: "Multiply" },
  { value: "screen", label: "Screen" },
  { value: "overlay", label: "Overlay" },
  { value: "darken", label: "Darken" },
  { value: "lighten", label: "Lighten" },
  { value: "color-dodge", label: "Color Dodge" },
  { value: "color-burn", label: "Color Burn" },
  { value: "hard-light", label: "Hard Light" },
  { value: "soft-light", label: "Soft Light" },
  { value: "difference", label: "Difference" },
  { value: "exclusion", label: "Exclusion" },
];

export function EditPanel() {
  const selectedLayer = useSelectedLayer();
  const updateLayer = useEditorStore((s) => s.updateLayer);

  if (!selectedLayer) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="text-muted-foreground text-sm">
          Select a layer to edit its properties
        </div>
      </div>
    );
  }

  const handlePositionChange = (axis: "x" | "y", value: number) => {
    updateLayer(selectedLayer.id, {
      position: { ...selectedLayer.position, [axis]: value },
    });
  };

  const handleScaleChange = (value: number) => {
    updateLayer(selectedLayer.id, { scale: value });
  };

  const handleRotationChange = (value: number) => {
    updateLayer(selectedLayer.id, { rotation: value });
  };

  const handleOpacityChange = (value: number) => {
    updateLayer(selectedLayer.id, { opacity: value });
  };

  const handleBlendModeChange = (value: BlendMode) => {
    updateLayer(selectedLayer.id, { blendMode: value });
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Transform Section */}
      <section aria-labelledby="transform-heading">
        <h3
          id="transform-heading"
          className="text-xs font-medium text-muted-foreground mb-3"
        >
          Transform
        </h3>
        <div className="space-y-4">
          <SliderField
            label="Scale"
            icon={<Maximize2 className="size-3" />}
            value={selectedLayer.scale}
            min={1}
            max={200}
            step={1}
            onChange={handleScaleChange}
          />

          {/* Position controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Move className="size-3" />
                Position
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">Y</span>
                <span className="text-[10px] text-muted-foreground ml-6">
                  X
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 flex-1">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() =>
                    handlePositionChange("y", selectedLayer.position.y - 1)
                  }
                  aria-label="Decrease Y position"
                >
                  <Minus className="size-3" />
                </Button>
                <Input
                  type="number"
                  value={selectedLayer.position.y}
                  onChange={(e) =>
                    handlePositionChange("y", parseInt(e.target.value) || 0)
                  }
                  className="h-7 w-12 text-xs text-center px-1"
                />
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() =>
                    handlePositionChange("y", selectedLayer.position.y + 1)
                  }
                  aria-label="Increase Y position"
                >
                  <Plus className="size-3" />
                </Button>
              </div>
              <div className="flex items-center gap-1 flex-1">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() =>
                    handlePositionChange("x", selectedLayer.position.x - 1)
                  }
                  aria-label="Decrease X position"
                >
                  <Minus className="size-3" />
                </Button>
                <Input
                  type="number"
                  value={selectedLayer.position.x}
                  onChange={(e) =>
                    handlePositionChange("x", parseInt(e.target.value) || 0)
                  }
                  className="h-7 w-12 text-xs text-center px-1"
                />
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() =>
                    handlePositionChange("x", selectedLayer.position.x + 1)
                  }
                  aria-label="Increase X position"
                >
                  <Plus className="size-3" />
                </Button>
              </div>
            </div>
          </div>

          <SliderField
            label="Y Position"
            value={selectedLayer.position.y}
            min={-200}
            max={200}
            step={1}
            onChange={(v) => handlePositionChange("y", v)}
          />

          <SliderField
            label="X Position"
            value={selectedLayer.position.x}
            min={-200}
            max={200}
            step={1}
            onChange={(v) => handlePositionChange("x", v)}
          />

          <SliderField
            label="Rotation (°)"
            icon={<RotateCw className="size-3" />}
            value={selectedLayer.rotation}
            min={0}
            max={360}
            step={1}
            onChange={handleRotationChange}
          />
        </div>
      </section>

      <Separator />

      {/* Appearance Section */}
      <section aria-labelledby="appearance-heading">
        <h3
          id="appearance-heading"
          className="text-xs font-medium text-muted-foreground mb-3"
        >
          Appearance
        </h3>
        <div className="space-y-4">
          <SliderField
            label="Opacity"
            icon={<Eye className="size-3" />}
            value={selectedLayer.opacity}
            min={0}
            max={100}
            step={1}
            onChange={handleOpacityChange}
          />

          <div className="space-y-2">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Blend className="size-3" />
              Blend Mode
            </span>
            <Select
              value={selectedLayer.blendMode}
              onValueChange={handleBlendModeChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BLEND_MODES.map((mode) => (
                  <SelectItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <Separator />

      {/* Default indicator */}
      <div className="text-xs text-muted-foreground">Default</div>
    </div>
  );
}
