# Perceptron Landing Page — Design Spec

**Date:** 2026-08-19
**Status:** Approved by user

## Purpose

A hero landing page that serves as the front door to two existing study-notes pages:

- `agentic-ai-foundations.html`
- `introduction-to-llm.html`

The landing page lives in a single self-contained HTML file (`index.html`) with inline CSS and JavaScript — no build step, no external dependencies, fully offline-friendly.

## Branding

- Name: **perceptron** (all lowercase in wordmark)
- Tagline direction: study notes on AI — LLMs and agentic systems
- Tone: technical, clean, developer-focused

## Visual System

Reuse the exact visual language of the two note pages for consistency:

- **Palette:** `--bg:#0a0d13`, `--panel:#11151d`, `--panel-2:#161c27`, `--border:#232a38`, `--text:#e8eaf0`, `--muted:#8b93a7`, `--muted-2:#5c6478`, amber `#f5a623`, teal `#4fd1c5`, coral `#ff6b6b`, periwinkle `#7c9cff`, green `#7ee787`
- **Fonts:** Space Grotesk (display), Inter (body), JetBrains Mono (labels/eyebrows)
- **Textures:** subtle grid overlay (`body::before`), amber `::selection`
- **Components:** mono uppercase eyebrows, pill/tag badges, bordered cards, gradient accents

## Layout Sections

1. **Sticky nav** — `perceptron` wordmark left; links to both notes (anchor-scroll to cards); mobile-safe.
2. **Hero (full viewport)** — animated `<canvas>` neural-node background (nodes pulse, connections light up, subtle mouse interaction). Eyebrow `// perceptron`, headline referencing AI study notes, tagline, two primary CTA buttons linking to the note files.
3. **Feature strip** — 3–4 compact cards highlighting topics drawn from the notes: self-attention, tokenization, AI agents, guardrails.
4. **Notes cards** — two prominent cards, one per note file:
   - Title, tagline, topic pills, and "Open notes →" link.
   - Agentic AI Foundations: Oracle track, agentic loop, LangChain, MCP, guardrails.
   - Introduction to LLM: NPTEL course, statistical LMs → transformers, tokenization, RAG.
5. **CTA band** — closing message ("Start with the LLM foundations or dive straight into agents") with the same two links.
6. **Footer** — muted: `perceptron — study notes`.

## Interactivity / JS

- Canvas animation: vanilla JS, `requestAnimationFrame`, ~40–60 nodes with connecting lines; lines brighten when near a node that is "firing" or near the cursor. Respects `prefers-reduced-motion`.
- `scroll-behavior: smooth` via CSS.
- No external libraries.

## Error Handling / Fallbacks

- If canvas is unsupported (or reduced motion), hero falls back to a static CSS gradient — content stays readable.
- Relative file links work when opened directly from the folder (file://) — no server required.

## Acceptance Criteria

- Single `index.html` at project root.
- Both note pages reachable via prominent links (cards + hero CTAs).
- Matches existing dark theme (palette, fonts, textures).
- Fancy hero: animated neural-node canvas, graceful fallback.
- Responsive (works on mobile, hamburger or simplified nav).
- No build step; opens directly in a browser.