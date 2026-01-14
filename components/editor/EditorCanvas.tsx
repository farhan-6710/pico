"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  useEditorStore,
  useCanvasState,
  useIconSettings,
  useLayers,
} from "@/lib/stores/editor-store";
import { Minus, Plus, RotateCcw, Grid3X3, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

// iOS-style squircle SVG clip path (continuous curvature)
function IOSSquircleMask({ id }: { id: string }) {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path d="M 0.5 0 C 0.785 0 0.93 0.07 0.965 0.035 C 1 0.07 1 0.215 1 0.5 C 1 0.785 1 0.93 0.965 0.965 C 0.93 1 0.785 1 0.5 1 C 0.215 1 0.07 1 0.035 0.965 C 0 0.93 0 0.785 0 0.5 C 0 0.215 0 0.07 0.035 0.035 C 0.07 0 0.215 0 0.5 0" />
        </clipPath>
      </defs>
    </svg>
  );
}

// Grid overlay component
function CanvasGrid({ size }: { size: number }) {
  const gridLines = 8;
  const cellSize = size / gridLines;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      {/* Grid lines */}
      {Array.from({ length: gridLines + 1 }, (_, i) => (
        <React.Fragment key={i}>
          <line
            x1={i * cellSize}
            y1={0}
            x2={i * cellSize}
            y2={size}
            stroke="rgba(100, 200, 255, 0.3)"
            strokeWidth={i === gridLines / 2 ? 1.5 : 0.5}
          />
          <line
            x1={0}
            y1={i * cellSize}
            x2={size}
            y2={i * cellSize}
            stroke="rgba(100, 200, 255, 0.3)"
            strokeWidth={i === gridLines / 2 ? 1.5 : 0.5}
          />
        </React.Fragment>
      ))}
      {/* Diagonal guidelines */}
      <line
        x1={0}
        y1={0}
        x2={size}
        y2={size}
        stroke="rgba(100, 200, 255, 0.2)"
        strokeWidth={0.5}
      />
      <line
        x1={size}
        y1={0}
        x2={0}
        y2={size}
        stroke="rgba(100, 200, 255, 0.2)"
        strokeWidth={0.5}
      />
    </svg>
  );
}

// Layer renderer
function LayerRenderer({ layer }: { layer: import("@/types").Layer }) {
  const style: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: `translate(-50%, -50%) translate(${layer.position.x}px, ${
      layer.position.y
    }px) scale(${layer.scale / 100}) rotate(${layer.rotation}deg)`,
    opacity: layer.opacity / 100,
    mixBlendMode: layer.blendMode as React.CSSProperties["mixBlendMode"],
    pointerEvents: layer.locked ? "none" : "auto",
    display: layer.visible ? "block" : "none",
  };

  if (layer.type === "svg") {
    return (
      <div
        style={style}
        className="flex items-center justify-center"
        dangerouslySetInnerHTML={{ __html: layer.svgContent }}
      />
    );
  }

  if (layer.type === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={layer.src}
        alt={layer.name}
        style={style}
        className="max-w-none"
      />
    );
  }

  if (layer.type === "text") {
    return (
      <div
        style={{
          ...style,
          fontFamily: layer.fontFamily,
          fontSize: layer.fontSize,
          fontWeight: layer.fontWeight,
          color: layer.color,
          textAlign: layer.textAlign,
        }}
      >
        {layer.text}
      </div>
    );
  }

  return null;
}

export function EditorCanvas() {
  const iconSettings = useIconSettings();
  const canvas = useCanvasState();
  const layers = useLayers();
  const { setZoom, resetView, toggleGrid } = useEditorStore();

  const canvasSize = 400; // Display size
  const clipPathId = "ios-squircle-mask";

  const handleZoomIn = () => setZoom(canvas.zoom + 0.1);
  const handleZoomOut = () => setZoom(canvas.zoom - 0.1);

  const handleZoomSlider = (value: number[]) => {
    setZoom(value[0] / 100);
  };

  return (
    <section
      className="relative flex-1 flex items-center justify-center bg-background overflow-hidden"
      aria-label="Canvas workspace"
    >
      {/* iOS Squircle mask definition */}
      <IOSSquircleMask id={clipPathId} />

      {/* Canvas viewport */}
      <div
        className="relative transition-transform duration-200 ease-out"
        style={{
          transform: `scale(${canvas.zoom}) translate(${canvas.pan.x}px, ${canvas.pan.y}px)`,
        }}
      >
        {/* Icon background */}
        <div
          className={cn(
            "relative shadow-2xl",
            iconSettings.shape === "android-circle" ? "rounded-full" : ""
          )}
          style={{
            width: canvasSize,
            height: canvasSize,
            backgroundColor: iconSettings.backgroundColor,
            clipPath:
              iconSettings.shape === "ios-squircle"
                ? `url(#${clipPathId})`
                : undefined,
            borderRadius:
              iconSettings.shape === "android-circle" ? "50%" : undefined,
          }}
        >
          {/* Noise overlay */}
          {iconSettings.noise && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: iconSettings.noiseOpacity,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          )}

          {/* Layers stack */}
          <div className="relative w-full h-full">
            {[...layers].reverse().map((layer) => (
              <LayerRenderer key={layer.id} layer={layer} />
            ))}
          </div>

          {/* Grid overlay */}
          {canvas.showGrid && <CanvasGrid size={canvasSize} />}
        </div>
      </div>

      {/* Canvas controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleGrid}
          aria-label={canvas.showGrid ? "Hide grid" : "Show grid"}
          className={cn(
            "bg-card/80 backdrop-blur-sm",
            canvas.showGrid && "bg-muted"
          )}
        >
          <Grid3X3 className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Toggle preview mode"
          className="bg-card/80 backdrop-blur-sm"
        >
          <Eye className="size-4" />
        </Button>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleZoomOut}
          aria-label="Zoom out"
          disabled={canvas.zoom <= 0.1}
        >
          <Minus className="size-4" />
        </Button>
        <div className="w-32 flex items-center">
          <Slider
            value={[canvas.zoom * 100]}
            min={10}
            max={300}
            step={5}
            onValueChange={handleZoomSlider}
            aria-label="Zoom level"
          />
        </div>
        <span className="text-xs text-muted-foreground w-10 text-center">
          {Math.round(canvas.zoom * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleZoomIn}
          aria-label="Zoom in"
          disabled={canvas.zoom >= 3}
        >
          <Plus className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={resetView}
          aria-label="Reset view"
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>
    </section>
  );
}
