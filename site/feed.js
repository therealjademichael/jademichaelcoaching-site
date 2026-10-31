/*
  feed.js — Jade's Artistry feed. Newest post goes at the TOP.

  To post: copy one { ... } block, paste it at the top of the list, fill it in, save.
    type:  "music", "video", "clip", "culture" or "note"
    title: short headline
    text:  a line or two (optional)
    date:  "2026-10-23" (optional)
    embed: a Spotify or YouTube link (optional). It turns into a player.
    link:  where the "Open" button goes (optional)
*/
window.FEED = [
  {
    type: "music",
    title: "Tantric Trill",
    text: "Out now on Spotify.",
    embed: "https://open.spotify.com/track/3w2lPV3MOQwv8n4LyDziYl",
    link: "https://open.spotify.com/track/3w2lPV3MOQwv8n4LyDziYl"
  },
  {
    type: "culture",
    title: "Holy Motherlover musings",
    text: "Words on grace, the Holy Mother and culture.",
    link: "https://jademichael.substack.com"
  }
];
