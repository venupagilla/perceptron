# Five Subject Note Pages — Design Spec

**Date:** 2026-08-19
**Status:** Approved by user

## Purpose

Convert five pasted subject folders of markdown notes into themed HTML note pages, using `agentic-ai-foundations.html` as the template, and add them to the `perceptron` landing page (`index.html`).

## Deliverables

Five new HTML files at project root:
- `aws.html`
- `devops.html`
- `fastapi.html`
- `java.html`
- `langchain.html`

Plus updates to `index.html` (add note cards) and `README.md` (add file list entries).

## Source content

| Page | Source folder | Markdown notes |
|------|--------------|----------------|
| `aws.html` | `aws/` | AWS training + Sessions 1–7 |
| `devops.html` | `devops/` | SDLC & Agile, VCS, CI/CD, Docker, Ansible, Container orchestration, + ~5 more |
| `fastapi.html` | `fastapi/` | Introduction, HTTP methods, Path & Query, POST, PUT & DELETE, Pydantic, playlist |
| `java.html` | `java/` | Full Java notes (2,272 lines) |
| `langchain.html` | `langchain/` | LangChain notes (1,802 lines) |

## Template (match `agentic-ai-foundations.html` exactly)

- Same `:root` palette, fonts (Space Grotesk / Inter / JetBrains Mono), grid-texture `body::before`, amber `::selection`.
- Same layout: fixed sidebar (brand + `navgroup` with mono `.glabel` labels and `.navlink` links), `☰` mobile toggle, `main` with hero (`eyebrow` / `h1` / `lead` / `pillrow`), `section.block` + `.block-head` (eyebrow / h2 / p), `.card`, `.quote`, `.table-wrap`/`table`, `pre > code` (highlight.js), `.mermaid` diagrams, `.footer`.
- Same CDN includes: Google Fonts, highlight.js (+ python/json/bash/java), mermaid 10.9.0.
- Same scripts: menu toggle, `mermaid.initialize`, `hljs.highlightAll`.
- Use subject-specific accent color for the section eyebrows (matching template's per-section accent pattern).
- No comments in source.

## Content conversion rules

1. **Faithful conversion** — convert every markdown section to the template's section structure, grouped into sidebar `navgroup`s by session/lecture/topic. No content omitted.
2. **Attribution-free** — strip source credits and course/instructor references:
   - "from grok", "CampusX playlist", "AWS training course" framing, course/instructor names, Notion source links.
   - Keep technical domain facts that merely name a company/product (e.g., "developed by Sun Microsystems (now Oracle)", "Oracle JDK", "Uber uses Google Maps API", "ChatGPT → OpenAI API").
3. **Encoding cleanup** — fix Notion-export mojibake to proper characters (e.g., `�?"` → `—`, `�?Tt` → `'t`, `�+'` → `→`). The converted HTML must be clean UTF-8.
4. **Code blocks** — render in `pre > code` with the appropriate `language-*` class (java, python, bash, yaml, etc.).
5. **Diagrams** — where the markdown describes a flow/architecture, represent it as a `.mermaid` diagram (matching template conventions); otherwise use tables/cards.
6. **IDs** — section ids match sidebar anchors; `scroll-behavior: smooth` preserved.

## Landing page update (`index.html`)

- Add five new note cards to the `.notes-grid` linking to each new page.
- Each card: subject tag, title, one-line description, 3–4 topic pills, "Open notes →".
- Keep the two existing cards; arrange five new ones in additional rows (grid is currently 2 columns).
- Attribution-free tags (no NPTEL/Oracle/source credits).

## README update

- Add `aws.html`, `devops.html`, `fastapi.html`, `java.html`, `langchain.html` to the file list with one-line roles.
- No source attribution.

## Acceptance criteria

- Five new HTML pages exist at project root; each opens directly from `file://` and renders with the template theme (no layout/styling regression).
- Sidebar anchors navigate to matching section ids; mobile `☰` toggle works; mermaid/highlight.js wired as in template.
- Every markdown section converted; no content dropped; attribution-free; clean UTF-8 (no mojibake).
- `index.html` shows seven note cards total (2 existing + 5 new), each linking correctly.
- `README.md` lists all seven pages.
- Verification offline: grep new pages for mojibake sequences and for source-credit terms; confirm link targets exist. No browser / no network (limited user data).