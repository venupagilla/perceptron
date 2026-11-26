# UI Polish Design Spec

**Date:** 2026-09-12
**Scope:** Spacing, layout, and subtle visual polish across landing page and all note pages

## Goals
- Fix cramped feature grid (4-col → 2-col on desktop)
- Add visual personality through accent colors on feature cards
- Improve spacing consistency across landing page sections
- Refine typography rhythm and code block presentation on note pages
- Better mobile experience (sidebar toggle, touch targets)

## Landing Page Changes

### Feature Grid
- Change from `grid-template-columns: repeat(4,1fr)` to `repeat(2,1fr)` on desktop
- Each card gets a unique left-border accent color (amber, teal, coral, periwinkle, green, etc.)
- Add `transition` for hover lift + border glow
- Cards become `<a>` links (already done in previous audit fix)

### Hero Section
- Increase inner padding from `120px 40px 80px` to `140px 48px 90px`
- Hero h1: increase font-size from 56px to 60px
- Lead text: slightly larger max-width (560px → 580px)

### CTA Band
- Increase padding from `100px 40px` to `120px 48px`
- Add subtle gradient text effect on h2 keywords

### Footer
- Add "Back to top" link
- Increase vertical padding

## Note Page Changes (all8 files)

### Sidebar
- Refine `.navlink` padding for better vertical rhythm
- Add smooth transition on active state background

### Typography
- Tighten `h3` margin-top from 38px to 32px
- Add `margin-bottom: 6px` to `h4` for better sub-heading spacing
- Paragraph `margin: 10px 0` → `margin: 12px 0` for better readability

### Code Blocks
- Add language label (e.g., "python", "json") above code blocks using `::before` on a wrapper or a `<span class="code-label">` element
- Increase padding from `18px 20px` to `20px 24px`

### Tables
- Add subtle `background` on `thead th` (slightly lighter than panel)
- Row hover: `background: rgba(255,255,255,0.02)` (slightly more visible)

### Callout Boxes
- Increase padding from `16px 18px 16px 46px` to `18px 22px 18px 48px`

### Mobile
- Sidebar toggle: increase touch target from 40px to 44px
- Hero padding on mobile: adjust for better spacing

## Files to Modify
- `index.html` (landing page)
- `introduction-to-llm.html`
- `neural-networks.html`
- `agentic-ai-foundations.html`
- `langchain.html`
- `java.html`
- `fastapi.html`
- `aws.html`
- `devops.html`
