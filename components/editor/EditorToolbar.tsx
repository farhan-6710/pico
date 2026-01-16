"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditPanel } from "./panels/EditPanel";
import { ColorsPanel } from "./panels/ColorsPanel";
import { SurfacePanel } from "./panels/SurfacePanel";
import { LayersPanel } from "./panels/LayersPanel";
import { ExportPanel } from "./panels/ExportPanel";
import { PreviewSection } from "./panels/PreviewSection";
import { useEditorStore, useLayers } from "@/lib/stores/editor-store";
import type { ImageLayer, TextLayer, ShapeLayer } from "@/types";
import {
  Pencil,
  Palette,
  MonitorSmartphone,
  Layers,
  Plus,
  Image as ImageIcon,
  Type,
  Square,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabValue = "edit" | "colors" | "surface" | "layers" | "export";

interface TabConfig {
  value: TabValue;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabConfig[] = [
  { value: "edit", label: "Edit", icon: Pencil },
  { value: "colors", label: "Colors", icon: Palette },
  { value: "surface", label: "Surface", icon: MonitorSmartphone },
  { value: "layers", label: "Layers", icon: Layers },
  { value: "export", label: "Export", icon: Download },
];

const generateId = () =>
  `layer-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export function EditorToolbar() {
  const [activeTab, setActiveTab] = React.useState<TabValue>("edit");
  const layers = useLayers();
  const addLayer = useEditorStore((s) => s.addLayer);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAddImageLayer = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
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
    <div className="flex h-full flex-col">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabValue)}
        orientation="vertical"
        className="flex h-full gap-0"
      >
        <div className="flex-1 overflow-hidden flex flex-col">
          {TABS.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="flex-1 m-0 flex flex-col overflow-hidden h-full data-[state=inactive]:hidden"
            >
              <header className="p-4 border-b border-border shrink-0 flex items-center justify-between">
                <h2 className="text-base font-semibold">{tab.label}</h2>
                {tab.value === "layers" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Plus className="size-3" />
                        Add Layer
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImageIcon className="size-4 mr-2" aria-hidden /> Image
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleAddTextLayer}>
                        <Type className="size-4 mr-2" /> Text
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleAddShapeLayer}>
                        <Square className="size-4 mr-2" /> Shape
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </header>

              <div className="flex-1 overflow-y-auto min-h-0">
                {tab.value === "edit" && <EditPanel />}
                {tab.value === "colors" && <ColorsPanel />}
                {tab.value === "surface" && <SurfacePanel />}
                {tab.value === "layers" && <LayersPanel />}
                {tab.value === "export" && <ExportPanel />}
              </div>

              {tab.value !== "export" && <PreviewSection />}
            </TabsContent>
          ))}
        </div>

        <div className="flex flex-col items-center py-3 px-1 border-l border-border bg-background">
          <TabsList
            variant="line"
            className="flex-col h-auto bg-transparent gap-1"
          >
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg w-14 h-14",
                  "data-[state=active]:bg-muted data-[state=active]:text-foreground hover:bg-muted/50 transition-colors"
                )}
                aria-label={tab.label}
              >
                <tab.icon className="size-5" />
                <span className="text-[10px]">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}
