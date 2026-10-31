# CLAUDE.md — Jade Michael Coaching site

Read `README.md` first: it covers the file layout, how to edit copy, how to swap photos and the theme toggle.

All site files live in `site/`. Paths below (`site.config.js`, `assets/...`) are relative to that folder.

## How to work here

- Static HTML + `assets/css/style.css` + vanilla JS. No framework, no build step, no npm. Keep it that way.
- Values that repeat across pages (links, emails, prices, offer names, nav, podcasts, disclaimer) live in `site.config.js`. Change them there, not in the HTML.
- Header and footer are rendered by `assets/js/site.js` from the config. Don't paste them into pages.
- Reuse the existing CSS classes. Colors come from CSS custom properties; never hard-code a hex in a page.
- Every page keeps `<meta name="robots" content="noindex, nofollow">` until launch.
- Accessibility: semantic HTML, alt text on every photo, visible focus, AA contrast, and everything decorative off under `prefers-reduced-motion`.

## Voice

Jade's two registers at once: playful and street ("come play in the quantum," "babyyy," "God mode") and reverent and mystic (surrender, "God is love," the Kybalion). Confident, intimate, a little irreverent, never clinical. Short sentences. No profanity on the site.

## Hard guardrails

- Never write "therapy," "cure," "treat," "treatment for [condition]," "diagnose," or promise results. Exceptions: the exact disclaimer, and the FAQ question "Is this therapy?" (answered "No").
- The OCD story stays first person, on About only. The site never claims sessions treat any condition.
- Credit Source Code to Dr. Sam Rader wherever the method is explained. No 12 pattern names, no "Solvent," no reproduction of Dr. Sam's materials.
- No client session content. Only Miles's public testimonial, and confirm consent before launch.
- No Holy Motherlover apparel store. No links or products from former partners. No crisis-line section or 988/911 links (Jade's call).
- Jade is the creator (not co-creator) of Neurosovereignty.
- Artistry feed posts go in `feed.js`, newest first.
- Don't build a form. The intake form is monday.com, and booking is TidyCal (URLs in `site.config.js`).
- Don't touch domains or DNS, and don't deploy to production without Jade's go-ahead.

## Before launch

1. Pick the theme: set `defaultTheme` and delete the `PREVIEW ONLY` block in `site.js`.
2. Remove `noindex` from every page and delete `_headers`.
3. Decide on `showPrices` and `showSketch`.
