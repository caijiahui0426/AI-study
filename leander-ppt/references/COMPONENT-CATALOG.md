# Leander PPT Component Catalog

This catalog is the first reusable component batch extracted from two internal decks:

- A quay-crane automation product introduction deck.
- A Cactus product introduction deck.

Use this catalog as a component selection menu before creating anchor samples. Source decks are references, not case-specific rules.

## Component List

| Component | Status | Best for |
|---|---|---|
| `minimal-cover-right-title` | adopt | Formal cover with large negative space |
| `three-stage-evolution` | adopt | Product history, maturity path, phased narrative |
| `why-now-dual-evidence-hub` | adapt | Why-now argument with internal/external forces |
| `four-column-mechanism` | adopt | Four values, four roles, four capabilities |
| `capability-map-table` | adapt | Product capability overview and module map |
| `dual-evidence-panels` | adopt | Data analysis, before/after, two-sided evidence |
| `case-card-strip` | adapt | From one case to reusable asset |
| `solution-closed-loop` | adopt | Solution architecture and operating loop |
| `scenario-bank-grid` | adapt | Scenario library, configuration library, capability inventory |
| `big-word-card-matrix` | adopt | Value proposition, strategic judgement, operating value |
| `roadmap-swimlane` | adopt | Product roadmap, service plan, delivery stages |
| `minimal-closing-center` | adopt | Closing statement |
| `three-metric-cards` | adopt | Quantified value, estimates, benchmark evidence |
| `last-mile-process` | adapt | Process gap and bottleneck explanation |
| `priority-pyramid` | adopt | Priority stack, difficulty hierarchy |
| `positioning-matrix` | adapt | Competitor or capability positioning |
| `system-architecture-center` | adopt | Product architecture, platform, input-output flow |
| `section-divider-big-number` | adopt | Chapter divider |
| `sensor-fusion-flow` | adapt | Multi-source sensing and fusion |
| `control-window-mechanism` | adapt | Control logic, timing window, algorithm decision |
| `hub-spoke-capability` | adopt | Central platform and surrounding capabilities |
| `service-work-package` | adopt | Service package, project scope, responsibility matrix |
| `pricing-model-split` | adapt | Commercial model comparison |

## Implemented In Scaffold

The current scaffold has executable helpers for:

1. `minimal-cover-right-title` as `cover()`
2. `three-metric-cards` as `metricCards()`
3. `big-word-card-matrix` as `bigWordCardMatrix()`
4. `four-column-mechanism` as `fourColumnMechanism()`
5. `system-architecture-center` as `systemArchitectureCenter()`
6. `hub-spoke-capability` as `hubSpokeCapability()`
7. `roadmap-swimlane` as `roadmapSwimlane()`
8. `section-divider-big-number` as `sectionDividerBigNumber()`

## Component Specs

### minimal-cover-right-title

- Purpose: Set a formal tone with restrained brand presence.
- Structure: Large right-side title, small subtitle, bottom rule, small date/version.
- Required inputs: title, subtitle, deck type/date.
- Optional inputs: logo, tagline.
- Editable: yes.
- QA risks: title too far right, bottom text too small, excessive empty space without tone.

### four-column-mechanism

- Purpose: Present four parallel values or mechanisms with equal visual weight.
- Structure: Four columns; each has number, title, tag, short text, icon/diagram, closing line.
- Required inputs: four items with title, tag, explanation, visual cue.
- Optional inputs: left/right stakeholder grouping.
- Editable: yes.
- QA risks: columns becoming text-only; uneven vertical alignment; icons not meaningful.

### big-word-card-matrix

- Purpose: Make a strategic/value judgement with designed whitespace.
- Structure: Left 35-40% large keywords and short explanation; right 2x2 cards.
- Required inputs: 1-2 big keywords, summary, four supporting cards.
- Optional inputs: audience-side grouping, color emphasis.
- Editable: yes.
- QA risks: empty left side without strong typography; right cards too sparse.

### three-metric-cards

- Purpose: Show quantified value or benchmark evidence.
- Structure: Three equal cards with large number, label, explanation, caveat/source.
- Required inputs: three metrics, labels, source/boundary.
- Optional inputs: formula or caveat band.
- Editable: yes.
- QA risks: numbers without source; body text too small; all cards equally emphasized when one is the key.

### system-architecture-center

- Purpose: Explain a product architecture or data/control platform.
- Structure: Inputs on left, central platform, outputs/applications on right.
- Required inputs: input list, core modules, output list, core engine.
- Optional inputs: data loop arrows, platform subtitle.
- Editable: yes.
- QA risks: too many modules; center block too dense.

### hub-spoke-capability

- Purpose: Show a central system/platform and surrounding modules.
- Structure: central circle/card with radial modules and side explanation.
- Required inputs: center name, 4-6 modules, one takeaway.
- Optional inputs: achieved/planned status per module.
- Editable: yes.
- QA risks: spokes crossing text; module labels too small; layout leaning.

### roadmap-swimlane

- Purpose: Show timeline or plan across multiple tracks.
- Structure: time axis with swimlanes or stage cards.
- Required inputs: stages, dates, tracks, milestones.
- Optional inputs: risks or decision gates.
- Editable: yes.
- QA risks: too many small labels; dates unreadable; no current-state marker.

### section-divider-big-number

- Purpose: Create strong chapter rhythm.
- Structure: large faint number, red chapter title, short subtitle, optional keyword chips.
- Required inputs: chapter number, title, subtitle.
- Optional inputs: three keyword chips.
- Editable: yes.
- QA risks: right side too empty; title too small; number competing with title.

## Next Implementation Priority

Implement these next in the scaffold helper library:

1. `last-mile-process`
2. `priority-pyramid`
3. `positioning-matrix`
4. `dual-evidence-panels`
5. `solution-closed-loop`
6. `dashboard-mockup`
7. `image-led-product-page`

These cover most internal product, management, presales, training, and customer demo decks.
