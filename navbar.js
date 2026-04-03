/* =============================================
   Shared Navbar — single source of truth
   Include via <script src="navbar.js"></script>
   ============================================= */
(function () {
  // ── CSS ──
  const css = `
    .navbar-wrapper {
      position: fixed; top: 0; right: 0; left: 0;
      z-index: 50; display: flex; justify-content: center;
      pointer-events: none;
    }
    .navbar {
      position: absolute; top: 1.6rem;
      width: 66rem; max-width: calc(100% - 3.2rem);
      pointer-events: auto;
    }
    .navbar-shell {
      position: relative; width: 100%; border-radius: 2.4rem;
    }
    .navbar-glass {
      position: absolute; top: 0; left: 0; width: 100%;
      border-radius: 2.4rem;
      background: rgba(221, 213, 206, 0.55);
      backdrop-filter: blur(48px);
      -webkit-backdrop-filter: blur(48px);
      z-index: 0; height: 4.8rem;
      transition: height 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                  border-radius 0.85s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .navbar-topbar {
      position: relative; z-index: 10;
      display: flex; align-items: center; justify-content: space-between;
      height: 4.8rem; padding: 0 0.8rem;
      opacity: 0;
      animation: navClipIn 1.6s cubic-bezier(0.19, 1, 0.22, 1) 0.3s forwards;
    }
    @keyframes navClipIn {
      from { clip-path: inset(0% 48% 0% 48% round 2rem); opacity: 0; }
      to   { clip-path: inset(0% 0% 0% 0% round 2rem); opacity: 1; }
    }
    .navbar-side { display: flex; align-items: center; }
    .navbar-link {
      font-family: var(--font-magic-ui);
      font-size: 1.35rem; letter-spacing: 0.02em; line-height: 100%;
      padding: 0 1.6rem; height: 3.6rem;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: var(--color-text-dark);
      white-space: nowrap; text-decoration: none;
      font-feature-settings: "dlig" on;
      position: relative; border-radius: 999px;
      transition: opacity 0.2s;
      z-index: 2;
    }
    .navbar-link .pill-bg { display: none; }
    .nav-pill-slider {
      position: absolute;
      top: 0; left: 0;
      border-radius: 999px;
      background: #F6F4EF;
      opacity: 0;
      z-index: 0;
      pointer-events: none;
      transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                  width 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                  height 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                  opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .nav-pill-slider.visible { opacity: 1; }
    .navbar-logo {
      display: flex; align-items: center; justify-content: center;
      height: 100%; padding: 0 0.8rem; cursor: pointer;
      text-decoration: none; color: inherit;
      position: relative; z-index: 2;
    }
    .navbar-logo svg { height: 1.4rem; width: auto; transition: opacity 0.3s; }
    .navbar-logo:hover svg { opacity: 0.6; }

    /* ── Dropdown ── */
    .nav-dropdown {
      position: relative; z-index: 5;
      padding: 0.8rem 0.8rem 0.8rem;
      opacity: 0; transform: translateY(-8px);
      transition: opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1),
                  transform 1.8s cubic-bezier(0.22, 1, 0.36, 1);
      pointer-events: none; max-height: 0; overflow: hidden;
    }
    .nav-dropdown.open {
      opacity: 1; transform: translateY(0);
      pointer-events: auto;
      max-height: calc(100vh - 8rem);
      overflow-y: auto; overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .nav-dropdown.open::-webkit-scrollbar { display: none; }
    .nav-dropdown-panel { display: none; }
    .nav-dropdown-panel.active { display: block; }

    /* ── Studio / Service cards ── */
    .studio-card {
      display: block; border-radius: 2rem; overflow: hidden;
      height: 20rem; margin-bottom: 0.8rem;
      cursor: pointer; text-decoration: none; color: inherit;
      position: relative;
      transition: transform 0.4s cubic-bezier(0.19,1,0.22,1);
    }
    .studio-card:last-child { margin-bottom: 0; }
    .studio-card:hover { transform: scale(0.985); }
    .studio-card:hover .studio-card-img { transform: scale(1.05); }
    .studio-card-img {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; z-index: 1;
      transition: transform 0.6s cubic-bezier(0.19,1,0.22,1);
    }
    .studio-card-label {
      position: relative; z-index: 2;
      display: flex; align-items: flex-end; justify-content: center;
      width: 100%; height: 100%;
      padding-bottom: 1.6rem;
    }
    .studio-card-btn {
      font-family: var(--font-magic-ui);
      font-size: 1.2rem; letter-spacing: 0.02em;
      padding: 0.6rem 1.4rem; border-radius: 999px;
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    }
    .studio-card-btn.light { background: rgba(255,255,255,0.25); color: #fff; }
    .studio-card-btn.dark  { background: rgba(0,0,0,0.06); color: var(--color-text-dark); }
    .studio-card.no-img {
      background: var(--color-brown);
      display: flex; align-items: center; justify-content: center;
    }
    .studio-card.no-img .studio-card-label-text {
      font-family: var(--font-magic-ui);
      font-size: 1.5rem; color: #fff; letter-spacing: -0.002em;
    }

    /* ── Stagger animation ── */
    .nav-dropdown-panel.active > * {
      opacity: 0; transform: translateY(-40px) scaleY(0.96);
      animation: dropIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    .nav-dropdown-panel.active > *:nth-child(1) { animation-delay: 0.1s; }
    .nav-dropdown-panel.active > *:nth-child(2) { animation-delay: 0.25s; }
    .nav-dropdown-panel.active > *:nth-child(3) { animation-delay: 0.4s; }
    .nav-dropdown-panel.active > *:nth-child(4) { animation-delay: 0.55s; }
    .nav-dropdown-panel.active > *:nth-child(5) { animation-delay: 0.7s; }
    .nav-dropdown-panel.active > *:nth-child(6) { animation-delay: 0.85s; }
    .nav-dropdown-panel.active > *:nth-child(7) { animation-delay: 1.0s; }
    @keyframes dropIn {
      from { opacity: 0; transform: translateY(-40px) scaleY(0.96); }
      to   { opacity: 1; transform: translateY(0) scaleY(1); }
    }

    /* ── Responsive ── */
    @media (max-width: 767px) {
      .navbar { top: 0.8rem; max-width: calc(100% - 1.6rem); }
      .navbar-link { font-size: 1.2rem; padding: 0 1rem; }
      .navbar-logo svg { height: 1.2rem; }
      .studio-card { height: 16rem; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── HTML ──
  const html = `
  <header class="navbar-wrapper">
    <nav class="navbar" id="nav" onmouseleave="navClose()">
      <div class="navbar-shell">
        <div class="navbar-glass" id="navGlass"></div>
        <div class="navbar-topbar">
          <div class="navbar-side">
            <a class="navbar-link" href="services.html" onmouseenter="navClose()"><span class="pill-bg"></span>Services</a>
            <a class="navbar-link" href="#" data-menu="projects" onmouseenter="navOpen('projects',this)" onclick="event.preventDefault(); navOpen('projects',this);"><span class="pill-bg"></span>Projects</a>
          </div>
          <a class="navbar-logo" href="index.html" onmouseenter="navClose()">
            <span style="font-family:var(--font-ninna);font-weight:400;font-size:1.4rem;letter-spacing:0.02em;text-transform:uppercase">Living Convenience</span>
          </a>
          <div class="navbar-side">
            <a class="navbar-link" href="about.html" onmouseenter="navClose()"><span class="pill-bg"></span>About</a>
            <a class="navbar-link" href="contact.html" onmouseenter="navClose()"><span class="pill-bg"></span>Contact</a>
          </div>
        </div>
        <div class="nav-dropdown" id="navDrop">
          <div class="nav-dropdown-panel" id="panel-projects">
            <a class="studio-card" href="project-spanish-villa.html" style="background:transparent;"><img class="studio-card-img" src="assets/project-1.jpg" alt=""/><div class="studio-card-label"><span class="studio-card-btn light">Spanish Villa</span></div></a>
            <a class="studio-card" href="project-heritage-courtyard.html" style="background:transparent;"><img class="studio-card-img" src="assets/project-2.jpg" alt=""/><div class="studio-card-label"><span class="studio-card-btn light">Heritage Courtyard</span></div></a>
            <a class="studio-card" href="project-pacific-northwest.html" style="background:transparent;"><img class="studio-card-img" src="assets/project-3.jpg" alt=""/><div class="studio-card-label"><span class="studio-card-btn light">Pacific Northwest</span></div></a>
          </div>
        </div>
      </div>
    </nav>
  </header>
  `;

  // Insert navbar as first child of <body>
  document.body.insertAdjacentHTML('afterbegin', html);

  // ── Sliding pill ──
  const topbar = document.querySelector('.navbar-topbar');
  const pill = document.createElement('div');
  pill.className = 'nav-pill-slider';
  topbar.appendChild(pill);

  let pillTimeout = null;

  function movePill(linkEl) {
    if (pillTimeout) { clearTimeout(pillTimeout); pillTimeout = null; }
    const topbarRect = topbar.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    const x = linkRect.left - topbarRect.left;
    const y = linkRect.top - topbarRect.top;
    pill.style.width = linkRect.width + 'px';
    pill.style.height = linkRect.height + 'px';
    pill.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    pill.classList.add('visible');
  }

  function hidePill() {
    pillTimeout = setTimeout(function () {
      pill.classList.remove('visible');
    }, 80);
  }

  document.querySelectorAll('.navbar-link').forEach(function (link) {
    link.addEventListener('mouseenter', function () { movePill(link); });
  });
  document.querySelector('.navbar-logo').addEventListener('mouseenter', hidePill);
  document.querySelector('.navbar').addEventListener('mouseleave', hidePill);

  // ── JS Logic ──
  const glass = document.getElementById('navGlass');
  const drop = document.getElementById('navDrop');
  const panels = ['projects'];
  let curMenu = null, curLink = null;

  window.navOpen = function (name, el) {
    if (curMenu === name) return;
    if (curLink) curLink.classList.remove('active');
    el.classList.add('active');
    curLink = el;
    panels.forEach(function (p) {
      const panel = document.getElementById('panel-' + p);
      if (panel) panel.classList.remove('active');
    });
    const target = document.getElementById('panel-' + name);
    if (target) target.classList.add('active');
    drop.classList.add('open');
    curMenu = name;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        const contentH = target ? target.scrollHeight : 0;
        const totalH = 48 + 8 + contentH + 8;
        const maxH = window.innerHeight - 32;
        glass.style.height = Math.min(totalH, maxH) + 'px';
        glass.classList.add('expanded');
      });
    });
  };

  window.navClose = function () {
    if (!curMenu) return;
    drop.classList.remove('open');
    panels.forEach(function (p) {
      const panel = document.getElementById('panel-' + p);
      if (panel) panel.classList.remove('active');
    });
    if (curLink) curLink.classList.remove('active');
    curLink = null;
    curMenu = null;
    glass.style.height = '4.8rem';
    glass.classList.remove('expanded');
  };
})();
