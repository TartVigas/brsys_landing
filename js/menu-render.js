// js/menu-render.js
import { MENU } from "./menu-data.js";

const $ = (sel, root = document) => root.querySelector(sel);

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined) node.setAttribute(k, v);
  });
  ([]).concat(children).forEach((c) => {
    if (c === null || c === undefined) return;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return node;
}

function buildDesktopNav(items) {
  const nav = el("nav", { class: "nav-desktop", "aria-label": "Menu principal" });

  items.forEach((item) => {
    if (item.type === "link") {
      nav.appendChild(el("a", { href: item.href }, item.label));
      return;
    }

    if (item.type === "dropdown") {
      const wrap = el("div", { class: "dd" });

      const btn = el(
        "button",
        { class: "dd-btn", type: "button", "aria-haspopup": "true", "aria-expanded": "false" },
        [item.label, el("span", { class: "dd-caret", "aria-hidden": "true" }, "▾")]
      );

      const menu = el("div", { class: "dd-menu", role: "menu" });
      const grid = el("div", { class: "dd-grid" });

      item.columns.forEach((col) => {
        const colCls = ["dd-col", col.highlight ? "dd-highlight" : ""].filter(Boolean).join(" ");
        const colEl = el("div", { class: colCls });

        colEl.appendChild(el("div", { class: "dd-title" }, col.title));

        col.links.forEach((lk) => {
          const cls = lk.cta ? "dd-cta" : "";
          colEl.appendChild(el("a", { href: lk.href, class: cls }, lk.label));
        });

        if (col.note) colEl.appendChild(el("small", {}, col.note));
        grid.appendChild(colEl);
      });

      menu.appendChild(grid);
      wrap.appendChild(btn);
      wrap.appendChild(menu);
      nav.appendChild(wrap);
    }
  });

  return nav;
}

function buildMobileNav(items) {
  const nav = el("nav", { class: "nav-mobile", "aria-label": "Menu mobile" });

  items.forEach((item) => {
    if (item.type === "link") {
      nav.appendChild(el("a", { href: item.href }, item.label));
      return;
    }

    if (item.type === "dropdown") {
      const acc = el("div", { class: "m-acc" });

      const head = el(
        "button",
        { class: "m-acc-btn", type: "button", "aria-expanded": "false" },
        [item.label, el("span", { class: "m-acc-caret", "aria-hidden": "true" }, "▾")]
      );

      const body = el("div", { class: "m-acc-body" });

      item.columns.forEach((col) => {
        body.appendChild(el("div", { class: "m-acc-title" }, col.title));
        col.links.forEach((lk) => body.appendChild(el("a", { href: lk.href }, lk.label)));
        if (col.note) body.appendChild(el("div", { class: "m-acc-note" }, col.note));
      });

      head.addEventListener("click", () => {
        const open = acc.classList.toggle("open");
        head.setAttribute("aria-expanded", String(open));
      });

      acc.appendChild(head);
      acc.appendChild(body);
      nav.appendChild(acc);
    }
  });

  // CTAs no mobile (opcional)
  nav.appendChild(el("div", { class: "nav-mobile-cta" }, [
    el("a", { class: "btn btn-secondary", href: MENU.ctas.secondary.href }, MENU.ctas.secondary.label),
    el("a", { class: "btn btn-primary", href: MENU.ctas.primary.href }, MENU.ctas.primary.label),
  ]));

  return nav;
}

export function mountMenu() {
  // Onde vamos renderizar
  const desktopMount = $("#nav-desktop-mount");
  const mobileMount = $("#nav-mobile-mount");

  if (!desktopMount || !mobileMount) {
    console.warn("[menu-render] mounts não encontrados (#nav-desktop-mount / #nav-mobile-mount).");
    return;
  }

  desktopMount.replaceWith(buildDesktopNav(MENU.items));
  mobileMount.replaceWith(buildMobileNav(MENU.items));

  // Fecha menu mobile ao clicar em link
  document.querySelectorAll(".nav-mobile a").forEach((a) => {
    a.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      const navBtn = document.querySelector(".nav-toggle");
      navBtn?.setAttribute("aria-expanded", "false");
    });
  });

  // Click-to-open desktop dropdown (melhor acessibilidade)
  document.querySelectorAll(".dd-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const wrap = btn.closest(".dd");
      const menu = wrap.querySelector(".dd-menu");
      const open = menu.style.display === "block";

      document.querySelectorAll(".dd-menu").forEach((m) => (m.style.display = "none"));
      document.querySelectorAll(".dd-btn").forEach((b) => b.setAttribute("aria-expanded", "false"));

      menu.style.display = open ? "none" : "block";
      btn.setAttribute("aria-expanded", String(!open));
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".dd-menu").forEach((m) => (m.style.display = "none"));
    document.querySelectorAll(".dd-btn").forEach((b) => b.setAttribute("aria-expanded", "false"));
  });
}
