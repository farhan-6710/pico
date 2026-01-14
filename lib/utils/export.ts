import type { Layer, IconShape } from "@/types";
import { IOS_SQUIRCLE_RADIUS_RATIO } from "@/lib/constants/canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface ExportOptions {
  fileName: string;
  format: "png" | "jpg";
  shapeType: IconShape;
  backgroundColor: string;
  layers: Layer[];
  sizes: number[];
  noise?: boolean;
  noiseOpacity?: number;
}

/**
 * Renders a single layer to a canvas context at a specific scale
 */
async function renderLayer(
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  baseSize: number,
  targetSize: number
): Promise<void> {
  if (!layer.visible) return;

  const scale = targetSize / baseSize;
  const centerX = targetSize / 2;
  const centerY = targetSize / 2;

  ctx.save();
  ctx.globalAlpha = layer.opacity / 100;
  ctx.globalCompositeOperation = layer.blendMode as GlobalCompositeOperation;

  // Apply transformations
  ctx.translate(centerX, centerY);
  ctx.translate(layer.position.x * scale, layer.position.y * scale);
  ctx.rotate((layer.rotation * Math.PI) / 180);
  ctx.scale((layer.scale / 100) * scale, (layer.scale / 100) * scale);

  if (layer.type === "image") {
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        ctx.drawImage(
          img,
          -layer.naturalWidth / 2,
          -layer.naturalHeight / 2,
          layer.naturalWidth,
          layer.naturalHeight
        );
        resolve();
      };
      img.onerror = reject;
      img.src = layer.src;
    });
  } else if (layer.type === "svg") {
    // For SVG, we need to parse and render it
    const svgBlob = new Blob([layer.svgContent], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        const svgSize = 200; // Default SVG size
        ctx.drawImage(img, -svgSize / 2, -svgSize / 2, svgSize, svgSize);
        URL.revokeObjectURL(url);
        resolve();
      };
      img.onerror = reject;
      img.src = url;
    });
  } else if (layer.type === "text") {
    ctx.font = `${layer.fontWeight} ${layer.fontSize}px ${layer.fontFamily}`;
    ctx.fillStyle = layer.color;
    ctx.textAlign = layer.textAlign;
    ctx.textBaseline = "middle";
    ctx.fillText(layer.text, 0, 0);
  } else if (layer.type === "shape") {
    ctx.fillStyle = layer.fill;
    const size = 100;
    if (layer.shapeType === "rectangle") {
      const radius = layer.cornerRadius || 0;
      ctx.beginPath();
      ctx.roundRect(-size / 2, -size / 2, size, size, radius);
      ctx.fill();
    } else if (layer.shapeType === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

/**
 * Exports icon at a specific size
 */
async function exportAtSize(
  options: ExportOptions,
  size: number
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Fill background
  ctx.fillStyle = options.backgroundColor;
  ctx.fillRect(0, 0, size, size);

  // Render all layers
  const sortedLayers = [...options.layers].reverse();
  for (const layer of sortedLayers) {
    await renderLayer(ctx, layer, 800, size); // 800 is base canvas size
  }

  // Apply noise if enabled
  if (options.noise && options.noiseOpacity) {
    // Simple noise implementation
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    const noiseAmount = options.noiseOpacity * 25;

    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * noiseAmount;
      data[i] += noise; // R
      data[i + 1] += noise; // G
      data[i + 2] += noise; // B
    }
    ctx.putImageData(imageData, 0, 0);
  }

  // Create final canvas with shape masking
  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = size;
  finalCanvas.height = size;
  const finalCtx = finalCanvas.getContext("2d")!;

  // Create clipping path for shape
  finalCtx.beginPath();
  if (options.shapeType === "android-circle") {
    finalCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  } else {
    // iOS squircle
    const radius = size * IOS_SQUIRCLE_RADIUS_RATIO;
    finalCtx.roundRect(0, 0, size, size, radius);
  }
  finalCtx.clip();
  finalCtx.drawImage(canvas, 0, 0);

  return new Promise((resolve) => {
    finalCanvas.toBlob(
      (blob) => resolve(blob!),
      options.format === "png" ? "image/png" : "image/jpeg",
      0.95
    );
  });
}

/**
 * Main export function
 */
export async function exportIcon(options: ExportOptions): Promise<void> {
  const { fileName, format, sizes } = options;

  if (sizes.length === 1) {
    // Single size - direct download
    const blob = await exportAtSize(options, sizes[0]);
    saveAs(blob, `${fileName}.${format}`);
  } else {
    // Multiple sizes - create ZIP
    const zip = new JSZip();

    for (const size of sizes) {
      const blob = await exportAtSize(options, size);
      zip.file(`${fileName}-${size}x${size}.${format}`, blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${fileName}.zip`);
  }
}
