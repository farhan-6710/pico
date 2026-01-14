import React from "react";
import { Button } from "../ui/button";
import {
  Eye,
  Grid3X3,
  Minus,
  Plus,
  Redo2,
  RotateCcw,
  Undo2,
} from "lucide-react";
import { Slider } from "../ui/slider";
import {
  CANVAS_ZOOM_MAX,
  CANVAS_ZOOM_MIN,
  CANVAS_ZOOM_SLIDER_MAX,
  CANVAS_ZOOM_SLIDER_MIN,
  CANVAS_ZOOM_SLIDER_STEP,
  CANVAS_ZOOM_STEP,
} from "@/lib/constants/canvas";
import { cn } from "@/lib/utils";
import {
  useCanRedo,
  useCanUndo,
  useCanvasState,
} from "@/lib/stores/editor-store";

interface CanvasControlsProps {
  undo: () => void;
  redo: () => void;
  canvas: ReturnType<typeof useCanvasState>;
  toggleGrid: () => void;
  setZoom: (zoom: number) => void;
  resetView: () => void;
}

const CanvasControls: React.FC<CanvasControlsProps> = ({
  undo,
  redo,
  canvas,
  toggleGrid,
  setZoom,
  resetView,
}) => {
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const handleZoomIn = () => setZoom(canvas.zoom + CANVAS_ZOOM_STEP);
  const handleZoomOut = () => setZoom(canvas.zoom - CANVAS_ZOOM_STEP);

  const handleZoomSlider = (value: number[]) => {
    setZoom(value[0] / 100);
  };
  return (
    <>
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
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
    </>
  );
};

export default CanvasControls;
