<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Guidance for AI coding agents working in this repository. For a human-oriented overview, see [README.md](README.md).

## What this project is

A single-page Next.js app that plots travel videos about France on a Leaflet map, with a floating sidebar to search and browse them. Each place is a marker: its popup shows the video's thumbnail, where the place is (département and region), the series it belongs to, a tagline, and a link to watch it on YouTube. All content comes from one static typed array in `data/places.ts`. There is no backend, database, API route, auth, or environment variable. The only thing remembered about a visitor is their theme choice (`next-themes`, in `localStorage`).

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`, version pinned in `package.json` → `packageManager`). Never use npm or yarn here and never create a `package-lock.json`/`yarn.lock`. Node 22+ is required (`.nvmrc`).

```bash
pnpm install --frozen-lockfile   # clean, lockfile-exact install (what CI does)
pnpm dev                         # dev server (Turbopack) at http://localhost:3000
pnpm build                       # production build. Needs internet (fetches Geist from Google Fonts)
pnpm start                       # serve the production build
pnpm lint                        # eslint .
pnpm format:check                # prettier --check .   (pnpm format to write)
pnpm typecheck                   # next typegen && tsc --noEmit
pnpm test                        # vitest run
```

Run `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test` and `pnpm build` before calling work done. CI (`.github/workflows/ci.yml`) runs exactly these.

`pnpm typecheck` runs `next typegen` first because `tsc` needs the generated `next-env.d.ts`. Don't call bare `tsc` on a fresh checkout.

## Stack

Next.js 16.3 (App Router, Turbopack for dev **and** build) · React 19.3 · TypeScript 6.0 (maximum strictness, no app JS) · Tailwind CSS 4 (`@tailwindcss/postcss`, no `tailwind.config`) · shadcn/ui `base-nova` style on **Base UI** (not Radix) · lucide-react · next-themes · Leaflet 1.9 + react-leaflet 5 + react-leaflet-cluster 4 · ESLint 9 (flat config) · Prettier 3 + `prettier-plugin-tailwindcss` · Vitest 5.

Look up the docs for these exact versions before using an API from memory. Next 16, React 19, Tailwind 4, Base UI and react-leaflet 5 differ from their predecessors in ways that matter (for example, `next lint` no longer exists; ESLint is run directly).

### Version pins (don't bump casually)

| Pin                        | Why                                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `typescript ~6.0`          | `typescript-eslint` requires `typescript <6.1`. TypeScript 7 breaks `pnpm lint`.                                                                           |
| `eslint ^9`                | `eslint-plugin-react` (pulled in by `eslint-config-next`) crashes on ESLint 10 (`contextOrFilename.getFilename is not a function`). Verified, not guessed. |
| `@types/node ^22`          | Matches the supported Node major.                                                                                                                          |
| `pnpm` in `packageManager` | Keeps local, CI and Vercel on the same pnpm.                                                                                                               |

Re-test before lifting a pin: install the new version in a scratch copy and run `pnpm lint`.

### pnpm specifics

- pnpm blocks dependency install scripts by default. Allowed/denied packages live in `allowBuilds` in `pnpm-workspace.yaml`. `unrs-resolver` is set to `false` on purpose (its native binding ships as a prebuilt optional dependency). If `pnpm install` reports `ERR_PNPM_IGNORED_BUILDS` for a new package, decide explicitly in that file; don't blanket-approve.
- Dependencies are strict (no hoisting): import only packages declared in `package.json`.

## Architecture

```
page.tsx (Server)  ──►  PlaceExplorer (client)
                          ├─ SidebarProvider ─► PlaceSidebar   search · list · footer
                          ├─ <main> ───────────► PlaceMap ─► MapView (Leaflet, browser only)
                          ├─ MapControls          zoom / fit buttons
                          └─ SidebarOpenButton    pill shown when the sidebar is closed
```

`page.tsx` keeps only the places that have coordinates (`places.filter(hasCoordinates)`), so everything below it works with `MappablePlace` and never has to check for missing coordinates.

`Explorer` (in `place-explorer.tsx`) owns the state: `selected` (the id of the place whose popup is open), `hovered` (list row under the pointer), the search and sort (`usePlaceFilters`), and the map's imperative `api`. The sidebar and the map never talk to each other directly.

- **Identity:** a place is identified by its YouTube video id (`placeId(place)` in `lib/place.ts`). Titles are not unique (one title appears 15 times), video ids are. Every `selected`, `hovered`, marker registry key, row `id` (`place-row-<id>`) and deep link uses it.
- **List → map:** the sidebar calls `selectFromList(id)`, which sets `selected` and calls `api.focusPlace(id)` (fly, un-cluster, open popup). On mobile it also closes the sheet.
- **Map → list:** marker `click` sets `selected`; an effect scrolls the matching row into view. `popupclose` clears `selected`, so **`selected` means "this popup is open"**. Use a functional `setSelected(cur => cur === id ? null : cur)` when clearing, so a late `popupclose` from the previous marker cannot wipe a newer selection.
- **Hover:** hovering a row sets `hovered`; `MapView` adds the `place-marker-hover` class to that marker, or to the cluster currently hiding it (`getVisibleParent`).
- **Search:** `results` feed both the list and the map's markers. When the query changes (not the sort order), the map re-frames to the results after a 350 ms debounce.
- **List sections:** results are sorted by title and grouped by region (`groupByRegion`). The sort toggle orders the regions too (A–Z or Z–A, ignoring accents, so "Île-de-France" sits among the I's), and places with no region form a "Location unknown" section that is always last. A row shows only its département, since the region is the section heading (an overseas département is its own region, so it shows nothing).
- **Selected row:** the open place's row gets a 2px inset ring and a tinted fill in the primary color, a semibold title and a pin badge on its thumbnail. The ring must stay `ring-inset`: rows use `content-visibility: auto`, whose paint containment clips anything drawn outside the row (an outer ring or shadow disappears).

### Responsive modes

The layout has three regimes, defined once in `lib/viewport.ts` (`COMPACT_QUERY`, `SHORT_MAX_HEIGHT`, `MOBILE_MAX_WIDTH`) and mirrored by the `compact` and `short` Tailwind variants in `app/globals.css`. **Keep those numbers in sync.**

| Regime                          | Trigger                            | Sidebar                                          | Notes                                                                                    |
| ------------------------------- | ---------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Regular                         | width ≥ 768 and height > 560       | Floating panel, `clamp(18rem, 30vw, 24rem)` wide |                                                                                          |
| `compact`                       | width ≤ 767 **or** height ≤ 560    | Slide-over sheet (`min(88vw, 22rem)`)            | Keyboard hints hidden; map controls fade out while a popup is open.                      |
| `short` (a subset of `compact`) | height ≤ 560 (phone held sideways) | Sheet, header + list + footer scroll together    | Subtitle hidden, footer pinned, popup switches to a side-by-side layout (`popupLayout`). |

- `hooks/use-mobile.ts` (what shadcn's `Sidebar` uses to choose sheet vs. floating) is **customized** to use `COMPACT_QUERY`, so short landscape phones get the sheet, not a 360 px panel that leaves the list 26 px tall.
- Touch: bump targets with `pointer-coarse:` variants (≥ 40 px). Don't hide anything behind hover; touch devices can't reveal it.
- Safe areas: floating UI offsets itself with `env(safe-area-inset-*)`, enabled by `viewportFit: "cover"` in `app/layout.tsx`.
- The map opens **framed on metropolitan France** (`isInMetropolitanFrance`; the overseas places would zoom it out to the whole world), and re-frames on resize or rotation until the user moves the map. The "fit all" button frames everything in the current results, overseas included.

## Repository map

| Path                                          | Role                                                                                                                                                               |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/page.tsx`                                | Home page, a **Server Component**. Renders `<PlaceExplorer places={…} />` with the places that have coordinates.                                                   |
| `app/layout.tsx`                              | Root layout: Geist font (`--font-sans`), `ThemeProvider`, `TooltipProvider`, `metadata`.                                                                           |
| `app/globals.css`                             | Tailwind + shadcn theme tokens, layered Leaflet CSS, `.place-popup` and `.place-marker-hover` rules.                                                               |
| `components/explorer/place-explorer.tsx`      | Top-level client component: state, selection, deep links, hotkeys, map framing, `getInsets`.                                                                       |
| `components/explorer/place-sidebar.tsx`       | The shadcn `Sidebar` (floating, offcanvas): header, search, region-grouped list, footer, arrow-key navigation.                                                     |
| `components/explorer/place-list-item.tsx`     | One list row (memoized): thumbnail, title, "département · region", series label, search-match highlighting, hover/focus → `hovered`.                               |
| `components/explorer/filters-panel.tsx`       | Search field, result count, sort menu.                                                                                                                             |
| `components/explorer/map-controls.tsx`        | Zoom and fit buttons (replace Leaflet's default control).                                                                                                          |
| `components/explorer/sidebar-open-button.tsx` | Floating "Places" pill, visible when the sidebar is collapsed or on mobile.                                                                                        |
| `components/explorer/theme-toggle.tsx`        | Light / dark / system menu.                                                                                                                                        |
| `components/explorer/use-place-filters.ts`    | Search and sort state; derives `results`, region `groups`, and `filtersKey`.                                                                                       |
| `components/place-map/place-map.tsx`          | Client wrapper: `dynamic(() => import("./map-view"), { ssr: false })` with a Skeleton fallback.                                                                    |
| `components/place-map/map-view.tsx`           | `MapContainer`, OSM `TileLayer`, `MarkerClusterGroup`, `PlaceMarker` (memoized), and `MapBridge` (the imperative API).                                             |
| `components/place-map/place-popup.tsx`        | Popup content built from shadcn `Card`, `Badge`, `Button`, `AspectRatio`; location, series badge, tagline, "Watch video" link.                                     |
| `components/place-map/types.ts`               | `PlaceMapApi`, `PlaceMapProps`, `MapInsets`.                                                                                                                       |
| `components/place-map/marker-icons.ts`        | `defaultIcon` / `selectedIcon`.                                                                                                                                    |
| `components/ui/*`                             | shadcn components. **Owned by the shadcn CLI**; see below.                                                                                                         |
| `components/place-thumbnail.tsx`              | YouTube thumbnail with a skeleton while loading and an "unavailable" icon when the image 404s. Used by the list rows and the popup.                                |
| `components/theme-provider.tsx`               | `next-themes` wrapper (`attribute="class"`, system default).                                                                                                       |
| `data/places.ts`                              | `export const places: readonly Place[]`, the only data source.                                                                                                     |
| `data/places.test.ts`, `lib/*.test.ts`        | Data integrity tests; unit tests for place helpers, search, sort, grouping and highlighting.                                                                       |
| `lib/departments.ts`                          | `DEPARTMENTS` (every département with its region), the `Department`, `Region` and `Territory` types, and `regionOf()`. `lib/departments.test.ts` checks the table. |
| `lib/place.ts`                                | `Place`, `MappablePlace`, `Coordinates`, `YouTubeLink` types; `placeId`, `placeThumbnail`, `placeLocation`, `hasCoordinates`, `isInMetropolitanFrance`.            |
| `lib/place-utils.ts`                          | Pure functions: `normalize`, `matchesQuery`, `filterPlaces`, `sortPlaces`, `isSortOrder`, `groupByRegion`, `highlightRanges`.                                      |
| `lib/place.test-d.ts`                         | Compile-time type tests (`expectTypeOf`, `@ts-expect-error`), checked by `pnpm typecheck`; never executed.                                                         |
| `types/react-css.d.ts`                        | Lets `style` props take CSS custom properties (`"--sidebar-width"`) without a cast.                                                                                |
| `types/next-image.d.ts`                       | Pulls in Next's image-module types (`*.png`) so lint doesn't depend on the generated, git-ignored `next-env.d.ts`.                                                 |
| `lib/viewport.ts`, `lib/viewport.test.ts`     | Responsive thresholds shared with CSS, `popupLayout()` (popup width and orientation), `useViewportSize()`.                                                         |
| `hooks/use-mobile.ts`                         | `useIsMobile()`: **customized** from shadcn's to use `COMPACT_QUERY` (see Responsive modes).                                                                       |
| `lib/utils.ts`                                | `export { cn } from "cn"` (shadcn's class-name helper package).                                                                                                    |
| `components.json`                             | shadcn config (`base-nova`, `lucide`, aliases).                                                                                                                    |
| `next.config.ts`                              | `images.remotePatterns` for `i.ytimg.com`.                                                                                                                         |

### Where to make common changes

| Task                                                                     | Where                                                                                        |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Add or edit a place                                                      | `data/places.ts` (then `pnpm test`)                                                          |
| Change what search matches (title, series, tagline, département, region) | `haystack()` in `lib/place-utils.ts` (and its tests)                                         |
| Change how the list is sorted or grouped                                 | `sortPlaces` / `groupByRegion` in `lib/place-utils.ts`                                       |
| Change sidebar layout or width                                           | `place-sidebar.tsx`; width is `--sidebar-width` on `SidebarProvider` in `place-explorer.tsx` |
| Change a list row                                                        | `components/explorer/place-list-item.tsx`                                                    |
| Change popup content or layout                                           | `components/place-map/place-popup.tsx`                                                       |
| Change the opening view of the map                                       | `handleMapReady` in `place-explorer.tsx`, `isInMetropolitanFrance` in `lib/place.ts`         |
| Change tile source                                                       | `TileLayer` in `components/place-map/map-view.tsx`                                           |
| Change camera behavior (fly, fit, popup pan)                             | `MapBridge` in `components/place-map/map-view.tsx`                                           |
| Change marker icons                                                      | `components/place-map/marker-icons.ts`                                                       |
| Change popup frame (tip, shadow, wrapper)                                | `.place-popup` rules in `app/globals.css`                                                    |
| Allow a new thumbnail host                                               | `images.remotePatterns` in `next.config.ts`                                                  |
| Change title, description, `lang`                                        | `metadata` and `<html>` in `app/layout.tsx`                                                  |
| Add a UI primitive                                                       | `pnpm dlx shadcn@latest add <name>`                                                          |

## Data model

`Place` (`lib/place.ts`) is the contract; TypeScript enforces it:

```
title: string                       name of the place, as titled on the video
link: YouTubeLink                   `https://www.youtube.com/watch?v=${string}`
type: string                        series, region or department. Free text, "" if unknown
description: string                 short tagline, "" if none
department: Department | ""         official name, e.g. "Tarn" (lib/departments.ts)
region: Region | ""                 current region, e.g. "Occitanie"
coordinates?: readonly [lat: number, lng: number]
```

Every field is `readonly` (`Place` is `Readonly<{…}>`), and the dataset is a `readonly Place[]`. Nothing may mutate place data. `MappablePlace` is a `Place` whose `coordinates` is present; `hasCoordinates` is the type guard that narrows to it.

`department` and `region` are one `Territory` (`lib/departments.ts`): a département together with **its own region** (`department: "Tarn"` with `region: "Bretagne"` does not compile), or only a region, or neither. The names come from the `DEPARTMENTS` table (101 départements, the 18 regions in force since 2016), so a typo is a compile error too.

Rules when editing data:

- `coordinates` is **`[lat, lng]`**, latitude first. It may be **omitted** while a place has not been located; such a place stays in the file but is kept off the map and out of the list. This is the one exception to "never omit keys".
- Use `""` for unknown `type`, `description`, `department` and `region`; don't use `null`.
- **A place's département is the one its marker is in**, so the list always agrees with the pin on the map. It was computed from the coordinates against the official département outlines. When a place's own `type` label names a different _region_ than its marker, the marker is wrong: the label wins, and the département is kept only if the label names one (otherwise it is `""` and only the region is set). A label naming another département of the _same_ region is ignored. Regional videos ("Cévennes", "Berry") get the département that contains their marker, which is somewhat arbitrary.
- **A marker at `[46, 2]` carries no information.** That is the centre of France, what a geocoder returns when it finds nothing, and 40 places still sit there (there were 103; see Known limitations). Don't add more. A place there has no département, only a region when its label names one. Fix the coordinates when you can, then set the département from the new position.
- **Some positions are approximate, and say so.** A `// Approximate position: …` comment sits above 47 entries: a town or area the video names (Dole, the Kochersberg, the Saumur Loire), or, for private houses and for episodes that name only a département, the middle of that département (the point farthest from its border). The other formerly pinned places are the real spot of a garden or monument found in OpenStreetMap. Keep the comment when you touch such an entry, and drop it when you replace the position with a real address.
- To find the département of a new place, locate its coordinates in the official outlines (for example `departements-version-simplifiee.geojson` from `gregoiredavid/france-geojson`, matched point-in-polygon); islands and some coastal places fall just outside the simplified outlines, so use the nearest one.
- `link` must be `https://www.youtube.com/watch?v=<11 chars>`, optionally followed by a start time (`&t=2034s`). The compiler checks the prefix; `pnpm test` checks the 11-character id.
- **Every video appears once.** The video id is the place's identity (`placeId`), so two places with the same video would collide. `pnpm test` fails on a duplicate. The title does not need to be unique.
- The thumbnail is not stored: it is derived from the video id (`placeThumbnail` → `https://i.ytimg.com/vi/<id>/hqdefault.jpg`). A video that has been removed or made private has no thumbnail, and the UI shows a "video unavailable" icon instead.
- `type` is free text and inconsistent, a leftover of how the data was collected (`"Les 100 lieux qu'il faut voir"` and `"The 100 places you must see"` are the same series; a region appears as `"Région Bretagne"` and `"Bretagne Region"`). It is displayed and searched, never grouped or filtered, so don't rely on exact values.
- Keep titles and descriptions as written; the data mixes French and English. Trim stray whitespace (a test checks it).
- Some places share coordinates or sit a few metres apart. That is expected; the cluster group spiderfies them at max zoom.
- Overseas places (La Réunion, Guadeloupe, Martinique, Guyane) are valid. `pnpm test` accepts coordinates anywhere between La Réunion and the north of France, and requires over 95 % of located places to be in metropolitan France, which also catches swapped latitude and longitude.

## Conventions

- Everything is TypeScript. Don't add `.js` files. The only JavaScript left is `eslint.config.mjs` and `postcss.config.mjs`: Next doesn't read a TypeScript PostCSS config, and on Node 22.14 a TypeScript `eslint.config.ts` needs the extra `jiti` dependency.
- `tsconfig.json` goes well beyond `strict`: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`, `noImplicitOverride`, `noImplicitReturns`, `noUnused*`, `verbatimModuleSyntax` and `erasableSyntaxOnly`. Fix the code, not the config, when one of them complains. `erasableSyntaxOnly` means no `enum`, `namespace` or constructor parameter properties: use union types and `as const` objects.
- Prefer narrowing to casting. Use `instanceof` and type guards (such as `isSortOrder` and `hasCoordinates`), `satisfies`, annotated variables (`const options: FitBoundsOptions = …`) and `Record<Union, …>` so adding a union member is a compile error until it's handled. Only `as const` is welcome in app code; `components/ui` keeps shadcn's own casts. Banned by lint: `any`, `!` non-null assertions, floating promises, unnecessary conditions and assertions.
- Derive string unions from a constant (`SORT_ORDERS = [...] as const; type SortOrder = (typeof SORT_ORDERS)[number]`) so the list and the type can't drift.
- Import types with `import type` or an inline `type` modifier (`verbatimModuleSyntax`; lint enforces it).
- Domain types are immutable (`Readonly<…>`, `readonly T[]`). Leaflet's own types want mutable tuples, so convert (`latLng(lat, lng)`) instead of casting a read-only tuple.
- Helpers that filter or sort are generic (`<T extends Place>`) so a `MappablePlace[]` stays a `MappablePlace[]`.
- CSS custom properties in `style` props type-check through the augmentation in `types/react-css.d.ts`; no `as CSSProperties`.
- Lint is **type-aware** for everything except `components/ui` (see `eslint.config.mjs`). It reuses the `@typescript-eslint` plugin that `eslint-config-next` already registers, so it needed no new dependency.
- Type-level behavior is tested in `lib/place.test-d.ts` with `expectTypeOf` and `@ts-expect-error`. It never runs; `pnpm typecheck` checks it. Add a case there when you add a type whose point is to reject something.
- Format with Prettier (`pnpm format`); it sorts Tailwind classes via `prettier-plugin-tailwindcss`. `components/ui` is excluded in `.prettierignore` so shadcn files stay byte-identical to upstream. **Name files, not folders, when you run it by hand**: `prettier --write components` also rewrites any stray file in there.
- Use shadcn components for UI wherever one fits instead of hand-rolled markup. Icons come from `lucide-react`.
- Style with Tailwind utilities and the shadcn theme tokens (`bg-card`, `text-muted-foreground`, ...). Don't hard-code colors; the theme supports dark mode.
- `@/` resolves to the repo root. Use `@/…` imports for anything outside the current folder.
- Components are named function components. Mark a file `"use client"` only when it needs state, effects, or browser APIs.
- Keep search/sort/grouping logic as pure functions in `lib/place-utils.ts` with unit tests, not inside components.
- Every interactive control needs an accessible name (`aria-label`) and must work from the keyboard.
- UI strings are English (e.g. "Watch video"), the data is French and English, and `<html lang="en">`.
- Commit history has no enforced message convention.

### shadcn / Base UI notes

- This project uses the **Base UI** flavor. Where Radix uses `asChild`, Base UI uses a `render` prop. A link styled as a button is:
  `<Button nativeButton={false} render={<a href={url} target="_blank" rel="noopener noreferrer" />}>Label</Button>`
- Don't hand-edit `components/ui/*` for app-specific tweaks; wrap them or pass `className`. If you must change one, expect `shadcn add --overwrite` to clobber it.
- `lib/utils.ts` re-exports `cn` from the shadcn-maintained `cn` package (replacement for `clsx` + `tailwind-merge`), as generated by the CLI. That is intentional, not a typo. **It does not dedupe conflicting utilities that share a variant**: overriding a shadcn variant's `dark:bg-input/30` with your own `dark:bg-background` does nothing, because both are emitted. Add the important modifier (`dark:bg-background!`) when you must override a variant's utility.
- The shadcn mobile sheet is hard-capped at 75% of the viewport (`w-3/4`) plus a constant `18rem`, which is only 240 px on a 320 px phone. `app/globals.css` overrides it with an **unlayered** rule (`[data-slot="sidebar"][data-mobile="true"]`, `min(88vw, 22rem)`); unlayered CSS is the only thing that beats variant utilities. Sidebar content must stay usable at ~280 px.

## Gotchas

These are easy to break and not obvious from reading one file.

1. **Leaflet needs `window`.** `page.tsx` is a Server Component; the browser-only boundary is `components/place-map/place-map.tsx` (`"use client"` + `dynamic(..., { ssr: false })`). In Next 16, `ssr: false` is only allowed in Client Components. Don't import `map-view.tsx` statically from a Server Component.
2. **Never pass `place.coordinates` straight to `<Marker position>`.** react-leaflet compares `position` by identity and calls `marker.setLatLng()` when it changes. `setLatLng` makes the cluster group remove and re-add the marker, which **closes its open popup**. Place objects could be re-created on re-render (for example after `history.replaceState` changes the URL), so a real click on a popup button could land on the map instead: the popup vanished between `mousedown` and `mouseup`. `PlaceMarker` therefore memoizes `position` on the lat/lng _values_. Keep it that way.
3. **There are hundreds of markers and rows, so keep them memoized.** `PlaceMarker` and `PlaceListItem` are wrapped in `memo`, and the explorer's callbacks they receive are stable (`setSelected`, `setHovered`, `useCallback`). The explorer re-renders every time the pointer enters or leaves a row; without `memo` that re-renders 729 markers (each with a popup tree) and 729 rows per hover. If you add a prop to either, keep it referentially stable, or the memo silently stops working.
4. **Every marker has a popup in the page, but only the open one has an image.** react-leaflet renders each `PlacePopup` into a detached node, and the images inside are `loading="lazy"`, so they are not fetched until a popup opens. Don't add `priority` or eager loading to the popup image.
5. **List thumbnails are `unoptimized` on purpose.** YouTube's `hqdefault.jpg` is already 480×360, and sending hundreds of them through `/_next/image` would use up the image optimizer's quota (Vercel's hobby plan counts unique source images). The popup image, one at a time, does go through it.
6. **Rows use `content-visibility: auto`** (with a `contain-intrinsic-size` estimate) so the browser skips layout and paint for the rows far from the viewport. `innerText` of a skipped row is empty; measure with `getBoundingClientRect` or scroll it into view first.
7. **Vendor CSS is loaded in the `base` layer.** `app/globals.css` imports Leaflet's and the cluster plugin's CSS with `layer(base)`. Unlayered vendor CSS beats every Tailwind utility regardless of specificity (for example `.leaflet-container a { color }` would override a `Button`'s text color). Keep new vendor CSS in a layer too. The cluster CSS comes from `react-leaflet-cluster/dist/assets/`, so it always matches the installed plugin version.
8. **Stacking:** Leaflet panes use z-indexes up to 700 and would paint over the sidebar. The `MapContainer` has `isolate z-0` so those z-indexes stay inside the map; the sidebar and floating controls use `z-10`. Don't remove `isolate`.
9. **Turbopack resolves image imports inconsistently.** A PNG imported from `node_modules` (Leaflet's `marker-icon.png`) is a plain URL **string**; a PNG inside the project (`marker-icon-red.png`) is a `StaticImageData` **object**. `marker-icons.ts` handles both through `assetUrl()`. Reading `.src` directly from a `node_modules` image yields `undefined` and crashes Leaflet with "iconUrl not set". Keep the helper for any new icon.
10. **The popup frame is overridden on purpose.** `Popup` is rendered with `className="place-popup"` and `closeButton={false}`; the `.place-popup` rules in `globals.css` strip Leaflet's white wrapper so the shadcn `Card` is the visible surface, and the card has its own close `Button` calling `useMap().closePopup()`. The popup width comes from `popupLayout` and is set in both `minWidth`/`maxWidth` and the Card's inline `width`; change them together, because Leaflet sizes the popup from its content width.
11. **Popups don't use Leaflet's auto-pan** (`autoPan={false}`) because it ignores overlays. `MapBridge` pans a new popup into the area not covered by the UI (`getInsets`). It re-checks on every popup size change for 1.5 s (`ResizeObserver`), because the card mounts into the popup after `popupopen` and grows upward, so a fixed-delay measurement sees a tiny popup and under-pans.
12. **`getInsets` describes what covers the map:** the open sidebar's right edge on desktop, or a 56 px strip at the top (the "Places" pill) when the sidebar is collapsed or on mobile. `focusPlace`, `fitPlaces` and the popup pan all use it. Add any new floating UI to it.
13. **The map API is only handed out once the map is measurable.** `MapBridge` waits (via `ResizeObserver`) until the container has a non-zero size before calling `onReady`, and `focusPlace` re-measures with `invalidateSize()` and bails out on a 0 px map. Leaflet's `flyTo` divides by the pixel size, so framing a deep-linked place on first load used to throw "Invalid LatLng object: (NaN, NaN)" and blank the map.
14. **Deep links and URL sync.** `/?place=<video id>` is consumed once in `handleMapReady` (guarded by `deepLinkHandled`); after that an effect mirrors `selected` into the URL with `window.history.replaceState`. That call goes through Next's patched router and re-renders the tree (see gotcha 2). Don't write the URL before the deep link has been handled or you'll erase it.
15. **The thumbnail skeleton is a CSS trick, not loading state.** `PlaceThumbnail` positions a `Skeleton` _behind_ the `next/image` (`fill`); the opaque image paints over it once loaded. The fixed 16:9 box also keeps popups from resizing when the image arrives. Don't add loading state for it. The only state is `failed`: about 15 % of the videos have been removed or made private, their thumbnail answers 404, and without the fallback (a "video unavailable" icon) the skeleton would pulse forever.
16. **Remote images must be allow-listed.** `next/image` rejects hosts not in `images.remotePatterns` (`next.config.ts`) when it optimizes them (the popup image). The list rows are `unoptimized`, so they don't need it.
17. **TypeScript 6 no longer includes every `@types/*` package automatically.** `map-view.tsx` has `import type {} from "leaflet.markercluster"` purely to load the typings that add `MarkerClusterGroup` to Leaflet. It is erased at build time.
18. **React's compiler-based lint rules are on** (`react-hooks/set-state-in-effect`, `refs`, `purity`). Don't call `setState` synchronously in an effect or write refs during render; derive state, or do it in an event handler / callback.
19. **Builds need internet** for `next/font/google` (Geist). An offline or sandboxed `pnpm build` will retry and may fail.
20. **Port 3000 may be taken.** `.claude/launch.json` sets `autoPort: true` so preview servers pick a free port.
21. **`tsc` needs generated types.** Use `pnpm typecheck`, not bare `tsc`.
22. **Custom variants with a comma-separated media query need the block form.** `@custom-variant compact (@media (a), (b));` splits on the comma and breaks the CSS build ("Invalid dangling combinator"). Use `@custom-variant compact { @media (a), (b) { @slot; } }`, as `app/globals.css` does.
23. **Popup width follows the viewport, live.** `popupLayout(vw, vh)` gives the width (288 px, never wider than the viewport minus 32) and whether to use the side-by-side layout (height ≤ 560 and width ≥ 520). Leaflet only reads `minWidth`/`maxWidth` at creation, so `PlacePopup` mutates `popup.options` and calls `popup.update()` when the width changes; that is what lets a popup survive rotation instead of closing. The Card is also capped at `max-h-[calc(100dvh-…)]` and scrolls, so it can never exceed the screen.
24. **In the side-by-side popup the thumbnail is letterboxed (`object-contain` on black), not cropped, and has no `Skeleton`.** The thumbnail column is nearly square; cropping cuts the image's own caption, and a skeleton behind a letterboxed image shows as grey bands.
25. **Popup placement must not depend on frames.** `MapBridge` re-checks a new popup with plain `setTimeout`s (0/120/350/800 ms) _and_ a `ResizeObserver`, then stops after 1.5 s. Animation frames and observer callbacks only run when the browser paints, so a throttled or background tab never adjusted before. `getBoundingClientRect` measures correctly without a paint. Don't switch this back to `requestAnimationFrame` only.
26. **`fitPlaces` remembers what it framed** (`lastFit`) and re-frames when the map resizes (rotation, window resize), until the user touches the map (`pointerdown`, `wheel`, `keydown` on the container) or `focusPlace` runs. Without it, rotating a phone leaves the places off-screen. The first framing (`animate: false`) happens in `handleMapReady`, unless a deep link is present.
27. **The map controls hide on compact screens while a popup is open** (`popupOpen` prop). There is no room for both on a 320 px phone, and the controls cover the popup's "Watch video" button.
28. **`next-env.d.ts` is generated and git-ignored, so a fresh checkout doesn't have it, and CI runs `pnpm lint` _before_ `pnpm typecheck` (which runs `next typegen`).** Type-aware lint rules (`no-unsafe-*`) turn anything TypeScript can't resolve into an error type, and that fails CI on PNG imports while passing locally. `types/next-image.d.ts` references Next's image types from a committed file to prevent that. Lint must never depend on a generated file; if you add another import kind that `next-env.d.ts` normally types, declare it in `types/` too. To check this, verify from a copy of the tracked files only (see `CLAUDE.md`), not a copy of the working folder.
29. **Leaflet's container background is OSM's sea color** (`#aad3df`), so any band the map shows beyond the land reads as ocean, not grey.
30. **`next dev` edits `AGENTS.md`.** When it detects an AI agent it keeps the `nextjs-agent-rules` block at the top of this file (and creates `AGENTS.md`/`CLAUDE.md` if missing). The block is committed on purpose so the tree stays clean; leave it in place.

## Known limitations

Existing behavior, listed so it isn't mistaken for a regression. Mention these if relevant; don't fix them as a side effect of an unrelated task.

- Tests cover the data and the pure logic in `lib/`. There are no component or end-to-end tests; map and sidebar behavior is verified in a browser.
- 41 of the 770 places have no `coordinates`, so they are not on the map and not in the list. They stay in `data/places.ts` until someone locates them.
- 40 places are still pinned at `[46, 2]`, the centre of France (a geocoder's "not found"), so on the map they sit on top of each other in Creuse. 23 of them are videos that no longer exist (among them the 15 identical "Le Tour de FRANCE de nos régions" ones); the other 17 are online, but their descriptions name no place: the "1000 km à cheval" episodes, the "Maison/Jardin préféré" entries that say only "Auvergne", "Limousin" or "PACA", and the national 2016 announcement. 13 of the 40 have a region from their label.
- 63 other places used to be pinned there and were given a position in this pass: 16 exact, 19 a named town or area, 28 the middle of their département. A video's description is the only source, so none of these is a street address.
- Of the 729 places on the map, 680 have a département, 20 only a region and 29 neither (two of those are in Belgium, and have neither on purpose). The département of a regional video is the one holding its marker, and a handful of markers are plainly wrong (a Normandy villa pinned at Saint-Malo); the label is used for those. Nothing re-checks this when coordinates change.
- Some videos have been removed or made private (113 of 765 when last checked: their thumbnail answers 404 and YouTube's oEmbed answers 403). They keep their row and marker, show the "video unavailable" icon, and "Watch video" leads to an unavailable video. Nothing checks this automatically.
- `type` is inconsistent free text (mixed languages, spellings and kinds of label), so it is only displayed and searched.
- The list shows every place at once (about 730 rows) instead of a virtualized window. Memoized rows and `content-visibility` keep it smooth; a much bigger dataset would need virtualization.
- The shadcn `SidebarProvider` writes a `sidebar_state` cookie but nothing reads it, so the sidebar always starts open on desktop.
- The desktop sidebar and popup have fixed maximum sizes (24rem and 288 px); they are not scaled up on very large screens.
- The React Compiler is not enabled.
- No license file.

## Boundaries

**Always**

- Run `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test` and `pnpm build` after changing code (a data-only edit still warrants `pnpm test`).
- Check UI changes in a browser: markers render, clusters expand, a popup opens with its thumbnail and stays open when you click inside it, selecting a list row flies there and highlights it, search works, a deep link (`/?place=aIpaeTkgR_0`) opens on a cold load, the mobile sheet closes on selection, and dark mode looks right. For layout changes, check at least: 320×568 and 390×844 (portrait phones), 844×390 (landscape phone), 768×1024 (tablet), 1280×720 and 2560×1080 (desktop, ultrawide), and rotate with a popup open. Nothing may overflow horizontally, and a popup must stay fully on screen and clear of the sidebar, the pill and the controls.
- Keep `coordinates` as `[lat, lng]`, and keep `title`, `link`, `type`, `description`, `department` and `region` present on every `Place`.

**Ask first**

- Adding, removing, or upgrading dependencies, and especially lifting a version pin.
- Renaming or removing `Place` fields.
- Switching the map library, tile provider, or shadcn style/base.
- Changing hosting, CI, or deployment settings.

**Never**

- Commit secrets or `.env*` files (they are git-ignored).
- Edit `pnpm-lock.yaml` by hand, or introduce another package manager's lockfile.
- Remove `"use client"` or `ssr: false` from the map loading path.
- Pass unmemoized coordinates to `<Marker position>`, or otherwise trigger `setLatLng` on every render.
- Hard-code colors or hand-edit `components/ui/*` for app-specific styling.
- Run `pnpm approve-builds --all` or otherwise blanket-allow dependency install scripts.
