"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Layer, IconShape } from "@/types";

export interface IconSettings {
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

// Snapshot of undoable state
interface EditorSnapshot {
  layers: Layer[];
  iconSettings: IconSettings;
}

const MAX_HISTORY = 50;

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

  // History for undo/redo
  history: EditorSnapshot[];
  historyIndex: number;

  // Actions - Project
  setProjectName: (name: string) => void;
  markSaved: () => void;

  // Actions - Undo/Redo
  undo: () => void;
  redo: () => void;

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

// Helper to save snapshot for undo
const saveSnapshot = (state: EditorState): void => {
  const snapshot: EditorSnapshot = {
    layers: JSON.parse(JSON.stringify(state.layers)),
    iconSettings: JSON.parse(JSON.stringify(state.iconSettings)),
  };

  // Remove any future history if we're not at the end
  state.history = state.history.slice(0, state.historyIndex + 1);
  state.history.push(snapshot);

  // Limit history size
  if (state.history.length > MAX_HISTORY) {
    state.history.shift();
  } else {
    state.historyIndex++;
  }
};

export const useEditorStore = create<EditorState>()(
  persist(
    immer((set) => ({
      // Initial state
      projectName: "splash-icon-lg...",
      lastSaved: new Date(),
      isDirty: false,

      layers: [],
      selectedLayerId: null,

      iconSettings: DEFAULT_ICON_SETTINGS,
      canvas: DEFAULT_CANVAS_STATE,

      // History
      history: [{ layers: [], iconSettings: DEFAULT_ICON_SETTINGS }],
      historyIndex: 0,

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

      // Undo/Redo actions
      undo: () =>
        set((state) => {
          if (state.historyIndex > 0) {
            state.historyIndex--;
            const snapshot = state.history[state.historyIndex];
            state.layers = JSON.parse(JSON.stringify(snapshot.layers));
            state.iconSettings = JSON.parse(
              JSON.stringify(snapshot.iconSettings)
            );
            state.isDirty = true;
          }
        }),

      redo: () =>
        set((state) => {
          if (state.historyIndex < state.history.length - 1) {
            state.historyIndex++;
            const snapshot = state.history[state.historyIndex];
            state.layers = JSON.parse(JSON.stringify(snapshot.layers));
            state.iconSettings = JSON.parse(
              JSON.stringify(snapshot.iconSettings)
            );
            state.isDirty = true;
          }
        }),

      // Layer actions
      addLayer: (layer) =>
        set((state) => {
          saveSnapshot(state);
          state.layers.unshift({ ...layer, id: layer.id || generateId() });
          state.selectedLayerId = layer.id;
          state.isDirty = true;
        }),

      removeLayer: (id) =>
        set((state) => {
          const index = state.layers.findIndex((l) => l.id === id);
          if (index !== -1) {
            saveSnapshot(state);
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
            saveSnapshot(state);
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
          saveSnapshot(state);
          const [removed] = state.layers.splice(fromIndex, 1);
          state.layers.splice(toIndex, 0, removed);
          state.isDirty = true;
        }),

      duplicateLayer: (id) =>
        set((state) => {
          const layer = state.layers.find((l) => l.id === id);
          if (layer) {
            saveSnapshot(state);
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
            saveSnapshot(state);
            layer.visible = !layer.visible;
            state.isDirty = true;
          }
        }),

      toggleLayerLock: (id) =>
        set((state) => {
          const layer = state.layers.find((l) => l.id === id);
          if (layer) {
            saveSnapshot(state);
            layer.locked = !layer.locked;
            state.isDirty = true;
          }
        }),

      // Icon settings actions
      setIconShape: (shape) =>
        set((state) => {
          saveSnapshot(state);
          state.iconSettings.shape = shape;
          state.isDirty = true;
        }),

      setBackgroundColor: (color) =>
        set((state) => {
          saveSnapshot(state);
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
    })),
    {
      name: "icon-craft-editor",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        projectName: state.projectName,
        layers: state.layers,
        selectedLayerId: state.selectedLayerId,
        iconSettings: state.iconSettings,
        canvas: state.canvas,
        history: state.history,
        historyIndex: state.historyIndex,
      }),
    }
  )
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

// Undo/Redo selectors
export const useCanUndo = () =>
  useEditorStore((state) => state.historyIndex > 0);
export const useCanRedo = () =>
  useEditorStore((state) => state.historyIndex < state.history.length - 1);
