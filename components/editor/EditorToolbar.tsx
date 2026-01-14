"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditPanel } from "./panels/EditPanel";
import { ColorsPanel } from "./panels/ColorsPanel";
import { SurfacePanel } from "./panels/SurfacePanel";
import { LayersPanel } from "./panels/LayersPanel";
import { PreviewSection } from "./panels/PreviewSection";
import { Pencil, Palette, MonitorSmartphone, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

type TabValue = "edit" | "colors" | "surface" | "layers";

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
];

export function EditorToolbar() {
  const [activeTab, setActiveTab] = React.useState<TabValue>("edit");

  return (
    <aside
      className="w-96 border-l border-border bg-card flex flex-col h-full"
      aria-label="Editor toolbar"
    >
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabValue)}
        orientation="vertical"
        className="flex h-full gap-0"
      >
        {/* Panel content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <TabsContent
            value="edit"
            className="flex-1 m-0 flex flex-col overflow-hidden h-full"
          >
            <header className="p-4 border-b border-border shrink-0">
              <h2 className="text-base font-semibold">Edit Layer</h2>
            </header>
            <div className="flex-1 overflow-y-auto min-h-0">
              <EditPanel />
            </div>
            <PreviewSection />
          </TabsContent>

          <TabsContent
            value="colors"
            className="flex-1 m-0 flex flex-col overflow-hidden h-full"
          >
            <header className="p-4 border-b border-border shrink-0">
              <h2 className="text-base font-semibold">Edit Colors</h2>
            </header>
            <div className="flex-1 overflow-y-auto min-h-0">
              <ColorsPanel />
            </div>
            <PreviewSection />
          </TabsContent>

          <TabsContent
            value="surface"
            className="flex-1 m-0 flex flex-col overflow-hidden h-full"
          >
            <header className="p-4 border-b border-border shrink-0">
              <h2 className="text-base font-semibold">Edit Surface</h2>
            </header>
            <div className="flex-1 overflow-y-auto min-h-0">
              <SurfacePanel />
            </div>
            <PreviewSection />
          </TabsContent>

          <TabsContent
            value="layers"
            className="flex-1 m-0 flex flex-col overflow-hidden h-full"
          >
            <header className="p-4 border-b border-border shrink-0">
              <h2 className="text-base font-semibold">Layers</h2>
            </header>
            <div className="flex-1 overflow-y-auto min-h-0">
              <LayersPanel />
            </div>
            <PreviewSection />
          </TabsContent>
        </div>

        {/* Vertical tab icons */}
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
                  "data-active:bg-muted data-active:text-foreground"
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
    </aside>
  );
}
