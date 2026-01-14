export type IconShape = "ios-squircle" | "android-circle";

export interface CanvasState {
  zoom: number;
  pan: { x: number; y: number };
  showGrid: boolean;
}

export interface IconSettings {
  shape: IconShape;
  backgroundColor: string;
  size: number;
  noise: boolean;
  noiseOpacity: number;
}
