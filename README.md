# Jade Michael Coaching — preview site

A preview of Jade Michael's 1:1 Source Code sessions site. Plain HTML, one CSS file and a little vanilla JavaScript. There is no framework, no build step and no `npm install`. Drop the folder on any static host and it works.

**This is a preview, not a launch.** Every page carries `noindex`, and `_headers` adds `X-Robots-Tag: noindex` on Netlify too.

## Deploy (Netlify)

The site is connected to Jade's Netlify project (elaborate-mooncake-3b4d74) through this GitHub repo. Every push to `main` deploys. `netlify.toml` publishes the `site/` folder as-is; there is no build step.

Don't touch any domain or DNS until Jade signs off.

## File layout

```
index.html            Landing: Jade's photo, "Coach · Artist · Cultural Architect", three doors (Coaching, Music, Culture)
coaching.html         Coaching: her message, Neurosovereignty, the Costa Rica initiation, Source Code, offers
artistry.html         Artistry: Music + Culture doors, latest release, the feed, Holy Motherlover card
feed.js               Jade's Artistry feed (newest post at the top)
holy-mother-lover.html  Culture landing that will link to the future Holy Motherlover site
source-code.html      The method, credited to Dr. Sam Rader
session.html          The 7 steps of a session
work-with-jade.html   Packages + how we begin
about.html            Jade's story, first person
apply.html            Embedded monday.com intake form
faq.html              Questions
care.html             Care & Fit + the disclaimer
links.html            Link-in-bio page (replaces Komi)
privacy.html, terms.html   Placeholders

site.config.js        EVERY editable value: offer name, prices, links, email, flags
assets/css/style.css  All styles. Theme colors are at the top.
assets/js/boot.js     Sets the theme before the page paints
assets/js/site.js     Header, footer, config wiring, theme toggle, the little magic
assets/photos/        Photos (drop-in replacements)
assets/img/           The line sketch (full lines + hair-only layer for the shimmer)
```

## Editing copy

- **Links, emails, prices, offer names, podcasts:** change `site.config.js`. Every page reads from it.
- **Show prices:** set `showPrices: true`. When it's `false`, cards say "Investment shared on your free connection call."
- **Navigation:** the `nav` list in `site.config.js` (Coaching, Artistry, About, FAQ). The header and footer are built from it. `navMore` adds footer-only links.
- **Roles line, Holy Motherlover name and future site:** `roles`, `hmlName` and `links.hmlSite` in `site.config.js`. Fill in `links.hmlSite` and a "Visit Holy Motherlover" button appears on its own.
- **Page words:** edit the page's `.html` file directly. Headings and paragraphs are plain text.

## Posting to the Artistry feed

Open `feed.js`, copy one `{ ... }` block, paste it at the top of the list and fill it in. Paste a Spotify or YouTube link into `embed` and it becomes a player. Save and redeploy.

## Swapping photos

Replace the file in `assets/photos/` with the same name and it's done.

| File | Where it shows | Current photo |
|---|---|---|
| `hero.jpg` | Landing photo | Red sandstone, looking up and away |
| `kimono.jpg` | Culture door, Coaching "initiation" | Green kimono on the clifftop |
| `meet-jade.jpg` | Coaching door | Smiling by the ocean |
| `about-1.jpg` | Coaching hero, About, Source Code | Pebble beach, sandstone cliff |
| `about-2.jpg` | Music door, Artistry hero, About, Links avatar | Black hat, gold choker |

Portrait-ish images (about 4:5) look best. If a file goes missing, the frame shows a soft gradient placeholder instead of a broken image.

## Themes

Two complete palettes, sampled from Jade's photos, live at the top of `style.css`:

- **A, "Golden Hour":** cream, ink, terracotta, sea-glass, gold
- **B, "Night Chapel":** deep forest-ink, cream, candle-gold, sage, sea-glass

The floating **Preview: A / B** toggle (bottom left) switches them and remembers the choice in the browser. **It's preview-only.** At launch, set `defaultTheme` in `site.config.js` to the winner and delete the block marked `PREVIEW ONLY` in `assets/js/site.js`.

## The sketch (bottom right)

A line drawing of Jade (hair and sunglasses) floats in the bottom-right corner and links to the apply page. A few seconds after the page loads, and again on hover, gold shimmers down the hair and fades. To remove it, set `showSketch: false` in `site.config.js`.

## The little magic

These are all in `site.js` and the bottom of `style.css`, and all of them turn off when a visitor's device asks for reduced motion:

- Ripple rings (a stone dropped in still water) in the hero and the dark bands
- A gold shimmer that passes once through key italic words as they arrive (`.gold-moment`)
- Golden motes drifting up through the hero and the closing band
- Small stars that pop when you tap a button
- A thin gold progress line along the top while you scroll
- In Night Chapel, a soft candle glow breathing behind the hero

## Guardrails (keep these when editing)

- Never say "therapy," "cure," "treat," "treatment for [condition]" or "diagnose," and never promise results. (Two allowed exceptions: the exact disclaimer text, and the FAQ question "Is this therapy?", which is answered "No.")
- Jade's OCD story stays in her own first-person words on the About page. The site never claims sessions treat any condition.
- Always credit Source Code to Dr. Sam Rader. Don't list the 12 pattern names, don't use the title "Solvent" and don't reproduce Dr. Sam's materials.
- No content from client sessions. The only testimonial is Miles's public one, flagged `<!-- confirm consent with Miles -->` in `index.html`.
- No Holy Motherlover apparel store. No links or products from former partners. Substack appears on the links page, the footer and the Holy Motherlover page.
- No crisis-line section or 988/911 links (removed at Jade's request, 10.23.26).
- The disclaimer text is fixed: "Source Code is not intended as treatment for any medical or mental health condition. Coaching is offered as a complementary service; you remain responsible for seeking and continuing professional care." It's in `site.config.js` (footer) and `care.html`.

## Still needs Jade

- Theme A or B
- Strike-through pass on all copy (she's reviewing this version)
- The Holy Motherlover mission statement (drafted in her voice; marked DRAFT in the page)
- Offer name (currently "1:1 Source Code Sessions") and package names ("The Four-Session Journey", "The Six-Month Container")
- Show prices: yes or no
- Photo credits (the photographers aren't credited on the site yet)
- More testimonials (two placeholder slots on Home), plus consent from Miles
- The Lunacy #55 podcast link (and any other episodes to list)
- Final Privacy and Terms language
- Keep or drop the sketch
- Holy Motherlover: spelling, her words for its page, and the future site address
- Real music releases, videos and clips for Artistry (three "coming soon" slots)
