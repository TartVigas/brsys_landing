// /js/nav.js — menu simples (desktop + mobile) sem mexer no index
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);

  const desktopMount = $("#nav-desktop-mount");
  const mobileMount = $("#nav-mobile-mount");
  const toggleBtn = $(".nav-toggle");
  const header = $(".site-header");

  if (!desktopMount || !mobileMount || !toggleBtn) return;

  // Ajuste os links aqui (pode ser #ancora ou /pagina/)
  const NAV = [
    { label: "Plataforma", href: "#plataforma" },
    { label: "PMS", href: "/pms/" },
    { label: "Marketing", href: "/seo-local-hoteis/" },
    { label: "Gestão", href: "/checklist-gestao-hotel/" },
    { label: "Destinos", href: "/destinos/" },
    { label: "Recursos", href: "#recursos" },
    { label: "Contato", href: "#contato" }
  ];

  function renderNav(container, mode) {
    const nav = document.createElement("nav");
    nav.className = `site-nav site-nav--${mode}`;

    const ul = document.createElement("ul");
    ul.className = "nav-list";

    NAV.forEach((item) => {
      const li = document.createElement("li");
      li.className = "nav-item";

      const a = document.createElement("a");
      a.className = "nav-link";
      a.href = item.href;
      a.textContent = item.label;

      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);
    container.innerHTML = "";
    container.appendChild(nav);
  }

  renderNav(desktopMount, "desktop");
  renderNav(mobileMount, "mobile");

  // Backdrop
  const backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  backdrop.hidden = true;
  document.body.appendChild(backdrop);

  function openNav() {
    document.body.classList.add("nav-open");
    toggleBtn.setAttribute("aria-expanded", "true");
    backdrop.hidden = false;
  }

  function closeNav() {
    document.body.classList.remove("nav-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    backdrop.hidden = true;
  }

  toggleBtn.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("nav-open");
    isOpen ? closeNav() : openNav();
  });

  backdrop.addEventListener("click", closeNav);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  // Smooth scroll para âncoras
  function smoothScrollTo(hash) {
    const el = document.querySelector(hash);
    if (!el) return;

    const headerH = header ? header.offsetHeight : 0;
    const top = el.getBoundingClientRect().top + window.scrollY - headerH - 12;
    window.scrollTo({ top, behavior: "smooth" });
  }

  function onNavClick(e) {
    const a = e.target.closest("a");
    if (!a) return;

    const href = a.getAttribute("href") || "";
    if (href.startsWith("#")) {
      e.preventDefault();
      closeNav();
      smoothScrollTo(href);
      history.replaceState(null, "", href);
    } else {
      closeNav();
    }
  }

  desktopMount.addEventListener("click", onNavClick);
  mobileMount.addEventListener("click", onNavClick);

  // Active link (simples)
  function markActive() {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    document.querySelectorAll(".nav-link").forEach((a) => {
      const href = (a.getAttribute("href") || "").replace(/\/+$/, "");
      const isActive =
        (!href.startsWith("#") && (href === path || (href !== "/" && path.startsWith(href))));
      a.classList.toggle("is-active", isActive);
    });
  }
  markActive();
})();
