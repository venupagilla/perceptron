// Build the static aptitude section from the handwritten-notes-next HTML fragments.
//
// Usage:
//   node scripts/build-aptitude.mjs
//   APTITUDE_SRC="D:/path/to/public/notes" node scripts/build-aptitude.mjs
//
// Note pages are emitted as faithful copies of the source fragments: their
// inline paper styles, fonts, and controls are preserved so the notes look
// exactly as they did in the original app. Only the dashboard uses the site's
// dark theme. Re-run this script after editing the source fragments.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir =
  process.env.APTITUDE_SRC ||
  'C:/Users/pagil/OneDrive/Desktop/Handwritten notes/handwritten-notes-next/public/notes';
const outDir = path.join(root, 'aptitude');

const notes = [
  {
    slug: 'hcf-and-lcm',
    source: 'hcf_and_lcm.html',
    title: 'HCF & LCM',
    emoji: '🔑',
    tag: '7 Topics',
    desc: 'Factors & Primes, Co-Primes, Division Methods, Viral Shortcuts, Key Formulas, Polynomials, Word Problems',
    pills: ['Factors', 'Primes', 'Division', 'Polynomials'],
  },
  {
    slug: 'averages',
    source: 'averages.html',
    title: 'Averages',
    emoji: '📊',
    tag: '10 Topics',
    desc: 'Highway Method, AP Series, Chair Method, Weighted Averages, Group Splitting, Entry/Exit, Speed, Alligation, Common Traps',
    pills: ['Highway Method', 'Weighted', 'Alligation'],
  },
  {
    slug: 'clocks',
    source: 'clocks.html',
    title: 'Clocks',
    emoji: '🕐',
    tag: '10 Topics',
    desc: 'Angles & Speeds, Alignments, Faulty Clocks, Mirror/Water Images, Striking Clocks, Equation of Time, Calendar, Two Clocks Racing',
    pills: ['Angles', 'Faulty Clocks', 'Calendar'],
  },
  {
    slug: 'ratio-and-proportion',
    source: 'ratio_and_proportion.html',
    title: 'Ratio & Proportion',
    emoji: '📈',
    tag: '17 Topics',
    desc: 'Types, Componendo-Dividendo, Merging Ratios, Variation, Coins, Income/Expenditure, Shortcuts',
    pills: ['Componendo', 'Merging', 'Variation'],
  },
  {
    slug: 'percentages',
    source: 'percentages.html',
    title: 'Percentages',
    emoji: '💰',
    tag: '10 Topics',
    desc: 'Basics & Fraction Table, Fast Tricks, AB Rule, Percent Point vs Change, Expenditure & Consumption, Elections, Population, Faulty Weight, Income/Savings',
    pills: ['Fraction Table', 'AB Rule', 'Elections'],
  },
  {
    slug: 'speed-time-distance',
    source: 'speed_time_distance.html',
    title: 'Speed, Time & Distance',
    emoji: '🚗',
    tag: '17 Topics',
    desc: 'Golden Triangle, Unit Conversions, Average Speed, Relative Speed, Trains, Boats & Streams, Races, Circular Tracks, Escalator',
    pills: ['Relative Speed', 'Trains', 'Boats'],
  },
  {
    slug: 'number-series',
    source: 'number_series.html',
    title: 'Number Series',
    emoji: '🔢',
    tag: '16+ Patterns',
    desc: 'Missing & Wrong Series, Square/Cube Patterns, Prime Series, MMS, Never Give Up, Blue Pani Pani, Triple Series, Fibonacci-like',
    pills: ['Missing', 'Wrong', 'Patterns'],
  },
];

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const SITE_FONTS =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap';

// Same families the original Next.js layout loaded for the handwritten notes.
const HAND_FONTS =
  'https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Patrick+Hand&family=Kalam:wght@300;400;700&family=Indie+Flower&display=swap';

const NOTE_CONTROLS = `  <a class="back-btn" href="./index.html">&larr; Back to Dashboard</a>
  <button type="button" class="dark-btn" id="darkToggle" aria-label="Toggle dark mode" aria-pressed="false">&#127769;</button>
  <button type="button" class="dl-btn" onclick="window.print()">&#11015; Download PDF</button>`;

// The original Next.js app applied these body styles from its global stylesheet
// before injecting each fragment. Keeping them preserves the original look
// (notably for the speed/time fragment, which does not set its own body font).
const NOTE_SHELL_STYLE = `<style>
body.note-body { background: #f0f0f0; font-family: 'Caveat', cursive; padding: 20px; }
body.dark-mode.note-body { background: #0f0f23; }
@media print { body.note-body { background: #fff; } }
</style>`;

// The fragments place the dark-mode and download buttons on overlapping
// coordinates. Nudge them apart so both stay clickable at every width.
const NOTE_CONTROL_STYLE = `<style>
@media screen {
  .dl-btn { right: 10px; }
  .dark-btn { right: 140px; }
}
@media screen and (max-width: 600px) {
  .dl-btn { right: 8px; }
  .dark-btn { right: 116px; }
}
</style>`;

// Keep wide tables scrollable instead of letting them widen the whole page.
const NOTE_TABLE_STYLE = `<style>
.table-scroll { max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
@media print { .table-scroll { overflow: visible; } }
</style>`;

// The original fragments only ship mobile rules for some notes. These keep
// every note usable on a phone without touching the desktop paper layout.
const NOTE_MOBILE_STYLE = `<style>
@media screen and (max-width: 600px) {
  body.note-body { padding: 10px; }
  .page {
    width: auto !important;
    max-width: 100%;
    min-height: auto;
    padding: 20px 18px;
    margin: 10px auto;
  }
  .page::before, .page::after { display: none; }
  .page svg, .page img { max-width: 100%; height: auto; }
}
</style>`;

const NOTE_SCRIPT = `<script>
(function () {
  var body = document.body;
  var button = document.getElementById('darkToggle');
  var KEY = 'darkMode';

  function apply(on) {
    body.classList.toggle('dark-mode', on);
    button.innerHTML = on ? '&#9728;&#65039;' : '&#127769;';
    button.setAttribute('aria-pressed', on ? 'true' : 'false');
  }

  var saved = false;
  try { saved = window.localStorage.getItem(KEY) === 'true'; } catch (e) {}
  apply(saved);

  button.addEventListener('click', function () {
    var next = !body.classList.contains('dark-mode');
    apply(next);
    try { window.localStorage.setItem(KEY, next ? 'true' : 'false'); } catch (e) {}
  });
})();
</script>`;

function dashboardShell({ title, description, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)} — perceptron</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)} — perceptron">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${SITE_FONTS}" rel="stylesheet">
<link rel="stylesheet" href="../css/aptitude.css">
</head>
<body class="aptitude-body aptitude-dashboard">
<a class="skip-link" href="#content">Skip to content</a>
<header class="ap-topbar">
  <a class="ap-brand" href="../index.html">perceptron<span>.</span></a>
  <nav class="ap-nav" aria-label="Aptitude">
    <a href="../index.html">Home</a>
    <a href="./index.html">Aptitude</a>
    <button type="button" class="ap-print" onclick="window.print()">&#11015; Print / PDF</button>
  </nav>
</header>
${body}
<footer class="ap-footer">
  <span>perceptron — quantitative aptitude</span>
  <span><a href="./index.html">All aptitude notes</a> · <a href="../index.html">Back to home</a></span>
</footer>
</body>
</html>
`;
}

function notePage(note) {
  const sourcePath = path.join(srcDir, note.source);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing source fragment: ${sourcePath}`);
  }

  const raw = fs.readFileSync(sourcePath, 'utf8').replace(/^\uFEFF/, '');
  const styleBlocks = [];

  // Keep the fragment's styles verbatim, but move them into <head>.
  const content = raw
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, (match) => {
      styleBlocks.push(match);
      return '';
    })
    .replace(
      /<table\b[^>]*>[\s\S]*?<\/table>/gi,
      (match) => `<div class="table-scroll">${match}</div>`,
    )
    .trim();

  const description = `${note.title} — handwritten quantitative aptitude notes with formulas, shortcuts, traps, and solved examples.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(note.title)} — Quantitative Aptitude</title>
<meta name="description" content="${esc(description)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${HAND_FONTS}" rel="stylesheet">
${NOTE_SHELL_STYLE}
${styleBlocks.join('\n')}
${NOTE_CONTROL_STYLE}
${NOTE_TABLE_STYLE}
${NOTE_MOBILE_STYLE}
</head>
<body class="note-body">
${NOTE_CONTROLS}
${content}
${NOTE_SCRIPT}
</body>
</html>
`;
}

function dashboardPage() {
  const cards = notes
    .map(
      (note) => `    <a class="ap-card" href="./${note.slug}.html">
      <span class="ap-card-emoji" aria-hidden="true">${note.emoji}</span>
      <h2>${esc(note.title)}</h2>
      <p>${esc(note.desc)}</p>
      <span class="ap-card-tag">${esc(note.tag)}</span>
      <span class="ap-card-open">Open notes →</span>
    </a>`,
    )
    .join('\n');

  const body = `<main class="ap-main ap-dash" id="content">
  <nav class="ap-crumbs" aria-label="Breadcrumb">
    <a href="../index.html">Home</a><span>/</span><span aria-current="page">Aptitude</span>
  </nav>
  <header class="ap-dash-hero">
    <span class="ap-eyebrow">// quantitative aptitude</span>
    <h1 class="ap-dash-title">Seven exam-ready aptitude sets.</h1>
    <p class="ap-dash-sub">Handwritten-style notes on arithmetic and reasoning, kept in their original paper-and-ink style — formulas, shortcuts, traps, and solved examples.</p>
    <p class="ap-dash-hint">Every set is print-ready: open a note and use <strong>Download PDF</strong> to save it as A4 pages.</p>
  </header>
  <div class="ap-grid">
${cards}
  </div>
  <section class="ap-dash-note">
    <h2>How these notes are organised</h2>
    <p>Each set follows the same rhythm: core definitions, formula boxes, worked examples, exam tips, common mistakes, and memory tricks. Start anywhere — every note is self-contained.</p>
    <p>Looking for the AI, backend, and cloud notes? <a href="../index.html#notes">Browse the main library</a>.</p>
  </section>
</main>`;

  return dashboardShell({
    title: 'Quantitative Aptitude',
    description:
      'Exam-ready aptitude notes on averages, percentages, ratio, HCF & LCM, clocks, speed time distance, and number series.',
    body,
  });
}

fs.mkdirSync(outDir, { recursive: true });

notes.forEach((note) => {
  const html = notePage(note);
  fs.writeFileSync(path.join(outDir, `${note.slug}.html`), html, 'utf8');
  console.log(`wrote aptitude/${note.slug}.html`);
});

fs.writeFileSync(path.join(outDir, 'index.html'), dashboardPage(), 'utf8');
console.log('wrote aptitude/index.html');
