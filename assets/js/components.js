/**
 * components.js
 * Injection dynamique du header et du footer sur toutes les pages.
 * La page active est détectée automatiquement via window.location.pathname.
 */

function getCurrentPage() {
  const filename = window.location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';
  if (filename === 'expertise')     return 'expertise';
  if (filename === 'projets')       return 'projets';
  if (filename === 'transmission')  return 'transmission';
  if (filename === 'a-propos')      return 'a-propos';
  return 'accueil';
}

function renderHeader() {
  const current = getCurrentPage();
  const isProjets = current === 'projets' || current === 'transmission';

  return `
    <a href="#main-content" class="skip-link">Aller au contenu</a>
    <header class="site-header" id="site-header" role="banner">
      <div class="container header-inner">

        <a href="index.html" class="logo" aria-label="Karine Timoneda — Accueil">
          Karine Timoneda
        </a>

        <nav class="main-nav" id="main-nav" aria-label="Navigation principale">
          <ul class="nav-list" role="list">

            <li>
              <a href="index.html"
                 class="nav-link${current === 'accueil' ? ' active' : ''}"
                 ${current === 'accueil' ? 'aria-current="page"' : ''}>Accueil</a>
            </li>

            <li>
              <a href="expertise.html"
                 class="nav-link${current === 'expertise' ? ' active' : ''}"
                 ${current === 'expertise' ? 'aria-current="page"' : ''}>Expertise</a>
            </li>

            <li class="nav-item-mega" id="mega-projets-item">
              <button class="nav-link nav-mega-trigger${isProjets ? ' active' : ''}"
                      id="mega-trigger"
                      aria-expanded="false"
                      aria-haspopup="true"
                      aria-controls="mega-projets"
                      ${isProjets ? 'aria-current="page"' : ''}>
                Projets
                <svg class="mega-chevron" aria-hidden="true" width="12" height="12"
                     viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>

              <div class="mega-menu" id="mega-projets" role="region"
                   aria-label="Sous-menu Projets">
                <div class="mega-inner">

                  <!-- Carte principale — core business, mise en avant -->
                  <a href="projets.html" class="mega-featured">
                    <div class="mega-featured-badge">Core business</div>
                    <h3 class="mega-featured-title">Interventions produit</h3>
                    <p class="mega-featured-desc">Structuration, design et accélération de produits digitaux — pour des équipes qui veulent vraiment avancer.</p>
                    <span class="mega-featured-cta">Voir les projets →</span>
                  </a>

                  <!-- Colonne droite — 2 cartes secondaires -->
                  <div class="mega-col mega-col-cards">
                    <a href="transmission.html#enseignement" class="mega-card${current === 'transmission' ? ' active' : ''}">
                      <span class="mega-card-icon" aria-hidden="true">🎓</span>
                      <div class="mega-card-body">
                        <p class="mega-card-title">Enseignement</p>
                        <p class="mega-card-desc">Transmission en UX, stratégie produit et comportement utilisateur.</p>
                        <span class="mega-card-cta">En savoir plus →</span>
                      </div>
                    </a>
                    <a href="transmission.html#conferences" class="mega-card${current === 'transmission' ? ' active' : ''}">
                      <span class="mega-card-icon" aria-hidden="true">🎤</span>
                      <div class="mega-card-body">
                        <p class="mega-card-title">Conférences</p>
                        <p class="mega-card-desc">Webinaires, prises de parole et formats autour du produit et de l'expérience utilisateur.</p>
                        <span class="mega-card-cta">Voir les formats →</span>
                      </div>
                    </a>
                  </div>

                </div>
              </div>
            </li>

            <li>
              <a href="a-propos.html"
                 class="nav-link${current === 'a-propos' ? ' active' : ''}"
                 ${current === 'a-propos' ? 'aria-current="page"' : ''}>À propos</a>
            </li>

          </ul>
        </nav>

        <button class="nav-toggle"
                id="nav-toggle"
                aria-expanded="false"
                aria-controls="main-nav"
                aria-label="Ouvrir le menu de navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <a href="https://calendar.app.google/DLCuiwxWRqKBqRqp9"
           class="btn btn-primary header-cta"
           aria-label="Prendre rendez-vous avec Karine">
          Discutons ✨
        </a>

      </div>
    </header>`;
}

function renderFooter() {
  const navItems = [
    { href: 'index.html',      label: 'Accueil'   },
    { href: 'expertise.html',  label: 'Expertise' },
    { href: 'projets.html',    label: 'Projets'   },
    { href: 'a-propos.html',   label: 'À propos'  },
  ];

  const navHTML = navItems
    .map(item => `<li><a href="${item.href}" class="footer-nav-link">${item.label}</a></li>`)
    .join('');

  return `
    <footer class="site-footer" role="contentinfo">
      <div class="container footer-inner">

        <div class="footer-left">
          <p class="footer-copy">© 2026 Karine Timoneda. Tous droits réservés.</p>
        </div>

        <nav class="footer-center" aria-label="Navigation pied de page">
          <ul class="footer-nav" role="list">
            ${navHTML}
            <li>
              <a href="https://calendar.app.google/DLCuiwxWRqKBqRqp9"
                 class="footer-nav-link footer-cta">
                Discutons ✨
              </a>
            </li>
          </ul>
        </nav>

        <div class="footer-right">
          <a href="https://linkedin.com/in/karinetimoneda"
             target="_blank"
             rel="noopener noreferrer"
             class="linkedin-link"
             aria-label="Profil LinkedIn de Karine Timoneda (nouvelle fenêtre)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                 viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037
                       -1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046
                       c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z
                       M5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063
                       2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065z
                       M7.119 20.452H3.555V9h3.564v11.452z
                       M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24
                       1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>

      </div>
    </footer>`;
}

function initMegaMenu() {
  const trigger = document.getElementById('mega-trigger');
  const menu    = document.getElementById('mega-projets');
  const item    = document.getElementById('mega-projets-item');
  if (!trigger || !menu || !item) return;

  const isMobile = () => window.innerWidth <= 768;

  function openMega() {
    trigger.setAttribute('aria-expanded', 'true');
    item.classList.add('mega-open');
  }
  function closeMega() {
    trigger.setAttribute('aria-expanded', 'false');
    item.classList.remove('mega-open');
  }
  function toggleMega() {
    item.classList.contains('mega-open') ? closeMega() : openMega();
  }

  // Clic sur le trigger (desktop + mobile)
  trigger.addEventListener('click', e => {
    e.stopPropagation();
    toggleMega();
  });

  // Hover desktop — ouverture sur le trigger, fermeture quand on quitte
  // à la fois le trigger ET le panel
  let hoverTimer = null;
  function scheduleClose() {
    hoverTimer = setTimeout(() => { if (!isMobile()) closeMega(); }, 80);
  }
  function cancelClose() {
    clearTimeout(hoverTimer);
  }
  item.addEventListener('mouseenter', () => { if (!isMobile()) { cancelClose(); openMega(); } });
  item.addEventListener('mouseleave', () => { if (!isMobile()) scheduleClose(); });
  menu.addEventListener('mouseenter', () => { if (!isMobile()) cancelClose(); });
  menu.addEventListener('mouseleave', () => { if (!isMobile()) scheduleClose(); });

  // Fermer au clic en dehors
  document.addEventListener('click', e => {
    if (!item.contains(e.target)) closeMega();
  });

  // Fermer à Échap, Tab hors du menu
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeMega(); trigger.focus(); }
  });

  menu.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      const focusable = menu.querySelectorAll('a, button');
      const last = focusable[focusable.length - 1];
      if (!e.shiftKey && document.activeElement === last) { closeMega(); }
    }
  });
}

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  function openNav() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    nav.classList.contains('open') ? closeNav() : openNav();
  });

  // Fermer au clic sur un lien (pas le trigger du mega menu)
  nav.querySelectorAll('.nav-link:not(.nav-mega-trigger)').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Fermer à la touche Échap
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) closeNav();
  });

  // Fermer au clic en dehors
  document.addEventListener('click', e => {
    if (nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)) {
      closeNav();
    }
  });
}

function renderBottomNav() {
  const current = getCurrentPage();
  const isProjets = current === 'projets' || current === 'transmission';

  const mainItems = [
    { href: 'index.html',     icon: '🏠', label: 'Accueil',   key: 'accueil'   },
    { href: 'expertise.html', icon: '✦',  label: 'Expertise', key: 'expertise' },
    { href: 'projets.html',   icon: '💼', label: 'Projets',   key: 'projets'   },
    { href: 'a-propos.html',  icon: '👤', label: 'À propos',  key: 'a-propos'  },
  ];

  const itemsHTML = mainItems.map(item => {
    const isActive = item.key === current;
    return `
      <a href="${item.href}"
         class="bottom-nav-item${isActive ? ' active' : ''}"
         ${isActive ? 'aria-current="page"' : ''}
         aria-label="${item.label}">
        <span class="bottom-nav-icon" aria-hidden="true">${item.icon}</span>
        <span class="bottom-nav-label">${item.label}</span>
      </a>`;
  }).join('');

  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  const themeIcon  = theme === 'dark' ? '☀️' : '🌙';
  const themeLabel = theme === 'dark' ? 'Mode clair' : 'Mode sombre';

  return `
    <nav class="bottom-nav" id="bottom-nav" aria-label="Navigation principale">
      ${itemsHTML}
      <button class="bottom-nav-item${isProjets ? ' active' : ''}"
              id="bottom-plus-btn"
              aria-expanded="false"
              aria-controls="bottom-sheet"
              aria-label="Plus d'options">
        <span class="bottom-nav-icon" aria-hidden="true">⋯</span>
        <span class="bottom-nav-label">Plus</span>
      </button>

      <div class="bottom-sheet" id="bottom-sheet" aria-hidden="true" role="menu">
        <a href="transmission.html#enseignement" class="bottom-sheet-item${current === 'transmission' ? ' active' : ''}" role="menuitem">
          <span class="bottom-sheet-icon" aria-hidden="true">🎓</span>
          <span>Enseignement</span>
        </a>
        <a href="transmission.html#conferences" class="bottom-sheet-item" role="menuitem">
          <span class="bottom-sheet-icon" aria-hidden="true">🎤</span>
          <span>Conférences</span>
        </a>
        <div class="bottom-sheet-divider" role="separator"></div>
        <button class="bottom-sheet-item" id="sheet-theme-btn" role="menuitem">
          <span class="bottom-sheet-icon" id="sheet-theme-icon" aria-hidden="true">${themeIcon}</span>
          <span id="sheet-theme-label">${themeLabel}</span>
        </button>
      </div>
    </nav>`;
}

function initBottomSheet() {
  const plusBtn = document.getElementById('bottom-plus-btn');
  const sheet   = document.getElementById('bottom-sheet');
  if (!plusBtn || !sheet) return;

  function openSheet() {
    sheet.classList.add('open');
    sheet.setAttribute('aria-hidden', 'false');
    plusBtn.setAttribute('aria-expanded', 'true');
  }
  function closeSheet() {
    sheet.classList.remove('open');
    sheet.setAttribute('aria-hidden', 'true');
    plusBtn.setAttribute('aria-expanded', 'false');
  }

  plusBtn.addEventListener('click', e => {
    e.stopPropagation();
    sheet.classList.contains('open') ? closeSheet() : openSheet();
  });

  document.addEventListener('click', e => {
    if (!plusBtn.contains(e.target) && !sheet.contains(e.target)) closeSheet();
  });

  const themeBtn = document.getElementById('sheet-theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      if (typeof toggleTheme === 'function') toggleTheme();
      const t = document.documentElement.getAttribute('data-theme') || 'light';
      const icon  = document.getElementById('sheet-theme-icon');
      const label = document.getElementById('sheet-theme-label');
      if (icon)  icon.textContent  = t === 'dark' ? '☀️' : '🌙';
      if (label) label.textContent = t === 'dark' ? 'Mode clair' : 'Mode sombre';
      closeSheet();
    });
  }
}

function injectComponents() {
  const headerEl = document.getElementById('header-placeholder');
  const footerEl = document.getElementById('footer-placeholder');

  if (headerEl) headerEl.innerHTML = renderHeader();
  if (footerEl) footerEl.innerHTML = renderFooter();

  // Bottom nav mobile (injectée directement dans body)
  document.body.insertAdjacentHTML('beforeend', renderBottomNav());

  initMegaMenu();
  initMobileNav();
  initBottomSheet();
}

document.addEventListener('DOMContentLoaded', injectComponents);
