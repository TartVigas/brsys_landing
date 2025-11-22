// BRsys Sites - scripts principais

// Toggle menu mobile
const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navMobileLinks = document.querySelectorAll(".nav-mobile a[href^='#']");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    body.classList.toggle("nav-open");
  });
}

// Fecha o menu ao clicar em links de navegação mobile
navMobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
  });
});

// Scroll suave para âncoras (desktop + mobile)
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();
    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
    const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 12);

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });
  });
});

// Pequena sombra no header ao rolar
const header = document.querySelector(".site-header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });
}
