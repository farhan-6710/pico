export type LayerType = "svg" | "image" | "shape" | "text";

export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

export interface Shadow {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
}

export interface Stroke {
  width: number;
  color: string;
  style: "solid" | "dashed" | "dotted";
}

export interface BaseLayer {
  id: string;
  type: LayerType;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: BlendMode;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
  shadow?: Shadow;
  stroke?: Stroke;
}

export interface SVGLayer extends BaseLayer {
  type: "svg";
  svgContent: string;
  color?: string;
}

export interface ImageLayer extends BaseLayer {
  type: "image";
  src: string;
  naturalWidth: number;
  naturalHeight: number;
}

export interface ShapeLayer extends BaseLayer {
  type: "shape";
  shapeType: "rectangle" | "circle" | "ellipse" | "polygon";
  fill: string;
  cornerRadius?: number;
}

export interface TextLayer extends BaseLayer {
  type: "text";
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  color: string;
  textAlign: "left" | "center" | "right";
}

export type Layer = SVGLayer | ImageLayer | ShapeLayer | TextLayer;
