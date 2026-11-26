/* perceptron — shared app (vanilla, zero-deps, loaded with defer) */
(function(){
  'use strict';

  /* ---------- tiny helpers ---------- */
  function $(s,c){return (c||document).querySelector(s)}
  function $all(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))}

  /* ---------- 1. Reading progress bar ---------- */
  function initProgress(){
    var bar = $('#progress');
    if(!bar){ /* auto-create so note pages need no markup change */
      bar = document.createElement('div');
      bar.id = 'progress'; bar.setAttribute('aria-hidden','true');
      document.body.insertBefore(bar, document.body.firstChild);
    }
    var ticking = false;
    function update(){
      ticking = false;
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = p.toFixed(2) + '%';
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ ticking = true; requestAnimationFrame(update); }
    }, {passive:true});
    update();
  }

  /* ---------- 2. Sticky auto TOC (h2/h3 in .main) ---------- */
  function initTOC(){
    var main = $('.main');
    if(!main || $('.auto-toc')) return;
    var heads = $all('.block h2, .main h2, .block h3.sub-h, .main h3', main).filter(function(el){
      return el.id || el.textContent.trim();
    });
    if(heads.length < 3) return;
    heads.forEach(function(h,i){
      if(!h.id){ h.id = 'sec-' + (i+1) + '-' + h.textContent.trim().toLowerCase()
        .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,48); }
    });
    var nav = document.createElement('nav');
    nav.className = 'auto-toc'; nav.setAttribute('aria-label','On this page');
    nav.innerHTML = '<h2>On this page</h2>';
    heads.forEach(function(h){
      var a = document.createElement('a');
      var isH3 = h.tagName === 'H3';
      a.href = '#' + h.id; a.textContent = h.textContent.trim().slice(0,72);
      if(isH3) a.classList.add('lvl-h3');
      a.dataset.target = h.id;
      nav.appendChild(a);
    });
    document.body.appendChild(nav);
    document.body.classList.add('has-toc');
    var links = $all('a', nav);
    function setActive(id){
      links.forEach(function(l){ l.classList.toggle('active', l.dataset.target === id); });
    }
    if('IntersectionObserver' in window){
      var map = {};
      links.forEach(function(l){ map[l.dataset.target] = l; });
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting) setActive(e.target.id);
        });
      }, {rootMargin:'-20% 0px -70% 0px', threshold:0});
      heads.forEach(function(h){ obs.observe(h); });
    }
  }

  /* ---------- 3. Code blocks: header + copy ---------- */
  function initCodeBlocks(){
    $all('pre > code').forEach(function(code){
      var pre = code.parentElement;
      if(pre.parentElement.classList.contains('code-block')) return;
      var cls = code.className || '';
      var m = cls.match(/language-([\w+-]+)/);
      var lang = (m ? m[1] : 'code').toUpperCase();
      var wrap = document.createElement('div');
      wrap.className = 'code-block';
      var head = document.createElement('div');
      head.className = 'code-head';
      var label = document.createElement('span');
      label.textContent = lang;
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'copy-btn';
      btn.textContent = 'Copy'; btn.setAttribute('aria-label','Copy ' + lang + ' code to clipboard');
      btn.addEventListener('click', function(){
        var text = code.innerText;
        function done(){
          var old = btn.textContent;
          btn.textContent = 'Copied!'; btn.setAttribute('aria-live','polite');
          setTimeout(function(){ btn.textContent = old; }, 2000);
        }
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(text).then(done, done);
        } else {
          var ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          try{ document.execCommand('copy'); }catch(e){}
          document.body.removeChild(ta); done();
        }
      });
      head.appendChild(label); head.appendChild(btn);
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(head); wrap.appendChild(pre);
    });
  }

  /* ---------- 4. Global search index + modal ---------- */
  var SEARCH_INDEX = [
    {title:'Neural Networks',url:'neural-networks.html',cat:'ai',tags:'perceptrons backprop cnns transformers diffusion',desc:'Perceptrons, backprop, CNNs, transformers — prerequisite fundamentals.'},
    {title:'LLM Foundations',url:'introduction-to-llm.html',cat:'ai',tags:'tokenization attention embeddings rag word2vec',desc:'Tokenization, attention, embeddings, RAG — statistical models to transformers.'},
    {title:'LangChain',url:'langchain.html',cat:'ai',tags:'chains memory retrieval orchestration rag agents',desc:'Chains, memory, retrieval, orchestration for LLM apps.'},
    {title:'AI Agents & MCP',url:'agentic-ai-foundations.html',cat:'ai',tags:'autonomous loops mcp guardrails tools',desc:'Agentic loop, Model Context Protocol, guardrails.'},
    {title:'Java',url:'java.html',cat:'backend',tags:'oop concurrency collections streams',desc:'OOP, concurrency, collections, modern Java.'},
    {title:'FastAPI',url:'fastapi.html',cat:'backend',tags:'async apis pydantic http python',desc:'Async APIs, Pydantic validation, HTTP in Python.'},
    {title:'DevOps',url:'devops.html',cat:'cloud',tags:'git cicd docker containers ansible',desc:'Git, CI/CD, Docker, orchestration.'},
    {title:'AWS Cloud',url:'aws.html',cat:'cloud',tags:'vpc iam ec2 s3 architecture',desc:'VPC, IAM, EC2, S3, cloud architecture.'}
  ];

  function initSearchModal(){
    if($('#searchModal')) return;
    var backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop'; backdrop.id = 'searchModal'; backdrop.hidden = true;
    backdrop.innerHTML =
      '<div class="search-modal" role="dialog" aria-modal="true" aria-label="Search notes">' +
        '<header><input id="modalSearch" type="search" placeholder="Search notes… (try attention, docker, mcp)" autocomplete="off" aria-label="Search notes" aria-controls="modalResults" aria-expanded="true"></header>' +
        '<div class="search-results" id="modalResults" role="listbox" aria-label="Results"></div>' +
        '<div class="search-foot"><span>↑↓ navigate</span><span>↵ open</span><span>esc close</span></div>' +
      '</div>';
    document.body.appendChild(backdrop);
    var input = $('#modalSearch', backdrop);
    var results = $('#modalResults', backdrop);
    var items = [], active = -1, lastFocus = null;

    function render(q){
      q = (q||'').trim().toLowerCase();
      var hits = SEARCH_INDEX.filter(function(e){
        if(!q) return true;
        return (e.title+' '+e.desc+' '+e.tags).toLowerCase().indexOf(q) !== -1;
      });
      results.innerHTML = '';
      items = []; active = -1;
      if(!hits.length){
        results.innerHTML = '<div class="search-empty">No notes match your query — try “attention”, “docker”, or “mcp”.</div>';
        return;
      }
      hits.forEach(function(h,i){
        var a = document.createElement('a');
        a.href = h.url; a.setAttribute('role','option'); a.id = 'sr-' + i;
        a.innerHTML = '<span class="r-title"></span><span class="r-sub"></span>';
        a.querySelector('.r-title').textContent = h.title;
        a.querySelector('.r-sub').textContent = h.desc + ' · ' + h.tags.split(' ').slice(0,4).join(' · ');
        /* keep relative links working from any page */
        a.addEventListener('click', function(){ close(); });
        results.appendChild(a); items.push(a);
      });
      setActive(0);
    }
    function setActive(i){
      if(!items.length) return;
      active = (i + items.length) % items.length;
      items.forEach(function(a,j){
        a.setAttribute('aria-selected', j === active ? 'true' : 'false');
      });
      items[active].scrollIntoView({block:'nearest'});
      input.setAttribute('aria-activedescendant', items[active].id);
    }
    function open(){
      lastFocus = document.activeElement;
      backdrop.hidden = false;
      document.body.style.overflow = 'hidden';
      input.value = ''; render('');
      setTimeout(function(){ input.focus(); }, 0);
    }
    function close(){
      backdrop.hidden = true;
      document.body.style.overflow = '';
      if(lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function isOpen(){ return !backdrop.hidden; }

    input.addEventListener('input', function(){ render(input.value); });
    input.addEventListener('keydown', function(e){
      if(e.key === 'ArrowDown'){ e.preventDefault(); setActive(active+1); }
      else if(e.key === 'ArrowUp'){ e.preventDefault(); setActive(active-1); }
      else if(e.key === 'Enter'){ e.preventDefault(); if(items[active]) window.location.href = items[active].getAttribute('href'); }
      else if(e.key === 'Escape'){ e.preventDefault(); close(); }
    });
    backdrop.addEventListener('click', function(e){ if(e.target === backdrop) close(); });
    /* focus trap: keep Tab inside modal */
    backdrop.addEventListener('keydown', function(e){
      if(e.key !== 'Tab') return;
      var f = $all('input, a[href]', backdrop).filter(function(el){ return el.offsetParent !== null; });
      if(!f.length) return;
      var first = f[0], last = f[f.length-1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    });
    document.addEventListener('keydown', function(e){
      var inField = /^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement||{}).tagName||'');
      var mod = e.metaKey || e.ctrlKey;
      if((mod && e.key.toLowerCase() === 'k') || (e.key === '/' && !inField && !isOpen())){
        // don't hijack '/' when modal already open (it's the search field)
        e.preventDefault(); isOpen() ? close() : open();
      } else if(e.key === 'Escape' && isOpen()){ close(); }
    });
    // wire nav trigger(s)
    $all('[data-open-search]').forEach(function(b){ b.addEventListener('click', open); });
    return {open:open, close:close};
  }

  /* ---------- 5. Landing: category filter + inline search ---------- */
  function initLandingFilters(){
    var scope = $('#notes');
    var grids = scope ? $all('.notes-grid', scope) : [];
    if(!grids.length) return;
    var cards = $all('#notes .note-card').map(function(a){
      return {a:a, li:a.closest('li'), cat:(a.dataset.category||'').toLowerCase()};
    });
    var btns = $all('.filter-btn');
    var input = $('#search');
    var count = $('#result-count');
    var empty = $('#empty-state');
    var activeCat = 'all';

    function apply(){
      var q = input ? input.value.trim().toLowerCase() : '';
      var visible = 0;
      cards.forEach(function(c){
        var hay = (c.a.dataset.title+' '+c.a.textContent+' '+c.a.dataset.summary+' '+c.a.dataset.tags).toLowerCase();
        var okCat = activeCat === 'all' || c.cat === activeCat;
        var okQ = !q || hay.indexOf(q) !== -1;
        var show = okCat && okQ;
        if(c.li) c.li.hidden = !show;
        c.a.setAttribute('aria-hidden', show ? 'false' : 'true');
        if(show) visible++;
      });
      // hide empty track groups without jumping layout
      $all('.track').forEach(function(t){
        t.hidden = t.querySelectorAll('li:not([hidden])').length === 0;
      });
      if(empty) empty.hidden = visible !== 0;
      if(count) count.textContent = (q || activeCat !== 'all')
        ? ('Showing ' + visible + ' of ' + cards.length + ' modules')
        : ('Showing ' + visible + ' of ' + cards.length + ' modules');
    }
    btns.forEach(function(b){
      b.addEventListener('click', function(){
        activeCat = b.dataset.filter || 'all';
        btns.forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        apply();
      });
    });
    if(input){
      input.addEventListener('input', apply);
      var clear = $('#clear-search');
      if(clear) clear.addEventListener('click', function(){ input.value=''; apply(); input.focus(); });
    }
    apply();
  }

  /* ---------- 6. Mobile nav + scrollspy (landing) ---------- */
  function initMobileNav(){
    var toggle = $('#navToggle'), links = $('#navLinks');
    if(!toggle || !links) return;
    toggle.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '✕' : '☰';
    });
    $all('a', links).forEach(function(a){
      a.addEventListener('click', function(){
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded','false'); toggle.textContent = '☰';
      });
    });
  }
  function initScrollSpy(){
    var links = $all('#navLinks a[href^="#"]');
    if(!links.length) return;
    var secs = links.map(function(l){ return $(l.getAttribute('href')); }).filter(Boolean);
    function onScroll(){
      var y = window.scrollY + 140, cur = secs[0];
      secs.forEach(function(s){ if(s.offsetTop <= y) cur = s; });
      links.forEach(function(l){ l.classList.toggle('active', cur && l.getAttribute('href') === '#' + cur.id); });
    }
    window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', function(){
    initProgress();
    initTOC();
    initCodeBlocks();
    initSearchModal();
    initLandingFilters();
    initMobileNav();
    initScrollSpy();
  });
})();
