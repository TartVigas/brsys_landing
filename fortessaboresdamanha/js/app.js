// Fortes Sabores da Manhã — JS leve (sem dependências)
// - Menu mobile (aria + hidden + body.menu-open)
// - Fecha com ESC / clique fora / ao navegar
// - Scroll suave com offset da topbar
// - Ano automático no rodapé

(() => {
  const menuBtn = document.getElementById("menuBtn");
  const menuPanel = document.getElementById("menuPanel");
  const yearEl = document.getElementById("year");

  // Ano automático
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Helpers
  const setMenuOpen = (open) => {
    if (!menuBtn || !menuPanel) return;

    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuPanel.hidden = !open;

    // compatível com o CSS que usa body.menu-open
    document.body.classList.toggle("menu-open", open);
  };

  const isMenuOpen = () =>
    !!menuBtn && menuBtn.getAttribute("aria-expanded") === "true";

  // Menu mobile
  if (menuBtn && menuPanel) {
    setMenuOpen(false);

    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      setMenuOpen(!isMenuOpen());
    });

    // ESC fecha
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    });

    // Clicar fora fecha (só se estiver aberto)
    document.addEventListener("click", (e) => {
      if (!isMenuOpen()) return;
      const target = e.target;
      if (!(target instanceof Node)) return;

      const clickedInside =
        menuPanel.contains(target) || menuBtn.contains(target);

      if (!clickedInside) setMenuOpen(false);
    });

    // Links do menu fecham o painel
    menuPanel.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setMenuOpen(false));
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

  // Intercepta âncoras (menu + página)
  document.querySelectorAll("a[href^='#']").forEach((a) => {
    a.addEventListener("click", (e) => {
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      history.pushState(null, "", hash);

      // fecha menu antes de scrollar (melhor no mobile)
      setMenuOpen(false);

      // dá 1 frame pro layout estabilizar
      requestAnimationFrame(() => scrollToHash(hash));
    });
  });

  // Se abrir com hash na URL
  if (location.hash) {
    window.addEventListener("load", () => {
      // aguarda pintar o layout
      setTimeout(() => scrollToHash(location.hash), 30);
    });
  }
})();
