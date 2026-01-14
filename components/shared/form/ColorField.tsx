"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  onChangeEnd?: (color: string) => void;
  className?: string;
}

export function ColorField({
  label,
  value,
  onChange,
  onChangeEnd,
  className,
}: ColorFieldProps) {
  const [localValue, setLocalValue] = React.useState(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleColorChange = (color: string) => {
    setLocalValue(color);
    onChange(color);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (!newValue.startsWith("#")) {
      newValue = "#" + newValue;
    }
    setLocalValue(newValue);
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(localValue)) {
      onChangeEnd?.(localValue);
    } else {
      setLocalValue(value);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-10 p-1 justify-start gap-2"
          >
            <div
              className="size-6 rounded-md border border-border shrink-0"
              style={{ backgroundColor: value }}
              aria-hidden
            />
            <span className="text-xs font-mono uppercase">{value}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <div className="space-y-3">
            <HexColorPicker
              color={localValue}
              onChange={handleColorChange}
              style={{ width: "200px", height: "160px" }}
            />
            <div className="flex items-center gap-2">
              <div
                className="size-8 rounded-md border border-border shrink-0"
                style={{ backgroundColor: localValue }}
              />
              <Input
                value={localValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="h-8 font-mono text-xs uppercase"
                maxLength={7}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
