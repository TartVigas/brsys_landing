// Fortes Sabores da Manhã — JS FINAL
// Menu mobile + scroll suave + acessibilidade

(() => {
  const menuBtn = document.getElementById("menuBtn");
  const menuPanel = document.getElementById("menuPanel");
  const year = document.getElementById("year");
  const body = document.body;

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (!menuBtn || !menuPanel) return;

  const openMenu = () => {
    menuBtn.setAttribute("aria-expanded", "true");
    menuPanel.hidden = false;
    body.classList.add("menu-open");
  };

  const closeMenu = () => {
    menuBtn.setAttribute("aria-expanded", "false");
    menuPanel.hidden = true;
    body.classList.remove("menu-open");
  };

  // Estado inicial
  closeMenu();

  // Toggle
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!menuPanel.contains(e.target) && !menuBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Fecha com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Fecha ao clicar em links
  menuPanel.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Scroll suave com offset
  const getOffset = () => {
    const header = document.querySelector(".topbar");
    return header ? header.offsetHeight + 10 : 80;
  };

  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - getOffset();
      window.scrollTo({ top: y, behavior: "smooth" });
      history.pushState(null, "", this.getAttribute("href"));
    });
  });

})();
