---
name: leander-ppt
description: "Create, redesign, standardize, or polish editable PPTX decks through the Leander PPT workflow. Use for internal presentations, management reports, project reviews, product introductions, customer demos, training materials, slide outlines, PPT review, PPT redesign, reusable PPT templates, or turning source material into a formal editable deck."
---

# Leander PPT

Turn source material into a **formal, editable, presentable `.pptx`**. This skill borrows the staged harness from `web-video-presentation`, but adapts it to PowerPoint:

- No webpage output.
- No video, narration, audio, or recording workflow.
- No automatic HTML-to-PPT conversion as the default.
- Use editable PowerPoint shapes and PPTX generation/editing methods.

## Core Principle

This skill is a production system, not a style memo. Work through staged files, hard checkpoints, and rendered QA:

```text
Phase 1   Brief + outline
          Read BRIEF.md + OUTLINE.md + SLIDE-CRAFT.md
          Produce brief.md + outline.md
          Self-check, fix, then stop for Checkpoint Plan

Checkpoint Plan
          Align outline, deck type, theme/template, assets, and sample pages

Phase 2   Theme/template selection
          Read THEMES.md
          Confirm or choose template before samples

Phase 3   Anchor sample PPTX
          Read SLIDE-CRAFT.md + QA.md
          Produce 2-3 real editable sample pages
          Render to PNG, self-check, fix, then stop for user approval

Phase 4   Full deck production
          Read PRODUCTION.md + SLIDE-CRAFT.md + QA.md
          Implement by selected mode: A chapter/batch confirmation, B sequential full deck, C parallel chapters
          Render to PNG, self-check, fix, then report
```

Do not jump to full-deck generation when the structure, theme, or sample quality has not been approved.

## Execution Gates

These gates are mandatory. If a gate is missing, stop and complete it before moving forward.

| Gate | Required evidence | Blocks |
|---|---|---|
| Gate 1 - Plan | `brief.md` + `outline.md` pass their self-checks | Any theme or slide work |
| Gate 2 - Theme | A named theme/template contract with tokens, component style, logo/image rules, and user approval or explicit "you decide" | Anchor samples |
| Gate 3 - Scaffold | A real deck project scaffold copied from `templates/leander-ppt-scaffold/` or an equivalent existing scaffold with `theme/`, `components/`, `chapters/`, `deck.gen.*`, and `output/preview/` | Any PPTX generation |
| Gate 4 - Chapter contract | `chapters/<chapter-id>/chapter.json` files generated from `outline.md` for every multi-chapter deck | Chapter/batch production and minimum-unit repair |
| Gate 5 - Anchor proof | 2-3 rendered editable sample slides, checked against theme, components, layout, and source boundaries | Full deck production |
| Gate 6 - Rendered QA | Slide PNGs + contact sheet + QA notes, with fail items fixed | Reporting completion |

Do not create one-off slide scripts in a loose project folder unless the task is a tiny single-slide experiment. For any deck, sample deck, or multi-slide preview, instantiate the scaffold first and place scripts inside the scaffold structure.

If tool or dependency issues force a fallback, record the fallback in `qa.md`, label the affected pages as lower-confidence, and do not call the result final quality.

---

## Hard Self-Check Protocol

Every major output must go through:

```text
produce -> self-check -> fix fail items -> report or move to checkpoint
```

| Output | Required check |
|---|---|
| `brief.md` | `references/BRIEF.md` self check |
| `outline.md` | `references/OUTLINE.md` self check |
| theme/template choice | `references/THEMES.md` self check |
| anchor sample PPTX | `references/SLIDE-CRAFT.md` + `references/QA.md` |
| page/batch/chapter production | `references/PRODUCTION.md` + `references/SLIDE-CRAFT.md` + `references/QA.md` |
| page repair | `references/PRODUCTION.md` minimum-unit repair protocol + `references/QA.md` |
| full deck PPTX | `references/PRODUCTION.md` + `references/SLIDE-CRAFT.md` + `references/QA.md` |

Use the most isolated review method available:

1. Reviewer agent / Agent Teams, if available: pass the output path, relevant checklist file, and only the needed context. Require pass/fail + evidence + repair suggestions.
2. Subagent, if reviewer teams are unavailable but subagents exist: use the same review prompt shape.
3. Current-agent self-check as fallback: strictly walk each checklist item. Do not treat a quick visual glance as QA.

The rule is non-negotiable: **fix fail items before telling the user the work is done**. Do not hand over a PPTX with obvious clipping, overlap, unreadable text, accidental blankness, or text-card-only pages.

For production and repair, the main agent keeps final accountability. Subagents can draft isolated chapters or review rendered artifacts, but the main agent must integrate, normalize style, run final QA, and report.

---

## Stage Reading Guide

Use progressive disclosure. Read only the relevant reference file(s) for the current stage.

| Stage | Required reading | Purpose |
|---|---|---|
| Phase 1 brief | [`references/BRIEF.md`](references/BRIEF.md) | Define audience, deck type, output goal, evidence boundary |
| Phase 1 outline | [`references/OUTLINE.md`](references/OUTLINE.md) + [`references/SLIDE-CRAFT.md`](references/SLIDE-CRAFT.md) | Plan storyline, pages, visual intent, assets, anchor samples |
| Phase 2 theme | [`references/THEMES.md`](references/THEMES.md) | Select or define reusable PPT theme/template contract |
| Component library | [`references/COMPONENTS.md`](references/COMPONENTS.md) + [`references/COMPONENT-CATALOG.md`](references/COMPONENT-CATALOG.md) | Reuse or extend PPT page components and icon patterns |
| Scaffold design | [`references/SCAFFOLD.md`](references/SCAFFOLD.md) + `templates/leander-ppt-scaffold/` | Use the executable PPT scaffold, theme tokens, and component helpers |
| Phase 3 samples | [`references/SLIDE-CRAFT.md`](references/SLIDE-CRAFT.md) + [`references/VISUAL-COMPOSITION.md`](references/VISUAL-COMPOSITION.md) + [`references/QA.md`](references/QA.md) | Produce and verify 2-3 representative sample slides |
| Phase 4 production mode | [`references/PRODUCTION.md`](references/PRODUCTION.md) | Select chapter/batch/sequential/parallel mode and isolation strategy |
| Phase 4 full deck | [`references/PRODUCTION.md`](references/PRODUCTION.md) + [`references/SLIDE-CRAFT.md`](references/SLIDE-CRAFT.md) + [`references/VISUAL-COMPOSITION.md`](references/VISUAL-COMPOSITION.md) + [`references/QA.md`](references/QA.md) | Produce final deck and rendered visual QA |
| Feedback / repair | [`references/PRODUCTION.md`](references/PRODUCTION.md) + [`references/QA.md`](references/QA.md) | Patch the smallest affected page set and re-render |

If the user provides an existing PPT as the source of truth, use `OUTLINE.md` manual-deck standardization mode before redesigning.

Do not load every reference file at task start. Load the file named for the current phase, and load component/scaffold files only when template or component work is actually needed.

---

## Phase 1 - Brief + Outline

### 1.1 Input Recognition

| User input | Action |
|---|---|
| Existing PPT to standardize | Extract source structure and produce faithful `outline.md`; do not redesign first |
| Source docs / notes / script | Produce `brief.md` and `outline.md` in one pass |
| User only says "make a PPT about X" | Ask for source material or at least audience, goal, target pages, and key points |
| User asks for review | Review against brief/outline if available; otherwise infer deck type and report risks first |

### 1.2 Produce `brief.md`

Read `references/BRIEF.md`. Create `brief.md` with:

- Source and source type.
- Audience and occasion.
- Output goal.
- Deck type.
- Constraints, data boundaries, and asset boundaries.

If required information is missing and cannot be reasonably inferred, ask the user before continuing.

### 1.3 Produce `outline.md`

Read `references/OUTLINE.md` and `references/SLIDE-CRAFT.md`. Create `outline.md` with:

- Storyline.
- Chapter structure.
- Page plan.
- Evidence pool.
- Visual intent for each page.
- Data boundary for each page.
- Asset list.
- 2-3 anchor sample pages.

The outline plans **logic + page content + visual intent**. It does not write final slide code or over-specify drawing details.

### 1.4 Checkpoint Plan

After `brief.md` and `outline.md` pass self-check, stop and ask the user to confirm:

1. Brief: audience, deck type, output goal, target pages.
2. Outline: chapter structure and page plan.
3. Theme/template direction.
4. Assets: available, missing, placeholder allowed.
5. Anchor sample pages to produce first.
6. Production mode after anchor approval:
   - A default: chapter/batch confirmation.
   - B sequential full deck.
   - C parallel chapter production with subagents.

Do not continue to sample slides until this checkpoint is resolved. If the user says "you decide", make the decision, state it briefly, and continue.

---

## Phase 2 - Theme / Template

Read `references/THEMES.md`.

A PPT template is a reusable contract:

- Fonts.
- Colors.
- Grid and safe area.
- Header/footer/section style.
- Reusable components.
- Layout archetypes.
- Image/icon style.

Use the existing company template by default when the user has not provided another one. If multiple options exist, recommend 2-3 based on the deck type and audience.

Confirm the theme/template before anchor samples.

When adding reusable templates or components, also read `references/COMPONENTS.md`, `references/COMPONENT-CATALOG.md`, and `references/SCAFFOLD.md`.

Theme confirmation is not optional. If the user says "continue", treat that as approval only when a concrete theme/template choice has already been stated in the previous assistant message. Otherwise stop and present the theme checkpoint.

---

## Phase 3 - Anchor Sample PPTX

Read `references/SLIDE-CRAFT.md` and `references/QA.md`.
Read `references/SCAFFOLD.md` before creating sample pages. Instantiate or reuse the deck scaffold before generating PPTX output.

Create 2-3 real editable PPTX sample pages:

1. Cover or tone-setting page.
2. A normal high-density content page.
3. The most complex diagram/mechanism page.

These are not wireframes. They must prove final quality, typography, layout density, visual explanation style, and theme fit.

Every sample page must include slide notes or a nearby page contract that names:

- Page ID and source outline item.
- Theme/template used.
- Component source: bundled component, extracted internal component, external render, or page-specific custom component.
- Asset source and data boundary.

Render the sample PPTX to PNG, inspect it, fix visible issues, then stop for user approval.

Do not start full-deck production until the user approves the anchor sample or explicitly asks to continue despite known issues.

---

## Phase 4 - Full Deck Production

Use the approved `outline.md`, theme/template, and anchor sample style.

Read `references/PRODUCTION.md` first, then `references/SCAFFOLD.md`, `references/SLIDE-CRAFT.md`, and `references/QA.md`.
Use `references/VISUAL-COMPOSITION.md` when selecting or combining PPT components, external renders, images, and whitespace.

Implementation rules:

- Keep pages aligned with `outline.md`.
- Generate or update `chapter.json` before implementing multi-chapter decks.
- Keep page code in page files or named page functions so a single page can be repaired without rebuilding unrelated pages.
- Use the approved scaffold `theme/` and `components/` files. Do not redefine a new full theme inside page scripts.
- Each page must declare its component source and asset/data boundary.
- Work by the selected production mode:
  - Mode A: default chapter/batch confirmation.
  - Mode B: sequential full deck, then full QA.
  - Mode C: parallel chapter production with subagents, then main-agent integration and QA.
- Use existing local generation/editing patterns when available.
- Prefer editable vector shapes, text, tables, and image placeholders over flattened images.
- Use real images/screenshots when they carry product, scene, or evidence value.
- Keep data and claim boundaries visible.
- For feedback, use the minimum-unit repair protocol: patch only affected slide(s), shared component(s), or theme token(s) as needed.

After production, read `references/QA.md`, export all slides to PNG, build a contact sheet, inspect, fix, and re-export as needed.

---

## PPT-Specific Non-Negotiables

- Chinese font: `Microsoft YaHei` / `微软雅黑`.
- English and numbers: `Century Gothic` when available.
- Theme tokens may reuse or adapt `web-video-presentation` themes when they are converted into PPT-safe font, color, grid, and component contracts.
- Each content page needs a real visual explanation: diagram, chart, image, timeline, matrix, dashboard mockup, mechanism map, or equivalent.
- Do not treat text cards as a diagram.
- Do not shrink fonts to hide overcrowding.
- Do not leave accidental empty space.
- Do not invent data, logos, customer claims, or implementation status.
- Label achieved / planned / estimate / public-reference claims.
- Render before reporting completion.
- If rendered preview pages do not look like the approved anchor sample or selected template, QA fails even when nothing overlaps or clips.

---

## Token And Context Discipline

- Keep `SKILL.md` as the router. Put detailed rules in `references/`.
- Do not read every reference file for every task.
- Reuse source extraction, outline, and prior user feedback already in context.
- For generated PPTX code, locate target pages first and edit locally.
- For long decks, sample first, then batch.
- Stop at checkpoints; cheap checkpoints prevent expensive full-deck rework.
