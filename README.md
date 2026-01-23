![Pico Banner](public/pico-screenshot.png)

# 🎨 Pico – Professional Icon Editor

Pico is a **high-performance, Photoshop-inspired icon editor** built for modern designers and developers. Featuring a sophisticated layer-based canvas system with independent transforms, blend modes, and advanced effects, Pico enables pixel-perfect icon composition with a focus on usability, performance, and professional-grade output.

Built with **Next.js 16** and **React 19**, Pico leverages cutting-edge web technologies including **Zustand** for predictable state management, **HeroUI v3** for polished UI components, and **html-to-image** for high-quality exports across multiple formats and sizes.

---

## 🚀 Key Features

### 🎯 Core Editing Experience

- **Layer-Based Canvas System**  
  Independent layers with full support for SVGs, images, shapes (iOS squircle, Android rounded square), and text elements. Each layer maintains its own transform state (position, rotation, scale), appearance properties (opacity, blend mode, blur), and styling (fill, stroke, shadows).

- **Photoshop-Like Interface**  
  Professional canvas editor with fixed 1024×1024px workspace, intuitive panning controls (middle-click or space+drag), smooth zoom (50%-200%), and drag-drop layer reordering with context menus.

- **Advanced Layer Effects**
    - **16 Blend Modes**: normal, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color, luminosity
    - **Shadows**: outer shadow, inner shadow, ambient shadow, and glow with full RGBA color control
    - **Strokes**: configurable width, color, and alignment (center, inside, outside)
    - **Gradients**: linear and radial gradients with multi-stop color control

- **Real-Time Preview**  
  Live icon preview panel with instant updates as layers are modified. No lag, no delay—see changes immediately.

---

### 🎨 Smart Design Tools

- **Shape Presets**  
  iOS squircle (custom SVG clip path) and Android rounded square presets with automatic background masking.

- **Dynamic Color Management**  
  HexColorPicker integration for precise color selection. Support for solid fills and gradients on individual layers and icon background.

- **Noise Texture System**  
  Procedural noise overlay with adjustable intensity (0-100), opacity (0-100), size (0-500px), and 16 blend modes for authentic textured effects.

- **SVG Processing**  
  Intelligent SVG parsing and optimization with dynamic fill color override. Upload any SVG and recolor it instantly without losing quality.

---

### 🔐 State Management & Persistence

- **Zustand Store Architecture**  
  Centralized state management with single source of truth. Pre-built selectors for optimized re-renders and Redux DevTools integration for time-travel debugging.

- **Automatic LocalStorage Persistence**  
  Projects automatically save to browser storage with debounced writes (800ms) to prevent performance issues. Work never lost—even on refresh.

- **Undo/Redo System**  
  Full history tracking with undo/redo support using interaction grouping for intelligent batch operations.

---

### ⚡ Performance & Export

- **High-Performance Rendering**  
  Optimized React component hierarchy with memoization, efficient Zustand selectors, and minimal re-renders. Handles complex multi-layer compositions smoothly.

- **Multi-Format Export**  
  Export to PNG and JPG with custom dimensions and quality settings. Support for batch exports including iOS (12 sizes from 20×20 to 1024×1024) and Android (6 sizes from 48×48 to 512×512) presets with automatic file naming.

- **Platform-Specific Optimization**  
  Export presets tailored for iOS App Store, Android Play Store, and all device densities (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi) with proper suffixes.

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **UI Library:** HeroUI v3.0.0-beta (React Aria components)
- **Styling:** Tailwind CSS 4 + tailwind-variants
- **Icons:** @iconify/react
- **Animations:** Framer Motion 11

### State Management & Data Flow

- **Global State:** Zustand v5.0.0
- **Persistence:** zustand/middleware (persist with debounced localStorage)
- **DevTools:** zustand/middleware (devtools with Redux DevTools)
- **Color Picker:** react-colorful

### Export & Utilities

- **Image Export:** html-to-image (PNG/JPG conversion)
- **Batch Export:** JSZip (multi-file ZIP generation)
- **File Saving:** file-saver
- **SVG Processing:** svgo (optimization)
- **Unique IDs:** uuid v13

### Theme & Accessibility

- **Theme Management:** next-themes (light/dark mode)
- **Accessibility:** Built-in React Aria support via HeroUI

---

## 🏗️ Architecture Highlights

### Layer Independence

Each layer is a fully independent entity with:

- **Transform**: x/y position, scale (10-300%), rotation (0-360°)
- **Visibility**: show/hide toggle, lock editing
- **Appearance**: opacity (0-100%), blend mode, blur
- **Effects**: shadow, inner shadow
- **Stroke**: width, color, alignment
- **Fill**: solid color or gradient (linear/radial)

Layers render as absolutely positioned elements with CSS transforms. SVG layers support dynamic fill color override without modifying source files.

### Zustand Store Pattern

```typescript
// ✅ Efficient selector pattern
const selectedLayer = useIconEditorStore((state) => state.selectedLayer);
const updateLayer = useIconEditorStore((state) => state.updateLayer);

// Update layer properties
updateLayer(layerId, {
    x: 100,
    y: 50,
    scale: 150,
    opacity: 80,
    blendMode: "multiply",
});
```

Single source of truth with automatic persistence. All state changes debounced to localStorage. Pre-built selectors (`useSelectedLayer`, `useIconProps`, `useZoom`, `usePanOffset`) for optimal performance.

### Icon-Level Effects

Global icon effects applied to the entire composition:

- **Background**: solid color or gradient with iOS/Android shape masking
- **Shadows**: outer shadow, inner shadow, ambient shadow, glow
- **Texture**: procedural noise with configurable blend mode

Fixed 1024×1024px canvas ensures stable rendering without dynamic resizing complexity.

---

## 📂 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (editor)/           # Editor route group
│   │   ├── editor/         # Main editor page
│   │   │   └── page.tsx
│   │   ├── export/         # Export page with batch tools
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── loading.tsx
│   ├── landing/            # Landing page
│   │   ├── components/     # Hero, Features, Gallery, etc.
│   │   └── layout.tsx
│   ├── report/             # Bug report page
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout (theme provider)
│   ├── page.tsx            # Landing redirect
│   └── globals.css         # Global styles
├── components/             # Core editor components
│   ├── Editor.tsx          # Root editor (state distribution)
│   ├── Canvas.tsx          # Canvas editor (panning, selection)
│   ├── CanvasIconBackground.tsx   # Background renderer
│   ├── CanvasLayerRenderer.tsx    # Layer renderer (shared logic)
│   ├── CanvasLayerSidebar.tsx     # Layer list (drag-drop)
│   ├── CanvasZoomControls.tsx     # Zoom UI
│   ├── IOSSquircleMask.tsx        # iOS squircle SVG clip
│   ├── PreviewPanel.tsx           # Live preview
│   ├── toolbar.tsx                # Tabbed toolbar
│   ├── panels/                    # Toolbar panels
│   │   ├── EditPanel.tsx          # Layer properties editor
│   │   ├── ColorsPanel.tsx        # Color picker
│   │   └── SurfacePanel.tsx       # Icon background/effects
│   ├── motion-primitives/         # Animation components
│   └── theme-provider.tsx         # Theme wrapper
├── store/
│   └── useIconEditorStore.ts      # Zustand store (single source)
├── hooks/
│   ├── usePanning.ts              # Canvas panning logic
│   └── useNavbarShortcuts.ts      # Keyboard shortcuts
├── types/
│   └── index.ts                   # TypeScript interfaces
├── utils/
│   ├── export.ts                  # Export logic (iOS/Android)
│   ├── layer.ts                   # Layer utilities
│   ├── localStorage.ts            # Storage helpers
│   └── svgProcessor.ts            # SVG parsing
├── lib/
│   ├── constants.ts               # App constants
│   └── utils.ts                   # General utilities
├── data/
│   └── colorPalettes.json         # Color presets
└── public/                        # Static assets
    ├── icons/                     # Sample icons
    ├── layouts/                   # Layout screenshots
    └── pico-screenshot.png        # Banner image
```

---

## 🧭 User Interface Structure

### Editor Layout

- **Canvas Area** (left)
    - Visual icon composer with panning and zoom
    - Layer selection and manipulation
    - Background grid with toggle
    - Undo/Redo controls

- **Toolbar** (right, tabbed)
    - **Layers Panel**: file upload, shape/text creation, layer list
    - **Edit Panel**: transform, effects, shadows, strokes
    - **Colors Panel**: color picker for fills and gradients
    - **Surface Panel**: icon background, shape presets, noise texture

- **Preview Panel** (bottom right)
    - Live 256×256px preview
    - Real-time updates

### Export Interface

- Dedicated export page with batch tools
- iOS/Android preset generators
- Custom dimension and quality controls
- ZIP download for multi-file exports

---

## 🎨 Layer System

### Layer Types

1. **SVG Layers**  
   Vector graphics with dynamic fill color override. Upload any SVG and recolor it on the fly.

2. **Image Layers**  
   Raster images (PNG, JPG, WebP) with full transform and effects support.

3. **Shape Layers**  
   iOS squircle or Android rounded square shapes with configurable border radius.

4. **Text Layers**  
   Typography support with font family, weight, size, letter spacing, and line height controls.

### Layer Properties

- **Transform**: position (x, y), scale (10-300%), rotation (0-360°)
- **Visibility**: visible toggle, locked editing
- **Appearance**: opacity (0-100%), blend mode (16 modes), blur
- **Style**: fill color/gradient, stroke (width, color, alignment), shadow, inner shadow
- **Shape-specific**: border radius
- **Image-specific**: mask inside icon shape
- **Text-specific**: font properties

---

## 🔐 State Persistence

### LocalStorage Strategy

- **Automatic Saves**: State automatically persisted to `icon-store` key
- **Debounced Writes**: 800ms debounce to prevent performance issues
- **Version Control**: Store version 2 with migration support
- **Data Integrity**: Full state serialization with layers, effects, and settings

### Redux DevTools Integration

Install Redux DevTools browser extension for:

- Time-travel debugging
- State inspection
- Action history
- Performance profiling

---

## ⚡ Performance Optimizations

### React Optimizations

- **Memoized Components**: Canvas controls, buttons, and layer renderers
- **Efficient Selectors**: Zustand selectors prevent unnecessary re-renders
- **Callback Stability**: Stable action references from store
- **Conditional Rendering**: Only render visible layers and active panels

### Rendering Strategy

- **Fixed Canvas Size**: 1024×1024px eliminates resize calculations
- **CSS Transforms**: Hardware-accelerated layer positioning
- **Blend Modes**: Native CSS `mix-blend-mode` for effects
- **Debounced Updates**: LocalStorage writes batched to reduce I/O

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm/bun

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/pico.git
cd pico

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Development server runs on network (accessible at local IP).

### Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm run start

# Lint codebase
npm run lint
```

---

## 🎯 Project Focus

Pico is designed as a **frontend-specialized full-stack application**, emphasizing:

- **Professional UI/UX**: Photoshop-inspired interface with intuitive controls
- **Performance**: Optimized rendering and state management for smooth 60fps interactions
- **Type Safety**: Strict TypeScript with comprehensive type definitions
- **Scalable Architecture**: Clean separation of concerns with Zustand store pattern
- **Production-Ready**: Deployed with Vercel Analytics, error reporting, and performance monitoring

The project demonstrates expertise in modern React patterns, advanced state management, real-world canvas manipulation, and production-grade frontend engineering practices.

---

## 📋 Keyboard Shortcuts

- **Space + Drag**: Pan canvas
- **Middle-Click + Drag**: Pan canvas
- **Cmd/Ctrl + Z**: Undo
- **Cmd/Ctrl + Shift + Z**: Redo
- **Delete/Backspace**: Delete selected layer
- **Cmd/Ctrl + D**: Duplicate selected layer

---

## 🛠️ Development Notes

### Path Alias

`@/*` maps to root directory:

```typescript
import { useIconEditorStore } from "@/store/useIconEditorStore";
import { Layer } from "@/types";
```

### Adding Layer Properties

1. Extend `Layer` interface in `types/index.ts`
2. Initialize in `addLayer()` action in `useIconEditorStore.ts`
3. Add UI control in appropriate panel
4. Call `updateLayer(id, { propertyName: value })`

### Adding Icon Properties

1. Extend `IconProps` interface in `types/index.ts`
2. Initialize in `defaultIconProps` in `useIconEditorStore.ts`
3. Add UI control in `SurfacePanel` or `EditPanel`
4. Call `updateIconProps({ propertyName: value })`

---

## 📚 Additional Documentation

- [ZUSTAND_GUIDE.md](ZUSTAND_GUIDE.md) – Comprehensive store usage guide
- [.github/copilot-instructions.md](.github/copilot-instructions.md) – Complete architecture reference

---

## 📄 License

MIT License – See LICENSE file for details

---

Built with ❤️ using Next.js, React 19, Zustand, and HeroUI
