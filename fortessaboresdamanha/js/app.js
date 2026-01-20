// js/app.js — Fortes Sabores da Manhã (chique, leve, sem dependências)
// - Menu mobile com aria + overlay
// - Ícone vira X quando aberto (body.menu-open)
// - Fecha com ESC / clique fora / ao navegar
// - Scroll suave com offset da topbar
// - Ano automático no rodapé

(() => {
  const menuBtn = document.getElementById("menuBtn");
  const menuPanel = document.getElementById("menuPanel");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // cria overlay (chique)
  const overlay = document.createElement("div");
  overlay.className = "menuOverlay";
  overlay.hidden = true;
  document.body.appendChild(overlay);

  const setMenuOpen = (open) => {
    if (!menuBtn || !menuPanel) return;

    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuPanel.hidden = !open;

    document.body.classList.toggle("menu-open", open);

    overlay.hidden = !open;
    overlay.setAttribute("aria-hidden", open ? "false" : "true");
  };

  const isMenuOpen = () =>
    !!menuBtn && menuBtn.getAttribute("aria-expanded") === "true";

  if (menuBtn && menuPanel) {
    setMenuOpen(false);

    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      setMenuOpen(!isMenuOpen());
    });

    overlay.addEventListener("click", () => setMenuOpen(false));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    });

    // Links do menu fecham
    menuPanel.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setMenuOpen(false));
    });

    // Clicar fora fecha
    document.addEventListener("click", (e) => {
      if (!isMenuOpen()) return;
      const target = e.target;
      if (!(target instanceof Node)) return;

      const clickedInside =
        menuPanel.contains(target) || menuBtn.contains(target) || overlay.contains(target);

      if (!clickedInside) setMenuOpen(false);
    });
  }

  // Scroll com offset da topbar
  const getTopbarOffset = () => {
    const header = document.querySelector(".topbar");
    if (!header) return 84;
    return header.getBoundingClientRect().height + 12;
  };

  const scrollToHash = (hash) => {
    if (!hash || hash === "#") return;
    const el = document.querySelector(hash);
    if (!el) return;

    const y = window.scrollY + el.getBoundingClientRect().top - getTopbarOffset();
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  document.querySelectorAll("a[href^='#']").forEach((a) => {
    a.addEventListener("click", (e) => {
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      history.pushState(null, "", hash);

      setMenuOpen(false);
      requestAnimationFrame(() => scrollToHash(hash));
    });
  });

  if (location.hash) {
    window.addEventListener("load", () => {
      setTimeout(() => scrollToHash(location.hash), 30);
    });
  }
})();

// Overlay CSS injected (pra não depender de duplicação manual)
(() => {
  const css = `
    .menuOverlay{
      position: fixed;
      inset: 0;
      background: rgba(46,31,22,.22);
      backdrop-filter: blur(3px);
      z-index: 49;
    }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();
