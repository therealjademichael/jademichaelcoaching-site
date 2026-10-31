/*
  site.config.js — every editable value for the site lives here.
  Change something here and every page picks it up.
  Values marked PLACEHOLDER still need Jade's input.
*/
window.SITE = {
  brand: "Jade Michael",
  business: "Jade Michael Coaching",
  tagline: "Artistry of consciousness. Connecting you to God within.",
  roles: ["Coach", "Artist", "Cultural Architect"],
  // The title line in the logo lockups (Guidelines 02)
  titleLine: "Coach \u00b7 Artist",

  // PLACEHOLDER: confirm spelling with Jade ("Holy Motherlover" vs "Holy Mother Lover")
  hmlName: "Holy Motherlover",

  // PLACEHOLDER: the name of the 1:1 offer
  offerName: "1:1 Source Code Sessions",

  // Prices stay hidden until Jade says otherwise. Flip to true to show them everywhere.
  showPrices: false,
  pricesHiddenText: "Investment shared on your free connection call.",

  email: "jade@jademichaelcoaching.com",

  // The little line sketch (hair + sunglasses) floating in the bottom-right corner.
  // Retired in Guidelines v1.0 (10.28.26). Click it and you land on the apply page.
  showSketch: false,
  sketchLabel: "Hey love. Apply for a free connection call",

  links: {
    apply: "apply.html",
    intakeFormEmbed: "https://forms.monday.com/forms/embed/aeee108f7b164ce2e61c5d1fa7339398?r=use1",
    intakeFormShort: "https://wkf.ms/4i3Bv3f",
    connectionCall: "https://tidycal.com/1xge45p/30-minute-meeting",
    bookSession: "https://tidycal.com/1xge45p/90-minute-meeting",
    drSam: "https://drsamrader.com",
    instagram: "https://instagram.com/jademichaelll",
    substack: "https://jademichael.substack.com",
    music: "https://open.spotify.com/track/3w2lPV3MOQwv8n4LyDziYl",
    musicEmbed: "https://open.spotify.com/embed/track/3w2lPV3MOQwv8n4LyDziYl?utm_source=generator",
    // PLACEHOLDER: the future Holy Motherlover website. Leave empty until it exists.
    hmlSite: ""
  },

  // PLACEHOLDER: package names are working titles
  offers: [
    {
      name: "The Four-Session Journey",
      summary: "Four sessions over two months, every other week.",
      price: "$1,500",
      priceNote: "or two payments of $750",
      includes: [
        "Four 90-minute Source Code sessions on Zoom",
        "Every other week, so each shift has room to land",
        "A recording of every session",
        "Starts with a free 30-minute connection call"
      ]
    },
    {
      name: "The Six-Month Container",
      summary: "Two 90-minute sessions a month for six months. Twelve sessions in all.",
      price: "$500",
      priceNote: "per month for six months",
      includes: [
        "Twelve 90-minute Source Code sessions on Zoom",
        "Two sessions a month, for the deep, layered stuff",
        "A recording of every session",
        "Starts with a free 30-minute connection call"
      ]
    }
  ],

  // Main menu. "match" lists the pages that light up that menu item.
  nav: [
    { label: "Coaching", href: "coaching.html", match: ["coaching", "source-code", "session", "work-with-jade", "apply"] },
    { label: "Artistry", href: "artistry.html", match: ["artistry", "holy-mother-lover"] },
    { label: "About", href: "about.html" },
    { label: "FAQ", href: "faq.html" }
  ],

  // Extra links that only appear in the footer
  navMore: [
    { label: "Source Code", href: "source-code.html" },
    { label: "Your Session", href: "session.html" },
    { label: "Work With Jade", href: "work-with-jade.html" },
    { label: "Holy Motherlover", href: "holy-mother-lover.html" }
  ],

  // PLACEHOLDER: episode links not collected yet. Add a url and it becomes a link.
  podcasts: [
    { show: "Lunacy", episode: "#55", title: "Neuro-Sovereignty with Jade Michael", url: "" }
  ],

  disclaimer: "Source Code is not intended as treatment for any medical or mental health condition. Coaching is offered as a complementary service; you remain responsible for seeking and continuing professional care."
};
