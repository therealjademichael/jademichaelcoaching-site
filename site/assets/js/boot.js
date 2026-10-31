/* Runs in <head> before paint: sets the theme and flags that JS is on. */
(function () {
  var root = document.documentElement;
  var theme;
  try { theme = localStorage.getItem("jmc-theme"); } catch (e) {}
  root.setAttribute("data-theme", theme || (window.SITE && window.SITE.defaultTheme) || "a");
  root.classList.add("js");
})();
