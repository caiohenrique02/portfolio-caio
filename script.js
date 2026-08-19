/* =========================================================
   Caio Henrique — Portfólio · interações
   ========================================================= */
(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------------------------------------------------
     1. Rede de partículas no fundo (canvas)
     --------------------------------------------------- */
  function initNetwork() {
    const cv = $('#bg-net');
    if (!cv || reduced) return;
    const ctx = cv.getContext('2d');
    let w, h, dpr, nodes = [], raf;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.width  = innerWidth  * dpr;
      h = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + 'px';
      cv.style.height = innerHeight + 'px';

      const target = Math.round((innerWidth * innerHeight) / 19000);
      const count = Math.max(28, Math.min(96, target));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - .5) * .22 * dpr,
        vy: (Math.random() - .5) * .22 * dpr,
        r: (Math.random() * 1.5 + .7) * dpr
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const link = 132 * dpr;
      const mRad = 190 * dpr;

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < link) {
            const t = 1 - d / link;
            ctx.strokeStyle = `rgba(90,150,220,${t * .22})`;
            ctx.lineWidth = dpr * .55;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        // conexão com o cursor
        const mdx = a.x - mouse.x, mdy = a.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < mRad) {
          const t = 1 - md / mRad;
          ctx.strokeStyle = `rgba(34,211,238,${t * .5})`;
          ctx.lineWidth = dpr * .8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = md < mRad ? 'rgba(124,92,255,.85)' : 'rgba(150,180,220,.42)';
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    addEventListener('resize', resize, { passive: true });
    addEventListener('pointermove', e => {
      mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr;
    }, { passive: true });
    addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });

    // pausa quando a aba está oculta (economiza bateria)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    });

    resize(); draw();
  }

  /* ---------------------------------------------------
     2. Glow que segue o cursor
     --------------------------------------------------- */
  function initCursorGlow() {
    const g = $('#cursorGlow');
    if (!g || reduced || matchMedia('(pointer: coarse)').matches) return;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    addEventListener('pointermove', e => {
      tx = e.clientX; ty = e.clientY; g.style.opacity = '1';
    }, { passive: true });
    (function loop() {
      cx += (tx - cx) * .085;
      cy += (ty - cy) * .085;
      g.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---------------------------------------------------
     3. Nav: fundo ao rolar, barra de progresso, menu mobile
     --------------------------------------------------- */
  function initNav() {
    const nav = $('#nav'), bar = $('#progressBar');
    const toggle = $('#navToggle'), links = $('.nav-links');

    const onScroll = () => {
      const y = scrollY;
      nav.classList.toggle('scrolled', y > 24);
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    toggle?.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    $$('.nav-links a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open'); toggle.classList.remove('open');
    }));
  }

  /* ---------------------------------------------------
     4. Reveal ao rolar
     --------------------------------------------------- */
  function initReveal() {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        obs.unobserve(en.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(el => io.observe(el));
  }

  /* ---------------------------------------------------
     5. Rotator de palavras do hero
     --------------------------------------------------- */
  function initRotator() {
    const host = $('#rotator .rot-word');
    if (!host) return;
    const words = ['sites', 'sistemas', 'automações', 'resultados'];
    if (reduced) { host.textContent = words[0]; return; }

    let i = 0, j = 0, deleting = false;
    (function tick() {
      const word = words[i];
      host.textContent = deleting ? word.slice(0, --j) : word.slice(0, ++j);
      let wait = deleting ? 45 : 95;
      if (!deleting && j === word.length) { wait = 1700; deleting = true; }
      else if (deleting && j === 0) { deleting = false; i = (i + 1) % words.length; wait = 320; }
      setTimeout(tick, wait);
    })();
  }

  /* ---------------------------------------------------
     6. Terminal decorativo do hero
     --------------------------------------------------- */
  function initTerminal() {
    const el = $('#termBody');
    if (!el) return;
    const lines = [
      '<span class="d">$</span> <span class="c">caio</span> deploy site',
      '<span class="d">→</span> build .................. <span class="g">ok</span>',
      '<span class="d">→</span> imagens otimizadas ..... <span class="g">ok</span>',
      '<span class="d">→</span> certificado SSL ........ <span class="g">ok</span>',
      '<span class="d">→</span> domínio apontado ....... <span class="g">ok</span>',
      '',
      '<span class="g">✓</span> site no ar',
      '',
      '<span class="d">$</span> <span class="c">caio</span> status',
      '<span class="d">→</span> integrações ............ <span class="g">rodando</span>',
      '<span class="d">→</span> backup diário .......... <span class="g">ativo</span>',
      '<span class="d">→</span> monitoramento .......... <span class="g">ativo</span>',
      '',
      '<span class="d">$</span> <span class="caret-t">_</span>'
    ];

    if (reduced) { el.innerHTML = lines.join('\n'); return; }

    let li = 0, ci = 0, buf = '';
    (function type() {
      if (li >= lines.length) return;
      const raw = lines[li];
      // digita ignorando as tags html (escreve a linha inteira de uma vez a cada "n" chars)
      const plain = raw.replace(/<[^>]+>/g, '');
      ci += 2;
      if (ci >= plain.length) {
        buf += raw + '\n';
        el.innerHTML = buf;
        li++; ci = 0;
        setTimeout(type, raw === '' ? 120 : 210);
      } else {
        el.innerHTML = buf + plain.slice(0, ci);
        setTimeout(type, 16);
      }
    })();
  }

  /* ---------------------------------------------------
     7. Botões magnéticos
     --------------------------------------------------- */
  function initMagnetic() {
    if (reduced || matchMedia('(pointer: coarse)').matches) return;
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * .22}px, ${y * .3}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------------------------------------------------
     8. Tilt 3D + spotlight nos cards de serviço
     --------------------------------------------------- */
  function initTilt() {
    $$('.tilt').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', px * 100 + '%');
        card.style.setProperty('--my', py * 100 + '%');
        if (reduced || matchMedia('(pointer: coarse)').matches) return;
        card.style.transform =
          `perspective(900px) rotateX(${(py - .5) * -7}deg) rotateY(${(px - .5) * 9}deg) translateY(-6px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------------------------------------------------
     9. Screenshots dos projetos (fallback se a imagem não existir)
     --------------------------------------------------- */
  function initShots() {
    $$('.browser-shot').forEach(shot => {
      const raw = getComputedStyle(shot).getPropertyValue('--shot').trim();
      const m = raw.match(/url\(["']?(.+?)["']?\)/);
      if (!m) return;
      const img = new Image();
      img.onload = () => shot.classList.add('has-shot');
      img.onerror = () => {};   // mantém o gradiente + nome do projeto
      img.src = m[1];
    });
  }

  /* ---------------------------------------------------
     10. Parallax leve na grade do fundo
     --------------------------------------------------- */
  function initParallax() {
    const grid = $('.grid-overlay');
    if (!grid || reduced) return;
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        grid.style.transform = `perspective(600px) translateY(${scrollY * -.05}px)`;
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------------------------------------------------
     boot
     --------------------------------------------------- */
  function boot() {
    const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
    initNetwork();
    initCursorGlow();
    initNav();
    initReveal();
    initRotator();
    initTerminal();
    initMagnetic();
    initTilt();
    initShots();
    initParallax();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot)
    : boot();
})();
