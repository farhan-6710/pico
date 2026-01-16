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

    return {
      ...baseStyle,
      borderRadius: CANVAS_SIZE * IOS_SQUIRCLE_RADIUS_RATIO,
    };
  };

  return (
    <div
      className="relative flex-1 flex items-center justify-center bg-canvas overflow-hidden m-2 rounded-lg border border-muted shadow-inner"
      aria-label="Canvas workspace"
    >
      <DottedBackground />

      <div
        className="relative transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `scale(${canvas.zoom}) translate(${canvas.pan.x}px, ${canvas.pan.y}px)`,
        }}
      >
        <div
          className="relative shadow-2xl overflow-hidden ring-1 ring-border/10"
          style={getIconContainerStyle()}
        >
          {iconSettings.noise && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: iconSettings.noiseOpacity,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          )}

          {canvas.showGrid && <CanvasIconShape iconSettings={iconSettings} />}

          <div className="relative w-full h-full z-10">
            {[...layers].reverse().map((layer, index) => (
              <LayerRenderer key={layer.id} layer={layer} zIndex={index + 10} />
            ))}
          </div>
        </div>
      </div>

      <CanvasControls
        undo={undo}
        redo={redo}
        toggleGrid={toggleGrid}
        canvas={canvas}
        setZoom={setZoom}
        resetView={resetView}
      />
    </div>
  );
}
