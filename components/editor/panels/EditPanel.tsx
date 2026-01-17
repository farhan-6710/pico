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
import { SliderField } from "@/components/shared/form";
import { useEditorStore, useSelectedLayer } from "@/lib/stores/editor-store";
import type { BlendMode } from "@/types";
import { RotateCw, Eye, Blend, Lock, Maximize2 } from "lucide-react";

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
  const { updateLayer, toggleLayerVisibility, toggleLayerLock } =
    useEditorStore();

  if (!selectedLayer) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-6 text-center">
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
    <div className="flex flex-col gap-4 p-4">
      {/* Transform Card */}
      <section
        className="bg-background rounded-lg border p-4"
        aria-labelledby="transform-heading"
      >
        <h3
          id="transform-heading"
          className="text-xs font-medium text-muted-foreground mb-4"
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

      {/* Appearance Card */}
      <section
        className="bg-background rounded-lg border p-4"
        aria-labelledby="appearance-heading"
      >
        <h3
          id="appearance-heading"
          className="text-xs font-medium text-muted-foreground mb-4"
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

      {/* Default Card */}
      <section
        className="bg-background rounded-lg border p-4"
        aria-labelledby="default-heading"
      >
        <h3
          id="default-heading"
          className="text-xs font-medium text-muted-foreground mb-4"
        >
          Default
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Eye className="size-3" />
              Visible
            </Label>
            <Switch
              checked={selectedLayer.visible}
              onCheckedChange={() => toggleLayerVisibility(selectedLayer.id)}
              aria-label="Toggle layer visibility"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Lock className="size-3" />
              Locked
            </Label>
            <Switch
              checked={selectedLayer.locked}
              onCheckedChange={() => toggleLayerLock(selectedLayer.id)}
              aria-label="Toggle layer lock"
            />
          </div>
        </div>
      </section>

      {/* Shadow Card */}
      <section
        className="bg-background rounded-lg border p-4"
        aria-labelledby="shadow-heading"
      >
        <h3
          id="shadow-heading"
          className="text-xs font-medium text-muted-foreground mb-4"
        >
          Shadow
        </h3>
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">Shadow</Label>
          <Switch checked={false} disabled aria-label="Toggle shadow" />
        </div>
      </section>
    </div>
  );
}
