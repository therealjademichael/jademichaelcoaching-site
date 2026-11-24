// Plumbing check for jademichael.co pull requests.
//
// Jade (and her Claude) may merge "painting" changes herself: words, pictures, colors, styles,
// and posts in her Artistry feed.
// Anything that moves money, data or people through the site is "plumbing" and waits for Woody.
// This check fails when a pull request touches plumbing, so it's obvious which is which.
//
// Plumbing = a protected file changed, a page added or removed, or any link, price, form,
// script, email address or site switch changed anywhere (even inside a file that is otherwise
// just words).

import { execSync } from "node:child_process";

const base = process.env.BASE_SHA;
const head = process.env.HEAD_SHA;
const sh = (cmd) => execSync(cmd, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

// Files that are always plumbing on this site.
const PROTECTED = [
  /^site\/assets\/js\//,   // site.js and boot.js: header, footer, menu, theme, the apply button
  /^netlify\.toml$/,
  /^netlify\//,
  /^site\/_headers$/,      // keeps the site out of search engines until launch
  /^site\/_redirects$/,
  /^package(-lock)?\.json$/,
  /^CLAUDE\.md$/,          // the rules Claude follows on this site
  /^\.github\//,
  /^\.gitignore$/,
];

// The Artistry feed is Jade's to post in. A post may link or embed from these places only;
// a link anywhere else is plumbing.
// The brand file is Jade's: colors, fonts and the Google Fonts line that loads them.
const BRAND = /^site\/assets\/css\/brand\.css$/;
const FONT_HOSTS = /^https:\/\/fonts\.(googleapis|gstatic)\.com\//i;

const FEED = /^site\/feed\.js$/;
const FEED_HOSTS = /^https:\/\/([a-z0-9-]+\.)*(spotify\.com|youtube\.com|youtu\.be|youtube-nocookie\.com|instagram\.com|substack\.com|soundcloud\.com|music\.apple\.com|vimeo\.com|tiktok\.com)(\/|$)/i;

// Things inside any file that are plumbing: links, prices, forms and their fields, scripts,
// element ids, email addresses, and the site-wide switches in site.config.js.
function plumbingTokens(text) {
  const out = [];
  const grab = (re, tag) => { for (const m of text.matchAll(re)) out.push(`${tag}:${m.slice(1).filter(Boolean).join("=") || m[0]}`); };
  grab(/https?:\/\/[^\s"'<>`)]+/g, "url");
  grab(/\bhref\s*[=:]\s*["']([^"']*)["']/g, "href");
  grab(/\baction\s*=\s*["']([^"']*)["']/g, "action");
  grab(/<(form|input|select|textarea|button|dialog|iframe)\b[^>]*>/g, "tag");
  grab(/\bname\s*=\s*["']([^"']*)["']/g, "name");
  grab(/\bid\s*=\s*["']([^"']*)["']/g, "id");
  grab(/\b(data-netlify|netlify-honeypot|form-name)\b/g, "netlify");
  grab(/<script\b[^>]*>[\s\S]*?<\/script>/g, "script");
  grab(/\bon[a-z]+\s*=\s*["'][^"']*["']/g, "handler");
  grab(/<meta\s+(?:http-equiv|name\s*=\s*["']robots["'])[^>]*>/gi, "meta"); // refresh redirects and the search-engine switch
  grab(/[\w-]+\.html\b/g, "page");                                   // which page a menu item or button opens
  grab(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "email");
  grab(/\$\s?\d[\d,]*(\.\d+)?/g, "price");
  grab(/\b(showPrices|showSketch|defaultTheme)\s*:\s*([^,\n]+)/g, "switch");
  grab(/\b(match)\s*:\s*(\[[^\]]*\])/g, "nav");
  grab(/"(href|url|link|cta|ctaHref|buttonHref|formName|formId)"\s*:\s*"([^"]*)"/g, "jsonlink");
  return out.sort();
}

const show = (sha, file) => { try { return sh(`git show ${sha}:"${file}"`); } catch { return null; } };

const changed = sh(`git diff --name-status ${base} ${head}`).trim().split("\n").filter(Boolean);
const problems = [];

for (const line of changed) {
  const [status, ...files] = line.split("\t"); // a rename lists the old and the new name
  const file = files[files.length - 1];
  const hit = files.find((f) => PROTECTED.some((re) => re.test(f)));
  if (hit) { problems.push(`${hit}: protected plumbing file`); continue; }
  if (/^site\/[^/]+\.html$/.test(file) && /^[ADR]/.test(status)) { problems.push(`${file}: page added, removed or renamed`); continue; }
  if (/\.(png|jpe?g|webp|gif|svg|avif|heic|woff2?|ico)$/i.test(file) && !/^[DR]/.test(status)) continue; // new or replaced pictures and fonts are painting
  if (/^[DR]/.test(status)) { problems.push(`${file}: file removed or renamed (something may still point to it)`); continue; }
  const before = plumbingTokens(show(base, file) ?? "");
  const after = plumbingTokens(show(head, file) ?? "");
  if (FEED.test(file)) {
    // Feed posts come and go; only a link to somewhere off the list is plumbing.
    const was = new Set(before);
    const odd = after.filter((t) => !was.has(t) && t.startsWith("url:") && !FEED_HOSTS.test(t.slice(4)));
    if (odd.length) problems.push(`${file}: a feed post links somewhere new (${odd.map((t) => t.slice(4)).join(", ")})`);
    continue;
  }
  if (BRAND.test(file)) {
    // A new font from Google Fonts is painting; any other new address is plumbing.
    const was = new Set(before);
    const odd = after.filter((t) => !was.has(t) && !(t.startsWith("url:") && FONT_HOSTS.test(t.slice(4))));
    if (odd.length) problems.push(`${file}: something other than a Google Fonts address was added (${odd.map((t) => t.slice(t.indexOf(":") + 1)).join(", ")})`);
    continue;
  }
  if (before.join("\n") !== after.join("\n")) problems.push(`${file}: a link, price, form, script, email address or site switch changed`);
}

const summary = problems.length
  ? `## Plumbing change: Woody merges this one\n\n${problems.map((p) => `- ${p}`).join("\n")}\n\nSend it to Woody as a "Plumbing request for Woody" in Slack.`
  : `## Painting only: Jade can merge this herself\n\nNo links, prices, forms, scripts, protected files or pages were changed.`;

if (process.env.GITHUB_STEP_SUMMARY) sh(`cat >> "$GITHUB_STEP_SUMMARY" <<'EOF'\n${summary}\nEOF`);
console.log(summary);
process.exit(problems.length ? 1 : 0);
