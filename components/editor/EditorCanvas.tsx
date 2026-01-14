"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  useEditorStore,
  useCanvasState,
  useIconSettings,
  useLayers,
  useCanUndo,
  useCanRedo,
} from "@/lib/stores/editor-store";
import {
  Minus,
  Plus,
  RotateCcw,
  Grid3X3,
  Eye,
  Undo2,
  Redo2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CANVAS_SIZE,
  CANVAS_GRID_LINES,
  CANVAS_ZOOM_MIN,
  CANVAS_ZOOM_MAX,
  CANVAS_ZOOM_STEP,
  CANVAS_ZOOM_SLIDER_MIN,
  CANVAS_ZOOM_SLIDER_MAX,
  CANVAS_ZOOM_SLIDER_STEP,
  IOS_SQUIRCLE_RADIUS_RATIO,
} from "@/lib/constants/canvas";

// Dotted background pattern for the workspace
function DottedBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, var(--dotted-background) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    />
  );
}

// Grid overlay component for the icon
function CanvasGrid({ size }: { size: number }) {
  const cellSize = size / CANVAS_GRID_LINES;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      {/* Dotted grid lines */}
      {Array.from({ length: CANVAS_GRID_LINES + 1 }, (_, i) => (
        <React.Fragment key={i}>
          <line
            x1={i * cellSize}
            y1={0}
            x2={i * cellSize}
            y2={size}
            stroke="rgba(100, 200, 255, 0.4)"
            strokeWidth={i === CANVAS_GRID_LINES / 2 ? 1 : 0.5}
            strokeDasharray="4 4"
          />
          <line
            x1={0}
            y1={i * cellSize}
            x2={size}
            y2={i * cellSize}
            stroke="rgba(100, 200, 255, 0.4)"
            strokeWidth={i === CANVAS_GRID_LINES / 2 ? 1 : 0.5}
            strokeDasharray="4 4"
          />
        </React.Fragment>
      ))}
      {/* Dotted diagonal guidelines */}
      <line
        x1={0}
        y1={0}
        x2={size}
        y2={size}
        stroke="rgba(100, 200, 255, 0.25)"
        strokeWidth={0.5}
        strokeDasharray="4 4"
      />
      <line
        x1={size}
        y1={0}
        x2={0}
        y2={size}
        stroke="rgba(100, 200, 255, 0.25)"
        strokeWidth={0.5}
        strokeDasharray="4 4"
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
  const { setZoom, resetView, toggleGrid, undo, redo } = useEditorStore();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const handleZoomIn = () => setZoom(canvas.zoom + CANVAS_ZOOM_STEP);
  const handleZoomOut = () => setZoom(canvas.zoom - CANVAS_ZOOM_STEP);

  const handleZoomSlider = (value: number[]) => {
    setZoom(value[0] / 100);
  };

  // Keyboard shortcuts for undo/redo
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  // Get the appropriate border radius for iOS squircle (continuous curvature approximation)
  const getIconStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      backgroundColor: iconSettings.backgroundColor,
    };

    if (iconSettings.shape === "android-circle") {
      return {
        ...baseStyle,
        borderRadius: "50%",
      };
    }

    // iOS squircle - use smooth continuous curvature with high border radius
    // The iOS icon corner radius is approximately 22.37% of the icon size
    return {
      ...baseStyle,
      borderRadius: CANVAS_SIZE * IOS_SQUIRCLE_RADIUS_RATIO,
    };
  };

  return (
    <section
      className="relative flex-1 flex items-center justify-center bg-canvas overflow-hidden m-2 rounded-lg border border-muted"
      aria-label="Canvas workspace"
    >
      {/* Dotted background pattern */}
      <DottedBackground />

      {/* Undo/Redo controls - top left */}
      <div className="absolute top-4 left-4 flex items-center gap-1 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={undo}
          disabled={!canUndo}
          aria-label="Undo (Cmd+Z)"
          className="bg-card/80 backdrop-blur-sm"
        >
          <Undo2 className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={redo}
          disabled={!canRedo}
          aria-label="Redo (Cmd+Shift+Z)"
          className="bg-card/80 backdrop-blur-sm"
        >
          <Redo2 className="size-4" />
        </Button>
      </div>

      {/* Canvas viewport */}
      <div
        className="relative transition-transform duration-200 ease-out"
        style={{
          transform: `scale(${canvas.zoom}) translate(${canvas.pan.x}px, ${canvas.pan.y}px)`,
        }}
      >
        {/* Icon container */}
        <div
          className="relative shadow-2xl overflow-hidden"
          style={getIconStyle()}
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

          {/* Background grid pattern */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              backgroundImage: `url(/${
                iconSettings.shape === "android-circle"
                  ? "android-grid.png"
                  : "ios-grid.png"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Layers stack */}
          <div className="relative w-full h-full">
            {[...layers].reverse().map((layer) => (
              <LayerRenderer key={layer.id} layer={layer} />
            ))}
          </div>

          {/* Grid overlay */}
          {canvas.showGrid && <CanvasGrid size={CANVAS_SIZE} />}
        </div>
      </div>

      {/* Canvas controls - top right */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border z-10">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleZoomOut}
          aria-label="Zoom out"
          disabled={canvas.zoom <= CANVAS_ZOOM_MIN}
        >
          <Minus className="size-4" />
        </Button>
        <div className="w-32 flex items-center">
          <Slider
            value={[canvas.zoom * 100]}
            min={CANVAS_ZOOM_SLIDER_MIN}
            max={CANVAS_ZOOM_SLIDER_MAX}
            step={CANVAS_ZOOM_SLIDER_STEP}
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
          disabled={canvas.zoom >= CANVAS_ZOOM_MAX}
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
