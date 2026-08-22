# Pico

Browser-based app icon editor. Compose layers on a canvas, preview iOS squircle and Android circle shapes, and export PNG or JPG at one or many sizes. Early beta; no signup. The editor is desktop-only.

## Stack

| Layer | Actual |
| --- | --- |
| App | Next.js 16 (App Router), React 19, TypeScript (strict) |
| UI | shadcn/ui (radix-nova), Tailwind CSS 4, CSS variables |
| Icons | `lucide-react` in app code; Hugeicons inside shadcn primitives |
| Motion | Framer Motion |
| Color | `react-colorful` |
| State | Zustand 5 (`immer` + `persist` → `localStorage` key `pico-editor`) |
| Export | Canvas 2D, JSZip, `file-saver` |
| Theme | `next-themes` (class, default dark, system enabled) |
| Package manager | Bun (`bun.lock`) |

No backend, API routes, or env vars. Persistence is browser `localStorage` only.

## Layout

```
app/                    Routes: /  /editor  /help  /settings
components/
  editor/               Editor shell, canvas, toolbar panels
  home/                 Landing sections
  navigation/           App sidebar
  shared/               Form fields, theme toggle
  ui/                   shadcn primitives
  modals/               Dialog wrappers
  motion-primitives/    Landing motion helpers
constants/              Sidebar nav items
hooks/                  useIsMobile
lib/
  stores/               useEditorStore
  constants/            Canvas sizes, zoom, shape ratios
  utils/                exportIcon
providers/              ThemeProvider
styles/                 globals.css, landingPage.css
types/                  Layer and canvas types
public/                 Static images
```

Alias: `@/*` → repo root.

## Architecture

```
/            Header + landing sections + Footer
/editor      SidebarProvider → AppSidebar + Editor
             Editor → EditorHeader | EditorCanvas | EditorToolbar
             Toolbar tabs: Edit, Colors, Surface, Layers, Export
/help        Placeholder
/settings    Placeholder
```

UI reads and writes `useEditorStore`. Export runs in the browser (`lib/utils/export.ts`).

## Setup

Requires Bun (or npm). No `.env` file.

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). Editor: `/editor`.

| Script | Command |
| --- | --- |
| Dev | `bun run dev` |
| Production build | `bun run build` |
| Serve build | `bun run start` |
| Lint | `bun run lint` |

`.env*` is gitignored. The app does not read environment variables.

Typecheck (no npm script): `bunx tsc --noEmit`.
