# Five Subject Note Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert five pasted subject markdown folders into themed HTML note pages matching `agentic-ai-foundations.html`, and add them to the landing page and README.

**Architecture:** One HTML page per subject (`aws.html`, `devops.html`, `fastapi.html`, `java.html`, `langchain.html`), each reproducing the template's sidebar/hero/section/code/mermaid structure with faithful, attribution-free, encoding-cleaned content. Then extend `index.html`'s note grid and `README.md`.

**Tech Stack:** Static HTML/CSS/JS; Google Fonts + highlight.js + mermaid via CDN (same as template). No build step.

## Global Constraints

- Template to match exactly: `agentic-ai-foundations.html` (palette, fonts, grid texture, sidebar + `navgroup`/`navlink`, `☰` toggle, hero, `section.block`/`block-head`, `.card`, `.quote`, `.table-wrap`, `pre > code` + highlight.js, `.mermaid`, `.footer`, scripts).
- Same CDN includes as template: Google Fonts (Space Grotesk/Inter/JetBrains Mono), highlight.js + python/json/bash/java languages, mermaid 10.9.0.
- **Faithful conversion**: every markdown section converted; no content dropped.
- **Attribution-free**: strip source credits / course / instructor / Notion links. Keep technical facts that name a company/product (e.g., "Sun Microsystems (now Oracle)", "Oracle JDK", "OpenAI API").
- **Encoding cleanup**: fix Notion-export mojibake (`�?"`→`—`, `�?Tt`→`'t`, `�+'`→`→`, `�?T`→`'`); output must be clean UTF-8.
- No comments in source code.
- Section `id`s must match sidebar anchor `href`s; `html{scroll-behavior:smooth}`.
- Verification offline only: no browser, no network (limited user data). Use `Select-String`/grep + structural checks.
- The five source folders (`aws/`, `devops/`, `fastapi/`, `java/`, `langchain/`) are untracked scratch — do NOT `git add` them.

---

### Task 1: `fastapi.html`

**Files:**
- Create: `fastapi.html` (project root)
- Source (read-only): `fastapi/ExportBlock-c3b9f6fe-6d95-47b5-8351-3b966a933bf6-Part-1/*.md`

**Interfaces:**
- Consumes: template structure from `agentic-ai-foundations.html`.
- Produces: complete `fastapi.html` — establishes the conversion pattern later tasks reuse.

- [ ] **Step 1: Read the template and sources**

Read `agentic-ai-foundations.html` in full (structure + CSS + scripts) and all six markdown files in the fastapi folder. List their `##`/`###` headings to plan sidebar navgroups.

- [ ] **Step 2: Build the page shell**

Create `fastapi.html` copying the template's `<head>` (fonts, highlight.js + python/json/bash, mermaid), full `<style>`, sidebar (brand `FastAPI` with a tag like `// Web API Notes`), hero (eyebrow `// FastAPI — web APIs in Python`, headline, lead, pillrow), `section.block`s, footer, and the closing scripts (menu toggle, `mermaid.initialize`, `hljs.highlightAll`). Change the `.brand h1` and section accents as appropriate (reuse template accent colors).

- [ ] **Step 3: Convert all markdown content**

Convert every markdown section into `section.block` content using `.card`, `.quote`, `.table-wrap`/`table`, and `pre > code class="language-python"` blocks. Use `.mermaid` diagrams for flow descriptions (e.g., request lifecycle). Fix mojibake. Strip "CampusX" and any video/URL credits. Sidebar navgroup per topic (Introduction, HTTP Methods, Path & Query, POST, PUT & DELETE, Pydantic).

- [ ] **Step 4: Verify offline**

- `Select-String -Path fastapi.html -Pattern 'CampusX|grok|notion|Notion|youtube|youtu\.be'` → no matches.
- `Select-String -Path fastapi.html -Pattern '\?\?|\?\?'` → no mojibake remains.
- Confirm every sidebar `href="#..."` has a matching `id="..."` in the page (grep both lists and diff).
- Confirm balanced tags/braces; file ends with `</html>`.

- [ ] **Step 5: Commit**

```bash
git add fastapi.html
git commit -m "feat: add fastapi notes page"
```

---

### Task 2: `aws.html`

**Files:**
- Create: `aws.html` (project root)
- Source (read-only): `aws/ExportBlock-6a85b045-48f9-416f-b142-afb830dd35d2-Part-1/*.md`

**Interfaces:**
- Consumes: template structure from `agentic-ai-foundations.html`; conversion pattern from Task 1.
- Produces: complete `aws.html`.

- [ ] **Step 1: Read the template and sources**

Read `agentic-ai-foundations.html` structure and all markdown files in the aws folder (Sessions 1–7; ignore the PDF). Several files are tiny (Session 1, 2, 6) — fold them into their session navgroups with whatever content they have.

- [ ] **Step 2: Build the page shell**

Create `aws.html` from the template shell: brand `AWS`, tag `// Cloud Notes`, hero eyebrow `// AWS — cloud foundations`, lead describing the sessions, pillrow of services covered.

- [ ] **Step 3: Convert all markdown content**

Convert every session's content into `section.block`s (one per session), each with a `.block-head` (eyebrow `0X · Session`). Use `.card`s, tables, `pre > code class="language-bash"` (and `language-json`/`language-python` as present). Add `.mermaid` for architecture flows described in the notes. Fix mojibake; strip course/`AWS training` framing credits; keep technical service names.

- [ ] **Step 4: Verify offline**

- Grep for source credits (`Select-String -Path aws.html -Pattern 'CampusX|grok|notion|Notion|youtube|youtu\.be|training'`) → no matches.
- Grep mojibake (`\?\?|\?\?`) → none.
- Every sidebar `href="#..."` resolves to a matching `id`.
- File ends with `</html>`; tags/braces balanced.

- [ ] **Step 5: Commit**

```bash
git add aws.html
git commit -m "feat: add aws notes page"
```

---

### Task 3: `devops.html`

**Files:**
- Create: `devops.html` (project root)
- Source (read-only): `devops/ExportBlock-debe3735-deed-45eb-970b-d6d421c92ffa-Part-1/*.md`

**Interfaces:**
- Consumes: template structure from `agentic-ai-foundations.html`; conversion pattern from Task 1.
- Produces: complete `devops.html`.

- [ ] **Step 1: Read the template and sources**

Read `agentic-ai-foundations.html` structure and all markdown files in the devops folder (SDLC & Agile, VCS, CI/CD, Docker, Ansible, Container orchestration, Class 2, DevOps, glm 4 6 notes, 25/26-09, 24-10). Note: some filenames are just dates — read each to determine its topic. Group into logical navgroups (e.g., Process, Version Control, CI/CD, Containers, Config Mgmt).

- [ ] **Step 2: Build the page shell**

Create `devops.html` from the template shell: brand `DevOps`, tag `// Engineering Notes`, hero eyebrow `// DevOps — practices & tooling`, lead, pillrow (SDLC, Git, CI/CD, Docker, Ansible, K8s).

- [ ] **Step 3: Convert all markdown content**

Convert every markdown section into `section.block`s. Use `.mermaid` for the SDLC/CI-CD flow diagrams (the sources describe these as flows), `.table-wrap` for comparisons (e.g., VCS types, Docker vs VMs), `pre > code` for configs/commands (`language-bash`, `language-yaml`, `language-dockerfile`). Fix mojibake; strip source credits; keep technical tool names.

- [ ] **Step 4: Verify offline**

- Grep source credits (`grok|notion|Notion|youtube|youtu\.be|CampusX`) → no matches.
- Grep mojibake (`\?\?|\?\?`) → none.
- Every sidebar `href="#..."` resolves to a matching `id`.
- File ends with `</html>`; tags/braces balanced.

- [ ] **Step 5: Commit**

```bash
git add devops.html
git commit -m "feat: add devops notes page"
```

---

### Task 4: `java.html`

**Files:**
- Create: `java.html` (project root)
- Source (read-only): `java/ExportBlock-50a591ca-8ed9-4888-8937-cd6bd9518e78-Part-1/Full java notes from grok 2d632b354bc080f58544e70e1f019be5.md`

**Interfaces:**
- Consumes: template structure from `agentic-ai-foundations.html`; conversion pattern from Task 1.
- Produces: complete `java.html` (largest page).

- [ ] **Step 1: Read the template and source**

Read `agentic-ai-foundations.html` structure and the full Java markdown (2,272 lines). Map every `###`/`##` heading to a sidebar navgroup (e.g., Basics, OOP, Collections, Concurrency, Streams, etc.). Load `language-java` highlight.js script in addition to the template's languages.

- [ ] **Step 2: Build the page shell**

Create `java.html` from the template shell: brand `Java`, tag `// Language Notes`, hero eyebrow `// Java — from basics to advanced`, lead, pillrow of major topics.

- [ ] **Step 3: Convert all markdown content**

Convert every section into `section.block`s. Preserve all code samples as `pre > code class="language-java"`. Use `.table-wrap` tables for comparisons (editions, features, data types, etc.), `.card`s for concept blocks. Fix mojibake. Strip the "from grok" credit; keep technical facts (e.g., "Sun Microsystems, now Oracle", "Oracle JDK"). Ensure the file stays one contiguous `main` with sidebar anchors to every section id.

- [ ] **Step 4: Verify offline**

- Grep source credits (`grok|notion|Notion|youtube|youtu\.be`) → no matches.
- Grep mojibake (`\?\?|\?\?`) → none.
- Every sidebar `href="#..."` resolves to a matching `id`.
- Every code fence from source appears in the page (spot-check 10+ code samples by distinctive first line).
- File ends with `</html>`; tags/braces balanced.

- [ ] **Step 5: Commit**

```bash
git add java.html
git commit -m "feat: add java notes page"
```

---

### Task 5: `langchain.html`

**Files:**
- Create: `langchain.html` (project root)
- Source (read-only): `langchain/ExportBlock-271920b7-e973-445f-b78e-5ba3d9af9a84-Part-1/Langchain 35f32b354bc080c0bf14dd01497ebe28.md`

**Interfaces:**
- Consumes: template structure from `agentic-ai-foundations.html`; conversion pattern from Task 1.
- Produces: complete `langchain.html`.

- [ ] **Step 1: Read the template and source**

Read `agentic-ai-foundations.html` structure and the full LangChain markdown (1,802 lines). Map headings to sidebar navgroups (e.g., Core concepts, Chains, Tools, Memory, RAG, Agents).

- [ ] **Step 2: Build the page shell**

Create `langchain.html` from the template shell: brand `LangChain`, tag `// Framework Notes`, hero eyebrow `// LangChain — LLM application framework`, lead, pillrow (Models, Chains, Agents, RAG, Memory, MCP).

- [ ] **Step 3: Convert all markdown content**

Convert every section into `section.block`s. Preserve all code samples as `pre > code class="language-python"`. Use `.mermaid` for chain/agent flow diagrams. Use `.table-wrap` for component comparisons. Fix mojibake; strip source credits; keep technical framework/component names.

- [ ] **Step 4: Verify offline**

- Grep source credits (`grok|notion|Notion|youtube|youtu\.be|CampusX`) → no matches.
- Grep mojibake (`\?\?|\?\?`) → none.
- Every sidebar `href="#..."` resolves to a matching `id`.
- Spot-check 10+ code samples by distinctive first line.
- File ends with `</html>`; tags/braces balanced.

- [ ] **Step 5: Commit**

```bash
git add langchain.html
git commit -m "feat: add langchain notes page"
```

---

### Task 6: Add the five cards to `index.html`

**Files:**
- Modify: `index.html` (`.notes-grid`)

**Interfaces:**
- Consumes: the five new HTML files from Tasks 1–5.
- Produces: landing page linking to all seven note pages.

- [ ] **Step 1: Read the current notes section**

Read `index.html`'s `#notes` section. It currently has two `<a class="note-card">` entries in a 2-column `.notes-grid`.

- [ ] **Step 2: Add five new cards**

Append five new `<a class="note-card">` entries (in addition to the two existing) linking to:
- `fastapi.html` — tag `Web APIs` — "FastAPI from the ground up — requests, parameters, Pydantic validation, and building APIs in Python." pills: `HTTP Methods`, `Path & Query`, `Pydantic`
- `aws.html` — tag `Cloud` — "AWS foundations across seven sessions — core services, compute, storage, and architecture." pills: `EC2`, `S3`, `IAM`, `VPC`
- `devops.html` — tag `DevOps` — "From SDLC and Agile to Git, CI/CD, Docker, Ansible, and container orchestration." pills: `SDLC & Agile`, `Git`, `CI/CD`, `Docker`
- `java.html` — tag `Language` — "The full Java journey — syntax, OOP, collections, concurrency, and modern features." pills: `OOP`, `Collections`, `Concurrency`, `Streams`
- `langchain.html` — tag `LLM Apps` — "Building LLM applications with LangChain — models, chains, agents, memory, and RAG." pills: `Chains`, `Agents`, `RAG`, `Memory`

Keep existing two cards unchanged. Ensure pills fit the grid (all cards uniform width). Verify each new href file exists on disk.

- [ ] **Step 3: Verify offline**

- `Select-String -Path index.html -Pattern 'fastapi.html|aws.html|devops.html|java.html|langchain.html'` → 5 distinct hrefs present.
- Confirm each target file exists (`Test-Path`).
- `Select-String -Path index.html -Pattern 'NPTEL|Oracle'` → no source attribution.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: link five subject notes from landing page"
```

---

### Task 7: Update `README.md`

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: the five new files.
- Produces: accurate file list.

- [ ] **Step 1: Read current README**

Read `README.md`.

- [ ] **Step 2: Update the file list**

Under `## Files`, add five bullets:
- `fastapi.html` — notes on building web APIs with FastAPI
- `aws.html` — notes on AWS cloud foundations
- `devops.html` — notes on DevOps practices and tooling
- `java.html` — notes on the Java language
- `langchain.html` — notes on building LLM applications with LangChain

Keep existing bullets. No source attribution.

- [ ] **Step 3: Verify**

Read the file back; confirm no `Oracle`/`NPTEL`/`grok`/`CampusX`/`Notion` attribution terms.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: list subject note pages in README"
```

---

## Self-Review

**Spec coverage:**
- Five HTML pages → Tasks 1–5 (fastapi, aws, devops, java, langchain).
- Template exactness → each task's shell step; Global Constraints carry the template contract.
- Faithful conversion / attribution-free / encoding cleanup → each task's conversion + verify steps.
- Landing page cards → Task 6.
- README update → Task 7.
- Offline verification → each task's verify step; no browser/network commands anywhere.

**Placeholder scan:** No TBD/TODO. Conversion steps are process-defined because the content is external source material; every rule is concrete (exact grep patterns, exact file names, exact card copy).

**Type consistency:** Consistent hrefs (`fastapi.html`/`aws.html`/`devops.html`/`java.html`/`langchain.html`) across Tasks 1–7; sidebar anchor↔section-id contract stated in Global Constraints and verified in every task.