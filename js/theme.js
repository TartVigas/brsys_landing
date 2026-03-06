// /js/theme.js — controle de tema dark/light para BRsys
(() => {

  const btn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  if (!btn) return;

  const STORAGE_KEY = "brsys_theme";

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === "dark" || stored === "light") {
      return stored;
    }

    const systemPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    return systemPrefersDark ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateButton(theme);
  }

  function updateButton(theme) {
    if (theme === "light") {
      btn.textContent = "☀️";
      btn.setAttribute("aria-label", "Ativar modo escuro");
    } else {
      btn.textContent = "🌙";
      btn.setAttribute("aria-label", "Ativar modo claro");
    }
  }

  const initialTheme = getPreferredTheme();
  root.setAttribute("data-theme", initialTheme);
  updateButton(initialTheme);

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  });

})();
