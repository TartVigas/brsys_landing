// Fortes Sabores da Manhã — JS leve (sem dependências)
// - Menu mobile
// - Scroll suave com offset da topbar
// - Fecha menu ao navegar
// - Ano automático no rodapé

(() => {
  const menuBtn = document.getElementById("menuBtn");
  const menuPanel = document.getElementById("menuPanel");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  const setMenu = (open) => {
    if (!menuBtn || !menuPanel) return;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuPanel.hidden = !open;
  };

  if (menuBtn && menuPanel) {
    setMenu(false);

    menuBtn.addEventListener("click", () => {
      const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
      setMenu(!isOpen);
    });

    // ESC fecha
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });

    // Clicar fora fecha
    document.addEventListener("click", (e) => {
      const target = e.target;
      const clickedInside = menuPanel.contains(target) || menuBtn.contains(target);
      if (!clickedInside) setMenu(false);
    });

    // Links do menu fecham o painel
    menuPanel.querySelectorAll("a[href^='#']").forEach((a) => {
      a.addEventListener("click", () => setMenu(false));
    });
  }

  // Scroll com offset da topbar
  const getTopbarOffset = () => {
    const header = document.querySelector(".topbar");
    return header ? header.getBoundingClientRect().height + 12 : 84;
  };

  const scrollToHash = (hash) => {
    const el = document.querySelector(hash);
    if (!el) return;
    const y = window.scrollY + el.getBoundingClientRect().top - getTopbarOffset();
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  document.querySelectorAll("a[href^='#']").forEach((a) => {
    a.addEventListener("click", (e) => {
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      history.pushState(null, "", hash);
      scrollToHash(hash);
    });
  });

  // Se abrir com hash na URL
  if (location.hash) {
    window.addEventListener("load", () => scrollToHash(location.hash));
  }
})();
(() => {
  const btn = document.querySelector('.menuBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });

  document.querySelectorAll('.menuPanel a').forEach(a => {
    a.addEventListener('click', () => document.body.classList.remove('menu-open'));
  });
})();


