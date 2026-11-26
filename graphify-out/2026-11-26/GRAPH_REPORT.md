# Graph Report - venunotes website  (2026-11-26)

## Corpus Check
- 11 files · ~105,509 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 106 nodes · 111 edges · 11 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f474622c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Note Page Changes (all8 files)
- Global Constraints
- Source-Attribution Removal, .gitignore, README — Design Spec
- Five Subject Note Pages — Design Spec
- build-aptitude.mjs
- Global Constraints
- Perceptron Landing Page — Design Spec
- app.js
- Global Constraints
- aptitude.js
- perceptron

## God Nodes (most connected - your core abstractions)
1. `Five Subject Note Pages — Design Spec` - 9 edges
2. `Global Constraints` - 8 edges
3. `Perceptron Landing Page — Design Spec` - 8 edges
4. `$all()` - 7 edges
5. `Note Page Changes (all8 files)` - 7 edges
6. `Global Constraints` - 6 edges
7. `Source-Attribution Removal, .gitignore, README — Design Spec` - 6 edges
8. `esc()` - 5 edges
9. `perceptron` - 5 edges
10. `Global Constraints` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (11 total, 0 thin omitted)

### Community 0 - "Note Page Changes (all8 files)"
Cohesion: 0.12
Nodes (15): Callout Boxes, Code Blocks, CTA Band, Feature Grid, Files to Modify, Footer, Goals, Hero Section (+7 more)

### Community 1 - "Global Constraints"
Cohesion: 0.18
Nodes (10): Five Subject Note Pages Implementation Plan, Global Constraints, Self-Review, Task 1: `fastapi.html`, Task 2: `aws.html`, Task 3: `devops.html`, Task 4: `java.html`, Task 5: `langchain.html` (+2 more)

### Community 2 - "Source-Attribution Removal, .gitignore, README — Design Spec"
Cohesion: 0.18
Nodes (10): Acceptance Criteria, agentic-ai-foundations.html, Constraints, index.html, introduction-to-llm.html, Purpose, Source-Attribution Removal, .gitignore, README — Design Spec, Task A — Remove source attribution (+2 more)

### Community 3 - "Five Subject Note Pages — Design Spec"
Cohesion: 0.20
Nodes (9): Acceptance criteria, Content conversion rules, Deliverables, Five Subject Note Pages — Design Spec, Landing page update (`index.html`), Purpose, README update, Source content (+1 more)

### Community 4 - "build-aptitude.mjs"
Cohesion: 0.36
Nodes (9): dashboardPage(), __dirname, esc(), notePage(), notes, outDir, pager(), root (+1 more)

### Community 5 - "Global Constraints"
Cohesion: 0.22
Nodes (8): Global Constraints, Self-Review, Source Removal, .gitignore, README Implementation Plan, Task 1: Remove source attribution from `index.html`, Task 2: Remove source attribution from `agentic-ai-foundations.html`, Task 3: Remove source attribution from `introduction-to-llm.html`, Task 4: Create `.gitignore`, Task 5: Create `README.md`

### Community 6 - "Perceptron Landing Page — Design Spec"
Cohesion: 0.22
Nodes (8): Acceptance Criteria, Branding, Error Handling / Fallbacks, Interactivity / JS, Layout Sections, Perceptron Landing Page — Design Spec, Purpose, Visual System

### Community 7 - "app.js"
Cohesion: 0.39
Nodes (7): $all(), initCodeBlocks(), initLandingFilters(), initMobileNav(), initScrollSpy(), initSearchModal(), initTOC()

### Community 8 - "Global Constraints"
Cohesion: 0.25
Nodes (7): Global Constraints, Perceptron Landing Page Implementation Plan, Self-Review, Task 1: Scaffold `index.html` — head, nav, theme styles, Task 2: Hero section markup and content, Task 3: Neural-node canvas animation, Task 4: Feature strip, notes cards, CTA band, footer

### Community 9 - "aptitude.js"
Cohesion: 0.43
Nodes (4): $all(), initPrint(), initTOC(), slugify()

### Community 10 - "perceptron"
Cohesion: 0.33
Nodes (5): Files, Notes, perceptron, Regenerating the aptitude pages, Usage

## Knowledge Gaps
- **62 isolated node(s):** `__dirname`, `root`, `outDir`, `notes`, `Files` (+57 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `__dirname`, `root`, `outDir` to the rest of the system?**
  _62 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Note Page Changes (all8 files)` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._