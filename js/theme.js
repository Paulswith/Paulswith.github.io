(() => {
  // <stdin>
  function initTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIconLight = document.getElementById("theme-icon-light");
    const themeIconDark = document.getElementById("theme-icon-dark");
    if (!themeToggle) return;
    function updateIcons(isDark) {
      themeIconLight?.classList.toggle("hidden", isDark);
      themeIconDark?.classList.toggle("hidden", !isDark);
    }
    themeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateIcons(isDark);
    });
    updateIcons(document.documentElement.classList.contains("dark"));
  }
  document.addEventListener("DOMContentLoaded", initTheme);
})();
