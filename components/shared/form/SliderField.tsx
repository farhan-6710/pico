"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SliderFieldProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  onChange: (value: number) => void;
  className?: string;
}

export function SliderField({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = "",
  disabled = false,
  icon,
  onChange,
  className,
}: SliderFieldProps) {
  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };

  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
          {icon}
          {label}
        </Label>
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || value <= min}
            className="h-7 px-2.5 bg-background border border-border rounded-l-md text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            −
          </button>
          <div className="h-7 min-w-[2.5rem] px-2 bg-background border-y border-border flex items-center justify-center text-xs">
            {value}
            {unit}
          </div>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || value >= max}
            className="h-7 px-2.5 bg-background border border-border rounded-r-md text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            +
          </button>
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onValueChange={handleSliderChange}
        aria-label={label}
      />
    </div>
  );
}
