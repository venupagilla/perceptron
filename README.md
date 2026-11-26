# perceptron

Study notes on AI, software engineering, cloud infrastructure, and quantitative
aptitude — presented as a static, self-contained site.

## Files

- `index.html` — landing page (hero, topic grid, links to every note)
- `introduction-to-llm.html` — notes on large language models
- `agentic-ai-foundations.html` — notes on agentic AI, frameworks, and guardrails
- `neural-networks.html` — notes on neural networks and generative AI
- `fastapi.html` — notes on building web APIs with FastAPI
- `aws.html` — notes on AWS cloud foundations
- `devops.html` — notes on DevOps practices and tooling
- `java.html` — notes on the Java language
- `langchain.html` — notes on building LLM applications with LangChain
- `aptitude/` — seven quantitative aptitude sets plus a dashboard:
  - `index.html` — aptitude dashboard
  - `averages.html`
  - `clocks.html`
  - `hcf-and-lcm.html`
  - `number-series.html`
  - `percentages.html`
  - `ratio-and-proportion.html`
  - `speed-time-distance.html`
- `css/aptitude.css` — dark theme for the aptitude dashboard
- `scripts/build-aptitude.mjs` — regenerates the aptitude pages from the source fragments

## Usage

Open `index.html` in any browser. No build step and no server required —
the pages work directly from the file system.

The aptitude notes are print-ready: open any set and use **Download PDF** (or the
browser's print command) to save it as A4 pages.

## Regenerating the aptitude pages

The aptitude notes were merged from `handwritten-notes-next`. Their source is a
set of self-contained HTML fragments with inline paper styles. The generator
copies those fragments into standalone pages, preserving their original
handwritten look, fonts, and controls. Only the dashboard uses the site's dark
theme:

```bash
node scripts/build-aptitude.mjs
```

By default the script reads from
`C:/Users/pagil/OneDrive/Desktop/Handwritten notes/handwritten-notes-next/public/notes`.
Override it with an environment variable:

```bash
APTITUDE_SRC="D:/path/to/public/notes" node scripts/build-aptitude.mjs
```

## Notes

- The main site uses a dark, developer-focused theme (Space Grotesk / Inter /
  JetBrains Mono).
- The landing page's hero uses a lightweight canvas animation that falls back
  to a static gradient when motion is reduced or canvas is unavailable.
- The aptitude note pages keep their original handwritten paper look, A4 page
  structure, dark-mode toggle, and print layout. The aptitude dashboard and the
  landing page use the site's dark theme.
- The only external dependency is the Google Fonts stylesheets (site fonts plus
  Caveat / Patrick Hand / Kalam / Indie Flower for the aptitude notes).
