// Fortes Sabores da Manhã — JS leve (sem dependências)
// - Menu mobile (abre/fecha)
// - Scroll suave com offset da topbar
// - Fecha menu ao navegar / ao clicar fora / ESC
// - Ano automático no rodapé

(() => {
  const menuBtn = document.getElementById("menuBtn");
  const menuPanel = document.getElementById("menuPanel");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const isOpen = () => menuBtn?.getAttribute("aria-expanded") === "true";

  const setMenu = (open) => {
    if (!menuBtn || !menuPanel) return;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuPanel.hidden = !open;
  };

  // MENU
  if (menuBtn && menuPanel) {
    setMenu(false);

    menuBtn.addEventListener("click", () => setMenu(!isOpen()));

    // ESC fecha
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });

    // clique fora fecha
    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!t) return;
      const clickedInside = menuPanel.contains(t) || menuBtn.contains(t);
      if (!clickedInside) setMenu(false);
    });

    // links do painel fecham
    menuPanel.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setMenu(false));
    });
  }

  // OFFSET DA TOPBAR
  const getTopbarOffset = () => {
    const header = document.querySelector(".topbar");
    if (!header) return 84;
    const h = header.getBoundingClientRect().height || 84;
    return h + 12;
  };

  const scrollToHash = (hash) => {
    if (!hash || hash === "#") return;
    const el = document.querySelector(hash);
    if (!el) return;

    const y = window.scrollY + el.getBoundingClientRect().top - getTopbarOffset();
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Scroll suave para âncoras
  document.querySelectorAll("a[href^='#']").forEach((a) => {
    a.addEventListener("click", (e) => {
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      history.pushState(null, "", hash);
      scrollToHash(hash);
    });
  });

  // Se abrir com hash na URL
  window.addEventListener("load", () => {
    if (location.hash) scrollToHash(location.hash);
  });
})();
