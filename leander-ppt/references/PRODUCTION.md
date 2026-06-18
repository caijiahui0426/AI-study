# PPT Production Modes

This file is the single required guide for producing full decks after the anchor sample is approved, and for repairing generated decks after feedback.

## When To Read

Read this file only when:

- The user approved anchor sample pages and asks to continue to full production.
- The user asks to generate many slides from an approved outline.
- The user gives feedback on existing generated slides.
- The deck is long enough to need chapter, batch, or parallel work.

Do not read this file during initial brief or outline work.

## Production Unit Model

Leander PPT has three production units:

| Unit | Use for | Isolation rule |
|---|---|---|
| Page | Single-slide creation or repair | Edit only the target slide function or slide object |
| Batch | 3-6 related pages | Keep batch pages aligned to the same chapter and component language |
| Chapter | A logical section from `outline.md` | Work from one chapter slice of the outline, not the whole deck |

Default unit:

- Small deck: page or batch.
- Long deck: chapter.
- User feedback: smallest affected page set.

## Mandatory Preflight

Before producing any PPTX page, confirm these items exist:

- `brief.md` and `outline.md`.
- Approved or explicitly chosen theme/template.
- Deck project scaffold with `theme/`, `components/`, `chapters/`, `deck.gen.*`, and `output/preview/`.
- For multi-chapter decks, one physical chapter folder per outline chapter.
- `chapter.json` for each chapter, generated from the approved outline.
- Anchor sample PPTX and rendered PNGs, unless the user is only asking for outline/theme work.

If any item is missing, create or request it before producing slides. Do not silently continue with a one-off script.

## Physical Chapter Isolation

Full-deck production should use physical chapter folders whenever a deck has more than one logical chapter or may use subagents.

Recommended structure:

```text
chapters/
+-- ch01-background/
|   +-- chapter.json
|   +-- pages/
|   |   +-- p01-cover.js
|   |   +-- p02-context.js
|   +-- assets/
|   +-- external-renders/
|   +-- qa.md
+-- ch02-product/
    +-- chapter.json
    +-- pages/
```

The `Chapter ID` is a production-control ID. It may or may not appear as a visible chapter divider in the final PPT.

Physical chapter isolation is required for any deck with more than one logical chapter. It is not only for parallel production. Without physical chapter folders and `chapter.json`, minimum-unit repair is not considered available.

## Local Truth Source

Each physical chapter should have a `chapter.json`. It is the local truth source for that chapter, similar in purpose to `narrations.ts` in `web-video-presentation`, but adapted to PPT.

Required fields:

```json
{
  "chapterId": "ch01-background",
  "title": "Background",
  "productionRole": "Introduce why this deck matters",
  "visibleInPpt": false,
  "pages": [
    {
      "pageId": "p01",
      "title": "Opening",
      "takeaway": "One sentence the audience should remember.",
      "visualIntent": "minimal-cover-right-title",
      "componentSource": "ppt-component",
      "dataBoundary": "none",
      "assetNeed": "none"
    }
  ]
}
```

Rules:

- `outline.md` owns the global story.
- `chapter.json` owns the local page contract for a chapter.
- Page files implement `chapter.json`; they should not silently change title, takeaway, visual intent, or data boundary.
- QA and repair reports should refer to `chapterId + pageId`.
- If the global outline changes, update affected `chapter.json` files before production continues.
- If a page changes visual form during implementation, update `chapter.json` first or record the approved reason in chapter QA.

## Anchor Before Scale

The first production proof is not a wireframe. It must be a real editable PPTX sample.

1. Build 2-3 anchor pages: cover/tone, dense content page, hardest diagram page.
2. Render anchor pages to PNG.
3. Run self-check and fix fail items.
4. Stop for user approval.

Only after approval may the skill enter full production.

Anchor samples must be produced from the same scaffold, theme tokens, and component library intended for the full deck. A visually similar but separate one-off script does not count as an approved anchor.

## Full Production Modes

Choose one mode at Checkpoint Plan or before Phase 4.

### Mode A - Default - Chapter/Batch Confirmation

Use this when quality and alignment matter most.

Flow:

```text
Batch or chapter 1 -> render -> self-check -> user review
Batch or chapter 2 -> render -> self-check -> user review
...
```

This is the default if the user does not choose another mode. It has the lowest rework risk.

### Mode B - Sequential Full Deck

Use this when the user values speed and the deck has a stable outline and approved anchor style.

Flow:

```text
Batch/chapter 1 -> batch/chapter 2 -> ... -> full render -> full QA -> user review
```

The main agent implements sequentially. Do not use this mode if the sample style is still unsettled.

### Mode C - Parallel Chapter Production

Use this only when subagents are available and the deck can be partitioned by chapter.

Flow:

```text
Main agent owns: outline, theme tokens, anchor sample, final integration, final QA
Subagents own: isolated chapter or batch drafts
Main agent merges, normalizes, renders, fixes, and reports
```

Parallel work is allowed only after anchor sample approval.

Each subagent prompt must include:

- The exact chapter/page range from `outline.md`.
- The physical chapter folder path and `chapter.json`.
- `references/SLIDE-CRAFT.md` path.
- `references/VISUAL-COMPOSITION.md` path when visual/component decisions are needed.
- `references/QA.md` path.
- Current theme/template tokens.
- Approved anchor sample screenshots or PPTX path.
- Component catalog path if components are expected.
- Explicit instruction not to modify unrelated pages or global theme files.

Expected risk: chapter styles may differ. The main agent must normalize typography, spacing, component use, header/footer rhythm, and claim labels before final delivery.

## Capability Use Protocol

Use extra agents only where they improve isolation or review quality.

| Capability | Use when | Do not use when |
|---|---|---|
| Main agent | Anchor samples, theme choice, final integration, final QA, user-facing decisions | Never delegate final accountability |
| Reviewer agent / Agent Teams | Independent QA of outline, sample pages, full deck, or repaired pages | Not needed for trivial text-only metadata changes |
| Subagent production | Mode C parallel chapter/batch production after anchor approval | Before anchor approval, or when deck style is unsettled |
| Subagent review | Reviewer teams unavailable but independent QA is valuable | When no rendered artifact exists yet |
| Current-agent self-check | Fallback when no reviewer/subagent is available | Never replace render-based QA with a glance |

The main agent must always own:

- `brief.md` and `outline.md` final structure.
- Theme/template selection.
- Anchor sample approval handoff.
- Shared component and theme changes.
- Final merge, rendered QA, and user report.

Subagents may own:

- One isolated chapter.
- One batch of adjacent pages.
- One independent review pass.

Subagents must not own:

- Full-deck structure changes.
- Shared theme/token changes.
- Final deck acceptance.
- User-facing conclusion.

## Minimum-Unit Repair Protocol

When feedback identifies slide problems, repair the smallest affected unit.

1. Locate the slide number(s), `chapterId`, `pageId`, and generator/function/object that produced them.
2. Classify the issue:
   - content error
   - layout/clipping/overlap
   - typography/readability
   - visual form/component mismatch
   - asset/image problem
   - claim/source boundary problem
3. Patch only the affected slide(s) unless the issue is global theme or repeated component behavior.
4. Regenerate affected PPTX.
5. Re-export affected pages, plus contact sheet when rhythm or consistency may change.
6. Run QA on repaired pages.
7. Report what changed and what was not touched.

Do not regenerate or redesign the full deck for feedback on one page unless the user asks or the root cause is a shared component/theme bug.

## Repair Scope Decision Tree

| Feedback type | Repair scope |
|---|---|
| Typo, wording, one label | Target page only |
| One page layout off-center, clipped, too small | Target page only |
| Repeated card style too small across many pages | Shared component, then affected pages |
| Font, color, safe area wrong globally | Theme token or helper, then affected pages/full preview |
| Chapter logic wrong | Chapter batch and outline checkpoint |
| Page order or storyline wrong | Outline revision checkpoint before production |
| User says "make the whole deck more like sample X" | New anchor sample or theme checkpoint, not blind full rewrite |

If scope is unclear, inspect affected pages first and choose the smallest plausible scope. Escalate only when the same root cause appears on multiple pages.

## Shared Component Repair

If a defect comes from a reusable component:

- Fix the component helper once.
- Regenerate all pages that use it.
- Inspect at least all affected pages.
- State that the fix was component-level.

## Isolation Rules

- Use physical chapter folders for long or multi-chapter decks.
- Keep `chapter.json` in sync with `outline.md`.
- Keep page-specific logic in page functions or clearly named slide blocks.
- Keep theme tokens separate from page content.
- Keep component helpers reusable and generic.
- Import approved theme and components from scaffold files; do not redefine a new palette or layout system inside a page script.
- Keep external-render source files next to their exported PNG/SVG stills.
- Do not let one page patch rewrite unrelated pages.
- Do not modify the outline during production unless the user approves a structure change.
- Do not let subagents change shared component files unless explicitly assigned.

## Production Self Check

Before reporting any batch/chapter/page as complete:

- [ ] The unit matches its `outline.md` slice.
- [ ] The unit matches its `chapter.json` local truth source.
- [ ] The visual form matches the page relationship, not just the title.
- [ ] The unit uses approved theme/template and anchor style.
- [ ] The unit imports scaffold theme/components instead of using a one-off local style.
- [ ] Every page has component source, asset source/need, and data boundary traceability.
- [ ] The unit was rendered to PNG.
- [ ] Visible fail items were fixed.
- [ ] If the unit was repaired, unrelated pages were not changed unless needed.
- [ ] Remaining risks are reported clearly.
