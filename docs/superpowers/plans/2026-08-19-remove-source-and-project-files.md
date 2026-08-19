# Source Removal, .gitignore, README Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all source attribution from the three HTML files, and add a `.gitignore` and `README.md`.

**Architecture:** Text-only edits to `index.html`, `agentic-ai-foundations.html`, `introduction-to-llm.html` (no layout/styling changes), plus two new files at project root. Verification is offline and grep-based — no browser, no network.

**Tech Stack:** None (static HTML/markdown).

## Global Constraints

- Attribution removal only — technical domain content that mentions a company name stays (e.g., the `"stock price of Oracle"` example; the OCI MCP-server example).
- No layout, structure, or styling changes — text-only edits.
- No comments added to source.
- No network / no browser during verification (limited user data).
- The two note files are untracked; do not add them to git in this plan (no git add for them unless the user later asks).

---

### Task 1: Remove source attribution from `index.html`

**Files:**
- Modify: `index.html:231`, `index.html:243`

**Interfaces:**
- Consumes: nothing.
- Produces: cleaned note-card tags on the landing page.

- [ ] **Step 1: Edit card 1 tag**

Replace `NPTEL · Study Notes` with `Study Notes` on the `introduction-to-llm` note card.

- [ ] **Step 2: Edit card 2 tag**

Replace `Oracle · Field Notes` with `Field Notes` on the `agentic-ai-foundations` note card.

- [ ] **Step 3: Verify**

Run: `Select-String -Path index.html -Pattern 'NPTEL|Oracle'`
Expected: no matches in `index.html`.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "chore: remove source attribution from landing page"
```

---

### Task 2: Remove source attribution from `agentic-ai-foundations.html`

**Files:**
- Modify: `agentic-ai-foundations.html`

**Interfaces:**
- Consumes: nothing.
- Produces: attribution-free notes page.

- [ ] **Step 1: Edit sidebar tag and sub**

Replace `<span class="tag">Study Notes / Reference</span>` with `<span class="tag">Reference Notes</span>`.
Replace `<div class="sub">Oracle Agentic AI Foundations Associate</div>` with `<div class="sub">Agentic AI — working reference</div>`.

- [ ] **Step 2: Edit hero eyebrow**

Replace `// Field notes for the Oracle Agentic AI Foundations Associate track` with `// Field notes on agentic AI`.

- [ ] **Step 3: Edit "Ahead" section eyebrow**

Replace `<span class="eyebrow">Ahead in this track</span>` with `<span class="eyebrow">What's next</span>`.

- [ ] **Step 4: Replace the Oracle AI Database stub card**

Replace `<div class="stub-card"><strong>Agentic AI for Oracle AI Database</strong><br>Not yet covered in these notes.</div>` with `<div class="stub-card"><strong>More on agentic systems</strong><br>Not yet covered in these notes.</div>`

- [ ] **Step 5: Remove the source-reference footer line**

Delete the line `Compiled from personal study notes for the <strong>Oracle Agentic AI Foundations Associate</strong> track. Source reference: <a href="https://app.notion.com/p/...">Model Context Protocol (MCP) — Master Comprehensive Notes</a>.` (the final `<p>` in the footer).

- [ ] **Step 6: Verify**

Run: `Select-String -Path agentic-ai-foundations.html -Pattern 'NPTEL|Chakraborty|IIT|Prof\.|notion|Notion'`
Expected: no matches.
Then run `Select-String -Path agentic-ai-foundations.html -Pattern 'Oracle'` and confirm the **only** remaining hits are the domain-content examples (the `"stock price of Oracle"` line and the OCI MCP-server section) — NOT the course/track attribution.

- [ ] **Step 7: Commit**

```bash
git add agentic-ai-foundations.html
git commit -m "chore: remove source attribution from agentic AI notes"
```

---

### Task 3: Remove source attribution from `introduction-to-llm.html`

**Files:**
- Modify: `introduction-to-llm.html`

**Interfaces:**
- Consumes: nothing.
- Produces: attribution-free notes page.

- [ ] **Step 1: Edit title**

Replace `<title>Introduction to LLM (NPTEL) — Complete Notes</title>` with `<title>Introduction to LLM — Complete Notes</title>`.

- [ ] **Step 2: Edit sidebar tag and sub**

Replace `<span class="tag">// NPTEL · Study Notes</span>` with `<span class="tag">// Study Notes</span>`.
Replace `<div class="sub">NPTEL Course Notes &amp; Exam Study Guide</div>` with `<div class="sub">Course Notes &amp; Exam Study Guide</div>`.

- [ ] **Step 3: Rewrite hero paragraph**

Replace:
`Comprehensive lecture notes, interactive diagrams, formula breakdowns, and self-assessment quizzes for the NPTEL LLM course by Prof. Tanmoy Chakraborty (IIT Delhi) &amp; Prof. Soumen Chakrabarti (IIT Bombay).`
with:
`Comprehensive lecture notes, interactive diagrams, formula breakdowns, and self-assessment quizzes on large language models.`

- [ ] **Step 4: Remove the `NPTEL` tag pill**

Delete `<span class="tag">NPTEL</span>` from the hero `.tags` row.

- [ ] **Step 5: Rewrite the two footer lines**

Replace:
`<p><em>Note: The source Notion page also lists Lec 15–17, 20, 22–25 as gaps (no sub-pages exist for these in the workspace) — only the lectures above were present as child pages under "Introduction to LLM (NPTEL)."</em></p>`
with:
`<p><em>Note: a few lectures are not yet covered in these notes — only the lectures above have complete write-ups.</em></p>`

Replace:
`<p>Compiled from Notion — NPTEL Course: "Introduction to Large Language Models" by Prof. Tanmoy Chakraborty (IIT Delhi) &amp; Prof. Soumen Chakrabarti (IIT Bombay).</p>`
with:
`<p>Compiled from personal study notes.</p>`

- [ ] **Step 6: Verify**

Run: `Select-String -Path introduction-to-llm.html -Pattern 'NPTEL|Chakraborty|IIT|Prof\.|notion|Notion'`
Expected: no matches.

- [ ] **Step 7: Commit**

```bash
git add introduction-to-llm.html
git commit -m "chore: remove source attribution from LLM notes"
```

---

### Task 4: Create `.gitignore`

**Files:**
- Create: `.gitignore`

**Interfaces:**
- Consumes: nothing.
- Produces: ignore rules for the repo.

- [ ] **Step 1: Create the file**

Write `.gitignore` at project root:

```
# OS
.DS_Store
Thumbs.db
desktop.ini

# Editors
.vscode/
.idea/

# Dependencies
node_modules/

# Local superpowers scratch
.superpowers/
```

- [ ] **Step 2: Verify**

Run: `git check-ignore .superpowers/sdd/2026-08-19-perceptron-landing-page` — expected: the path is reported as ignored.
Run: `git status --short` — expected: the three HTML files and `docs/` still trackable; `.superpowers/` no longer shows.
Confirm `.gitignore` itself is not ignored: `git check-ignore .gitignore` — expected: no output (not ignored).

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: add .gitignore"
```

---

### Task 5: Create `README.md`

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: nothing.
- Produces: project readme.

- [ ] **Step 1: Create the file**

Write `README.md` at project root:

```markdown
# perceptron

Study notes on AI — large language models and agentic systems — presented as a
single self-contained landing page linking to two reference pages.

## Files

- `index.html` — landing page (hero, feature strip, links to the two note pages)
- `introduction-to-llm.html` — notes on large language models
- `agentic-ai-foundations.html` — notes on agentic AI, frameworks, and guardrails

## Usage

Open `index.html` in any browser. No build step and no server required —
the pages work directly from the file system.

## Notes

- Dark, developer-focused theme (Space Grotesk / Inter / JetBrains Mono).
- The landing page's hero uses a lightweight canvas animation that falls back
  to a static gradient when motion is reduced or canvas is unavailable.
- The only external dependency is the Google Fonts stylesheet.
```

- [ ] **Step 2: Verify**

Read the file back and confirm it contains no `Oracle`, `NPTEL`, professor, or `Notion` references.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add README"
```

---

## Self-Review

**Spec coverage:**
- index.html tags → Task 1.
- agentic-ai-foundations.html all attribution (sidebar tag/sub, hero eyebrow, "Ahead" eyebrow, Oracle AI Database stub, source footer) → Task 2.
- introduction-to-llm.html all attribution (title, sidebar tag/sub, hero paragraph, NPTEL pill, two footer lines) → Task 3.
- `.gitignore` → Task 4.
- `README.md` → Task 5.
- Constraints: text-only, no comments, content examples preserved, no browser/network → each task's steps; Task 2 Step 6 explicitly confirms only the two domain-content Oracle mentions remain.

**Placeholder scan:** No TBD/TODO; every edit states exact old→new text.

**Type consistency:** N/A (no shared code signatures); file paths and commit messages are consistent across tasks.