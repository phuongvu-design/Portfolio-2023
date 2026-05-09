# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static HTML/CSS/JS portfolio for Phuong Vu (phuongvu.live), deployed via GitHub Pages. No build tool, no package manager, no framework — files are served directly as-is.

## Development

Open any `.html` file in a browser directly, or use any static file server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

There are no tests, linters, or CI scripts configured.

## Architecture

### File layout

- `index.html` — Homepage: hero, 3 featured projects (list layout), 5 additional projects (card grid), about, capabilities
- `project-01.html` / `project-02.html` / `project-03.html` / `project-04.html` — Long-form case study pages
- `graphic-design.html` — Graphic design collection gallery
- `bmc.html`, `infographic.html`, `intervention.html`, `mcle.html` — Smaller single-project pages
- `colors_and_type.css` — Shared design-system tokens (the only shared stylesheet)
- `fonts/` — Self-hosted Roboto variable font
- `images/` — Per-project subdirectories (`bike-website/`, `Carcare/`, `remoteworkplace/`, etc.)

There is no shared JS file. Each page inlines its own `<script>` block at the bottom (nav scroll, reveal observer, back-to-top, lightbox).

### CSS architecture

`colors_and_type.css` is the only file shared across pages. It provides the full design-system token set and should always be linked first:

```html
<link rel="stylesheet" href="colors_and_type.css">
```

Every page then adds its own `<style>` block for page-specific layout. There are no external framework classes.

**Always use CSS custom properties from the design system — never hardcode colors, spacing, or radii.**

Key token groups defined in `colors_and_type.css`:

| Group | Examples |
|---|---|
| Surfaces | `--surface-base`, `--surface-raised`, `--surface-hover` |
| Text | `--text-primary`, `--text-secondary`, `--text-muted`, `--text-inverse` |
| Borders | `--border-default`, `--border-strong`, `--border-focus` |
| Links | `--link-default`, `--link-hover`, `--link-visited` |
| Actions | `--action-primary`, `--action-primary-hover` |
| Hover | `--hover-text` (nav/text-link hover — sage green) |
| Spacing | `--space-1` (4px) … `--space-11` (128px) |
| Radius | `--radius-sm` (6px), `--radius-md` (8px), `--radius-lg` (12px) |
| Shadows | `--shadow-subtle`, `--shadow-soft`, `--shadow-hover` |
| Transitions | `--transition-color`, `--transition-fast`, `--transition-base`, `--transition-slow` |

### Typography

The sole typeface is **Roboto** (self-hosted variable font). Every text element that sets font styles must include:

```css
font-family: var(--font-primary);
font-variation-settings: "wdth" 100;
```

Omitting `font-variation-settings` causes the variable font to render incorrectly. Semantic type classes (`h1`–`h3`, `p`, `.caption`, `.label`) are declared in `colors_and_type.css`.

### Icons

Icons are inline SVG copied from [Lucide](https://lucide.dev/), with `stroke-width: 1.5` applied to match the existing style. There is no Lucide runtime script — do not reintroduce one.

### Shared page patterns

Every page duplicates a standard nav block, reveal animation system, and back-to-top button inline. When adding or editing a page, follow the existing inline implementations exactly.

**Reveal animation**: add class `reveal` to any element; an `IntersectionObserver` adds `visible` on scroll. Above-fold elements get a `setTimeout(..., 50)` to fire immediately. Stagger siblings with `style="transition-delay: 80ms"` increments.

**Mobile breakpoint**: all responsive overrides live inside `@media (max-width: 900px)`.

**Content containers** (case study pages):
- `.wrap` — `max-width: 1200px`, padded `0 64px`
- `.wrap-narrow` — `max-width: 760px`, padded `0 64px`

### Adding a new project

1. Create a new HTML page (e.g. `project-05.html`) using an existing case study page as the template.
2. Add a cover image folder under `images/`.
3. Link the project from `index.html` — add it as a `.project-row` in the featured list or a `.card` in the additional-projects grid.
4. Update the `section-count` label (e.g. `01 — 04`) in `index.html` if adding to the featured list.
