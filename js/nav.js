// /js/nav.js — menu global BRsys (desktop + mobile)
// Header simplificado: Plataforma, PMS, Marketing, Gestão, Recursos, Sobre
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const desktopMount = $("#nav-desktop-mount");
  const mobileMount = $("#nav-mobile-mount");
  const toggleBtn = $(".nav-toggle");
  const header = $(".site-header");

  if (!desktopMount || !mobileMount || !toggleBtn) return;

  const NAV = [
    { label: "Plataforma", href: "/plataforma/" },
    { label: "PMS", href: "/pms/" },
    { label: "Marketing", href: "/marketing/" },
    { label: "Gestão", href: "/gestao/" },
    { label: "Recursos", href: "/recursos/" },
    { label: "Sobre", href: "/sobre/" }
  ];

  function normalizePath(path) {
    if (!path) return "/";
    const cleaned = path.replace(/\/+$/, "");
    return cleaned || "/";
  }

  function createLink(item) {
    const a = document.createElement("a");
    a.className = "nav-link";
    a.href = item.href;
    a.textContent = item.label;
    a.setAttribute("data-href", item.href);
    return a;
  }

  function renderNav(container, mode) {
    const nav = document.createElement("nav");
    nav.className = `site-nav site-nav--${mode}`;
    nav.setAttribute(
      "aria-label",
      mode === "desktop" ? "Navegação principal" : "Navegação móvel"
    );

    const ul = document.createElement("ul");
    ul.className = "nav-list";

    NAV.forEach((item) => {
      const li = document.createElement("li");
      li.className = "nav-item";
      li.appendChild(createLink(item));
      ul.appendChild(li);
    });

    nav.appendChild(ul);
    container.innerHTML = "";
    container.appendChild(nav);
  }

  renderNav(desktopMount, "desktop");
  renderNav(mobileMount, "mobile");

  let backdrop = $(".nav-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    backdrop.hidden = true;
    document.body.appendChild(backdrop);
  }

  function openNav() {
    document.body.classList.add("nav-open");
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.setAttribute("aria-label", "Fechar menu");
    backdrop.hidden = false;
  }

  function closeNav() {
    document.body.classList.remove("nav-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Abrir menu");
    backdrop.hidden = true;
  }

  function isMobileOpen() {
    return document.body.classList.contains("nav-open");
  }

  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.setAttribute("aria-label", "Abrir menu");

  toggleBtn.addEventListener("click", () => {
    isMobileOpen() ? closeNav() : openNav();
  });

  backdrop.addEventListener("click", closeNav);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMobileOpen()) {
      closeNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980 && isMobileOpen()) {
      closeNav();
    }
  });

  function smoothScrollTo(hash) {
    const el = document.querySelector(hash);
    if (!el) return false;

    const headerH = header ? header.offsetHeight : 0;
    const top = el.getBoundingClientRect().top + window.scrollY - headerH - 12;

    window.scrollTo({
      top,
      behavior: "smooth"
    });

    return true;
  }

  function handleNavClick(e) {
    const a = e.target.closest("a");
    if (!a) return;

    const href = a.getAttribute("href") || "";

    // Caso seja âncora local
    if (href.startsWith("#")) {
      const ok = smoothScrollTo(href);
      if (ok) {
        e.preventDefault();
        closeNav();
        history.replaceState(null, "", href);
      }
      return;
    }

    let url;
    try {
      url = new URL(a.href, window.location.origin);
    } catch (_) {
      closeNav();
      return;
    }

    const currentPath = normalizePath(window.location.pathname);
    const targetPath = normalizePath(url.pathname);

    // Caso seja mesma página com hash
    if (url.hash && currentPath === targetPath) {
      const ok = smoothScrollTo(url.hash);
      if (ok) {
        e.preventDefault();
        closeNav();
        history.replaceState(null, "", url.hash);
      }
      return;
    }

    // Links normais: fecha o menu e força navegação
    e.preventDefault();
    closeNav();
    window.location.href = url.href;
  }

  desktopMount.addEventListener("click", handleNavClick);
  mobileMount.addEventListener("click", handleNavClick);

  function markActive() {
    const currentPath = normalizePath(window.location.pathname);

    $$(".nav-link").forEach((a) => {
      const rawHref = a.getAttribute("data-href") || a.getAttribute("href") || "";
      let isActive = false;

      if (!rawHref.startsWith("#")) {
        try {
          const url = new URL(rawHref, window.location.origin);
          const targetPath = normalizePath(url.pathname);

          isActive =
            targetPath === currentPath ||
            (targetPath !== "/" && currentPath.startsWith(targetPath + "/")) ||
            (targetPath !== "/" && currentPath === targetPath);
        } catch (_) {
          isActive = false;
        }
      }

      a.classList.toggle("is-active", isActive);

      if (isActive) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  markActive();
})();
