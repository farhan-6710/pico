"use client";

import * as React from "react";
import {
  useCanvasState,
  useEditorStore,
  useIconSettings,
  useLayers,
} from "@/lib/stores/editor-store";
import { CANVAS_SIZE, IOS_SQUIRCLE_RADIUS_RATIO } from "@/lib/constants/canvas";
import { DottedBackground } from "./DottedBackground";
import { CanvasIconShape } from "./CanvasIconShape";
import { LayerRenderer } from "./LayerRenderer";
import CanvasControls from "./CanvasControls";

export function EditorCanvas() {
  const iconSettings = useIconSettings();
  const canvas = useCanvasState();
  const { setZoom, resetView, toggleGrid, undo, redo } = useEditorStore();
  const layers = useLayers();

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
  const getIconContainerStyle = (): React.CSSProperties => {
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
      <div className="absolute top-4 left-4 flex items-center gap-1 z-10"></div>

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
          style={getIconContainerStyle()}
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

          {/* Android/iOS shape grid - z-index 1 */}
          {canvas.showGrid && <CanvasIconShape iconSettings={iconSettings} />}

          {/* Layers stack - explicit z-index for proper stacking */}
          <div className="relative w-full h-full z-10">
            {[...layers].reverse().map((layer, index) => (
              <LayerRenderer key={layer.id} layer={layer} zIndex={index + 10} />
            ))}
          </div>

          {/* Grid overlay */}
        </div>
      </div>

      {/* Canvas controls - top right */}
      <CanvasControls
        undo={undo}
        redo={redo}
        toggleGrid={toggleGrid}
        canvas={canvas}
        setZoom={setZoom}
        resetView={resetView}
      />
    </section>
  );
}
