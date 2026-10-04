@AGENTS.md

# CLAUDE.md

Everything shared across coding agents (commands, architecture, data model, gotchas, boundaries) lives in `AGENTS.md`, imported above. Keep this file for Claude Code–specific notes only, so the two don't drift.

## Working in this repo

- **Use pnpm, always.** `pnpm add`, `pnpm dlx`, `pnpm exec`; never `npm`/`npx`.
- **`node_modules` is not committed and may not be installed.** Run `pnpm install` before `lint`, `typecheck`, `test`, `build` or `dev`.
- **`data/places.ts` is long (about 5,000 lines).** Grep for the title or the video id and make targeted edits that match the surrounding formatting, rather than rewriting the file. Run `pnpm test` afterwards.
- **Adding shadcn components:** `pnpm dlx shadcn@latest add <name>` (the project is already initialized; `components.json` exists). Review the generated file: this project uses Base UI, so link-as-button uses `render`, not `asChild`.
- **Version-specific APIs:** Next 16.3, React 19.3, Tailwind 4, Base UI and react-leaflet 5. Look up the docs for those versions instead of relying on memory.
- **Stay in scope.** `AGENTS.md` lists known limitations. If you notice one while working, mention it in your reply; don't fix it unless it's part of the task.
- **If `components/MapWrapper.js` or `data/locations.js` still exist, don't read them.** They are about 190 KB and 200 KB (~80k tokens each) of dead pre-modernization code (`MapWrapper.js` imports the uninstalled `pigeon-maps`; `locations.js` was converted into `data/places.ts`). Tell the user they can be deleted.

## Verifying a change

1. `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test` for quick feedback.
2. `pnpm build` before calling the work done (needs internet for Google Fonts).
3. For anything visible, start the `dev` server with the preview tools (`.claude/launch.json` exists, and `autoPort` is on because port 3000 is often taken by another process; never kill that process) and exercise it in the built-in browser. The checklist is under "Always" in `AGENTS.md`. To see dark mode, emulate the color scheme and **reload** (next-themes reads the system preference at startup).
4. Stop the preview server when done, and reset anything you changed in the pane (viewport size, color scheme emulation).

### Reproducing CI before a push

Run CI's steps in order from a copy that holds **only tracked and untracked-but-not-ignored files**. A plain copy of the working folder also carries git-ignored generated files (`next-env.d.ts`, `.next`), which can hide a lint failure that breaks CI. Use a short path on Windows (long paths break Vitest):

```bash
D=/c/Users/<you>/AppData/Local/Temp/pays && rm -rf "$D" && mkdir -p "$D"
git ls-files -z -co --exclude-standard | tar --null --ignore-failed-read -T - -cf - | tar -x -C "$D"
cd "$D" && pnpm install --frozen-lockfile
for s in lint format:check typecheck test build; do pnpm run $s || break; done
```

Delete the copy afterwards. If CI fails and you can't see why, `gh` may not be installed: the public API shows the failing step and its annotations (`/repos/<owner>/<repo>/actions/runs/<id>/jobs`, then `/check-runs/<job id>/annotations`); full logs need a login.

### Browser-pane testing tips

These cost real time to discover:

- **Animations only advance when the pane paints.** Leaflet's `flyTo`, popup fade-ins and the sidebar slide appear stuck until a frame is rendered, so state read straight after a click can look wrong (popup missing, `visibility: hidden`). Take a screenshot (after a short `wait`) before reading state, and re-check after. While the pane is hidden, `requestAnimationFrame` never fires, so a script that awaits it hangs: measure synchronously instead.
- **Real clicks and DOM `.click()` are not equivalent.** `element.click()` skips hit-testing and the pointer sequence, so it can hide "popup closes on mousedown" bugs. Use real `computer` clicks for anything interactive, and when one misbehaves, log pointer events in the capture phase and compare `document.elementFromPoint(...)` with the element you expect.
- **Screenshot coordinates are scaled.** A 1280×720 viewport is reported as 800×450 (÷1.6). Convert `getBoundingClientRect()` values before clicking. A real click needs a screenshot of the current page first.
- **Mobile emulation scales real clicks too**, so taps on rows inside the sheet can land on a neighboring element. Verify the mobile flow with DOM `.click()` and screenshots, and reset the viewport to `desktop` when finished.
- **The console buffer is capped (~500) and accumulates across reloads.** For "how many times did X happen", count in the page (`window.__counter`) and read it with `javascript_tool`; otherwise filter `read_console_messages` with `pattern` and a small `limit`. Leaflet stack traces are enormous.
- **Port 3000 is often occupied** by a process you didn't start; `autoPort` picks another.
- **`preview_start` runs the project the session started in.** If the session was moved to this repo from another one, the preview server may still serve the old project. Check the page title; if it is wrong, start `pnpm exec next dev -p <port>` from this folder and open it with `preview_start` and a `url`, then stop that process afterwards.

### Testing responsive layouts

- Use `resize_window` with explicit sizes (`width` + `height`) and **reload** after each change so load-time logic runs. The standard matrix is in `AGENTS.md` under "Always".
- **Only the `mobile` preset (and widths < 768) emulates a touch device**, so `pointer-coarse:` styles only apply there. Custom sizes without it are still a mouse. Check `matchMedia('(pointer: coarse)').matches` before trusting a touch-target measurement.
- Screenshots in emulated narrow viewports can come back tiled 2×2; that is the capture, not the page. Prefer measuring (`getBoundingClientRect`, `scrollWidth > innerWidth`) over eyeballing.
- Rotate by calling `resize_window` again **without reloading** to test the resize and rotation paths, ideally with a popup open.
- Map animations (`flyTo`, popup fades) and observer callbacks only progress when the pane paints. Alternate `wait` and `screenshot` until state settles before measuring a popup's position.
- Emulated-viewport clicks are scaled; for rows inside the mobile sheet use DOM `.click()` and measure.
- Reset with `resize_window` `preset: "desktop"` when finished.

## Environment notes (Windows)

- The primary shell is PowerShell and Git Bash is also available. Use `/` paths in Bash and quote Windows paths with spaces.
- Git may refuse to run with _"detected dubious ownership"_ because the folder is owned by `BUILTIN/Administrateurs`. Pass the exception per command (`git -c safe.directory='*' status`) rather than changing the user's global git config. Suggest the permanent fix (`git config --global --add safe.directory <path>`) to the user instead of running it.
- Only commit or push when asked.
- Deleting tracked files may be blocked by the permission classifier. If it is, don't look for another way around it; leave the deletion for the user and list the files.
- Don't end a Bash command with `cd` into a subfolder: the shell's working directory persists, and it silently becomes the session's project folder.
