# Source-Attribution Removal, .gitignore, README — Design Spec

**Date:** 2026-08-19
**Status:** Approved by user

## Purpose

Three housekeeping tasks on the completed `perceptron` study-notes site:

1. Remove all source attribution from the HTML files (courses, institutions, professors, Notion source links, course/track wording).
2. Create a `.gitignore`.
3. Create a `README.md`.

## Task A — Remove source attribution

Scope: all attribution references in the three HTML files. **Attribution only** — technical domain content that happens to mention a company name stays (e.g., the `"stock price of Oracle"` example, the OCI MCP-server example). Those are content, not crediting of the notes' origin.

### index.html
- Note card 1 tag `NPTEL · Study Notes` → `Study Notes`
- Note card 2 tag `Oracle · Field Notes` → `Field Notes`

### agentic-ai-foundations.html
- Sidebar tag `Study Notes / Reference` → `Reference Notes`
- Sidebar sub `Oracle Agentic AI Foundations Associate` → remove the line
- Hero eyebrow `// Field notes for the Oracle Agentic AI Foundations Associate track` → `// Field notes on agentic AI`
- `Ahead in this track` eyebrow → `What's next`
- `Ahead` nav group label stays; the "Coming up in the course" section:
  - Stub card `Agentic AI for Oracle AI Database` → replace with a generic placeholder card
  - Remove the Notion source-reference footer line entirely
- Footer: `Compiled from personal study notes for the Oracle… track. Source reference: [Notion link]` → remove

### introduction-to-llm.html
- `<title>Introduction to LLM (NPTEL) — Complete Notes` → `Introduction to LLM — Complete Notes`
- Sidebar tag `// NPTEL · Study Notes` → `// Study Notes`
- Sidebar sub `NPTEL Course Notes & Exam Study Guide` → `Course Notes & Exam Study Guide`
- Hero paragraph: remove `the NPTEL LLM course by Prof. Tanmoy Chakraborty (IIT Delhi) & Prof. Soumen Chakrabarti (IIT Bombay)` → generic copy ("Comprehensive lecture notes, interactive diagrams, formula breakdowns, and self-assessment quizzes on large language models.")
- Hero tag pill `NPTEL` → remove
- Footer Notion/NPTEL/professor lines → a generic single line (e.g., "Compiled from personal study notes.")

### Constraints
- Do not alter layout, structure, or styling — text-only edits.
- No comments added.

## Task B — `.gitignore`

Minimal, static-site appropriate:
- OS junk: `.DS_Store`, `Thumbs.db`, `desktop.ini`
- Editor dirs: `.vscode/`, `.idea/`
- `node_modules/` (defensive; not currently used)
- `.superpowers/`

Tracked files remain: the three HTML files and `docs/`.

## Task C — `README.md`

Concise project readme, no source attribution:
- Title: perceptron
- One-line description
- File list with one-line roles (`index.html` landing, two note pages)
- How to open (open `index.html` in a browser; `file://` works)
- Structure/theme note
- No build step / no dependencies

## Acceptance Criteria
- Grep for `Oracle|NPTEL|Chakraborty|IIT|Prof\.|notion|Notion` returns no attribution hits in HTML content (excluding the intentional content examples `stock price of Oracle` / OCI).
- `.gitignore` exists and ignores the listed patterns; `docs/` and all three HTML files remain trackable.
- `README.md` exists at project root, no source attribution.
- No layout/styling regressions (text-only edits).