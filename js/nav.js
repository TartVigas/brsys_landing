// /js/nav.js — menu simples + mobile drawer + active link
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);

  const desktopMount = $("#nav-desktop-mount");
  const toggleBtn = $(".nav-toggle");
  const header = $(".site-header");

  if (!desktopMount || !toggleBtn) return;

  // Ajuste aqui os links (pode ser #ancora ou /pagina/)
  const NAV = [
    { label: "Plataforma", href: "#topo" },
    { label: "PMS", href: "/pms/" },
    { label: "Marketing", href: "/marketing/" },
    { label: "Gestão", href: "/gestao/" },
    { label: "Destinos", href: "/destinos/" },
    { label: "Recursos", href: "#recursos" },
    { label: "Contato", href: "#contato" },
  ];

  function isSamePageHashLink(href) {
    return typeof href === "string" && href.startsWith("#");
  }

  function renderNav(container, opts = { mode: "desktop" }) {
    const nav = document.createElement("nav");
    nav.className = `site-nav site-nav--${opts.mode}`;

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

  // Desktop nav
  renderNav(desktopMount, { mode: "desktop" });

  // Mobile drawer
  const mobileDrawer = document.createElement("div");
  mobileDrawer.className = "nav-drawer";
  mobileDrawer.setAttribute("aria-hidden", "true");

  const mobileInner = document.createElement("div");
  mobileInner.className = "nav-drawer__inner";

  const mobileMount = document.createElement("div");
  mobileMount.className = "nav-drawer__mount";

  // CTA mobile (opcional)
  const mobileCtas = document.createElement("div");
  mobileCtas.className = "nav-drawer__ctas";
  mobileCtas.innerHTML = `
    <a class="btn btn-primary nav-cta" href="#contato">Agendar demo</a>
    <a class="btn btn-secondary nav-cta" href="#recursos">Baixar materiais</a>
  `;

  mobileInner.appendChild(mobileMount);
  mobileInner.appendChild(mobileCtas);
  mobileDrawer.appendChild(mobileInner);
  document.body.appendChild(mobileDrawer);

  renderNav(mobileMount, { mode: "mobile" });

  const backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  backdrop.hidden = true;
  document.body.appendChild(backdrop);

  function openDrawer() {
    toggleBtn.setAttribute("aria-expanded", "true");
    mobileDrawer.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    document.documentElement.classList.add("nav-open");
  }

  function closeDrawer() {
    toggleBtn.setAttribute("aria-expanded", "false");
    mobileDrawer.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
    document.documentElement.classList.remove("nav-open");
  }

  toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    expanded ? closeDrawer() : openDrawer();
  });

  backdrop.addEventListener("click", closeDrawer);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
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
    if (isSamePageHashLink(href)) {
      e.preventDefault();
      closeDrawer();
      smoothScrollTo(href);
      history.replaceState(null, "", href);
    } else {
      // em links de página, fecha drawer e segue normal
      closeDrawer();
    }
  }

  desktopMount.addEventListener("click", onNavClick);
  mobileDrawer.addEventListener("click", onNavClick);

  // Active link (simples)
  function markActive() {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    document.querySelectorAll(".nav-link").forEach((a) => {
      const href = (a.getAttribute("href") || "").replace(/\/+$/, "");
      const isActive =
        href === path ||
        (href !== "/" && href && !href.startsWith("#") && path.startsWith(href));
      a.classList.toggle("is-active", isActive);
    });
  }
  markActive();
})();
