# Pico Editor - Best Practices Architecture Guide

## Project Overview

A Next.js 16 professional icon editor with canvas-based layer composition, built using modern React patterns, clean architecture, and industry best practices.

---

## Technology Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript 5+ (strict mode)
- **UI Library**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand v5 (with persistence)
- **Icons**: lucide-react
- **Color Picker**: react-colorful
- **Export**: html-to-image + jszip

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (editor)/
│   │   ├── layout.tsx
│   │   └── editor/
│   │       └── page.tsx
│   └── globals.css
│
├── providers/
│   └── ThemeProviders.tsx                  # Theme context
│
├── styles/
│   └── globals.css                         # Global styles
│
├── components/
│   ├── editor/
│   │   ├── Editor.tsx                          # Main editor container
│   │   ├── EditorCanvas.tsx                    # Canvas workspace
│   │   ├── EditorToolbar.tsx                   # Toolbar container
│   │   ├── EditorPreview.tsx                   # Live preview panel
│   │   │
│   │   ├── canvas/
│   │   │   ├── CanvasViewport.tsx              # Viewport with pan/zoom
│   │   │   ├── CanvasBackground.tsx            # Icon background renderer
│   │   │   ├── CanvasLayerStack.tsx            # Layer renderer
│   │   │   ├── CanvasGrid.tsx                  # Grid overlay
│   │   │   ├── CanvasControls.tsx              # Zoom/grid buttons
│   │   │   └── masks/
│   │   │       ├── IOSSquircleMask.tsx
│   │   │       └── AndroidCircleMask.tsx
│   │   │
│   │   ├── layers/
│   │   │   ├── LayerPanel.tsx                  # Layer panel (tab content)
│   │   │   ├── LayerListItem.tsx               # Single layer card
│   │   │   ├── LayerContextMenu.tsx            # Right-click menu
│   │   │   ├── LayerRenderer.tsx               # Layer rendering logic
│   │   │   └── layer-types/
│   │   │       ├── SVGLayer.tsx
│   │   │       ├── ImageLayer.tsx
│   │   │       ├── ShapeLayer.tsx
│   │   │       └── TextLayer.tsx
│   │   │
│   │   └── panels/
│   │       ├── edit-panel/
│   │       │   ├── EditPanel.tsx               # Edit panel container
│   │       │   ├── TransformSection.tsx        # Position/scale/rotation
│   │       │   ├── AppearanceSection.tsx       # Opacity/blend modes
│   │       │   ├── EffectsSection.tsx          # Shadows/blur
│   │       │   ├── StrokeSection.tsx           # Stroke controls
│   │       │   └── TextStyleSection.tsx        # Typography controls
│   │       ├── color-panel/
│   │       │   ├── ColorPanel.tsx              # Color panel container
│   │       │   ├── ColorPickerField.tsx        # Color picker component
│   │       │   └── ColorPaletteGrid.tsx        # Palette selector
│   │       └── surface-panel/
│   │           ├── SurfacePanel.tsx            # Background panel
│   │           ├── ShapeSelector.tsx           # iOS/Android shapes
│   │           └── NoiseControls.tsx           # Texture/noise settings
│   │
│   ├── navigation/
│   │   └── AppSidebar.tsx                      # Main navigation sidebar
│   │
│   ├── shared/
│   ├── shared/
│   │   ├── ModeToggle.tsx                  # Theme toggle
│   │   ├── ScrollToTop.tsx                 # Scroll to top button
│   │   └── Sheet.tsx                       # Sheet component wrapper (?)
│   │
│   │
│   ├── modals/
│   │   ├── Modal.tsx
│   │   └── ConfirmationModal.tsx
│   ├── skeletons/
│   │   └── ...                                 # Loading placeholders
│   │
│   └── ui/
│       ├── button.tsx                          # shadcn Button
│       ├── card.tsx                            # shadcn Card
│       ├── input.tsx                           # shadcn Input
│       ├── label.tsx                           # shadcn Label
│       ├── slider.tsx                          # shadcn Slider
│       ├── switch.tsx                          # shadcn Switch
│       ├── select.tsx                          # shadcn Select
│       ├── popover.tsx                         # shadcn Popover
│       ├── separator.tsx                       # shadcn Separator
│       ├── tabs.tsx                            # shadcn Tabs
│       ├── dropdown-menu.tsx                   # shadcn DropdownMenu
│       ├── sheet.tsx                           # shadcn Sheet
│       ├── sidebar.tsx                         # shadcn Sidebar
│       └── ...                                 # Other shadcn components
│
├── features/
│   ├── history/
│   │   ├── hooks/
│   │   │   ├── useUndo.ts
│   │   │   ├── useRedo.ts
│   │   │   └── useHistory.ts
│   │   └── utils/
│   │       └── history-manager.ts
│   │
│   ├── export/
│   │   ├── hooks/
│   │   │   └── useExport.ts
│   │   ├── utils/
│   │   │   ├── export-image.ts
│   │   │   └── export-presets.ts
│   │   └── types/
│   │       └── export.types.ts
│   │
│   └── import/
│       ├── hooks/
│       │   └── useImport.ts
│       └── utils/
│           └── file-parser.ts
│
├── stores/
│   ├── editor-store.ts                         # Main Zustand store
│   ├── canvas-store.ts                         # Canvas state (zoom/pan)
│   └── ui-store.ts                             # UI state (modals/toasts)
│
├── constants/
│   ├── canvas.constants.ts
│   ├── layer.constants.ts
│   ├── export.constants.ts
│   └── ui.constants.ts
│
├── lib/
│   └── utils.ts                                # Utility functions (cn, etc.)
│
├── hooks/
│   ├── editor/
│   │   ├── canvas/
│   │   │   ├── useCanvasPanning.ts
│   │   │   ├── useCanvasZoom.ts
│   │   │   └── useCanvasGrid.ts
│   │   │
│   │   ├── layers/
│   │   │   ├── useLayerSelection.ts
│   │   │   ├── useLayerDragDrop.ts
│   │   │   ├── useLayerOperations.ts
│   │   │   └── useLayerEffects.ts
│   │   │
│   │   └── keyboard/
│   │       ├── useKeyboardShortcuts.ts
│   │       └── useHotkeys.ts
│   │
│   └── ui/
│       ├── useDebounce.ts
│       └── useLocalStorage.ts
│
├── types/
│   ├── layer.types.ts
│   ├── icon.types.ts
│   ├── canvas.types.ts
│   ├── effect.types.ts
│   └── index.ts                                 # Barrel export
│
└── utils/
    ├── editor/
    │   ├── layer/
    │   │   ├── layer-factory.ts                 # Layer creation
    │   │   ├── layer-validator.ts               # Validation
    │   │   └── layer-transform.ts               # Transform utilities
    │   │
    │   ├── svg/
    │   │   ├── svg-parser.ts                    # SVG parsing
    │   │   ├── svg-optimizer.ts                 # SVG optimization
    │   │   └── svg-colorizer.ts                 # Color inheritance
    │   │
    │   ├── color/
    │   │   ├── color-converter.ts               # Hex/RGB/HSL
    │   │   └── color-validator.ts               # Color validation
    │   │
    │   └── file/
    │       ├── file-reader.ts                   # File reading
    │       └── file-validator.ts                # File validation
```

---

## Naming Conventions

### Files & Folders

- **Components**: `PascalCase.tsx` (e.g., `LayerSidebar.tsx`)
- **Hooks**: `camelCase.ts` with `use` prefix (e.g., `useLayerSelection.ts`)
- **Utils**: `kebab-case.ts` (e.g., `layer-factory.ts`)
- **Types**: `kebab-case.types.ts` (e.g., `layer.types.ts`)
- **Constants**: `kebab-case.constants.ts` (e.g., `canvas.constants.ts`)
- **Stores**: `kebab-case-store.ts` (e.g., `editor-store.ts`)
- **Folders**: `kebab-case` (e.g., `edit-panel/`, `layer-types/`)

### Components

- **Containers**: `[Feature]Container` or `[Feature]` (e.g., `EditorCanvas`)
- **Presentational**: `[Feature][Type]` (e.g., `LayerListItem`, `ColorField`)
- **Layouts**: `[Feature]Layout` (e.g., `EditorLayout`)
- **Sections**: `[Feature]Section` (e.g., `TransformSection`)
- **Items**: `[Feature]Item` (e.g., `LayerListItem`)
- **Controls**: `[Feature]Controls` (e.g., `CanvasControls`)

### Hooks

- **Prefix with `use`**: `useFeatureName`
- **Specific naming**: `useLayerSelection`, `useCanvasPanning`
- **Grouped by domain**: `canvas/`, `layers/`, `keyboard/`

### Types

- **Interfaces**: `PascalCase` (e.g., `Layer`, `IconProps`)
- **Type aliases**: `PascalCase` (e.g., `BlendMode`, `ShapeType`)
- **Enums**: `SCREAMING_SNAKE_CASE` (e.g., `BLEND_MODE`, `LAYER_TYPE`)

### Constants

- **Global constants**: `SCREAMING_SNAKE_CASE` (e.g., `CANVAS_SIZE`, `MAX_ZOOM`)
- **Object constants**: `SCREAMING_SNAKE_CASE` with nested `camelCase` (e.g., `CANVAS.iconSize`)

---

## Component Architecture

### Layout Structure

```tsx
// app/(editor)/editor/page.tsx
<EditorLayout>
  <div className="flex h-screen">
    {/* Left: Navigation Sidebar - Fixed width */}
    <aside className="w-64 border-r">
      <AppSidebar />
    </aside>

    {/* Center: Canvas - Flex grow */}
    <main className="flex-1 relative">
      <EditorCanvas />
    </main>

    {/* Right: Toolbar + Preview - Fixed width */}
    <aside className="w-96 border-l flex flex-col">
      <div className="flex-1 overflow-hidden">
        <EditorToolbar />
      </div>
      <div className="h-64 border-t">
        <EditorPreview />
      </div>
    </aside>
  </div>
</EditorLayout>
```

### Component Patterns

#### 1. Container/Presenter Pattern

```tsx
// Container (handles logic)
export function LayerSidebar() {
  const layers = useEditorStore(state => state.layers);
  const selectLayer = useEditorStore(state => state.selectLayer);
  const { handleDragStart, handleDrop } = useLayerDragDrop();

  return (
    <LayerSidebarView
      layers={layers}
      onSelectLayer={selectLayer}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
    />
  );
}

// Presenter (renders UI)
function LayerSidebarView({ layers, onSelectLayer, ... }) {
  return (
    <div className="flex flex-col h-full">
      {layers.map(layer => (
        <LayerListItem key={layer.id} layer={layer} />
      ))}
    </div>
  );
}
```

#### 2. Composition Pattern

```tsx
// Compound component pattern
export function Section({ title, children }: SectionProps) {
  return (
    <Card className="p-4">
      <SectionHeader title={title} />
      <div className="space-y-3">{children}</div>
    </Card>
  );
}

// Usage
<Section title="Transform">
  <SliderField label="Scale" value={scale} onChange={setScale} />
  <NumberField label="X" value={x} onChange={setX} />
</Section>;
```

#### 3. Custom Hooks Pattern

```tsx
// hooks/layers/useLayerOperations.ts
export function useLayerOperations() {
  const store = useEditorStore();

  const addLayer = useCallback(
    async (file: File) => {
      const layer = await createLayerFromFile(file);
      store.addLayer(layer);
    },
    [store]
  );

  const updateLayer = useCallback(
    (id: string, updates: Partial<Layer>) => {
      store.updateLayer(id, updates);
    },
    [store]
  );

  const deleteLayer = useCallback(
    (id: string) => {
      store.deleteLayer(id);
    },
    [store]
  );

  return { addLayer, updateLayer, deleteLayer };
}
```

---

## State Management

### Zustand Store Structure

```typescript
// lib/stores/editor-store.ts
interface EditorStore {
  // State
  icon: IconState;
  layers: Layer[];
  selectedLayerId: string | null;

  // Actions (grouped by domain)
  layers: {
    add: (layer: Layer) => void;
    update: (id: string, updates: Partial<Layer>) => void;
    delete: (id: string) => void;
    reorder: (from: number, to: number) => void;
    duplicate: (id: string) => void;
  };

  icon: {
    updateBackground: (color: string) => void;
    updateShape: (shape: ShapeType) => void;
    updateNoise: (noise: NoiseSettings) => void;
  };

  selection: {
    select: (id: string | null) => void;
    selectNext: () => void;
    selectPrevious: () => void;
  };
}

// Separate stores for concerns
// lib/stores/canvas-store.ts
interface CanvasStore {
  zoom: number;
  panOffset: Position;
  showGrid: boolean;

  setZoom: (zoom: number) => void;
  setPanOffset: (offset: Position) => void;
  toggleGrid: () => void;
  resetView: () => void;
}

// stores/ui-store.ts
interface UIStore {
  activePanel: "edit" | "colors" | "surface" | "layers";
  modals: {
    export: boolean;
    import: boolean;
  };

  setActivePanel: (panel: string) => void;
  openModal: (modal: keyof UIStore["modals"]) => void;
  closeModal: (modal: keyof UIStore["modals"]) => void;
}
```

### Store Best Practices

1. **Separate stores by domain** (editor, canvas, UI)
2. **Use selectors for performance** (only subscribe to needed state)
3. **Group actions by entity** (layers.add, layers.update, etc.)
4. **Keep computed values in selectors**, not store
5. **Use middleware**: persist, devtools, immer

```typescript
// Good selector usage
const selectedLayer = useEditorStore((state) =>
  state.layers.find((l) => l.id === state.selectedLayerId)
);

// Bad - subscribes to entire store
const store = useEditorStore();
const selectedLayer = store.layers.find((l) => l.id === store.selectedLayerId);
```

---

## Component Specifications

### 1. EditorCanvas (Main Canvas)

**File**: `components/editor/EditorCanvas.tsx`

**Layout**:

```tsx
<div className="relative w-full h-full bg-secondary">
  {/* Grid background */}
  <CanvasGrid show={showGrid} />

  {/* Viewport with pan/zoom */}
  <CanvasViewport zoom={zoom} offset={panOffset}>
    {/* Icon background */}
    <CanvasBackground {...iconProps} />

    {/* Layers */}
    <CanvasLayerStack layers={layers} />
  </CanvasViewport>

  {/* Controls overlay */}
  <CanvasControls />
</div>
```

**Responsibilities**:

- Orchestrate canvas sub-components
- Handle viewport interactions
- Manage canvas state (zoom, pan, grid)

**Props**:

```typescript
interface EditorCanvasProps {
  className?: string;
}
```

---

### 2. AppSidebar (Navigation Sidebar)

**File**: `components/navigation/AppSidebar.tsx`

**Layout**:

```tsx
import { Home, FolderOpen, Settings, HelpCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

<div className="flex flex-col h-full bg-background">
  {/* Header */}
  <header className="p-4 border-b">
    <div className="flex items-center gap-2">
      <Sparkles className="w-6 h-6 text-primary" />
      <h1 className="text-xl font-bold">Pico</h1>
    </div>
  </header>

  {/* Navigation */}
  <nav className="flex-1 p-3 space-y-2">
    <Button variant="ghost" className="w-full justify-start gap-3">
      <Home className="w-5 h-5" />
      <span>Home</span>
    </Button>

    <Button variant="ghost" className="w-full justify-start gap-3">
      <FolderOpen className="w-5 h-5" />
      <span>Projects</span>
    </Button>

    <Button variant="ghost" className="w-full justify-start gap-3">
      <Settings className="w-5 h-5" />
      <span>Settings</span>
    </Button>
  </nav>

  {/* Footer */}
  <footer className="p-3 border-t">
    <Button variant="ghost" className="w-full justify-start gap-3">
      <HelpCircle className="w-5 h-5" />
      <span>Help & Support</span>
    </Button>
  </footer>
</div>;
```

**Responsibilities**:

- Provide main navigation for the app
- Display branding and app name
- Quick access to common actions
- No functionality required initially (placeholder buttons)

---

### 3. EditorToolbar (Tabbed Panels)

**File**: `components/editor/EditorToolbar.tsx`

**Layout**:

```tsx
<div className="flex h-full">
  {/* Tab list - vertical on right */}
  <nav className="w-20 border-l bg-secondary">
    <Tabs orientation="vertical" defaultValue="edit">
      <TabsList className="flex flex-col h-full">
        <TabsTrigger value="edit" className="flex flex-col gap-2">
          <Paintbrush className="w-5 h-5" />
          <span className="text-xs">Edit</span>
        </TabsTrigger>
        <TabsTrigger value="colors" className="flex flex-col gap-2">
          <Palette className="w-5 h-5" />
          <span className="text-xs">Colors</span>
        </TabsTrigger>
        <TabsTrigger value="surface" className="flex flex-col gap-2">
          <Grid className="w-5 h-5" />
          <span className="text-xs">Surface</span>
        </TabsTrigger>
        <TabsTrigger value="layers" className="flex flex-col gap-2">
          <Layers className="w-5 h-5" />
          <span className="text-xs">Layers</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </nav>

  {/* Panel content - scrollable */}
  <div className="flex-1 overflow-y-auto">
    <Tabs defaultValue="edit">
      <TabsContent value="edit">
        <EditPanel />
      </TabsContent>
      <TabsContent value="colors">
        <ColorPanel />
      </TabsContent>
      <TabsContent value="surface">
        <SurfacePanel />
      </TabsContent>
      <TabsContent value="layers">
        <LayerPanel />
      </TabsContent>
    </Tabs>
  </div>
</div>
```

---

### 4. LayerPanel (Layer Management Tab)

**File**: `components/editor/layers/LayerPanel.tsx`

**Layout**:

```tsx
<div className="flex flex-col h-full bg-background p-3">
  {/* Header with add buttons */}
  <header className="flex items-center justify-between mb-3">
    <h2 className="text-lg font-semibold">Layers</h2>
    <div className="flex gap-2">
      <Button size="sm" onClick={onAddImage}>
        Add Image
      </Button>
      <Button size="sm" onClick={onAddShape}>
        Add Shape
      </Button>
    </div>
  </header>

  {/* Layer list - scrollable */}
  <div className="flex-1 overflow-y-auto space-y-2">
    {layers.length === 0 ? (
      <EmptyState
        icon={<Layers className="w-10 h-10" />}
        message="No layers yet"
        action="Upload an image to start"
      />
    ) : (
      layers.map((layer) => (
        <LayerListItem
          key={layer.id}
          layer={layer}
          isSelected={layer.id === selectedLayerId}
          onSelect={() => selectLayer(layer.id)}
          onDelete={() => deleteLayer(layer.id)}
          onDuplicate={() => duplicateLayer(layer.id)}
        />
      ))
    )}
  </div>

  {/* Footer actions */}
  <footer className="pt-3 border-t">
    <Button variant="ghost" size="sm" onClick={onClearAll}>
      Clear All Layers
    </Button>
  </footer>
</div>
```

---

### 5. Shared Form Components

#### SliderField

**File**: `components/shared/form/SliderField.tsx`

```tsx
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface SliderFieldProps {
  label: string;
  icon?: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  onChangeStart?: () => void;
  onChangeEnd?: () => void;
  unit?: string;
  disabled?: boolean;
}

export function SliderField({
  label,
  icon,
  value,
  min,
  max,
  step = 1,
  onChange,
  onChangeStart,
  onChangeEnd,
  unit,
  disabled,
}: SliderFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2">
          {icon}
          {label}
        </Label>
        <span className="text-sm text-muted-foreground">
          {value}
          {unit}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([val]) => onChange(val)}
        onPointerDown={onChangeStart}
        onPointerUp={onChangeEnd}
        disabled={disabled}
      />
    </div>
  );
}
```

#### ColorField

**File**: `components/shared/form/ColorField.tsx`

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";

interface ColorFieldProps {
  label: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (color: string) => void;
  onChangeStart?: () => void;
  onChangeEnd?: () => void;
}

export function ColorField({
  label,
  icon,
  value,
  onChange,
  onChangeStart,
  onChangeEnd,
}: ColorFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        {icon}
        {label}
      </Label>

      <div className="flex gap-2">
        {/* Color preview + picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-12 h-12 p-0"
              style={{ backgroundColor: value }}
            />
          </PopoverTrigger>
          <PopoverContent>
            <div onPointerDown={onChangeStart} onPointerUp={onChangeEnd}>
              <HexColorPicker color={value} onChange={onChange} />
            </div>
          </PopoverContent>
        </Popover>

        {/* Hex input */}
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onChangeStart}
          onBlur={onChangeEnd}
          placeholder="#000000"
          className="flex-1"
        />
      </div>
    </div>
  );
}
```

---

## Panel Sections

### EditPanel Structure

**File**: `components/panels/edit-panel/EditPanel.tsx`

```tsx
import { Layers } from "lucide-react";

export function EditPanel() {
  const selectedLayer = useSelectedLayer();

  if (!selectedLayer) {
    return (
      <EmptyState
        icon={<Layers className="w-10 h-10" />}
        message="No layer selected"
        description="Select a layer to edit its properties"
      />
    );
  }

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold">Edit Layer</h2>

      <TransformSection layer={selectedLayer} />
      <AppearanceSection layer={selectedLayer} />
      <EffectsSection layer={selectedLayer} />

      {selectedLayer.type === "shape" && (
        <StrokeSection layer={selectedLayer} />
      )}

      {selectedLayer.type === "text" && (
        <TextStyleSection layer={selectedLayer} />
      )}
    </div>
  );
}
```

### TransformSection

**File**: `components/panels/edit-panel/TransformSection.tsx`

```tsx
import { Expand, Axis3D, RotateCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function TransformSection({ layer }: { layer: Layer }) {
  const updateLayer = useLayerOperations().updateLayer;
  const { startInteraction, endInteraction } = useHistory();

  return (
    <Section title="Transform">
      <SliderField
        label="Scale"
        icon={<Expand className="w-4 h-4" />}
        value={layer.scale}
        min={0.1}
        max={10}
        step={0.1}
        onChange={(val) => updateLayer(layer.id, { scale: val })}
        onChangeStart={startInteraction}
        onChangeEnd={endInteraction}
      />

      <Separator />

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>X Position</Label>
          <Input
            type="number"
            value={layer.x}
            min={-500}
            max={500}
            onChange={(e) =>
              updateLayer(layer.id, { x: Number(e.target.value) })
            }
            onFocus={startInteraction}
            onBlur={endInteraction}
          />
        </div>

        <div className="space-y-2">
          <Label>Y Position</Label>
          <Input
            type="number"
            value={layer.y}
            min={-500}
            max={500}
            onChange={(e) =>
              updateLayer(layer.id, { y: Number(e.target.value) })
            }
            onFocus={startInteraction}
            onBlur={endInteraction}
          />
        </div>
      </div>

      <Separator />

      <SliderField
        label="Rotation"
        icon={<RotateCw className="w-4 h-4" />}
        value={layer.rotation}
        min={0}
        max={360}
        unit="°"
        onChange={(val) => updateLayer(layer.id, { rotation: val })}
        onChangeStart={startInteraction}
        onChangeEnd={endInteraction}
      />
    </Section>
  );
}
```

---

## Custom Hooks

### useLayerOperations

**File**: `hooks/layers/useLayerOperations.ts`

```typescript
export function useLayerOperations() {
  const store = useEditorStore();

  const addLayer = useCallback(
    async (file: File) => {
      const layer = await createLayerFromFile(file);
      store.layers.add(layer);
    },
    [store]
  );

  const updateLayer = useCallback(
    (id: string, updates: Partial<Layer>) => {
      store.layers.update(id, updates);
    },
    [store]
  );

  const deleteLayer = useCallback(
    (id: string) => {
      store.layers.delete(id);
    },
    [store]
  );

  const duplicateLayer = useCallback(
    (id: string) => {
      const layer = store.layers.find((l) => l.id === id);
      if (layer) {
        store.layers.add({ ...layer, id: generateId() });
      }
    },
    [store]
  );

  return {
    addLayer,
    updateLayer,
    deleteLayer,
    duplicateLayer,
  };
}
```

### useLayerEffects

**File**: `hooks/layers/useLayerEffects.ts`

```typescript
export function useLayerEffects(layerId: string) {
  const updateLayer = useLayerOperations().updateLayer;

  const updateShadow = useCallback(
    (updates: Partial<Shadow>) => {
      updateLayer(layerId, {
        shadow: { ...DEFAULT_SHADOW, ...updates },
      });
    },
    [layerId, updateLayer]
  );

  const updateStroke = useCallback(
    (updates: Partial<Stroke>) => {
      updateLayer(layerId, {
        stroke: { ...DEFAULT_STROKE, ...updates },
      });
    },
    [layerId, updateLayer]
  );

  const toggleShadow = useCallback(
    (enabled: boolean) => {
      updateLayer(layerId, {
        shadow: enabled ? DEFAULT_SHADOW : undefined,
      });
    },
    [layerId, updateLayer]
  );

  return {
    updateShadow,
    updateStroke,
    toggleShadow,
  };
}
```

### useCanvasPanning

**File**: `hooks/canvas/useCanvasPanning.ts`

```typescript
export function useCanvasPanning() {
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState<Position>({ x: 0, y: 0 });
  const startPos = useRef<Position>({ x: 0, y: 0 });

  const handlePointerDown = useCallback(
    (e: PointerEvent) => {
      if (e.button === 1 || (e.button === 0 && e.spaceKey)) {
        setIsPanning(true);
        startPos.current = {
          x: e.clientX - panOffset.x,
          y: e.clientY - panOffset.y,
        };
      }
    },
    [panOffset]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (isPanning) {
        setPanOffset({
          x: e.clientX - startPos.current.x,
          y: e.clientY - startPos.current.y,
        });
      }
    },
    [isPanning]
  );

  const handlePointerUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  useEffect(() => {
    if (isPanning) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [isPanning, handlePointerMove, handlePointerUp]);

  return {
    isPanning,
    panOffset,
    handlePointerDown,
    resetPan: () => setPanOffset({ x: 0, y: 0 }),
  };
}
```

---

## Utility Functions

### Layer Factory

**File**: `utils/layer/layer-factory.ts`

```typescript
export async function createLayerFromFile(file: File): Promise<Layer> {
  const type = detectLayerType(file);
  const dataUrl = await fileToDataUrl(file);

  const baseLayer: Omit<Layer, "type"> = {
    id: generateId(),
    name: file.name,
    visible: true,
    locked: false,
    x: 0,
    y: 0,
    rotation: 0,
    opacity: 1,
    blendMode: "normal",
  };

  switch (type) {
    case "svg":
      return {
        ...baseLayer,
        type: "svg",
        url: dataUrl,
        scale: 5,
        fillColor: "#000000",
      };

    case "image":
      return {
        ...baseLayer,
        type: "image",
        url: dataUrl,
        scale: 1,
        width: 200,
        height: 200,
      };

    default:
      throw new Error("Unsupported file type");
  }
}

export function createShapeLayer(): Layer {
  return {
    id: generateId(),
    type: "shape",
    name: "Shape",
    visible: true,
    locked: false,
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    width: 100,
    height: 100,
    opacity: 1,
    blendMode: "normal",
    fillColor: "#000000",
    borderRadius: 0,
  };
}

export function createTextLayer(): Layer {
  return {
    id: generateId(),
    type: "text",
    name: "Text",
    visible: true,
    locked: false,
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    opacity: 1,
    blendMode: "normal",
    text: "Text",
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: 400,
    fillColor: "#000000",
  };
}
```

---

## Constants Organization

### Canvas Constants

**File**: `lib/constants/canvas.constants.ts`

```typescript
export const CANVAS = {
  ICON_SIZE: 1024,
  MASK_ID: "canvas-icon-mask",
  GRID_SIZE: 20,
  SHADOW_BLUR: 40,
} as const;

export const ZOOM = {
  DEFAULT: 0.5,
  MIN: 0.1,
  MAX: 4,
  STEP: 0.1,
} as const;

export const PAN = {
  FRICTION: 0.9,
  MIN_VELOCITY: 0.5,
} as const;
```

### Layer Constants

**File**: `lib/constants/layer.constants.ts`

```typescript
export const DEFAULT_SHADOW: Shadow = {
  color: "#000000",
  blur: 10,
  x: 0,
  y: 4,
  opacity: 100,
};

export const DEFAULT_STROKE: Stroke = {
  width: 0,
  color: "#000000",
  alignment: "center",
};

export const BLEND_MODES: BlendMode[] = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];

export const LAYER_LIMITS = {
  MIN_SCALE: 0.1,
  MAX_SCALE: 20,
  MIN_OPACITY: 0,
  MAX_OPACITY: 100,
  MIN_ROTATION: 0,
  MAX_ROTATION: 360,
} as const;
```

---

## Type Definitions

### Layer Types

**File**: `types/layer.types.ts`

```typescript
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

export interface BaseLayer {
  id: string;
  type: LayerType;
  name: string;
  visible: boolean;
  locked: boolean;

  // Transform
  x: number;
  y: number;
  rotation: number;
  scale: number;

  // Appearance
  opacity: number;
  blendMode: BlendMode;
  blur?: number;

  // Effects
  shadow?: Shadow;
  innerShadow?: Shadow;
}

export interface SVGLayer extends BaseLayer {
  type: "svg";
  url: string;
  fillColor: string;
}

export interface ImageLayer extends BaseLayer {
  type: "image";
  url: string;
  width: number;
  height: number;
  mask?: boolean;
}

export interface ShapeLayer extends BaseLayer {
  type: "shape";
  width: number;
  height: number;
  fillColor: string;
  borderRadius: number;
  stroke?: Stroke;
}

export interface TextLayer extends BaseLayer {
  type: "text";
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fillColor: string;
  letterSpacing?: number;
  lineHeight?: number;
}

export type Layer = SVGLayer | ImageLayer | ShapeLayer | TextLayer;
```

### Effect Types

**File**: `types/effect.types.ts`

```typescript
export interface Shadow {
  color: string;
  blur: number;
  x: number;
  y: number;
  opacity: number; // 0-100
}

export interface Stroke {
  width: number;
  color: string;
  alignment: "center" | "inside" | "outside";
}

export interface Gradient {
  type: "linear" | "radial";
  colors: string[];
  stops: number[];
  angle: number; // 0-360
}

export interface NoiseSettings {
  intensity: number; // 0-100
  opacity: number; // 0-100
  size: number; // 50-500
  blendMode: BlendMode;
}
```

---

## Best Practices Checklist

### Component Design

- ✅ **Single Responsibility**: Each component does one thing well
- ✅ **Composition over Inheritance**: Use composition for flexibility
- ✅ **Props Interface**: Always define explicit prop types
- ✅ **Default Props**: Provide sensible defaults where appropriate
- ✅ **Memoization**: Use `memo` for expensive renders
- ✅ **Error Boundaries**: Wrap sections in error boundaries

### State Management

- ✅ **Colocation**: Keep state close to where it's used
- ✅ **Selectors**: Use selectors to prevent unnecessary re-renders
- ✅ **Derived State**: Compute values, don't store them
- ✅ **Immutability**: Never mutate state directly
- ✅ **Middleware**: Use persist, devtools, and immer

### Performance

- ✅ **Code Splitting**: Use dynamic imports for heavy components
- ✅ **Virtual Lists**: For long layer lists (react-virtual)
- ✅ **Debouncing**: Debounce expensive operations (history, save)
- ✅ **Throttling**: Throttle frequent events (pan, zoom)
- ✅ **Lazy Loading**: Load panels on-demand

### Code Quality

- ✅ **TypeScript**: Strict mode, no `any` types
- ✅ **Linting**: ESLint + Prettier configured
- ✅ **Testing**: Unit tests for utils, integration for components
- ✅ **Documentation**: JSDoc comments for complex functions
- ✅ **Consistent Naming**: Follow naming conventions

### Accessibility

- ✅ **Keyboard Navigation**: Full keyboard support
- ✅ **ARIA Labels**: Proper labels for screen readers
- ✅ **Focus Management**: Logical tab order
- ✅ **Color Contrast**: WCAG AA compliance
- ✅ **Shortcuts**: Cmd+Z (undo), Cmd+Shift+Z (redo), etc.

---

## Implementation Order

### Phase 1: Foundation (Week 1)

1. ✅ Set up project structure and folders
2. ✅ Install shadcn/ui components (`npx shadcn@latest init`)
3. ✅ Define all TypeScript types
4. ✅ Create constants files
5. ✅ Set up Zustand stores (editor, canvas, UI)
6. ✅ Create utility functions (layer-factory, file-reader)

### Phase 2: Core Components (Week 2)

7. ✅ Build shared form components (SliderField, ColorField, etc.)
8. ✅ Build layout components (Section, EmptyState, etc.)
9. ✅ Create EditorLayout and Editor container
10. ✅ Build CanvasViewport and basic rendering
11. ✅ Build LayerSidebar and LayerListItem

### Phase 3: Features (Week 3)

12. ✅ Implement layer operations (add, delete, reorder)
13. ✅ Build all panel sections (Transform, Appearance, Effects)
14. ✅ Implement undo/redo history
15. ✅ Add pan/zoom controls
16. ✅ Build layer rendering (SVG, Image, Shape, Text)

### Phase 4: Polish (Week 4)

17. ✅ Add keyboard shortcuts
18. ✅ Implement export functionality
19. ✅ Add drag-and-drop for file upload
20. ✅ Optimize performance (memoization, virtual lists)
21. ✅ Add error handling and loading states

---

## shadcn/ui Setup

### Installation

```bash
npx shadcn@latest init
```

### Required Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add slider
npx shadcn@latest add switch
npx shadcn@latest add select
npx shadcn@latest add popover
npx shadcn@latest add separator
npx shadcn@latest add tabs
npx shadcn@latest add dropdown-menu
npx shadcn@latest add dialog
npx shadcn@latest add toast
```

### Lucide React Icons

All icons come from `lucide-react`:

```typescript
import {
  Layers,
  Paintbrush,
  Palette,
  Grid,
  Expand,
  RotateCw,
  Eye,
  Lock,
  Trash2,
  Copy,
  Download,
  Upload,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Move,
  Type,
  Square,
  Circle,
  // ... many more available
} from "lucide-react";
```

---

## Key Differences from Current Implementation

### What's Better

1. **Smaller Components**: Max 200 lines per file (vs 810 in EditPanel)
2. **Shared Components**: Reusable form fields (no duplication)
3. **Custom Hooks**: Logic extracted from components
4. **Grouped Actions**: Store actions organized by domain
5. **Constants Centralized**: No magic numbers/strings
6. **Type Safety**: Discriminated unions for layer types
7. **Clear Separation**: Features, hooks, utils, components separated
8. **Better Naming**: Consistent, descriptive names
9. **No Dead Code**: Every file has a purpose
10. **Testable**: Pure functions, separated concerns

### Removed Complexity

- ❌ No 16 redundant selector hooks
- ❌ No unused utility files
- ❌ No inline component definitions
- ❌ No mixed concerns (logic + UI)
- ❌ No magic strings/numbers
- ❌ No duplicate code patterns

---

## Additional Recommendations

### Tools

- **State Debugging**: Redux DevTools for Zustand
- **Performance**: React DevTools Profiler
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + typescript-eslint + prettier
- **Pre-commit**: Husky + lint-staged

### Libraries to Consider

- **React Virtual**: For long layer lists
- **React DnD**: Better drag-and-drop (optional)
- **Zustand Middleware**: immer, persist, devtools
- **Zod**: Runtime type validation
- **Date-fns**: Date formatting (if needed)

### Future Enhancements

- Layer groups/folders
- Multiple icon projects
- Cloud sync
- Collaborative editing
- Plugin system
- Advanced effects (gradients, patterns)

---

This architecture provides a solid, scalable foundation that follows React and Next.js best practices while remaining maintainable and performant. Each component has a clear purpose, state is managed efficiently, and the code is organized logically.
