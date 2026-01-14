"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { useEditorStore, useIconSettings } from "@/lib/stores/editor-store";
import { cn } from "@/lib/utils";

// Predefined color palettes
const COLOR_PALETTES = {
  "Recent Colors": ["#71bf58", "#ff7eb3", "#7ec8e3", "#ffdd59"],
  "Vibrant Accents": [
    "#ffdd59",
    "#ff9f43",
    "#00d2d3",
    "#54a0ff",
    "#5f27cd",
    "#ff6b81",
  ],
  Monochrome: ["#2d3436", "#636e72", "#b2bec3", "#dfe6e9"],
  "Earthy Neutrals": ["#f5cd79", "#f8b739", "#eb8c34", "#c97f24"],
  Blues: ["#0984e3", "#74b9ff", "#a29bfe", "#6c5ce7"],
  Reds: ["#ff7675", "#fab1a0", "#fd79a8", "#e84393"],
};

export function ColorsPanel() {
  const iconSettings = useIconSettings();
  const setBackgroundColor = useEditorStore((s) => s.setBackgroundColor);
  const [localColor, setLocalColor] = React.useState(
    iconSettings.backgroundColor
  );

  React.useEffect(() => {
    setLocalColor(iconSettings.backgroundColor);
  }, [iconSettings.backgroundColor]);

  const handleColorChange = (color: string) => {
    setLocalColor(color);
    setBackgroundColor(color);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith("#")) {
      value = "#" + value;
    }
    setLocalColor(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setBackgroundColor(value);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Background Color Section */}
      <section
        className="bg-background rounded-lg p-4"
        aria-labelledby="bg-color-heading"
      >
        <h3
          id="bg-color-heading"
          className="text-xs font-medium text-muted-foreground mb-3"
        >
          Background Color
        </h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full h-12 p-2 justify-start">
              <div
                className="w-full h-full rounded-md"
                style={{ backgroundColor: iconSettings.backgroundColor }}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" align="start">
            <HexColorPicker
              color={localColor}
              onChange={handleColorChange}
              style={{ width: "200px", height: "160px" }}
            />
          </PopoverContent>
        </Popover>
        <div className="mt-2">
          <Input
            value={localColor}
            onChange={handleInputChange}
            className="font-mono text-xs"
            maxLength={7}
          />
        </div>
      </section>

      {/* Color Palettes */}
      {Object.entries(COLOR_PALETTES).map(([paletteName, colors]) => (
        <section
          key={paletteName}
          className="bg-background rounded-lg p-4"
          aria-labelledby={`${paletteName}-heading`}
        >
          <h3
            id={`${paletteName}-heading`}
            className="text-xs font-medium text-muted-foreground mb-3"
          >
            {paletteName}
          </h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={cn(
                  "size-8 rounded-lg border-2 transition-all hover:scale-110",
                  iconSettings.backgroundColor === color
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-transparent"
                )}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
