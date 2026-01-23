![Pico Banner](public/pico-screenshot.png)

# 🎨 Pico – Professional Icon Editor

Pico is a **high-performance, Photoshop-inspired icon editor** built for modern designers and developers. Featuring a sophisticated layer-based canvas system with independent transforms, blend modes, and advanced effects, Pico enables pixel-perfect icon composition with a focus on usability, performance, and professional-grade output.

Built with **Next.js 16** and **React 19**, Pico leverages cutting-edge web technologies including **Zustand** for predictable state management, **shadcn/ui** for accessible UI components, and **html-to-image** for high-quality exports across multiple formats and sizes.

---

## 🚀 Key Features

### 🎯 Core Editing Experience

- **Layer-Based Canvas System**  
  Independent layers with full support for SVGs, images, shapes (iOS squircle, Android rounded square), and text elements. Each layer maintains its own transform state, appearance properties, and styling.

- **Photoshop-Like Interface**  
  Professional canvas editor with fixed 1024×1024px workspace, intuitive panning controls (middle-click or space+drag), smooth zoom (50%-200%), and drag-drop layer reordering.

- **Advanced Layer Effects**  
  16 blend modes, configurable shadows (outer, inner, ambient, glow), strokes with alignment options, and linear/radial gradients with multi-stop color control.

- **Real-Time Preview**  
  Live icon preview panel with instant updates as layers are modified. No lag, no delay—see changes immediately.

---

### 🎨 Smart Design Tools

- **Shape Presets**  
  iOS squircle and Android rounded square presets with automatic background masking.

- **Dynamic Color Management**  
  HexColorPicker integration for precise color selection. Support for solid fills and gradients on individual layers and icon background.

- **Noise Texture System**  
  Procedural noise overlay with adjustable intensity, opacity, size, and 16 blend modes for authentic textured effects.

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
  Export to PNG and JPG with custom dimensions and quality settings. Support for batch exports including iOS (12 sizes) and Android (6 sizes) presets with automatic file naming.

- **Platform-Specific Optimization**  
  Export presets tailored for iOS App Store, Android Play Store, and all device densities with proper suffixes.

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **UI Library:** shadcn/ui (Radix UI primitives)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React / @iconify/react
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

### Theme & Accessibility

- **Theme Management:** next-themes (light/dark mode)
- **Accessibility:** Built-in accessibility via Radix UI primitives

---

## 🏗️ Architecture Highlights

### Layer Independence

Each layer is a fully independent entity with transform (position, scale, rotation), visibility controls, appearance settings (opacity, blend mode, blur), effects (shadows, strokes), and fill options (solid color or gradient).

Layers render as absolutely positioned elements with CSS transforms. SVG layers support dynamic fill color override without modifying source files.

### Zustand Store Pattern

```typescript
// Efficient selector pattern
const selectedLayer = useEditorStore((state) => state.selectedLayer);
const updateLayer = useEditorStore((state) => state.updateLayer);

// Update layer properties
updateLayer(layerId, {
  x: 100,
  y: 50,
  scale: 150,
  opacity: 80,
  blendMode: "multiply",
});
```

Single source of truth with automatic persistence. All state changes debounced to localStorage.

### Icon-Level Effects

Global icon effects applied to the entire composition including background (solid color or gradient with iOS/Android shape masking), shadows, and procedural noise texture. Fixed 1024×1024px canvas ensures stable rendering.

---

## 📂 Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── editor/               # Main icon editor interface
│   ├── help/                 # Help and documentation
│   └── settings/             # Application settings
├── components/               # React components
│   ├── editor/               # Core editor components
│   │   └── panels/           # Toolbar panels (edit, colors, export, surface)
│   ├── home/                 # Landing page sections
│   ├── modals/               # Modal dialogs and overlays
│   ├── motion-primitives/    # Animation components
│   ├── navigation/           # Navigation components
│   ├── shared/               # Reusable shared components
│   └── ui/                   # Base UI primitives (shadcn/ui)
├── lib/
│   ├── constants/            # Application constants
│   ├── stores/               # Zustand state management
│   └── utils/                # Utility functions (export, layer helpers)
├── types/                    # TypeScript type definitions
├── hooks/                    # Custom React hooks
├── providers/                # React context providers
└── public/                   # Static assets
```

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

Open [http://localhost:3000](http://localhost:3000) in your browser.

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

## ⌨️ Keyboard Shortcuts

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
import { useEditorStore } from "@/lib/stores/editor-store";
import { Layer } from "@/types";
```

### Adding Layer Properties

1. Extend `Layer` interface in `types/`
2. Initialize in `addLayer()` action in `lib/stores/editor-store.ts`
3. Add UI control in appropriate panel under `components/editor/panels/`
4. Call `updateLayer(id, { propertyName: value })`

### Adding Icon Properties

1. Extend `IconProps` interface in `types/`
2. Initialize in `defaultIconProps` in `lib/stores/editor-store.ts`
3. Add UI control in `SurfacePanel.tsx` or `EditPanel.tsx`
4. Call `updateIconProps({ propertyName: value })`

---

## 🎯 Project Focus

Pico is designed as a **frontend-specialized full-stack application**, emphasizing professional UI/UX, performance optimization, type safety, and scalable architecture. The project demonstrates expertise in modern React patterns, advanced state management, real-world canvas manipulation, and production-grade frontend engineering practices.

---

## 📄 License

MIT License – See LICENSE file for details

---

Built with ❤️ using Next.js, React 19, Zustand, and shadcn/ui
