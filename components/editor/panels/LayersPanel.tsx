"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import {
  useEditorStore,
  useLayers,
  useSelectedLayer,
} from "@/lib/stores/editor-store";
import type { Layer, ImageLayer, TextLayer, ShapeLayer } from "@/types";
import {
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  MoreVertical,
  Image as ImageIcon,
  Type,
  Square,
  FileCode,
  GripVertical,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Helper to generate unique IDs
const generateId = () =>
  `layer-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

function LayerIcon({ type }: { type: Layer["type"] }) {
  const icons = {
    svg: FileCode,
    image: ImageIcon,
    text: Type,
    shape: Square,
  };
  const Icon = icons[type];
  return <Icon className="size-4 text-muted-foreground" />;
}

function LayerListItem({
  layer,
  isSelected,
}: {
  layer: Layer;
  isSelected: boolean;
}) {
  const {
    selectLayer,
    removeLayer,
    duplicateLayer,
    toggleLayerVisibility,
    toggleLayerLock,
    reorderLayers,
  } = useEditorStore();
  const layers = useLayers();
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const currentIndex = layers.findIndex((l) => l.id === layer.id);

  const handleMoveUp = () => {
    if (currentIndex > 0) {
      reorderLayers(currentIndex, currentIndex - 1);
    }
  };

  const handleMoveDown = () => {
    if (currentIndex < layers.length - 1) {
      reorderLayers(currentIndex, currentIndex + 1);
    }
  };

  const handleDelete = () => {
    removeLayer(layer.id);
    setDeleteModalOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          "group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
          isSelected
            ? "bg-primary/10 border border-primary/30"
            : "hover:bg-muted/50 border border-transparent",
        )}
        onClick={() => selectLayer(layer.id)}
        role="button"
        tabIndex={0}
        aria-pressed={isSelected}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            selectLayer(layer.id);
          }
        }}
      >
        {/* Drag handle */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
          <GripVertical className="size-4 text-muted-foreground" />
        </div>

        {/* Layer icon */}
        <LayerIcon type={layer.type} />

        {/* Layer name */}
        <span className="flex-1 text-sm truncate">{layer.name}</span>

        {/* Quick actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={(e) => {
              e.stopPropagation();
              toggleLayerVisibility(layer.id);
            }}
            aria-label={layer.visible ? "Hide layer" : "Show layer"}
          >
            {layer.visible ? (
              <Eye className="size-3" />
            ) : (
              <EyeOff className="size-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={(e) => {
              e.stopPropagation();
              toggleLayerLock(layer.id);
            }}
            aria-label={layer.locked ? "Unlock layer" : "Lock layer"}
          >
            {layer.locked ? (
              <Lock className="size-3" />
            ) : (
              <Unlock className="size-3" />
            )}
          </Button>
        </div>

        {/* More options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={(e) => e.stopPropagation()}
              aria-label="Layer options"
            >
              <MoreVertical className="size-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={handleMoveUp}
              disabled={currentIndex === 0}
            >
              <ChevronUp className="size-4 mr-2" />
              Move Up
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleMoveDown}
              disabled={currentIndex === layers.length - 1}
            >
              <ChevronDown className="size-4 mr-2" />
              Move Down
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => duplicateLayer(layer.id)}>
              <Copy className="size-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setDeleteModalOpen(true)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete Layer"
        description={`Are you sure you want to delete "${layer.name}"? This action cannot be undone.`}
        icon={Trash2}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        variant="destructive"
      />
    </>
  );
}

export function LayersPanel() {
  const layers = useLayers();
  const selectedLayer = useSelectedLayer();
  const addLayer = useEditorStore((s) => s.addLayer);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAddImageLayer = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;

      // Create an image element to get natural dimensions
      const img = new window.Image();
      img.onload = () => {
        const newLayer: ImageLayer = {
          id: generateId(),
          type: "image",
          name: file.name.replace(/\.[^/.]+$/, ""),
          visible: true,
          locked: false,
          opacity: 100,
          blendMode: "normal",
          position: { x: 0, y: 0 },
          scale: 100,
          rotation: 0,
          src,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
        };
        addLayer(newLayer);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAddImageLayer(file);
    }
    // Reset input so the same file can be selected again
    e.target.value = "";
  };

  const handleAddTextLayer = () => {
    const newLayer: TextLayer = {
      id: generateId(),
      type: "text",
      name: `Text Layer ${layers.length + 1}`,
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: "normal",
      position: { x: 0, y: 0 },
      scale: 100,
      rotation: 0,
      text: "Hello World",
      fontFamily: "Inter",
      fontSize: 24,
      fontWeight: 400,
      color: "#ffffff",
      textAlign: "center",
    };
    addLayer(newLayer);
  };

  const handleAddShapeLayer = () => {
    const newLayer: ShapeLayer = {
      id: generateId(),
      type: "shape",
      name: `Shape Layer ${layers.length + 1}`,
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: "normal",
      position: { x: 0, y: 0 },
      scale: 100,
      rotation: 0,
      shapeType: "rectangle",
      fill: "#ffffff",
      cornerRadius: 8,
    };
    addLayer(newLayer);
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
        aria-label="Upload layer image"
      />

      {/* Layers list */}
      <div className="overflow-y-auto p-4 space-y-1 h-full">
        {layers.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full text-center">
            <div className="text-muted-foreground text-sm mb-2">
              No layers yet
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Plus className="size-3" />
                  Add Layer
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                  <ImageIcon className="size-4 mr-2" aria-hidden />
                  Image
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAddTextLayer}>
                  <Type className="size-4 mr-2" />
                  Text
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAddShapeLayer}>
                  <Square className="size-4 mr-2" />
                  Shape
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          layers.map((layer) => (
            <LayerListItem
              key={layer.id}
              layer={layer}
              isSelected={selectedLayer?.id === layer.id}
            />
          ))
        )}
      </div>
    </>
  );
}
