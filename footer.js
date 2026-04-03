/* =============================================
   Shared Footer — single source of truth
   Include via <script src="footer.js"></script>
   ============================================= */
(function () {
  // ── CSS ──
  const css = `
    footer {
      background-color: var(--color-brown);
      color: #f7f1ea;
      color-scheme: dark;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 6rem;
      overflow: clip;
      padding: 6.4rem 3.2rem 4.8rem;
    }
    .footer-top {
      position: relative;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
    }
    .footer-nav { display: flex; gap: 3.2rem; }
    .footer-nav ul {
      list-style: none; display: flex; flex-shrink: 0;
      flex-direction: column; align-items: flex-start; min-width: 12rem;
    }
    .footer-nav h3 {
      font-family: var(--font-magic-ui);
      font-size: 1.2rem; font-weight: 400;
      margin-bottom: 1.2rem; opacity: 0.5; line-height: 140%;
    }
    .footer-nav li {
      font-family: var(--font-magic-ui);
      font-size: 1.2rem; line-height: 200%;
      color: #f7f1ea;
    }
    .footer-nav li a {
      transition: opacity 0.2s;
    }
    .footer-nav li a:hover { opacity: 0.8; }
    .footer-left {
      display: flex; width: 100%; max-width: 100%;
      align-items: center; justify-content: flex-start;
    }
    .footer-newsletter form {
      display: flex; height: 5.6rem; gap: 0.4rem;
      border-radius: 10rem;
      border: 1px solid rgba(245,240,235,0.2);
      padding: 0.3rem 0.4rem 0.3rem 2rem;
    }
    .footer-newsletter input {
      flex: 1;
      background: transparent !important;
      background-color: transparent !important;
      -webkit-appearance: none; appearance: none;
      color: #f7f1ea;
      font-family: var(--font-magic-ui); font-size: 1.4rem;
      min-width: 15rem; border: none; outline: none;
    }
    .footer-newsletter input::placeholder { color: rgba(245,240,235,0.5); }
    .footer-newsletter button {
      display: flex; align-items: center; justify-content: center;
      height: 4.8rem; padding: 0 2rem; border-radius: 10rem;
      border: none; background-color: rgba(245,240,235,0.15);
      -webkit-appearance: none; appearance: none;
      color: #f7f1ea; cursor: pointer;
      font-family: var(--font-magic-ui); font-size: 1.4rem;
      transition: opacity 0.2s;
    }
    .footer-newsletter button:hover { opacity: 0.9; }
    .footer-bottom {
      display: flex; flex-direction: column;
      align-items: center; gap: 0.8rem;
    }
    .footer-large-text { width: 100%; opacity: 0.15; display: block; }
    .footer-large-text text {
      font-family: Ninna, Georgia, serif;
      font-weight: 400; text-transform: uppercase; fill: #f7f1ea;
    }
    .footer-copyright {
      font-family: var(--font-magic-ui);
      font-size: 1.1rem; opacity: 0.4; letter-spacing: 0.02em;
    }
    @media (max-width: 767px) {
      .footer-top { flex-direction: column; }
      .footer-nav { display: grid; grid-template-columns: 1fr 1fr; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── HTML ──
  const html = `
  <footer>
    <div class="footer-top">
      <nav class="footer-nav">
        <ul>
          <h3 style="opacity:0.5">Services</h3>
          <li><a href="services.html#network">Network</a></li>
          <li><a href="services.html#light">Light</a></li>
          <li><a href="services.html#sound">Sound</a></li>
          <li><a href="services.html#security">Security</a></li>
          <li><a href="services.html#climate">Climate</a></li>
          <li><a href="services.html#intelligence">Intelligence</a></li>
        </ul>
        <ul>
          <h3 style="opacity:0.5">Projects</h3>
          <li><a href="project-spanish-villa.html">Spanish Villa</a></li>
          <li><a href="project-heritage-courtyard.html">Heritage Courtyard</a></li>
          <li><a href="project-pacific-northwest.html">Pacific Northwest</a></li>
        </ul>
        <ul>
          <h3 style="opacity:0.5">Company</h3>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
        <ul>
          <h3 style="opacity:0.5">Service Area</h3>
          <li>San Francisco</li>
          <li>Peninsula</li>
          <li>South Bay</li>
          <li>East Bay</li>
        </ul>
        <ul>
          <h3 style="opacity:0.5">Connect</h3>
          <li><a href="https://www.instagram.com/livingconvenience" target="_blank">Instagram</a></li>
          <li><a href="tel:+14156523100">(415) 652-3100</a></li>
          <li><a href="mailto:info@livingconvenience.com">info@livingconvenience.com</a></li>
        </ul>
      </nav>
      <div class="footer-left">
        <div class="footer-newsletter">
          <form onsubmit="return false;">
            <input type="email" placeholder="Email" name="email"/>
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <svg class="footer-large-text" viewBox="0 0 1000 100" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="82" font-size="100" textLength="1000" lengthAdjust="spacingAndGlyphs">LIVING CONVENIENCE</text>
      </svg>
      <p class="footer-copyright">&copy; 2026 Living Convenience &bull; All Rights Reserved</p>
    </div>
  </footer>
  `;

  // Insert footer before closing </body>
  document.body.insertAdjacentHTML('beforeend', html);
})();
