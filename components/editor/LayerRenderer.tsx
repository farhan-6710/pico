// Layer renderer
export function LayerRenderer({
  layer,
  zIndex,
}: {
  layer: import("@/types").Layer;
  zIndex: number;
}) {
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
    zIndex,
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
        width={layer.naturalWidth}
        height={layer.naturalHeight}
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
