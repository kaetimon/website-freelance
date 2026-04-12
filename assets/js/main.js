/**
 * main.js v2 — Karine Timoneda
 * - Gestion du thème light/dark
 * - Header sticky
 * - Animations au scroll (IntersectionObserver)
 * - Compteurs animés
 * - Stagger children
 */

const THEME_KEY = 'karine-theme';

/* ─── Thème ─────────────────────────────────────── */
function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  const h = new Date().getHours();
  return (h >= 20 || h < 7) ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn  = document.getElementById('theme-toggle');
  const icon = btn && btn.querySelector('.theme-icon');
  if (!btn) return;
  const label = theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre';
  btn.setAttribute('aria-label', label);
  btn.setAttribute('title', label);
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

function injectThemeToggle() {
  const btn = document.createElement('button');
  btn.id = 'theme-toggle';
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', 'Passer en mode sombre');
  btn.setAttribute('title', 'Passer en mode sombre');
  btn.innerHTML = '<span class="theme-icon" aria-hidden="true">🌙</span>';
  btn.addEventListener('click', toggleTheme);
  document.body.appendChild(btn);
}

/* ─── Header sticky ──────────────────────────────── */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─── Count-up ───────────────────────────────────── */
function animateCount(el) {
  const raw    = el.dataset.target || el.textContent.trim();
  const target = parseInt(raw.replace(/\D/g, ''), 10);
  const prefixMatch = raw.match(/^[^\d]+/);
  const suffixMatch = raw.match(/[^\d]+$/);
  const prefix = prefixMatch ? prefixMatch[0] : '';
  const suffix = suffixMatch && suffixMatch[0] !== prefix ? suffixMatch[0] : '';
  const duration = 1800;
  let startTs = null;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function step(ts) {
    if (!startTs) startTs = ts;
    const progress = Math.min((ts - startTs) / duration, 1);
    el.textContent = prefix + Math.floor(easeOutCubic(progress) * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initCountUp() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.count-up').forEach(el => {
    el.dataset.target = el.textContent.trim();
    observer.observe(el);
  });
}

/* ─── Scroll animations ──────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─── Auto-stagger dans les grilles ─────────────── */
function initStagger() {
  document.querySelectorAll('[data-stagger]').forEach(container => {
    const delay = parseInt(container.dataset.stagger, 10) || 80;
    container.querySelectorAll(':scope > *').forEach((child, i) => {
      if (!child.classList.contains('reveal')) child.classList.add('reveal');
      child.style.transitionDelay = `${i * delay}ms`;
    });
  });
}

/* ─── Marquee pause au hover ─────────────────────── */
function initMarquee() {
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  });
}

/* ─── Diagnostic interactif ──────────────────────── */
function initDiag() {
  const wrapper = document.querySelector('[data-diag]');
  if (!wrapper) return;

  const triggers = Array.from(wrapper.querySelectorAll('.diag-trigger'));
  const panels   = Array.from(wrapper.querySelectorAll('.diag-panel'));

  /* Injecter les accordéons mobile (clones du panel) */
  triggers.forEach((trigger, idx) => {
    const panel = panels[idx];
    if (!panel) return;

    const body = document.createElement('div');
    body.className = 'diag-accordion-body';
    body.setAttribute('aria-hidden', 'true');
    body.setAttribute('role', 'region');
    body.id = 'diag-accordion-' + idx;
    body.innerHTML = panel.innerHTML;
    trigger.insertAdjacentElement('afterend', body);

    if (idx === 0) {
      body.classList.add('is-open');
      body.setAttribute('aria-hidden', 'false');
    }
  });

  /* Activer un item */
  function activate(idx) {
    const isMobile = window.innerWidth < 769;

    triggers.forEach((t, i) => {
      const isActive = i === idx;
      t.classList.toggle('is-active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach((p, i) => {
      if (i === idx) p.removeAttribute('hidden');
      else p.setAttribute('hidden', '');
    });

    /* Accordéon mobile */
    wrapper.querySelectorAll('.diag-accordion-body').forEach((b, i) => {
      const open = isMobile && i === idx;
      b.classList.toggle('is-open', open);
      b.setAttribute('aria-hidden', open ? 'false' : 'true');
    });
  }

  /* Clicks */
  triggers.forEach((trigger, idx) => {
    trigger.addEventListener('click', () => {
      const isMobile = window.innerWidth < 769;
      const alreadyActive = trigger.classList.contains('is-active');
      /* Mobile : toggle (refermer si déjà ouvert) */
      if (isMobile && alreadyActive) {
        const body = wrapper.querySelectorAll('.diag-accordion-body')[idx];
        trigger.classList.remove('is-active');
        trigger.setAttribute('aria-selected', 'false');
        body.classList.remove('is-open');
        body.setAttribute('aria-hidden', 'true');
        return;
      }
      activate(idx);
    });
  });

  /* Navigation clavier (flèches) */
  triggers.forEach((trigger, idx) => {
    trigger.addEventListener('keydown', (e) => {
      let next = idx;
      if (e.key === 'ArrowDown') { next = Math.min(idx + 1, triggers.length - 1); e.preventDefault(); }
      if (e.key === 'ArrowUp')   { next = Math.max(idx - 1, 0); e.preventDefault(); }
      if (next !== idx) { triggers[next].focus(); activate(next); }
    });
  });
}

/* ─── Init global ────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const theme = getPreferredTheme();
  applyTheme(theme);
  injectThemeToggle();

  requestAnimationFrame(() => {
    initStickyHeader();
    applyTheme(document.documentElement.getAttribute('data-theme') || theme);
    initStagger();
    initScrollAnimations();
    initCountUp();
    initMarquee();
    initDiag();
  });
});

// Écoute les changements système en temps réel
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches ? 'dark' : 'light');
  });
}
