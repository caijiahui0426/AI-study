# PPT QA Protocol

QA is mandatory. The first render is assumed to have issues.

## When To Read

Read this file before reporting any sample or full deck as done.

## Hard Rule

Every generated PPTX must be rendered to images before delivery. Inspect a contact sheet and key pages at full size. Fix visible issues before reporting completion.

Use the most independent review method available:

1. Reviewer agent / Agent Teams: pass only the output path, relevant checklist, rendered preview path, and necessary outline slice. Require pass/fail + evidence + suggested repairs.
2. Subagent: use the same review prompt if reviewer teams are not available.
3. Current-agent self-check: walk the checklist item by item. A quick glance is not enough.

Fail items must be repaired before reporting completion unless the user explicitly accepts the risk.

## Required QA Artifacts

- Output `.pptx`.
- Exported slide PNGs.
- Contact sheet.
- Short QA notes: passed, fixed, remaining risks.
- For repairs: affected page IDs and what was intentionally not changed.
- Theme/template evidence: selected theme name, approved anchor sample path, and component source summary.
- Scaffold evidence: generator path, theme/component imports, and chapter/page contract location.

## Visual QA Checklist

Check every slide, then zoom into key slides.

- [ ] Page ID/page number can be traced back to `outline.md`.
- [ ] Page can be traced to `chapter.json` when the deck has chapters.
- [ ] Page uses the approved theme/template and looks consistent with approved anchor samples.
- [ ] Page uses declared component sources; custom components are justified.
- [ ] No element is outside the page or clipped.
- [ ] No overlap between text, arrows, icons, shapes, or images.
- [ ] Body and card text are readable.
- [ ] Page does not lean accidentally to one side.
- [ ] Whitespace is designed rather than empty.
- [ ] Each content page has a real diagram, image, chart, or visual explanation.
- [ ] Icons and images carry information, not decoration only.
- [ ] Fills and lines are mixed intentionally.
- [ ] Font usage follows the theme.
- [ ] Claims and numbers preserve source boundaries.
- [ ] No placeholder, fake data, or missing asset is hidden.

Template mismatch is a QA failure even if the slide has no clipping, overlap, or unreadable text.

Automatic fail conditions:

- A multi-slide deck was generated from a loose one-off script instead of a scaffold.
- A new palette, logo treatment, grid, or font system was defined inside page code after theme approval.
- The preview uses an image mockup that does not come from rendering the actual PPTX.
- Sample pages were not generated from the same theme/component system intended for full production.
- A page has no real visual explanation and is only text cards.
- A fallback toolchain was used but not recorded in `qa.md`.

## Content QA Checklist

- [ ] Page order matches `outline.md`.
- [ ] Every page title and takeaway match the outline.
- [ ] Critical facts, numbers, names, and dates match source material.
- [ ] Achieved, planned, estimate, and public-reference claims are labeled.
- [ ] The deck type still matches the brief.
- [ ] No AI-style empty phrases have entered titles or key copy.

## Sample QA

For anchor samples, do not proceed to full production until:

- [ ] The sample PPTX is exported and inspected.
- [ ] The cover or tone page is acceptable.
- [ ] The core content page proves the density and diagram style.
- [ ] The most complex page proves the method can handle hard layouts.
- [ ] The sample was generated from the intended scaffold/theme/component files.
- [ ] Each sample page declares page ID, theme, component source, asset source, and data boundary.
- [ ] The user has approved or explicitly asked to continue despite known issues.

## Full Deck QA

After full production:

1. Export all pages to PNG.
2. Build a contact sheet.
3. Inspect the contact sheet for obvious rhythm, density, and consistency issues.
4. Compare the contact sheet against approved anchor samples and selected template rules.
5. Inspect at least all section pages, the most complex diagram pages, all dense text pages, and the closing page at full size.
6. Fix issues in the generator or source PPT, regenerate, and re-export affected pages.

## Repair QA

For feedback on existing slides:

1. Identify affected page ID(s).
2. Patch the smallest affected unit: page, component, or theme token.
3. Re-export affected pages.
4. If a shared component or theme token changed, re-export every affected page and refresh the contact sheet.
5. Confirm no unrelated pages changed unless required.
6. Report the repair scope.

## Reviewer Prompt Contract

When using a reviewer agent or subagent for QA, provide:

- Artifact path: PPTX and rendered PNG/contact sheet path.
- Task scope: brief/outline/sample/full deck/repair.
- Relevant checklist path: this file plus `SLIDE-CRAFT.md` or `PRODUCTION.md` as needed.
- Relevant outline slice or affected page IDs.
- Exact output format: pass/fail items, evidence, and suggested repairs.

Do not provide your own diagnosis unless the reviewer is explicitly validating a known fix. Keep the review independent.

Expected reviewer output:

```text
Scope:
Pass:
Fail:
- <item> / evidence / suggested repair
Risk:
```

After reviewer output, repair fail items first. Reporting reviewer findings without repair is not complete.

Reviewer must explicitly answer:

- Did the output use the scaffold and approved theme/component system?
- Does the rendered preview match the approved anchor/template direction?
- Are any pages one-off, off-template, or lower-confidence fallbacks?

## Reporting Format

When done, report:

- Output PPTX path.
- Preview/contact sheet path.
- What was checked.
- What was fixed after QA.
- Remaining risks or known limitations.
- For repair tasks: affected page IDs and unchanged scope.

Do not report "done" if obvious visual defects remain.
