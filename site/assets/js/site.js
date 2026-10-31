/*
  site.js — shared header + footer, wiring to site.config.js, the preview
  theme toggle, and the little magic. Everything decorative here is optional:
  the pages read fine without it.
*/
(function () {
  var S = window.SITE || {};
  var doc = document;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, S);
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  var STAR_PATH = "M12 0C12.8 7.2 16.8 11.2 24 12 16.8 12.8 12.8 16.8 12 24 11.2 16.8 7.2 12.8 0 12 7.2 11.2 11.2 7.2 12 0Z";
  var MARK =
    '<svg class="wordmark__mark" viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2">' +
    '<circle cx="16" cy="16" r="6"/><circle cx="16" cy="16" r="10.5" opacity=".55"/><circle cx="16" cy="16" r="15" opacity=".28"/>' +
    '<path fill="currentColor" stroke="none" d="M16 11.4c.3 2.5 1.6 3.8 4.1 4.1-2.5.3-3.8 1.6-4.1 4.1-.3-2.5-1.6-3.8-4.1-4.1 2.5-.3 3.8-1.6 4.1-4.1z"/></svg>';
  var WORDMARK = MARK + "<span>Jade <em>Michael</em></span>";
  var apply = get("links.apply") || "apply.html";

  var here = (location.pathname.split("/").pop() || "index").replace(/\.html$/, "") || "index";
  function isHere(item) {
    var name = item.href.replace(/\.html$/, "");
    return name === here || (item.match || []).indexOf(here) !== -1;
  }

  /* ---------- Header ---------- */
  var header = doc.querySelector("[data-site-header]");
  if (header) {
    var items = (S.nav || []).map(function (n) {
      return '<li><a href="' + n.href + '"' + (isHere(n) ? ' aria-current="page"' : "") + ">" + esc(n.label) + "</a></li>";
    }).join("");
    header.innerHTML =
      '<div class="container header__inner">' +
      '<a class="wordmark" href="index.html" aria-label="Jade Michael, home">' + WORDMARK + "</a>" +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="nav-toggle__bars" aria-hidden="true"></span>Menu</button>' +
      '<nav id="site-nav" class="nav" aria-label="Main"><ul>' + items + "</ul>" +
      '<a class="btn btn--small" href="' + apply + '">Free connection call</a></nav></div>';

    var toggle = header.querySelector(".nav-toggle");
    var nav = header.querySelector(".nav");
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    }
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Footer ---------- */
  var footer = doc.querySelector("[data-site-footer]");
  if (footer) {
    var year = new Date().getFullYear();
    var fine =
      '<div class="footer__fine">' +
      "<p>" + esc(S.disclaimer || "") + ' <a href="care.html">Care &amp; Fit</a></p>' +
      '<p>Source Code created by <a href="' + get("links.drSam") + '" target="_blank" rel="noopener">Dr. Sam Rader</a>.</p>' +
      "<p>&copy; " + year + " " + esc(S.business || "") + "</p></div>";
    if (footer.getAttribute("data-variant") === "mini") {
      footer.classList.add("footer--mini");
      footer.innerHTML = '<div class="container">' + fine + "</div>";
    } else {
      var navList = (S.nav || []).concat(S.navMore || []).map(function (n) { return '<li><a href="' + n.href + '">' + esc(n.label) + "</a></li>"; }).join("");
      footer.innerHTML =
        '<div class="container"><div class="footer__grid">' +
        '<div class="footer__brand"><a class="wordmark" href="index.html" aria-label="Jade Michael, home">' + WORDMARK + "</a><p>" + esc(S.tagline || "") + "</p></div>" +
        '<div><p class="footer__h">Explore</p><ul class="footer__list">' + navList + '<li><a href="' + apply + '">Apply for a free connection call</a></li></ul></div>' +
        '<div><p class="footer__h">Connect</p><ul class="footer__list">' +
        '<li><a href="' + get("links.instagram") + '" target="_blank" rel="noopener">Instagram</a></li>' +
        '<li><a href="' + get("links.substack") + '" target="_blank" rel="noopener">Holy Motherlover on Substack</a></li>' +
        '<li><a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a></li></ul></div>" +
        '<div><p class="footer__h">Fine print</p><ul class="footer__list">' +
        '<li><a href="care.html">Care &amp; Fit</a></li><li><a href="privacy.html">Privacy</a></li><li><a href="terms.html">Terms</a></li><li><a href="links.html">Links</a></li></ul></div>' +
        "</div>" + fine + "</div>";
    }
  }

  /* ---------- Config wiring ---------- */
  doc.querySelectorAll("[data-href]").forEach(function (el) {
    var v = get(el.getAttribute("data-href"));
    if (v) el.setAttribute("href", v);
    // data-optional: only show the link once its config value is filled in
    if (el.hasAttribute("data-optional")) el.hidden = !v;
  });
  doc.querySelectorAll("[data-text]").forEach(function (el) {
    var v = get(el.getAttribute("data-text"));
    if (v != null) el.textContent = v;
  });
  doc.querySelectorAll("[data-src]").forEach(function (el) {
    var v = get(el.getAttribute("data-src"));
    if (v) el.setAttribute("src", v);
  });
  doc.querySelectorAll("[data-roles]").forEach(function (ul) {
    if (S.roles && S.roles.length) ul.innerHTML = S.roles.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("");
  });
  doc.querySelectorAll("[data-email]").forEach(function (el) {
    el.setAttribute("href", "mailto:" + S.email);
    if (!el.textContent.trim()) el.textContent = S.email;
  });

  function priceHTML(o) {
    if (S.showPrices) return '<p class="offer__price">' + esc(o.price) + (o.priceNote ? "<small>" + esc(o.priceNote) + "</small>" : "") + "</p>";
    return '<p class="offer__price is-hidden">' + esc(S.pricesHiddenText || "") + "</p>";
  }
  doc.querySelectorAll("[data-offers]").forEach(function (wrap) {
    wrap.innerHTML = (S.offers || []).map(function (o, i) {
      var deep = i === 1;
      return '<article class="offer' + (deep ? " offer--deep" : "") + '" data-reveal data-delay="' + i + '">' +
        '<p class="offer__tag">' + (deep ? "The deep container" : "The beginning") + "</p>" +
        "<h3>" + esc(o.name) + "</h3>" +
        '<p class="offer__summary">' + esc(o.summary) + "</p>" +
        "<ul>" + o.includes.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
        priceHTML(o) +
        '<a class="btn" href="' + apply + '">Apply for a free connection call</a></article>';
    }).join("");
  });
  doc.querySelectorAll("[data-podcasts]").forEach(function (list) {
    list.innerHTML = (S.podcasts || []).map(function (p) {
      var link = p.url
        ? '<a class="text-link" href="' + p.url + '" target="_blank" rel="noopener">Listen</a>'
        : '<span class="small">Link coming soon</span>';
      return '<li><span class="listen__show">' + esc(p.show) + " &middot; " + esc(p.episode) + '</span><p class="listen__title">' + esc(p.title) + "</p>" + link + "</li>";
    }).join("");
  });

  /* ---------- Artistry feed (posts live in feed.js) ---------- */
  function embedUrl(url) {
    var m = /open\.spotify\.com\/(track|album|playlist|episode)\/([A-Za-z0-9]+)/.exec(url || "");
    if (m) return { src: "https://open.spotify.com/embed/" + m[1] + "/" + m[2], kind: "spotify" };
    m = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{6,})/.exec(url || "");
    if (m) return { src: "https://www.youtube-nocookie.com/embed/" + m[1], kind: "youtube" };
    return null;
  }
  doc.querySelectorAll("[data-feed]").forEach(function (box) {
    var posts = window.FEED || [];
    if (!posts.length) { box.innerHTML = '<p class="small">New posts coming soon.</p>'; return; }
    box.innerHTML = posts.map(function (p, i) {
      var e = embedUrl(p.embed);
      var player = e
        ? '<div class="feed-item__embed feed-item__embed--' + e.kind + '"><iframe src="' + e.src + '" title="' + esc(p.title) + '" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe></div>'
        : "";
      var date = p.date ? '<time datetime="' + esc(p.date) + '">' + esc(new Date(p.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })) + "</time>" : "";
      return '<article class="feed-item feed-item--' + esc(p.type || "note") + '" data-reveal data-delay="' + Math.min(i, 3) + '">' +
        '<p class="feed-item__meta"><span>' + esc(p.type || "note") + "</span>" + date + "</p>" +
        "<h3>" + esc(p.title || "") + "</h3>" +
        (p.text ? "<p>" + esc(p.text) + "</p>" : "") +
        player +
        (p.link && !e ? '<a class="text-link" href="' + esc(p.link) + '" target="_blank" rel="noopener">Open</a>' : "") +
        "</article>";
    }).join("");
  });

  /* ---------- Photo fallbacks: missing file shows the gradient placeholder ---------- */
  doc.querySelectorAll(".frame img").forEach(function (img) {
    function miss() { img.closest(".frame").classList.add("is-missing"); }
    if (img.complete && img.naturalWidth === 0) miss();
    img.addEventListener("error", miss);
  });

  /* ---------- PREVIEW ONLY: theme toggle. Remove this block at launch. ---------- */
  var root = doc.documentElement;
  var tt = doc.createElement("div");
  tt.className = "theme-toggle";
  tt.setAttribute("role", "group");
  tt.setAttribute("aria-label", "Preview theme");
  tt.innerHTML = "<span>Preview:</span>" +
    '<button type="button" data-theme-set="a" title="Theme A: Golden Hour">A</button>' +
    '<button type="button" data-theme-set="b" title="Theme B: Night Chapel">B</button>';
  doc.body.appendChild(tt);
  function syncTheme() {
    tt.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-theme-set") === root.getAttribute("data-theme")));
    });
  }
  tt.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    var t = b.getAttribute("data-theme-set");
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("jmc-theme", t); } catch (err) {}
    syncTheme();
  });
  syncTheme();
  /* ---------- end preview-only block ---------- */

  /* ---------- The sketch: hair + sunglasses, bottom-right ---------- */
  if (S.showSketch) {
    var fab = doc.createElement("a");
    fab.className = "sketch-fab";
    fab.href = apply;
    fab.setAttribute("aria-label", S.sketchLabel || "Apply for a free connection call");
    // plain <img> layers (not CSS masks) so it also shows when a page is opened straight from disk
    fab.innerHTML =
      '<span class="sketch-fab__art" aria-hidden="true">' +
      '<img class="sketch-ink" src="assets/img/jade-sketch.png" alt="">' +
      '<img class="sketch-gold" src="assets/img/jade-sketch-gold.png" alt="">' +
      '<img class="sketch-hair" src="assets/img/jade-sketch-hair-gold.png" alt="">' +
      "</span>" +
      '<span class="sketch-fab__glint g1" aria-hidden="true"></span>' +
      '<span class="sketch-fab__glint g2" aria-hidden="true"></span>' +
      '<span class="sketch-fab__glint g3" aria-hidden="true"></span>' +
      '<span class="sketch-fab__tip" aria-hidden="true">Hey love &#10022; come say hi</span>';
    doc.body.appendChild(fab);
    if (!reduced) {
      var shimmer = function () {
        fab.classList.remove("is-shimmering");
        void fab.offsetWidth; // restart the animation
        fab.classList.add("is-shimmering");
      };
      setTimeout(shimmer, 2600);
      fab.addEventListener("mouseenter", shimmer);
      fab.addEventListener("focus", shimmer);
    }
  }

  /* ---------- Magic: scroll progress hairline ---------- */
  var bar = doc.createElement("div");
  bar.className = "progress";
  bar.setAttribute("aria-hidden", "true");
  doc.body.appendChild(bar);
  function onProgress() {
    var span = doc.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (span > 0 ? window.scrollY / span : 0) + ")";
  }
  onProgress();
  window.addEventListener("scroll", onProgress, { passive: true });

  if (reduced) {
    doc.querySelectorAll("[data-reveal]").forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  /* ---------- Magic: reveals (+ one-time gold shimmer on .gold-moment words) ---------- */
  var watched = doc.querySelectorAll("[data-reveal], .gold-moment");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        e.target.querySelectorAll(".gold-moment").forEach(function (g) { g.classList.add("is-visible"); });
        io.unobserve(e.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    watched.forEach(function (el) { io.observe(el); });
  } else {
    watched.forEach(function (el) { el.classList.add("is-visible"); });
  }
  // safety sweep: anything already in or above the viewport shows itself
  function sweep() {
    var vh = window.innerHeight;
    doc.querySelectorAll("[data-reveal]:not(.is-visible)").forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 1.05) el.classList.add("is-visible");
    });
  }
  setTimeout(sweep, 1500);
  setTimeout(sweep, 4000);
  var sweepTimer;
  window.addEventListener("scroll", function () {
    clearTimeout(sweepTimer);
    sweepTimer = setTimeout(sweep, 120);
  }, { passive: true });

  /* ---------- Magic: quantum motes rising in [data-motes] ---------- */
  doc.querySelectorAll("[data-motes]").forEach(function (box) {
    var n = parseInt(box.getAttribute("data-motes"), 10) || 14;
    for (var i = 0; i < n; i++) {
      var m = doc.createElement("span");
      m.className = "mote";
      var size = 2 + Math.random() * 3.5;
      m.style.cssText = "left:" + (Math.random() * 100) + "%;width:" + size + "px;height:" + size + "px;" +
        "animation-duration:" + (14 + Math.random() * 16) + "s;animation-delay:" + (-Math.random() * 24) + "s;" +
        "--drift:" + (Math.random() * 60 - 30) + "px;";
      box.appendChild(m);
    }
  });

  /* ---------- Magic: a few stars pop when you tap a button ---------- */
  doc.addEventListener("click", function (e) {
    var t = e.target.closest(".btn, .link-btn, .sketch-fab");
    if (!t || e.clientX === 0) return;
    for (var i = 0; i < 7; i++) {
      var s = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
      s.setAttribute("viewBox", "0 0 24 24");
      s.setAttribute("class", "spark-pop");
      s.innerHTML = '<path d="' + STAR_PATH + '"/>';
      var ang = (Math.PI * 2 * i) / 7 + Math.random() * 0.5;
      var dist = 26 + Math.random() * 26;
      s.style.left = e.clientX + "px";
      s.style.top = e.clientY + "px";
      s.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      s.style.setProperty("--dy", Math.sin(ang) * dist + "px");
      doc.body.appendChild(s);
      setTimeout(function (el) { el.remove(); }, 900, s);
    }
  });
})();
