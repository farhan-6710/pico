"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { FileEdit, Square, Circle, FileImage, Download } from "lucide-react";
import { cn } from "@/lib/utils";

type ExportFormat = "png" | "jpg";
type PresetType = "single" | "ios-pack" | "android-pack";

interface ExportSize {
  size: number;
  label: string;
  dimensions: string;
}

const EXPORT_SIZES: ExportSize[] = [
  { size: 1024, label: "1024", dimensions: "1024px × 1024px" },
  { size: 256, label: "256", dimensions: "256px × 256px" },
  { size: 192, label: "192", dimensions: "192px × 192px" },
  { size: 180, label: "180", dimensions: "180px × 180px" },
  { size: 128, label: "128", dimensions: "128px × 128px" },
  { size: 120, label: "120", dimensions: "120px × 120px" },
  { size: 60, label: "60", dimensions: "60px × 60px" },
];

export function ExportPanel() {
  const { setIconShape } = useEditorStore();
  const iconSettings = useIconSettings();
  const [fileName, setFileName] = React.useState("icon");
  const [format, setFormat] = React.useState<ExportFormat>("png");
  const [preset, setPreset] = React.useState<PresetType>("single");
  const [selectedSizes, setSelectedSizes] = React.useState<Set<number>>(
    new Set([1024])
  );

  const handleSizeToggle = (size: number) => {
    const newSizes = new Set(selectedSizes);
    if (newSizes.has(size)) {
      newSizes.delete(size);
    } else {
      newSizes.add(size);
    }
    setSelectedSizes(newSizes);
  };

  const handleShapeChange = (value: string) => {
    setIconShape(value as IconShape);
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting:", {
      fileName,
      format,
      iconSettings,
      preset,
      sizes: Array.from(selectedSizes),
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* File Name Section */}
      <section aria-labelledby="filename-heading">
        <Label
          htmlFor="filename-input"
          className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2"
        >
          <FileEdit className="size-3" />
          File Name
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="filename-input"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground">.{format}</span>
        </div>
      </section>

      {/* Shape Type Section */}
      <section aria-labelledby="shape-type-heading">
        <Label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2">
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
      </section>

      {/* Format Section */}
      <section aria-labelledby="format-heading">
        <Label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2">
          <FileImage className="size-3" />
          Format
        </Label>
        <div className="flex gap-2">
          <Button
            variant={format === "png" ? "default" : "outline"}
            className="flex-1 gap-2"
            onClick={() => setFormat("png")}
          >
            <FileImage className="size-4" />
            PNG
          </Button>
          <Button
            variant={format === "jpg" ? "default" : "outline"}
            className="flex-1 gap-2"
            onClick={() => setFormat("jpg")}
          >
            <FileImage className="size-4" />
            JPG
          </Button>
        </div>
      </section>

      {/* Preset Section */}
      <section aria-labelledby="preset-heading">
        <Label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-2">
          <Square className="size-3" />
          Preset
        </Label>
        <Select
          value={preset}
          onValueChange={(value) => setPreset(value as PresetType)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single / Custom Sizes</SelectItem>
            <SelectItem value="ios-pack">iOS App Icon Pack (ZIP)</SelectItem>
            <SelectItem value="android-pack">
              Android App Icon Pack (ZIP)
            </SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* Size Selection Section */}
      <section aria-labelledby="sizes-heading">
        <Label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-3">
          Select Sizes
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {EXPORT_SIZES.map((item) => (
            <button
              key={item.size}
              onClick={() => handleSizeToggle(item.size)}
              className={cn(
                "flex flex-col items-center justify-center rounded-lg border-2 transition-all p-4",
                selectedSizes.has(item.size)
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background hover:bg-muted"
              )}
            >
              <span className="text-3xl font-bold mb-1">{item.label}</span>
              <span className="text-xs text-muted-foreground">
                {item.dimensions}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Export Button */}
      <Button
        size="lg"
        className="w-full gap-2 bg-primary hover:bg-primary/90"
        onClick={handleExport}
      >
        <Download className="size-4" />
        Export Image
      </Button>
    </div>
  );
}
