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
  const suffix = raw.replace(/[\d]/g, '');
  const duration = 1800;
  let startTs = null;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function step(ts) {
    if (!startTs) startTs = ts;
    const progress = Math.min((ts - startTs) / duration, 1);
    el.textContent = Math.floor(easeOutCubic(progress) * target) + suffix;
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
  });
});

// Écoute les changements système en temps réel
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches ? 'dark' : 'light');
  });
}
