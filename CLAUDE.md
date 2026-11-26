# CLAUDE.md — Jade Michael Co LLC site (jademichael.co)

Read `README.md` first: it covers the file layout, how to edit copy, how to swap photos and the brand system.

All site files live in `site/`. Paths below (`site.config.js`, `assets/...`) are relative to that folder.

## How to work here

- Static HTML + `assets/css/style.css` + vanilla JS. No framework, no build step, no npm. Keep it that way.
- Values that repeat across pages (links, emails, prices, offer names, nav, podcasts, disclaimer) live in `site.config.js`. Change them there, not in the HTML.
- Header and footer are rendered by `assets/js/site.js` from the config. Don't paste them into pages.
- Reuse the existing CSS classes. Colors and fonts come from CSS custom properties in `assets/css/brand.css`; never hard-code a hex or a font in a page.
- The site is open to search engines as of 11.25.26 (Woody's call). Don't add `noindex` back. The one exception is the retired `holy-mother-lover.html`, which stays hidden. A new page goes in `site/sitemap.xml`.
- Accessibility: semantic HTML, alt text on every photo, visible focus, AA contrast, and everything decorative off under `prefers-reduced-motion`.

## Voice

Jade's two registers at once: playful and street ("come play in the quantum," "babyyy," "God mode") and reverent and mystic (surrender, "God is love," the Kybalion). Confident, intimate, a little irreverent, never clinical. Short sentences. No profanity on the site.

## Hard guardrails

- Never write "therapy," "cure," "treat," "treatment for [condition]," "diagnose," or promise results. Exceptions: the exact disclaimer, and the FAQ question "Is this therapy?" (answered "No").
- The OCD story stays first person, on About only. The site never claims sessions treat any condition.
- Credit Source Code to Dr. Sam Rader wherever the method is explained. No 12 pattern names, no "Solvent," no reproduction of Dr. Sam's materials.
- No client session content. Only Miles's public testimonial, and confirm consent before launch.
- No Holy Motherlover store or products on this site. The Fashion door and the footer link go to holymotherlover.com, which is its own site. No links or products from former partners. No crisis-line section or 988/911 links (Jade's call).
- Jade is the creator (not co-creator) of Neurosovereignty.
- Artistry feed posts go in `feed.js`, newest first.
- Don't build a form. The intake form is monday.com, and booking is TidyCal (URLs in `site.config.js`).
- Don't touch domains or DNS, and don't deploy to production without Jade's go-ahead.

## Publishing: painting vs plumbing

Read `EDITING.md`. Every pull request gets a **Plumbing check**. Green ("Painting only") means Jade can have it merged after she has seen the preview and said yes. Red ("Plumbing change") waits for Woody: send it to him in Slack as a "Plumbing request for Woody". Never push straight to `main`, and never edit `.github/`.

## Before launch

1. Done 11.25.26: `noindex` removed and `_headers` deleted.
2. Decide on `showPrices`.
3. Confirm consent for Miles's testimonial.
