# Slide Craft

This is the single required craft guide for producing or editing slide pages.

## Contents

- [When To Read](#when-to-read)
- [This Is PPT, Not A Text Summary](#this-is-ppt-not-a-text-summary)
- [Slide-Making Decision Tree](#slide-making-decision-tree)
- [Typography And Layout Rules](#typography-and-layout-rules)
- [Designed Whitespace Vs Empty Space](#designed-whitespace-vs-empty-space)
- [Anti AI Visual Fingerprints](#anti-ai-visual-fingerprints)
- [Anchor Sample Rules](#anchor-sample-rules)
- [Self Check](#self-check)

## When To Read

Read this file every time you create anchor sample slides or implement a batch of final slides.

For full production or feedback repair, also read `PRODUCTION.md`. It defines how to isolate pages, batches, and chapters.

## This Is PPT, Not A Text Summary

A good PPT page makes the audience see the relationship, mechanism, contrast, or conclusion. A page made of title + paragraph + several text cards is usually not enough.

Each content page needs a real visual explanation:

- Flow: nodes, arrows, checkpoints, handoff.
- Comparison: before/after, option A/B, competitors, source/target.
- Timeline: stages, milestones, maturity path.
- Matrix: two axes, quadrants, priority map.
- Layered architecture: stack, platform, dependency, data flow.
- Evidence board: numbers, source labels, caveats.
- Dashboard mockup: metrics, status, panels.
- Image-led page: real product, site, screenshot, or generated placeholder with clear caption.
- Big-word + card matrix: designed whitespace on one side, dense supporting cards on the other.
- Four-column mechanism: equal columns with number, title, icon/diagram, and conclusion.

## Slide-Making Decision Tree

Before drawing a page, answer these five questions:

1. What is the one sentence the audience should remember?
2. What relationship must be seen: sequence, hierarchy, contrast, cause-effect, evidence, or system map?
3. What can be removed from text and converted into shape, icon, number, axis, or image?
4. Is this a designed-whitespace page or a full-content page?
5. What is the data boundary: achieved, planned, estimate, public reference, or unknown?

Then choose the page form.

| Relationship | Prefer |
|---|---|
| Sequence / process | horizontal or circular flow with arrows |
| Hierarchy / architecture | stack, hub-and-spoke, layered blocks |
| Four parallel values | four-column mechanism |
| Two-sided tradeoff | split comparison or before/after |
| Strategic judgement | big-word + card matrix |
| Metrics / quantified evidence | metric cards + formula / caveat band |
| Product capability | system diagram + capability callouts |
| Roadmap / delivery | timeline + milestones + risks |
| Risks / gaps | heat map, priority stack, red highlight |

## Typography And Layout Rules

- Chinese font: `Microsoft YaHei` / `微软雅黑`.
- English and numbers: `Century Gothic` when available.
- Body text should normally be at least 15-16pt; card body at least 14-15pt; footnotes can be 11-13pt only if not carrying main information.
- Do not solve crowded slides by shrinking text blindly. Reduce text, split pages, or convert to diagrams.
- Keep all content inside the safe area. For 16:9 1920x1080 design, use approximately `x=96..1824`, `y=80..980`.
- Make the visual center feel centered unless the page intentionally uses left/right composition.
- Use fill for emphasis, data panels, badges, and focal blocks. Use lines and whitespace for separation and structure. Do not use all-fill or all-line pages by habit.
- Icons must carry meaning: role, action, metric, status, module, risk, or asset. Do not add icons as decoration only.

## Designed Whitespace Vs Empty Space

Whitespace is valid only when it supports a focal point.

Designed whitespace usually has:

- A large keyword, number, or image.
- A short explanation.
- A clear dividing line or color bar.
- Supporting cards, diagram, or evidence on the other side.

Empty space usually has:

- Small text floating alone.
- Sparse cards with little content.
- No visual hierarchy.
- No diagram explaining the page.

Empty-space pages must be redesigned.

## Anti AI Visual Fingerprints

Avoid:

- Generic title + paragraph + three cards on every page.
- Decorative gradient blobs, meaningless background ornaments, or fake visual complexity.
- Random icons that do not map to content.
- Huge rounded cards with little content.
- Tiny text used to hide weak structure.
- Fake data, fake logos, or claims without source/boundary.
- Overusing one layout across the whole deck.

## Anchor Sample Rules

Before full-deck production, create 2-3 real editable PPTX sample pages:

1. Cover or tone-setting page.
2. A normal high-density content page.
3. The most complex diagram or mechanism page.

The sample must be good enough for the user to judge final quality. Do not make a wireframe and call it a sample.

## Page Isolation Rules

A slide page is the smallest design and repair unit.

- Give every page a stable `Page ID` from `outline.md`.
- Keep page-specific layout logic together in one named slide function or clearly marked slide block.
- Use reusable components for repeated patterns, but do not hide page-specific content inside global theme files.
- If feedback affects one page, repair that page only unless the defect comes from a shared component.
- If feedback affects a repeated component, fix the component and re-render every page that uses it.
- Do not change page order, chapter structure, or claims while doing visual repairs unless the user approves it.

## Self Check

Run this for every anchor page and after each final slide batch.

- [ ] The page ID and page number match `outline.md`.
- [ ] The page has one clear takeaway.
- [ ] The page has a real diagram or visual explanation, not just text cards.
- [ ] Text size is readable and not artificially shrunk.
- [ ] Visual weight is centered or intentionally composed.
- [ ] Whitespace is designed, not empty.
- [ ] Fills, lines, icons, and images each have a reason.
- [ ] Claims have clear boundaries.
- [ ] No element is outside the safe area or clipped.
- [ ] No text overlaps shapes, arrows, icons, or other text.
- [ ] The page would still make sense if the presenter paused on it for 20 seconds.
