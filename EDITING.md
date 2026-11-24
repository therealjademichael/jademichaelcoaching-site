# Editing jademichael.co

This site has two kinds of changes. A robot called the **Plumbing check** looks at every
change and tells you which kind it is.

## Painting: Jade publishes these herself

Words, pictures, colors and styles.

- the wording on any page
- the words in `site/site.config.js` (tagline, offer descriptions, what's included)
- colors, fonts and spacing (`site/assets/css/style.css`)
- adding or swapping photos
- posts in the Artistry feed (`site/feed.js`), with links to Spotify, YouTube, Instagram,
  Substack, SoundCloud, Apple Music, Vimeo or TikTok

How it goes: Jade's Claude makes the change on a branch and opens a pull request. Netlify
builds a preview link. Jade looks at the preview. If the Plumbing check is **green
("Painting only")** and Jade says yes, her Claude merges it and the change is live in
about a minute.

## Plumbing: these wait for Woody

Anything that moves money, data or people through the site.

- prices, and whether prices show (`showPrices`)
- where any button, menu item or link goes, including the booking (TidyCal) and intake
  form (monday.com) links
- email addresses shown on the site
- adding, removing or renaming a page
- the header, footer, menu and theme code (`site/assets/js/`)
- the search-engine setting (`noindex`, `site/_headers`) and site settings (`netlify.toml`)
- `CLAUDE.md` and the Plumbing check itself (`.github/`)

If the Plumbing check is **red ("Plumbing change")**, don't merge it. Send it to Woody in
Slack as a "Plumbing request for Woody" with the pull request link and one line on what
you want changed.

## Rules for Jade's Claude

1. Never push straight to `main`. Always a branch and a pull request.
2. Merge only when the Plumbing check is green **and** Jade has seen the preview and said yes.
3. Never edit anything in `.github/`.
4. After merging, open the live page and confirm the change is there.
