# Perceptron Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a single-file `index.html` hero landing page that links to the two existing study-notes pages (`agentic-ai-foundations.html`, `introduction-to-llm.html`).

**Architecture:** One self-contained HTML file with inline `<style>` and `<script>`. Visual system reuses the exact dark theme of the existing pages. Hero background is a vanilla-JS `<canvas>` neural-node network that falls back to a static gradient. No build step, no external dependencies.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript (Canvas 2D + `requestAnimationFrame`).

## Global Constraints

- Single file at project root: `index.html`.
- Palette: `--bg:#0a0d13`, `--panel:#11151d`, `--panel-2:#161c27`, `--border:#232a38`, `--text:#e8eaf0`, `--muted:#8b93a7`, `--muted-2:#5c6478`, amber `#f5a623`, teal `#4fd1c5`, coral `#ff6b6b`, periwinkle `#7c9cff`, green `#7ee787`.
- Fonts (via Google Fonts CDN): Space Grotesk 500/600/700, Inter 400/500/600/700, JetBrains Mono 400/500/600.
- Relative links only: `agentic-ai-foundations.html` and `introduction-to-llm.html`.
- No comments in source code.
- Brand name: **perceptron** (all lowercase wordmark).
- Must work when opened directly from the folder (`file://`).

---

### Task 1: Scaffold `index.html` — head, nav, theme styles

**Files:**
- Create: `index.html`

**Interfaces:**
- Consumes: nothing.
- Produces: Document with `#hero`, `#features`, `#notes`, `#cta`, `#footer` sections and `#neuralCanvas` canvas element (canvas added in Task 3, but the hero section and its structure are created here).

- [ ] **Step 1: Create the file with DOCTYPE, head, fonts, and theme CSS**

Create `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>perceptron — AI study notes</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#0a0d13; --panel:#11151d; --panel-2:#161c27; --border:#232a38;
  --text:#e8eaf0; --muted:#8b93a7; --muted-2:#5c6478;
  --amber:#f5a623; --teal:#4fd1c5; --coral:#ff6b6b; --periwinkle:#7c9cff; --green:#7ee787;
  --mono:'JetBrains Mono', monospace;
  --display:'Space Grotesk', sans-serif;
  --body:'Inter', sans-serif;
}
*{box-sizing:border-box; margin:0; padding:0;}
html{scroll-behavior:smooth;}
body{
  background:var(--bg); color:var(--text);
  font-family:var(--body); line-height:1.65; font-size:15.5px;
}
::selection{background:rgba(245,166,35,0.3);}
body::before{
  content:""; position:fixed; inset:0; pointer-events:none; z-index:0;
  background-image:
    linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size:36px 36px;
}
a{color:var(--periwinkle); text-decoration:none;}
a:hover{text-decoration:underline;}
nav{position:fixed; top:0; left:0; right:0; z-index:50; display:flex; align-items:center; justify-content:space-between;
  padding:16px 40px; background:rgba(10,13,19,0.82); backdrop-filter:blur(10px); border-bottom:1px solid var(--border);}
.brand{font-family:var(--display); font-weight:700; font-size:18px; color:var(--text);}
.brand span{color:var(--amber);}
nav .nav-links{display:flex; gap:22px; font-family:var(--mono); font-size:12px; letter-spacing:.05em; text-transform:uppercase;}
nav .nav-links a{color:var(--muted);}
nav .nav-links a:hover{color:var(--text); text-decoration:none;}
section.block{position:relative; z-index:1; max-width:1080px; margin:0 auto; padding:80px 40px;}
</style>
```

- [ ] **Step 2: Verify the scaffold**

Open `index.html` in a browser. Expected: blank dark page with a sticky top nav bar showing the wordmark `perceptron` and empty nav links area. No console errors.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: scaffold perceptron landing page shell"
```

---

### Task 2: Hero section markup and content

**Files:**
- Modify: `index.html` (add hero section between `</style>`/`</head>` and `</body>`; replace the empty nav-links div content)

**Interfaces:**
- Consumes: theme CSS from Task 1 (class names `.brand`, `.nav-links`, `section.block`).
- Produces: `#hero` section containing a `<canvas id="neuralCanvas">` (consumed by Task 3 JS), two CTA links `#notes` anchors to the two note files, eyebrow, headline, tagline, and a stats row of topic pills.

- [ ] **Step 1: Fill nav links and add hero markup**

Replace the empty `<div class="nav-links">...</div>` with:

```html
<div class="nav-links">
  <a href="#notes">Notes</a>
  <a href="#features">Topics</a>
</div>
```

Add hero section before the closing `</body>`:

```html
<header class="hero" id="hero">
  <canvas id="neuralCanvas" aria-hidden="true"></canvas>
  <div class="hero-inner">
    <span class="eyebrow">// perceptron — AI study notes</span>
    <h1>From <span>tokens</span> to <span>agents</span>,<br>one connected library of notes.</h1>
    <p class="lead">Hand-written reference notes on large language models and agentic AI — covering embeddings, attention, tokenization, agent loops, protocols, and guardrails.</p>
    <div class="cta-row">
      <a class="btn primary" href="introduction-to-llm.html">Start with LLM foundations</a>
      <a class="btn ghost" href="agentic-ai-foundations.html">Dive into AI agents</a>
    </div>
    <div class="pillrow">
      <span class="pill">Self-Attention</span>
      <span class="pill">Tokenization</span>
      <span class="pill">AI Agents</span>
      <span class="pill">LangChain</span>
      <span class="pill">MCP</span>
      <span class="pill">Guardrails</span>
    </div>
  </div>
</header>
```

- [ ] **Step 2: Add hero CSS**

Append to the `<style>` block:

```css
.hero{position:relative; min-height:100vh; display:flex; align-items:center; overflow:hidden; z-index:1;}
#neuralCanvas{position:absolute; inset:0; width:100%; height:100%; z-index:0;}
.hero-inner{position:relative; z-index:2; max-width:900px; padding:120px 40px 80px;}
.hero .eyebrow{
  font-family:var(--mono); font-size:12px; letter-spacing:.14em; text-transform:uppercase;
  color:var(--amber); display:block; margin-bottom:20px;
}
.hero h1{font-family:var(--display); font-size:56px; line-height:1.08; font-weight:700; letter-spacing:-.01em; margin-bottom:22px;}
.hero h1 span{color:var(--amber);}
.hero p.lead{font-size:17px; color:var(--muted); max-width:560px; margin-bottom:36px;}
.cta-row{display:flex; flex-wrap:wrap; gap:14px; margin-bottom:40px;}
.btn{
  font-family:var(--mono); font-size:13px; letter-spacing:.04em; padding:13px 22px; border-radius:10px;
  border:1px solid var(--border); cursor:pointer; display:inline-block;
}
.btn.primary{background:var(--amber); color:#0a0d13; font-weight:600; border-color:transparent;}
.btn.primary:hover{background:#ffb53d; text-decoration:none;}
.btn.ghost{background:var(--panel); color:var(--text);}
.btn.ghost:hover{border-color:var(--periwinkle); color:var(--periwinkle); text-decoration:none;}
.pillrow{display:flex; flex-wrap:wrap; gap:10px;}
.pill{
  font-family:var(--mono); font-size:11.5px; padding:6px 12px; border:1px solid var(--border);
  border-radius:100px; color:var(--muted); background:var(--panel);
}
```

- [ ] **Step 3: Verify hero renders**

Open `index.html` in a browser. Expected: hero fills the viewport, eyebrow, headline ("From tokens to agents…"), lead text, two CTA buttons, and pill row render with the dark theme. Canvas is present but blank (animation added in Task 3). Both CTA buttons navigate to the respective note files when clicked.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add hero section with CTAs and topic pills"
```

---

### Task 3: Neural-node canvas animation

**Files:**
- Modify: `index.html` (add `<script>` block before `</body>`)

**Interfaces:**
- Consumes: `#neuralCanvas` element and CSS sizing from Task 2.
- Produces: nothing consumed by later tasks; self-contained animation.

- [ ] **Step 1: Add the animation script**

Add before the closing `</body>`:

```html
<script>
(function(){
  var canvas = document.getElementById('neuralCanvas');
  if(!canvas || !canvas.getContext || window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelector('.hero').style.background = 'radial-gradient(ellipse at 70% 40%, #1b2333 0%, #0a0d13 60%)';
    return;
  }
  var ctx = canvas.getContext('2d');
  var W, H, nodes = [], mouse = {x:-9999, y:-9999};
  var COUNT = 55, DIST = 130, MOUSE_DIST = 170;

  function resize(){
    var rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
  }
  function seed(){
    nodes = [];
    for(var i = 0; i < COUNT; i++){
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 1.5 + Math.random() * 1.5,
        hue: Math.random()
      });
    }
  }
  function step(){
    ctx.clearRect(0, 0, W, H);
    for(var i = 0; i < nodes.length; i++){
      var n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if(n.x < 0 || n.x > W) n.vx *= -1;
      if(n.y < 0 || n.y > H) n.vy *= -1;
    }
    for(var a = 0; a < nodes.length; a++){
      for(var b = a + 1; b < nodes.length; b++){
        var p = nodes[a], q = nodes[b];
        var dx = p.x - q.x, dy = p.y - q.y;
        var d = Math.sqrt(dx*dx + dy*dy);
        if(d < DIST){
          var alpha = (1 - d / DIST) * 0.5;
          ctx.strokeStyle = 'rgba(124,156,255,' + alpha + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      var mdx = p.x - mouse.x, mdy = p.y - mouse.y;
      var md = Math.sqrt(mdx*mdx + mdy*mdy);
      if(md < MOUSE_DIST){
        ctx.strokeStyle = 'rgba(245,166,35,' + (1 - md / MOUSE_DIST) + ')';
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    for(var c = 0; c < nodes.length; c++){
      var s = nodes[c];
      ctx.fillStyle = s.hue < 0.5 ? 'rgba(79,209,197,0.8)' : 'rgba(245,166,35,0.8)';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(step);
  }
  window.addEventListener('resize', function(){ resize(); seed(); });
  document.addEventListener('mousemove', function(e){
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  resize(); seed(); step();
})();
</script>
```

- [ ] **Step 2: Verify the animation**

Open `index.html` in a browser. Expected: hero shows a network of drifting teal/amber nodes with periwinkle connection lines; lines reach toward the cursor. Check with browser DevTools that `#neuralCanvas` is sized to the hero and no console errors. Also enable OS "reduce motion" — expected: hero shows a static radial gradient and no animation.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add neural-node canvas hero animation"
```

---

### Task 4: Feature strip, notes cards, CTA band, footer

**Files:**
- Modify: `index.html` (add sections before `</body>`; append CSS to `<style>`)

**Interfaces:**
- Consumes: theme CSS, `section.block`, `.pill`, `.pillrow`, `.btn` from Tasks 1–2.
- Produces: sections with ids `#features`, `#notes`, `#cta`, `#footer` targeted by nav links.

- [ ] **Step 1: Append CSS for the new sections**

Append to the `<style>` block:

```css
.feature-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:16px;}
.feature-card{background:var(--panel); border:1px solid var(--border); border-radius:12px; padding:20px;}
.feature-card h3{font-family:var(--display); font-size:16px; font-weight:600; margin-bottom:10px;}
.feature-card .fnum{font-family:var(--mono); font-size:10px; color:var(--teal); display:block; margin-bottom:8px; letter-spacing:.1em;}
.feature-card p{color:var(--muted); font-size:13.5px;}
.block-head{margin-bottom:36px;}
.block-head .eyebrow{font-family:var(--mono); font-size:11.5px; letter-spacing:.12em; text-transform:uppercase; display:block; margin-bottom:10px;}
.block-head .eyebrow.amber{color:var(--amber);}
.block-head .eyebrow.teal{color:var(--teal);}
.block-head h2{font-family:var(--display); font-size:32px; font-weight:700; margin-bottom:10px;}
.block-head p{color:var(--muted); max-width:680px;}
.notes-grid{display:grid; grid-template-columns:1fr 1fr; gap:20px;}
.note-card{
  background:var(--panel); border:1px solid var(--border); border-radius:14px; padding:28px;
  display:flex; flex-direction:column; gap:16px; transition:border-color .15s, transform .15s;
}
.note-card:hover{border-color:var(--amber); transform:translateY(-3px);}
.note-card .tag{font-family:var(--mono); font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; display:block;}
.note-card .tag.amber{color:var(--amber);}
.note-card .tag.teal{color:var(--teal);}
.note-card h3{font-family:var(--display); font-size:22px; font-weight:700;}
.note-card p{color:var(--muted); font-size:14px;}
.note-card .open{margin-top:auto; font-family:var(--mono); font-size:13px; color:var(--periwinkle); display:inline-flex; align-items:center; gap:6px;}
.note-card:hover .open{color:var(--amber);}
.cta-band{text-align:center; padding:100px 40px;}
.cta-band h2{font-family:var(--display); font-size:34px; font-weight:700; margin-bottom:14px;}
.cta-band p{color:var(--muted); max-width:520px; margin:0 auto 32px;}
.footer{max-width:1080px; margin:0 auto; padding:30px 40px 60px; border-top:1px solid var(--border); color:var(--muted-2); font-size:12.5px; font-family:var(--mono); display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px;}
@media(max-width:900px){
  nav{padding:14px 20px;}
  nav .nav-links{display:none;}
  .hero h1{font-size:36px;}
  .hero-inner{padding:110px 22px 60px;}
  section.block{padding:60px 22px;}
  .feature-grid{grid-template-columns:1fr 1fr;}
  .notes-grid{grid-template-columns:1fr;}
  .cta-band{padding:70px 22px;}
  .footer{padding:24px 22px 50px;}
}
@media(max-width:520px){ .feature-grid{grid-template-columns:1fr;} }
```

- [ ] **Step 2: Add feature strip markup**

Insert after the closing `</header>`:

```html
<section class="block" id="features">
  <div class="block-head">
    <span class="eyebrow teal">// what's inside</span>
    <h2>Two courses, one mental model.</h2>
    <p>Notes that connect the dots — from the token up to the agent that acts.</p>
  </div>
  <div class="feature-grid">
    <div class="feature-card"><span class="fnum">01</span><h3>Embeddings</h3><p>Words as vectors — Word2Vec, GloVe, and the geometry of meaning.</p></div>
    <div class="feature-card"><span class="fnum">02</span><h3>Attention</h3><p>Transformers, self-attention, and why the whole field pivoted to them.</p></div>
    <div class="feature-card"><span class="fnum">03</span><h3>Agents</h3><p>The agentic loop, LangChain, MCP, and building systems that act.</p></div>
    <div class="feature-card"><span class="fnum">04</span><h3>Guardrails</h3><p>Prompt injection, threat models, and defense in depth.</p></div>
  </div>
</section>
```

- [ ] **Step 3: Add notes cards markup**

Insert after the features section:

```html
<section class="block" id="notes">
  <div class="block-head">
    <span class="eyebrow amber">// the notes</span>
    <h2>Pick where to start.</h2>
    <p>Two full reference pages — open either one directly.</p>
  </div>
  <div class="notes-grid">
    <a class="note-card" href="introduction-to-llm.html">
      <span class="tag teal">NPTEL · Study Notes</span>
      <h3>Introduction to LLM</h3>
      <p>From statistical language models to transformers — tokenization, embeddings, attention, and RAG, lecture by lecture.</p>
      <div class="pillrow">
        <span class="pill">Statistical LMs</span>
        <span class="pill">Word2Vec · GloVe</span>
        <span class="pill">Attention</span>
        <span class="pill">RLHF</span>
      </div>
      <span class="open">Open notes →</span>
    </a>
    <a class="note-card" href="agentic-ai-foundations.html">
      <span class="tag amber">Oracle · Field Notes</span>
      <h3>Agentic AI Foundations</h3>
      <p>How agents perceive, reason, and act — the agentic loop, frameworks, Model Context Protocol, and safety guardrails.</p>
      <div class="pillrow">
        <span class="pill">Agentic Loop</span>
        <span class="pill">LangChain</span>
        <span class="pill">MCP</span>
        <span class="pill">Guardrails</span>
      </div>
      <span class="open">Open notes →</span>
    </a>
  </div>
</section>
```

- [ ] **Step 4: Add CTA band and footer markup**

Insert after the notes section:

```html
<section class="cta-band" id="cta">
  <h2>Start with the <span style="color:var(--amber);">LLM foundations</span><br>or dive straight into <span style="color:var(--teal);">agents</span>.</h2>
  <p>Both pages are self-contained and open instantly in your browser.</p>
  <div class="cta-row" style="justify-content:center;">
    <a class="btn primary" href="introduction-to-llm.html">Introduction to LLM</a>
    <a class="btn ghost" href="agentic-ai-foundations.html">Agentic AI Foundations</a>
  </div>
</section>
<footer class="footer" id="footer">
  <span>perceptron — study notes</span>
  <span>LLM · Agents · Guardrails</span>
</footer>
```

- [ ] **Step 5: Verify the full page**

Open `index.html` in a browser. Expected: nav sticky at top; hero with animated canvas; features grid (4 cards); notes grid (2 cards that navigate to the correct files on click); centered CTA band; footer. Resize the window below 900px: nav links hide, hero heading shrinks, grids collapse to single column. Click both note cards and both CTA buttons — each opens the correct note page. No console errors.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: add features, notes cards, CTA band, and footer"
```

---

## Self-Review

**Spec coverage:**
- Single `index.html` at root → Task 1.
- Both note pages reachable via prominent links → Tasks 2 (hero CTAs) and 4 (cards + CTA band).
- Matches existing dark theme → Task 1 CSS uses the exact palette/fonts; grid texture and amber selection included.
- Fancy hero with animated neural-node canvas + fallback → Task 3 (canvas + reduced-motion/static-gradient fallback).
- Responsive → Task 4 media queries.
- No build step, offline-friendly, relative links → Global Constraints; verified in Task 4 Step 5.
- No comments in code → all code blocks above are comment-free.

**Placeholder scan:** No TBD/TODO; every step has concrete content. Code blocks are complete and self-contained.

**Type consistency:** Class names and IDs are consistent across tasks: `.hero`, `#neuralCanvas`, `#features`, `#notes`, `#cta`, `#footer`, `.pill`, `.pillrow`, `.btn`, `.block-head`, `.notes-grid`, `.note-card`, `.feature-grid`. JS consumes only `#neuralCanvas` and `.hero` — both created in Task 2. No cross-task signature mismatches.