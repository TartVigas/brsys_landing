// /js/nav.js — menu global BRsys
// Desktop + mobile drawer
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

  function smoothScrollTo(hash) {
    const target = document.querySelector(hash);
    if (!target) return false;

    const headerHeight = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

    window.scrollTo({
      top,
      behavior: "smooth"
    });

    return true;
  }

  function closeNav() {
    document.body.classList.remove("nav-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Abrir menu");

    if (backdrop) {
      backdrop.hidden = true;
    }
  }

  function openNav() {
    document.body.classList.add("nav-open");
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.setAttribute("aria-label", "Fechar menu");

    if (backdrop) {
      backdrop.hidden = false;
    }
  }

  function isMobileOpen() {
    return document.body.classList.contains("nav-open");
  }

  function handleLinkNavigation(anchor, mode) {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href") || "";

      if (!href) return;

      // Âncora local direta
      if (href.startsWith("#")) {
        const ok = smoothScrollTo(href);
        if (ok) {
          e.preventDefault();
          if (mode === "mobile") closeNav();
          history.replaceState(null, "", href);
        }
        return;
      }

      let url;
      try {
        url = new URL(anchor.href, window.location.origin);
      } catch (_) {
        return;
      }

      const currentPath = normalizePath(window.location.pathname);
      const targetPath = normalizePath(url.pathname);

      // Mesmo path, mas com hash
      if (url.hash && currentPath === targetPath) {
        const ok = smoothScrollTo(url.hash);
        if (ok) {
          e.preventDefault();
          if (mode === "mobile") closeNav();
          history.replaceState(null, "", url.hash);
        }
        return;
      }

      // No mobile, fecha antes de navegar
      if (mode === "mobile") {
        e.preventDefault();
        closeNav();

        window.setTimeout(() => {
          window.location.assign(url.href);
        }, 180);
      }
    });
  }

  function createLink(item, mode) {
    const a = document.createElement("a");
    a.className = "nav-link";
    a.href = item.href;
    a.textContent = item.label;
    a.setAttribute("data-href", item.href);

    handleLinkNavigation(a, mode);

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
      li.appendChild(createLink(item, mode));
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

  toggleBtn.setAttribute("type", "button");
  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.setAttribute("aria-label", "Abrir menu");

  toggleBtn.addEventListener("click", () => {
    if (isMobileOpen()) {
      closeNav();
    } else {
      openNav();
    }
  });

  backdrop.addEventListener("click", closeNav);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMobileOpen()) {
      closeNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 980 && isMobileOpen()) {
      closeNav();
    }
  });

  function markActive() {
    const currentPath = normalizePath(window.location.pathname);

    $$(".nav-link").forEach((link) => {
      const rawHref = link.getAttribute("data-href") || link.getAttribute("href") || "";
      let isActive = false;

      if (!rawHref.startsWith("#")) {
        try {
          const url = new URL(rawHref, window.location.origin);
          const targetPath = normalizePath(url.pathname);

          isActive =
            targetPath === currentPath ||
            (targetPath !== "/" && currentPath.startsWith(targetPath + "/"));
        } catch (_) {
          isActive = false;
        }
      }

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  markActive();
})();
