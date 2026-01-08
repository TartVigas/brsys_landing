/* =====================================================
   BRsys — app.js Premium
   Projeto: Refúgio da Mata
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  headerOnScroll();
  smoothScroll();
  revealOnScroll();
  floatingWhatsApp();
});

/* ---------- HEADER AO SCROLL ---------- */
function headerOnScroll() {
  const header = document.querySelector("header.top");
  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });
}

/* ---------- SCROLL SUAVE ---------- */
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* ---------- REVEAL SUAVE (PREMIUM) ---------- */
function revealOnScroll() {
  const items = document.querySelectorAll(".section, .gallery img");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => {
    el.classList.add("reveal-init");
    observer.observe(el);
  });
}

/* ---------- WHATSAPP FLUTUANTE ---------- */
function floatingWhatsApp() {
  const btn = document.createElement("a");
  btn.href =
    "https://wa.me/554196366554?text=Olá,%20gostaria%20de%20consultar%20disponibilidade%20no%20Refúgio%20da%20Mata.";
  btn.target = "_blank";
  btn.className = "whatsapp-float";
  btn.setAttribute("aria-label", "Falar no WhatsApp");

  btn.innerHTML = "💬";
  document.body.appendChild(btn);
}
