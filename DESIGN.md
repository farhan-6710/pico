# Design

## Product

- Layer-based icon composition with independent transform, opacity, blend mode, visibility, and lock.
- Live preview of the icon (iOS squircle, Android circle) while editing.
- One-click export: PNG or JPG, single size or iOS/Android size packs, ZIP when multiple sizes.
- No account. Work stays in the browser.
- Dark by default; light/dark toggle. Landing is public; editor is desktop-only (`lg+`), with a mobile overlay.
- Canvas is a fixed 800px icon surface on a dotted `bg-canvas` workspace. Zoom 10%–300%. Undo/redo: Cmd/Ctrl+Z and Shift+Z.

## Visual system

Tokens live in `styles/globals.css` (`:root` and `.dark`), mapped into Tailwind via `@theme inline`.

| Token | Role |
| --- | --- |
| `--background` / `--foreground` | Page |
| `--card` / `--canvas` | Surfaces; editor workspace |
| `--primary` | Green accent (CTAs, focus ring) |
| `--muted` / `--border` / `--input` | Chrome |
| `--sidebar-*` | App sidebar |
| `--radius` | `0.8rem`; sm/md/lg/xl derived |
| `--font-sans` | Afacad (also Geist / Geist Mono CSS variables on `<body>`) |

Theme: `next-themes` `attribute="class"`. Landing CTA uses `.main_button` in `styles/landingPage.css`.

### Component hierarchy

1. **`components/ui`** — shadcn primitives (`button`, `tabs`, `sidebar`, …). Do not restyle ad hoc; use variants and tokens.
2. **`components/shared`** — `SliderField`, `ColorField`, `ModeToggle`, modal/sheet wrappers.
3. **Feature** — `components/home/*`, `components/editor/*`, `components/navigation/AppSidebar`.

## Screen composition

**Landing (`app/page.tsx`)**  
`Header` → `HeroSection` → `FeaturesSection` → `HowItWorksSection` → `PreviewGallery` → `SupporterWall` → `Footer`. Root layout wraps `ThemeProvider` and `TooltipProvider`.

**Editor (`app/editor/page.tsx`)**  
`MobileComingSoon` (below `lg`) + `SidebarProvider` → `AppSidebar` + `Editor`.

`Editor` is a column: `EditorHeader`, then a row of `EditorCanvas` (flex) and `EditorToolbar` (`w-96`). Toolbar is vertical tabs; each tab (except Export) includes `PreviewSection`.

Panels: `EditPanel` (selected layer), `ColorsPanel` (background palettes + picker), `SurfacePanel` (shape, noise), `LayersPanel` (stack, add/reorder), `ExportPanel` (format, sizes, download).

Canvas: `DottedBackground` → scaled icon (`CanvasIconShape` grid, noise overlay, `LayerRenderer` per layer) → `CanvasControls`.

## Data flow

```
UI (panels, canvas, header)
  → useEditorStore actions / selectors
  → Zustand (immer)
  → persist middleware → localStorage ("pico-editor")
```

There is no API layer and no server persistence.

Export: `ExportPanel` → `exportIcon()` → offscreen Canvas 2D (layers, noise, shape clip) → `Blob` → `file-saver`, or JSZip for multiple sizes.

Domain types: `types/layer.types.ts`, `types/canvas.types.ts`. Canvas numbers: `lib/constants/canvas.ts`.

## Component size

**Every UI component file must stay ≤ 120 lines.** If a file grows past that, split by responsibility: hooks, subcomponents, constants, and types. Do not keep logic and layout in one oversized module.
