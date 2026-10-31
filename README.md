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
assets/js/boot.js     Flags that JS is on before the page paints
assets/js/site.js     Header, footer, config wiring, the little magic
assets/photos/        Photos (drop-in replacements)
assets/img/           The gold mark, favicons, and the retired line sketch
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

## The brand

The site follows Jade Michael Coaching Brand Guidelines v1.0 (10.30.26), in the Team Share Drive under `JMC Branding/02 Final`. Read them before any change to the look.

- **One look, Moonstone Sand.** There is no theme switcher. Colors are at the top of `style.css`.
- **Three fonts, all Google Fonts:** Cormorant Garamond (titles and italics), Marcellus (small spaced capitals only), Jost (reading and buttons). The font link repeats in the `<head>` of every page.
- **Every word sits on an ivory card**, on the moonstone ground. Header and footer are black.
- **The mark is always the original gold file** (`assets/img/jade-mark-gold.png`). Never recolor or redraw it.
- **Doors:** Coaching on Ivory, Music on Sand, Fashion on Black.
- **The moonstone ground tile isn't in the repo yet.** Until it is, the ground is plain Moonstone Ground. The line to swap is marked in `style.css`.

## The sketch

Retired in the guidelines (10.28.26), so `showSketch` is `false` in `site.config.js`.

## The little magic

These are in `style.css` and `site.js`, and they all turn off when a visitor's device asks for reduced motion:

- Prism light leaks at the left and right edges of the homepage hero
- A sand shimmer that passes once through key italic words as they arrive (`.gold-moment`)
- The rainbow line under the header, above the footer, and filling across the top as you scroll

Retired in the guidelines: motes, film grain, candle glow, ripples and the stars on buttons.

## Guardrails (keep these when editing)

- Never say "therapy," "cure," "treat," "treatment for [condition]" or "diagnose," and never promise results. (Two allowed exceptions: the exact disclaimer text, and the FAQ question "Is this therapy?", which is answered "No.")
- Jade's OCD story stays in her own first-person words on the About page. The site never claims sessions treat any condition.
- Always credit Source Code to Dr. Sam Rader. Don't list the 12 pattern names, don't use the title "Solvent" and don't reproduce Dr. Sam's materials.
- No content from client sessions. The only testimonial is Miles's public one, flagged `<!-- confirm consent with Miles -->` in `index.html`.
- No Holy Motherlover apparel store. No links or products from former partners. Substack appears on the links page, the footer and the Holy Motherlover page.
- No crisis-line section or 988/911 links (removed at Jade's request, 10.23.26).
- The disclaimer text is fixed: "Source Code is not intended as treatment for any medical or mental health condition. Coaching is offered as a complementary service; you remain responsible for seeking and continuing professional care." It's in `site.config.js` (footer) and `care.html`.

## Still needs Jade

- Strike-through pass on all copy (she's reviewing this version)
- The Holy Motherlover mission statement (drafted in her voice; marked DRAFT in the page)
- Offer name (currently "1:1 Source Code Sessions") and package names ("The Four-Session Journey", "The Six-Month Container")
- Show prices: yes or no
- Photo credits (the photographers aren't credited on the site yet)
- More testimonials (two placeholder slots on Home), plus consent from Miles
- The Lunacy #55 podcast link (and any other episodes to list)
- Final Privacy and Terms language
- Holy Motherlover: spelling, her words for its page, and the future site address
- Real music releases, videos and clips for Artistry (three "coming soon" slots)
