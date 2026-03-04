// /js/theme.js — alterna dark/light usando data-theme no <html>
(() => {
  const btn = document.getElementById("theme-toggle");
  const root = document.documentElement;
  if (!btn) return;

  const stored = localStorage.getItem("brsys_theme");
  if (stored === "dark" || stored === "light") root.setAttribute("data-theme", stored);

  function syncIcon() {
    const theme = root.getAttribute("data-theme") || "dark";
    btn.textContent = theme === "light" ? "☀️" : "🌙";
  }

  syncIcon();

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("brsys_theme", next);
    syncIcon();
  });
})();
