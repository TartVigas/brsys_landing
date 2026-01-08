/* =====================================================
   BRsys — app.js (Dark Clean)
   Projeto: Refúgio da Mata | Demo Profissional
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  handleHeaderScroll();
  smoothInternalLinks();
});

/* ---------- HEADER COM SOMBRA AO SCROLL ---------- */
function handleHeaderScroll() {
  const header = document.querySelector("header.top");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* ---------- SCROLL SUAVE PARA ÂNCORAS ---------- */
function smoothInternalLinks() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);

      if (!targetEl) return;

      e.preventDefault();
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

/* ---------- UTILITÁRIO FUTURO (RESERVADO) ----------
   Espaço preparado para:
   - animações leves
   - toggle dark/light (se quiser)
   - lazy-load manual
-------------------------------------------------- */

