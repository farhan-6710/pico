"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Layer, IconShape } from "@/types";

interface IconSettings {
  shape: IconShape;
  backgroundColor: string;
  size: number;
  noise: boolean;
  noiseOpacity: number;
}

interface CanvasState {
  zoom: number;
  pan: { x: number; y: number };
  showGrid: boolean;
}

interface EditorState {
  // Project info
  projectName: string;
  lastSaved: Date | null;
  isDirty: boolean;

  // Layers
  layers: Layer[];
  selectedLayerId: string | null;

  // Icon settings
  iconSettings: IconSettings;

  // Canvas state
  canvas: CanvasState;

  // Actions - Project
  setProjectName: (name: string) => void;
  markSaved: () => void;

  // Actions - Layers
  addLayer: (layer: Layer) => void;
  removeLayer: (id: string) => void;
  updateLayer: (id: string, updates: Partial<Layer>) => void;
  selectLayer: (id: string | null) => void;
  reorderLayers: (fromIndex: number, toIndex: number) => void;
  duplicateLayer: (id: string) => void;
  toggleLayerVisibility: (id: string) => void;
  toggleLayerLock: (id: string) => void;

  // Actions - Icon Settings
  setIconShape: (shape: IconShape) => void;
  setBackgroundColor: (color: string) => void;
  setNoise: (enabled: boolean) => void;
  setNoiseOpacity: (opacity: number) => void;

  // Actions - Canvas
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
  toggleGrid: () => void;
  resetView: () => void;
}

const DEFAULT_ICON_SETTINGS: IconSettings = {
  shape: "ios-squircle",
  backgroundColor: "#71bf58",
  size: 1024,
  noise: false,
  noiseOpacity: 0.1,
};

const DEFAULT_CANVAS_STATE: CanvasState = {
  zoom: 0.58,
  pan: { x: 0, y: 0 },
  showGrid: true,
};

// Helper to generate unique IDs
const generateId = () =>
  `layer-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const useEditorStore = create<EditorState>()(
  immer((set) => ({
    // Initial state
    projectName: "splash-icon-lg...",
    lastSaved: new Date(),
    isDirty: false,

    layers: [],
    selectedLayerId: null,

    iconSettings: DEFAULT_ICON_SETTINGS,
    canvas: DEFAULT_CANVAS_STATE,

    // Project actions
    setProjectName: (name) =>
      set((state) => {
        state.projectName = name;
        state.isDirty = true;
      }),

    markSaved: () =>
      set((state) => {
        state.lastSaved = new Date();
        state.isDirty = false;
      }),

    // Layer actions
    addLayer: (layer) =>
      set((state) => {
        state.layers.unshift({ ...layer, id: layer.id || generateId() });
        state.selectedLayerId = layer.id;
        state.isDirty = true;
      }),

    removeLayer: (id) =>
      set((state) => {
        const index = state.layers.findIndex((l) => l.id === id);
        if (index !== -1) {
          state.layers.splice(index, 1);
          if (state.selectedLayerId === id) {
            state.selectedLayerId = state.layers[0]?.id ?? null;
          }
          state.isDirty = true;
        }
      }),

    updateLayer: (id, updates) =>
      set((state) => {
        const layer = state.layers.find((l) => l.id === id);
        if (layer) {
          Object.assign(layer, updates);
          state.isDirty = true;
        }
      }),

    selectLayer: (id) =>
      set((state) => {
        state.selectedLayerId = id;
      }),

    reorderLayers: (fromIndex, toIndex) =>
      set((state) => {
        const [removed] = state.layers.splice(fromIndex, 1);
        state.layers.splice(toIndex, 0, removed);
        state.isDirty = true;
      }),

    duplicateLayer: (id) =>
      set((state) => {
        const layer = state.layers.find((l) => l.id === id);
        if (layer) {
          const newLayer = {
            ...JSON.parse(JSON.stringify(layer)),
            id: generateId(),
            name: `${layer.name} copy`,
          };
          const index = state.layers.findIndex((l) => l.id === id);
          state.layers.splice(index, 0, newLayer);
          state.selectedLayerId = newLayer.id;
          state.isDirty = true;
        }
      }),

    toggleLayerVisibility: (id) =>
      set((state) => {
        const layer = state.layers.find((l) => l.id === id);
        if (layer) {
          layer.visible = !layer.visible;
          state.isDirty = true;
        }
      }),

    toggleLayerLock: (id) =>
      set((state) => {
        const layer = state.layers.find((l) => l.id === id);
        if (layer) {
          layer.locked = !layer.locked;
          state.isDirty = true;
        }
      }),

    // Icon settings actions
    setIconShape: (shape) =>
      set((state) => {
        state.iconSettings.shape = shape;
        state.isDirty = true;
      }),

    setBackgroundColor: (color) =>
      set((state) => {
        state.iconSettings.backgroundColor = color;
        state.isDirty = true;
      }),

    setNoise: (enabled) =>
      set((state) => {
        state.iconSettings.noise = enabled;
        state.isDirty = true;
      }),

    setNoiseOpacity: (opacity) =>
      set((state) => {
        state.iconSettings.noiseOpacity = opacity;
        state.isDirty = true;
      }),

    // Canvas actions
    setZoom: (zoom) =>
      set((state) => {
        state.canvas.zoom = Math.max(0.1, Math.min(3, zoom));
      }),

    setPan: (pan) =>
      set((state) => {
        state.canvas.pan = pan;
      }),

    toggleGrid: () =>
      set((state) => {
        state.canvas.showGrid = !state.canvas.showGrid;
      }),

    resetView: () =>
      set((state) => {
        state.canvas.zoom = DEFAULT_CANVAS_STATE.zoom;
        state.canvas.pan = DEFAULT_CANVAS_STATE.pan;
      }),
  }))
);

// Selectors
export const useSelectedLayer = () =>
  useEditorStore((state) =>
    state.layers.find((l) => l.id === state.selectedLayerId)
  );

export const useLayers = () => useEditorStore((state) => state.layers);
export const useIconSettings = () =>
  useEditorStore((state) => state.iconSettings);
export const useCanvasState = () => useEditorStore((state) => state.canvas);
