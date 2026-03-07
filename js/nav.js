// /js/nav.js — BRsys nav simples e estável
(() => {
  const toggleBtn = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  const backdrop = document.querySelector(".nav-backdrop");
  const links = document.querySelectorAll(".nav-link");

  if (!toggleBtn || !drawer || !backdrop) return;

  function openMenu() {
    drawer.classList.add("is-open");
    document.body.classList.add("nav-open");
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.setAttribute("aria-label", "Fechar menu");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
  }

  function closeMenu() {
    drawer.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Abrir menu");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
  }

  function isOpen() {
    return drawer.classList.contains("is-open");
  }

  toggleBtn.addEventListener("click", () => {
    if (isOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener("click", closeMenu);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 980 && isOpen()) {
      closeMenu();
    }
  });

  links.forEach((link) => {
    const href = link.getAttribute("href") || "";

    if (!href.startsWith("#")) return;

    link.addEventListener("click", (e) => {
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

      window.scrollTo({
        top,
        behavior: "smooth"
      });

      if (window.innerWidth < 980) {
        closeMenu();
      }
    });
  });

  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    const targetPath = href.replace(/\/+$/, "") || "/";
    if (targetPath === currentPath) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  closeMenu();
})();
