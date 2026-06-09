/* VCAIL Lab Theme — app.js
   Handles: dark mode toggle, mobile nav, publications client-side filtering */

(function () {
  'use strict';

  // ── Dark mode ──────────────────────────────────────────────────────────────

  const DARK_KEY = 'vcail-theme';

  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
    const icon = dark ? '🌙' : '☀️';
    document.querySelectorAll('.theme-toggle span').forEach(el => el.textContent = icon);
  }

  function initTheme() {
    const stored = localStorage.getItem(DARK_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = stored !== null ? stored === 'dark' : prefersDark;
    applyTheme(dark);
  }

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = !isDark;
    localStorage.setItem(DARK_KEY, next ? 'dark' : 'light');
    applyTheme(next);
  }

  initTheme();

  document.addEventListener('DOMContentLoaded', function () {

    // Theme toggle buttons
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // ── Mobile nav ───────────────────────────────────────────────────────────

    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('nav-mobile-menu');
    const iconOpen  = document.getElementById('nav-icon-open');
    const iconClose = document.getElementById('nav-icon-close');

    if (navToggle && mobileMenu) {
      navToggle.addEventListener('click', function () {
        const open = mobileMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open);
        if (iconOpen)  iconOpen.style.display  = open ? 'none'  : '';
        if (iconClose) iconClose.style.display = open ? '' : 'none';
      });
    }

    // ── Publications filtering ───────────────────────────────────────────────

    const pubList = document.getElementById('pub-list');
    if (!pubList || typeof window.__PUBS__ === 'undefined') return;

    const pubs       = window.__PUBS__;
    const searchEl   = document.getElementById('pub-search');
    const yearEl     = document.getElementById('pub-year');
    const tagEl      = document.getElementById('pub-tag');
    const countEl    = document.getElementById('pub-count');

    function renderPub(pub) {
      const authors = pub.authors || [];
      const authorStr = authors.length > 5
        ? authors.slice(0, 5).join(', ') + ' et al.'
        : authors.join(', ');

      const badges = (pub.tags || []).map(t =>
        `<span class="badge">${esc(t)}</span>`
      ).join(' ');

      const links = [];
      if (pub.pdfHref) links.push(`<a href="${esc(pub.pdfHref)}" target="_blank" rel="noopener">PDF</a>`);
      if (pub.doi)     links.push(`<a href="https://doi.org/${esc(pub.doi)}" target="_blank" rel="noopener">DOI</a>`);

      const award = pub.award
        ? `<div class="award-highlight mt-2">🏆 ${esc(pub.award)}</div>` : '';

      return `
        <div class="card pub-list-item">
          <div class="pub-year-col">${esc(String(pub.year))}</div>
          <div class="pub-info">
            <div style="margin-bottom:0.3rem">${badges}</div>
            <div class="pub-title">
              <a href="${esc(pub.url)}">${esc(pub.title)}</a>
            </div>
            <div class="pub-meta">${esc(authorStr)} &middot; ${esc(pub.venue)}</div>
            ${award}
            ${links.length ? `<div class="pub-links">${links.join('')}</div>` : ''}
          </div>
        </div>`;
    }

    function esc(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function filter() {
      const q    = (searchEl ? searchEl.value : '').toLowerCase().trim();
      const year = yearEl ? yearEl.value : '';
      const tag  = tagEl  ? tagEl.value  : '';

      const filtered = pubs.filter(pub => {
        if (year && String(pub.year) !== year) return false;
        if (tag  && !(pub.tags || []).includes(tag)) return false;
        if (q) {
          const haystack = [pub.title, ...(pub.authors || [])].join(' ').toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      });

      pubList.innerHTML = filtered.map(renderPub).join('');

      if (countEl) {
        countEl.textContent = filtered.length === pubs.length
          ? `${pubs.length} publications`
          : `${filtered.length} of ${pubs.length} publications`;
      }
    }

    if (searchEl) searchEl.addEventListener('input',  filter);
    if (yearEl)   yearEl.addEventListener('change',   filter);
    if (tagEl)    tagEl.addEventListener('change',    filter);

    filter(); // initial render
  });

})();
