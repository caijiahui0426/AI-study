# PPT Theme And Template System

PPT themes must be reusable style modules, not one-off slide decoration.

## Contents

- [When To Read](#when-to-read)
- [Theme Definition](#theme-definition)
- [Required Theme Tokens](#required-theme-tokens)
- [Built-In Template Guidance](#built-in-template-guidance)
- [Template Selection Checkpoint](#template-selection-checkpoint)
- [Component Rules](#component-rules)
- [Self Check](#self-check)

## When To Read

Read this file in Phase 2 before selecting or creating a template.

## Theme Definition

A PPT theme is a stable design contract:

- Color tokens.
- Font tokens.
- Page grid and safe area.
- Header, footer, and section page style.
- Reusable components.
- Layout archetypes.
- Asset rules.

Leander PPT can reuse `web-video-presentation` theme ideas, but it must translate them into PPT-safe contracts: font names available in PowerPoint, hex color tokens, page grid, component shapes, and export QA. Do not copy webpage-only animation or CSS assumptions directly into PPT.

## Required Theme Tokens

```js
const THEME = {
  fonts: {
    cn: "Microsoft YaHei",
    en: "Century Gothic",
    fallback: "Arial"
  },
  colors: {
    bg: "...",
    surface: "...",
    text: "...",
    mute: "...",
    line: "...",
    primary: "...",
    accent: "...",
    accentSoft: "..."
  },
  grid: {
    canvas: "16:9",
    safeX: [96, 1824],
    safeY: [80, 980],
    columns: 12,
    gutter: 24
  },
  components: [
    "cover",
    "header",
    "section",
    "metricCard",
    "textCard",
    "iconBadge",
    "flowNode",
    "timeline",
    "calloutBand",
    "imageFrame"
  ]
}
```

## Theme Sources

Use three types of theme sources:

1. **Imported web-video theme tokens**: adapt color, mood, typography intent, and spacing from `web-video-presentation/themes/*`. Convert CSS tokens into PPT constants.
2. **Internal PPT-derived themes**: extract recurring layouts, typography, colors, spacing, chart treatment, and icon style from approved internal decks.
3. **Project-specific overrides**: apply only when the audience or brand context requires it; keep overrides small and document them in the deck generator or outline.

Internal source decks can be used to derive:

- Layout archetypes.
- Section and cover treatment.
- Color and line rhythm.
- Data panel styling.
- Icon and diagram language.
- Image placement and caption conventions.

## Built-In Template Guidance

When only one company template exists, use it by default and say so. When multiple templates exist, recommend 2-3 based on deck type and audience.

| Deck type | Visual temperament |
|---|---|
| Management report | restrained, high contrast, decision-oriented |
| Internal sharing | clear, friendly, method-oriented |
| Product introduction / presales | polished, visual, capability-oriented |
| Customer demo | scenario-first, image-led, practical |
| Training | readable, step-by-step, spacious |
| Project review | factual, status-driven, risk-aware |

## Template Selection Checkpoint

Before sample slide production, confirm:

- Theme/template name.
- Reason it fits the deck type.
- Fonts.
- Primary/accent colors.
- Whether logo and brand assets are available.
- Whether image style is real-photo, screenshot, vector diagram, placeholder, or generated image.
- Which scaffold theme files will hold the tokens.
- Which component library is approved for the anchor sample.

If the user says "you decide", choose the best fit and state the choice before making samples.

The word "continue" is not theme approval unless the assistant has already stated a concrete theme/template choice in the immediately previous response. If theme choice is still implicit, stop and run this checkpoint.

Record the selected theme in the deck project, normally as:

```text
theme/theme.json
theme/tokens.js
qa.md
```

Do not define a separate full theme inside generated page code. Page code may use page-level accents only when they reference existing theme tokens.

## Component Rules

- Components must be editable PowerPoint shapes where possible.
- Images are allowed and encouraged when they carry real product, scene, or evidence value.
- Generated images are optional and should be used sparingly.
- Icons should come from a consistent style and map to concrete meaning.
- Do not create a new color palette for each page.
- Do not mix fonts outside the theme contract.
- If an external rendering library is used, decide whether the result is exported as an image, converted to editable shapes, or kept as a reference mockup.
- Every sample or produced page must declare its component source: bundled scaffold component, extracted internal PPT component, external-render component, or page-specific custom component.
- If using a page-specific custom component, document why the existing component library was insufficient and whether the pattern should be promoted into `components/`.

## Self Check

- [ ] Theme choice matches deck type and audience.
- [ ] Font and color tokens are explicit.
- [ ] Components are reusable across the deck.
- [ ] Page grid and safe area are defined.
- [ ] Image/icon style is defined.
- [ ] Theme is written to scaffold files, not only described in chat.
- [ ] Component source rules are explicit.
- [ ] If a new template is introduced, sample pages prove it before full production.
