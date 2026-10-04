# Pays préféré des Français — Video map

An interactive map of travel videos about France. Every place is a marker: open it to see the video's thumbnail, the series or region it belongs to, a short tagline, and a link to watch it on YouTube. There are about 730 places, from Alsace to La Réunion.

**Live demo:** https://next-pays-prefere-francais-map.vercel.app/

## Features

**Map**

- Full-screen Leaflet map with OpenStreetMap tiles (attribution included), opening on metropolitan France
- Clustered markers that expand as you zoom in; hovering a place in the list highlights its marker (or the cluster hiding it)
- Place popups built with [shadcn/ui](https://ui.shadcn.com): YouTube thumbnail (skeleton while it loads), title, département and region, series, tagline and a "Watch video" button
- shadcn-styled zoom and "fit all" controls
- Light and dark themes that follow your system setting, with a manual toggle

**Floating sidebar**

- Accent-insensitive search across title, département, region, series and tagline (try `Occitanie`, `Tarn` or `bretagne`), with matches highlighted
- Places are grouped under sticky region headers, each with its count, and show a thumbnail and their département. Sort A to Z or Z to A: it orders the regions and the places inside them. Places whose region is unknown come last
- The selected place stands out in the list with a ring, a tinted fill, a bolder title and a pin on its thumbnail, matching the marker's popup on the map
- Selecting a place flies the map to it (un-clustering if needed) and opens its popup; picking a marker on the map highlights and scrolls to its row. The camera accounts for the sidebar so nothing hides behind it
- "Surprise me" picks a random place from the current results
- Shareable deep links: opening a place puts `?place=<video id>` in the URL
- Collapses to a floating pill; becomes a slide-over sheet on phones and whenever the screen is short
- Keyboard friendly: see below

**Responsive**

Built to work on everything from a 320 px phone to an ultrawide monitor:

- **Phones (portrait):** the sidebar is a sheet sized to the screen and the map opens framed on France
- **Phones (landscape):** the sheet scrolls as a single page, and place popups switch to a side-by-side layout (thumbnail beside the details) so they fit the short screen
- **Tablets:** a narrower floating sidebar that leaves the map room
- **Large screens:** the sidebar and popups keep a comfortable maximum size
- **Rotation and resizing:** the map re-frames itself and an open popup stays on screen
- **Touch:** larger tap targets on touch devices, and zoom buttons get out of the way of an open popup
- **Notches and home indicators:** the floating UI stays inside the safe area

### Keyboard shortcuts

| Key            | Action                                               |
| -------------- | ---------------------------------------------------- |
| `/`            | Focus the search field (opens the sidebar if needed) |
| `↓` / `↑`      | Move from search into the list, and between places   |
| `Esc`          | Clear the search (a second press leaves the field)   |
| `Ctrl/⌘` + `B` | Show or hide the sidebar                             |

## Tech stack

| Area            | Choice                                                                                                                              |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | [Next.js](https://nextjs.org) 16 (App Router, Turbopack) with React 19                                                              |
| Language        | TypeScript 6 (maximum strictness, type-aware lint)                                                                                  |
| UI components   | [shadcn/ui](https://ui.shadcn.com) (`base-nova` style, built on [Base UI](https://base-ui.com)), [Lucide](https://lucide.dev) icons |
| Styling         | [Tailwind CSS](https://tailwindcss.com) 4, light/dark via `next-themes`                                                             |
| Map             | [Leaflet](https://leafletjs.com) with [react-leaflet](https://react-leaflet.js.org) 5 and `react-leaflet-cluster`                   |
| Package manager | [pnpm](https://pnpm.io) 11                                                                                                          |
| Quality         | ESLint 9, Prettier, Vitest, GitHub Actions CI                                                                                       |
| Hosting         | [Vercel](https://vercel.com)                                                                                                        |

## Getting started

**Prerequisites:** Node.js 22 or later and [pnpm](https://pnpm.io/installation). The pnpm version is pinned in `package.json` (`packageManager`).

```bash
git clone <repository-url>
cd next_pays_prefere_francais_map
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads as you edit.

### Scripts

| Command          | What it does                                                         |
| ---------------- | -------------------------------------------------------------------- |
| `pnpm dev`       | Start the development server                                         |
| `pnpm build`     | Create a production build                                            |
| `pnpm start`     | Serve the production build                                           |
| `pnpm lint`      | Run ESLint (`pnpm lint:fix` to auto-fix)                             |
| `pnpm typecheck` | Generate Next.js types, then type-check with `tsc`                   |
| `pnpm format`    | Format everything with Prettier (`pnpm format:check` to only verify) |
| `pnpm test`      | Run the Vitest suite once (`pnpm test:watch` to watch)               |

> **Note:** `pnpm build` downloads the Geist font from Google Fonts, so it needs internet access.

CI (`.github/workflows/ci.yml`) runs lint, format check, typecheck, tests and build on every push to `main` and on pull requests.

## Project structure

```
├── app/
│   ├── layout.tsx                  # Root layout, Geist font, theme + tooltip providers, metadata
│   ├── page.tsx                    # Home page (Server Component)
│   └── globals.css                 # Tailwind, shadcn theme tokens, Leaflet CSS, popup styles
├── components/
│   ├── explorer/                   # The floating sidebar and everything that drives the map
│   │   ├── place-explorer.tsx      # State, selection, deep links, hotkeys, map framing
│   │   ├── place-sidebar.tsx       # Sidebar layout (header, search, list, footer)
│   │   ├── place-list-item.tsx     # One row: thumbnail, highlighted text
│   │   ├── filters-panel.tsx       # Search field, result count, sort menu
│   │   ├── map-controls.tsx        # Zoom / fit buttons
│   │   ├── sidebar-open-button.tsx # Floating pill shown when the sidebar is closed
│   │   ├── theme-toggle.tsx
│   │   └── use-place-filters.ts    # Search / sort state and derived results
│   ├── place-map/
│   │   ├── place-map.tsx           # Client wrapper: loads the map in the browser only
│   │   ├── map-view.tsx            # Leaflet map, clusters, imperative API for the explorer
│   │   ├── place-popup.tsx         # Popup content (shadcn Card, Badge, Button, ...)
│   │   ├── marker-icons.ts         # Default and selected marker icons
│   │   ├── marker-icon-red.png
│   │   └── types.ts                # Map API and prop types
│   ├── place-thumbnail.tsx         # YouTube thumbnail with a skeleton and an "unavailable" fallback
│   ├── ui/                         # shadcn components (managed by the shadcn CLI)
│   └── theme-provider.tsx          # next-themes provider
├── data/
│   ├── places.ts                   # The place dataset
│   └── places.test.ts              # Data integrity tests
├── hooks/
│   └── use-mobile.ts               # Sheet-vs-floating sidebar switch (customized from shadcn)
├── lib/
│   ├── departments.ts              # Every département with its region, and the types built from it
│   ├── place.ts                    # The Place type (immutable), video id, thumbnail, location, framing
│   ├── place.test-d.ts             # Compile-time type tests, checked by `pnpm typecheck`
│   ├── place-utils.ts              # Search, sort, group, highlight (pure functions)
│   ├── viewport.ts                 # Responsive thresholds, popup sizing, viewport hook
│   └── utils.ts                    # cn() helper
├── types/
│   ├── react-css.d.ts              # Typed CSS custom properties in `style` props
│   └── next-image.d.ts             # Image module types, so lint needs no generated file
├── components.json                 # shadcn configuration
└── next.config.ts                  # Allows remote thumbnails from i.ytimg.com
```

## The data

All content lives in [`data/places.ts`](data/places.ts), a typed array of places (see [`lib/place.ts`](lib/place.ts)). Each entry with coordinates becomes one marker.

| Field         | Type         | Description                                                                             |
| ------------- | ------------ | --------------------------------------------------------------------------------------- |
| `title`       | string       | Name of the place, as titled on the video                                               |
| `link`        | string       | YouTube watch URL, optionally with a start time (`&t=2034s`); other hosts don't compile |
| `type`        | string       | Series, region or department the video belongs to (free text, empty if unknown)         |
| `description` | string       | Short tagline (empty if none)                                                           |
| `department`  | string       | Official département name, e.g. `"Tarn"` (empty if unknown)                             |
| `region`      | string       | Current region, e.g. `"Occitanie"`: must be the département's own (empty if unknown)    |
| `coordinates` | `[lat, lng]` | Latitude first, then longitude. Optional: a place without them stays off the map        |

The thumbnail is not stored: it comes from the video id in `link`. The département and region are checked by the compiler against [`lib/departments.ts`](lib/departments.ts), so a misspelled name, or `"Tarn"` paired with `"Bretagne"`, does not build. A place's département is the one its marker is in; where a marker is known to be wrong, only the region (taken from the place's own label) is set.

### Adding a place

Append an object to the array in `data/places.ts`:

```ts
{
  title: "Place name",
  link: "https://www.youtube.com/watch?v=VIDEO_ID",
  type: "Région Bretagne",
  description: "",
  department: "Ille-et-Vilaine",
  region: "Bretagne",
  coordinates: [48.1173, -1.6778], // [latitude, longitude]
},
```

Use empty strings for unknown `type`, `description`, `department` and `region`, and leave `coordinates` out until you know them. Then run `pnpm test`: it checks that every link is a YouTube watch URL, that each video appears only once, that coordinates are in range and ordered `[lat, lng]`, and that text has no stray whitespace. Search and the region sections pick the new place up automatically.

### Adding a UI component

shadcn components are copied into `components/ui/` by the CLI:

```bash
pnpm dlx shadcn@latest add dialog
```

## Deployment

The app deploys to Vercel with no extra configuration: import the repository and keep the default Next.js settings. Vercel detects pnpm from `pnpm-lock.yaml` and `packageManager`. No environment variables are required.

## Credits

- Map data © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
- Unofficial fan project. The videos and their thumbnails belong to their respective owners.

## License

No license has been chosen yet.
