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
import type { Layer, SVGLayer } from "@/types";
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

// Sample SVG icons for demo
const SAMPLE_SVGS = {
  coffee: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>`,
  steam: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2c0 2-2 4-2 6s2 4 2 6"/><path d="M12 2c0 2-2 4-2 6s2 4 2 6"/><path d="M16 2c0 2-2 4-2 6s2 4 2 6"/></svg>`,
};

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
            : "hover:bg-muted/50 border border-transparent"
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

  const handleAddSVGLayer = () => {
    const newLayer: SVGLayer = {
      id: generateId(),
      type: "svg",
      name: `SVG Layer ${layers.length + 1}`,
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: "normal",
      position: { x: 0, y: 0 },
      scale: 47,
      rotation: 0,
      svgContent: SAMPLE_SVGS.coffee,
    };
    addLayer(newLayer);
  };

  const handleAddSteamLayer = () => {
    const newLayer: SVGLayer = {
      id: generateId(),
      type: "svg",
      name: `Steam Layer ${layers.length + 1}`,
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: "normal",
      position: { x: 0, y: -60 },
      scale: 80,
      rotation: 0,
      svgContent: SAMPLE_SVGS.steam,
    };
    addLayer(newLayer);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="text-sm font-medium">Layers</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="size-3" />
              Add
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleAddSVGLayer}>
              <FileCode className="size-4 mr-2" />
              SVG Icon (Coffee)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAddSteamLayer}>
              <FileCode className="size-4 mr-2" />
              SVG Icon (Steam)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ImageIcon className="size-4 mr-2" aria-hidden />
              Image Layer
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Type className="size-4 mr-2" />
              Text Layer
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Square className="size-4 mr-2" />
              Shape Layer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Layers list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {layers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="text-muted-foreground text-sm mb-2">
              No layers yet
            </div>
            <Button variant="outline" size="sm" onClick={handleAddSVGLayer}>
              <Plus className="size-3 mr-1" />
              Add Layer
            </Button>
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
    </div>
  );
}
