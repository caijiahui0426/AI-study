# Leander PPT Scaffold

A scaffold is the reusable working structure that prevents each PPT task from becoming a one-off script.

## What "Real Scaffold" Means

For Leander PPT, a real scaffold is not just instructions. It is a folder structure, theme tokens, component helpers, extraction utilities, and QA utilities that can be reused across decks.

The current executable scaffold lives at:

```text
C:\Users\admin\.codex\skills\leander-ppt\templates\leander-ppt-scaffold\
```

It includes theme tokens, reusable component helpers, icon helpers, a sample deck generator, PPTX output, and rendered preview output.

Recommended structure for a deck project:

```text
<deck-project>/
+-- source/
|   +-- original.pptx / notes.docx / outline.md
|   +-- extracted/
+-- brief.md
+-- outline.md
+-- theme/
|   +-- theme.json
|   +-- tokens.js
|   +-- assets/
+-- components/
|   +-- ppt-components.js
|   +-- icons.js
|   +-- external-renders/
+-- chapters/
|   +-- ch01-background/
|   |   +-- chapter.json
|   |   +-- pages/
|   |   |   +-- p01-cover.js
|   |   +-- assets/
|   |   +-- external-renders/
|   |   +-- qa.md
+-- deck.gen.js
+-- output/
|   +-- deck.pptx
|   +-- preview/
|       +-- slide_01.png
|       +-- contact_sheet.png
+-- qa.md
```

## Scaffold Responsibilities

- Read theme tokens.
- Provide stable PPTX helpers.
- Provide reusable component functions.
- Provide page-level functions or clearly marked slide blocks so a single page can be repaired without rebuilding the deck logic.
- Provide physical chapter folders with `chapter.json` local truth sources.
- Keep source extraction separate from final output.
- Keep external render sources together with exported PNG/SVG.
- Export slide previews for QA.
- Make it easy to regenerate after feedback.

## Scaffold Is Mandatory For Deck Output

For any multi-slide PPTX, preview deck, anchor sample, or full deck, first create a deck project scaffold. Do not generate PPTX from a loose one-off script in the working folder.

Allowed exceptions:

- A tiny one-slide experiment that the user explicitly treats as disposable.
- Inspecting or repairing an existing PPTX where no generator exists yet. In that case, create a repair note that maps the edited slide number to the source file and affected elements.

When creating a new scaffold, copy or mirror:

```text
-- theme/
-- components/
-- chapters/
-- deck.gen.js
-- output/
|   +-- preview/
-- qa.md
```

The scaffold must be the working source of truth for generation. Any temporary renderer, screenshot script, chart render, or asset extraction should live inside the scaffold under `source/`, `components/external-renders/`, or `chapters/<chapter-id>/assets/`.

## Anti-Bypass Rules

- Do not redefine a full theme inside a page file. Put global colors, fonts, grid, logo rules, and safe areas in `theme/`.
- Do not create a component that is named only for the current case when it can be a reusable pattern. Put reusable patterns in `components/`.
- Do not place all pages in one long generator when the deck has chapters. Put page builders under `chapters/<chapter-id>/pages/`.
- Do not deliver previews from ad hoc images if the PPTX itself has not been rendered, unless the user explicitly accepts a low-confidence preview.
- Do not call a deck "template based" unless the generator imports the template/theme/component files.

## Minimal Theme Tokens

```js
export const theme = {
  fonts: { cn: "Microsoft YaHei", en: "Century Gothic" },
  colors: { bg: "...", surface: "...", text: "...", mute: "...", line: "...", primary: "...", accent: "..." },
  grid: { w: 1920, h: 1080, safe: { l: 96, t: 80, r: 1824, b: 980 } }
}
```

## Bundled Component Helpers

The bundled scaffold currently implements:

- `cover()`
- `header()` / `footer()`
- `metricCards()`
- `bigWordCardMatrix()`
- `fourColumnMechanism()`
- `sectionDividerBigNumber()`
- `systemArchitectureCenter()`
- `hubSpokeCapability()`
- `roadmapSwimlane()`
- `caveatBand()`

The next components to add should come from `COMPONENT-CATALOG.md`, especially flow/process, pyramid, positioning matrix, dashboard mockup, and image-led product pages.

## Physical Chapter Contract

Each chapter folder is a production-control boundary, not necessarily a visible PPT section.

```text
chapters/<chapter-id>/
+-- chapter.json
+-- pages/<page-id>-<name>.js
+-- assets/
+-- external-renders/
+-- qa.md
```

`chapter.json` is the local truth source for that chapter. Page files implement it. QA and repair reports should refer to `chapterId + pageId`.

Each page entry in `chapter.json` must include `componentSource`, `assetNeed`, and `dataBoundary`. If a page uses a custom visual form, label it as `page-specific custom component` and explain why an existing component was not enough.

## What Examples Are For

Example pages are not decoration samples. They are executable proof that a component works.

Each example page should show:

- What input the component expects.
- How it behaves with realistic text length.
- Whether it remains readable.
- Where images/icons/charts go.
- What QA risks to watch.

Good examples become regression tests for future decks.

## External Render Slot

External visual tools are allowed when they add information:

- ECharts for charts and dashboards.
- Three.js / Spline for 3D product or spatial scenes.
- Rive for motion-state references.
- Matter.js for simulation references.
- Mapbox for geographic or route views.

Final PPT output should insert high-resolution PNG/SVG stills and retain the external source under `components/external-renders/`.

## Self Check

- [ ] The scaffold can regenerate the PPTX from source files.
- [ ] Theme tokens are separate from slide content.
- [ ] Components are reusable and named by purpose, not case.
- [ ] Pages are addressable by stable ID or named function.
- [ ] Chapter folders exist for multi-chapter decks.
- [ ] Each chapter has `chapter.json`.
- [ ] Every page contract names component source, asset need, and data boundary.
- [ ] The generator imports scaffold theme/components instead of redefining a new local theme.
- [ ] External render sources are retained.
- [ ] Preview export and contact sheet are part of the workflow.
