# Agent notes

## Match the repo

- Follow existing names and folders. App components: `PascalCase.tsx`. shadcn UI: `kebab-case.tsx`. Hooks: `use-*.ts`. Store: `*-store.ts`. Types: `*.types.ts`.
- Import with `@/` (root). Keep editor code under `components/editor/`, landing under `components/home/`, primitives under `components/ui/`.
- Prefer editing an existing file over adding a new one. No drive-by refactors, renames, or unrelated cleanup.
- Match local style in the file you touch (quotes, semicolons, `"use client"`). Do not restyle shadcn files unless the task is the primitive itself.

## Quality

- `bun run lint` and `bunx tsc --noEmit` must pass. No unused imports.
- There is no Prettier config; do not add formatters or extra docs unless asked.
- Never commit secrets or `.env*` files. This app has no env vars today; do not introduce them without a real need.

## Components

- **≤ 120 lines per UI component file.** Extract hooks, subcomponents, constants, and types when over the limit.
- Panels stay presentational: read/write `useEditorStore` selectors and actions. Put domain shapes in `types/`, canvas numbers in `lib/constants/`, export in `lib/utils/export.ts`.

## Layers

Keep these separate:

| Layer | Where |
| --- | --- |
| UI | `components/` |
| State | `lib/stores/` |
| Domain | `types/`, `lib/constants/` |
| Client utils | `lib/utils.ts`, `lib/utils/` |
| Theme | `providers/`, `styles/` |
| API / server | None. Do not add routes or server persistence unless asked. |

New editor UI: component → store action → persist. New export behavior: `lib/utils/export.ts`, called from the Export panel.
