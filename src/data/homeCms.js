// ─────────────────────────────────────────────────────────────────────────────
// SITE CONTENT FILE — mindfullyarticulated.com
// ─────────────────────────────────────────────────────────────────────────────
// Edit the text values in this file to update the site.
// Rules:
//   ✏️  Safe to edit  — change the text between the quotes freely
//   🖼️  Images        — swap the file path or URL (keep the quotes)
//   ⚠️  Technical     — leave these alone unless you know what you're doing
//
// After saving, the site updates automatically (if running locally) or on
// the next deploy.
// ─────────────────────────────────────────────────────────────────────────────

export const homeCms = {
  // ── BRAND ──────────────────────────────────────────────────────────────────
  // Used in the nav logo and footer.
  brand: {
    name: "MAD", // ✏️ Studio name
    logo: "/ma.png", // 🖼️ Logo file (place in /public)
    logoWhite: "/bgwhi.png", // 🖼️ White version of the logo (used in footer)
    email: "hello@mindfullyarticulated.com", // ✏️ General contact email
    serviceByLabel: "Service by", // ✏️ Small label under the logo
  },

  // ── NAVIGATION ─────────────────────────────────────────────────────────────
  // The top navigation bar.
  nav: {
    links: ["Work", "Our Products", "Services", "Contact"], // ✏️ Menu items
    cta: "Work With Us", // ✏️ Button label
  },

  // ── HERO (Homepage banner) ──────────────────────────────────────────────────
  // The full-screen opening section. Cycles through 3 slides.
  hero: {
    slides: [
      {
        // Slide 1 ✏️
        h1: "Structure changes everything.", // ✏️ Big headline
        sub: "We design and build systems that drive focus.", // ✏️ Subheading
        card: "Product & Digital", // ✏️ Service label on the card
        left: "/structure 2.jpg", // 🖼️ Left image
        right: "/Structure 1.jpg", // 🖼️ Right image
        cardImg: "/products & digital.jpg", // 🖼️ Card image
      },
      {
        // Slide 2 ✏️
        h1: "Communication\nthat connects.",
        sub: "Campaigns that reach the right people.",
        card: "Marketing & Comms",
        cardImg: "/marketing & comms.jpg", // 🖼️ Left image
        right: "/Coms 1.jpg", // 🖼️ Right image
        left: "/Hero comm replacement.jpg", // 🖼️ Card image
      },
      {
        // Slide 3 ✏️
        h1: "Identities built\nfor clarity.",
        sub: "Brand systems that speak before you do.",
        card: "Brand & Design",
        cardImg: "/brand & design.jpg", // 🖼️ Left image
        left: "/identity 2.jpg", // 🖼️ Right image
        right: "/Identity 1.jpg", // 🖼️ Card image
      },
    ],

    // ✏️ Scrolling notification ticker at the top of the hero
    notifications: [
      "New inquiry from Kova Group",
      "TruBilling shipped ✓ — Product launch confirmed",
      "Meridian campaign went live today",
      "New inquiry from Kova Group",
      "TruBilling shipped ✓ — Product launch confirmed",
      "Meridian campaign went live today",
    ],

    slideDuration: 6000, // ⚠️ How long each slide shows (ms). 6000 = 6 seconds
    cta: "Work With Us", // ✏️ Hero call-to-action button

    trustedBy: {
      label: "Trusted by", // ✏️ Label above the logos
      logos: ["/log1.png", "/log2.png", "/log3.png", "/log4.png", "/log5.png"], // 🖼️ Client logos (place in /public)
    },
  },

  // ── WHAT WE DO ─────────────────────────────────────────────────────────────
  // The section describing your three core services.
  whatWeDo: {
    eyebrow: "What We Do", // ✏️ Small label above the headline
    headline: "We help businesses become better than they were yesterday.", // ✏️ Main headline
    highlightedWords: {
      better: "better", // ⚠️ Words that get highlighted — match the headline exactly
      yesterday: "yesterday.",
    },
    body: "MAD is a product, marketing, and design firm focused on collaborating with the brightest minds in business to create smarter systems, stronger brands, and better digital experiences.", // ✏️ Paragraph text
    note: "We create the conditions for growth by helping organizations balance business (value), design (usability) and technology (feasibility).", // ✏️ Smaller note text
    cta: "Work With Us →", // ✏️ Button text
    slideDuration: 5500, // ⚠️ How long each service card shows before advancing (ms)

    coreValue: {
      eyebrow: "Core Value", // ✏️
      title: "Growth needs balance.", // ✏️
      body: "Business value, design usability, and technology feasibility — aligned.", // ✏️
    },

    services: [
      {
        tag: "01",
        label: "Product & Digital Solutions", // ✏️ Service name
        tagline: "Websites, apps & platforms built to scale with confidence.", // ✏️ One-liner
        wide: "/Prod & Dig 2.jpg", // 🖼️ Wide background image
        top: "/juu.jpg", // 🖼️ Top card image
      },
      {
        tag: "02",
        label: "Marketing & Communication",
        tagline:
          "Campaigns that build relevance and connect brands with the right audience.",
        wide: "/Marketing 2.jpg", // 🖼️ Wide background image
        top: "/Marketing 1.jpg", // 🖼️ Top card image
      },
      {
        tag: "03",
        label: "Brand & Design Systems",
        tagline:
          "Brand systems with clarity, consistency, and credibility at every touchpoint.",
        wide: "/Brand a design 1.jpg", // 🖼️ Wide background image
        top: "/Brand a design 2.jpg", // 🖼️ Top card image
      },
    ],
  },

  // ── SERVICES IN MOTION ──────────────────────────────────────────────────────
  // The scrollable service card section.
  servicesInMotion: {
    eyebrow: "Services in motion · scroll to explore", // ✏️
    title: "Systems for growth.", // ✏️ Headline (word before the period gets accent colour)
    titleAccent: "growth.", // ⚠️ Must match the last word of title exactly
    cta: "Start a Project →", // ✏️ Button text

    // ✏️ Add/remove cards freely — the section adapts to however many are listed.
    // story ⚠️ picks the stage-2 demo: website, app, social, print, bizdev, pr
    //         (leave unset on a new card for a generic placeholder demo)
    cards: [
      {
        id: "c1",
        title: "Website development", // ✏️ title
        sub: "Where ideas become experiences.", // ✏️ sub
        request:
          "Build a clean, modern website that converts visitors into clients.", // ✏️ Speech-bubble line in stage 1
        story: "website",
        wide: "/Web dev 1.jpg", // 🖼️ Stage 1 background image
        top: "/Web dev 2.jpg", // 🖼️ Stage 3 showcase image
      },
      {
        id: "c2",
        title: "App development",
        sub: "Built for the way people move.",
        request: "Design a mobile app that people actually want to use.",
        story: "app",
        wide: "/App dev 2.jpg",
        top: "/App dev 1.jpg",
      },
      // {
      //   id: "c3",
      //   title: "Social media management",
      //   sub: "Attention, engineered.",
      //   request: "Create a content calendar that keeps our audience engaged.",
      //   story: "social",
      //   wide: "/SM mgt 1.jpg",
      //   top: "/SM mgt 2.jpg",
      // },
      {
        id: "c4",
        title: "Design and print",
        sub: "Brands made tangible.",
        request: "Design a brand kit and print collateral that stands out.",
        story: "print",
        wide: "/Design a print 2.jpg",
        top: "/Design a print 1.jpg",
      },
      {
        id: "c5",
        title: "Business development",
        sub: "Growth, by design.",
        request: "Help us find and close the right growth opportunities.",
        story: "bizdev",
        wide: "/Buis dev 1.jpg",
        top: "/Buis dev 2.png",
      },
      {
        id: "c6",
        title: "Public relations",
        sub: "Influence with intention.",
        request: "Get our story in front of the press and the right audiences.",
        story: "pr",
        wide: "/PR 1.jpg",
        top: "/PR 2.jpg",
      },
    ],
  },

  // ── EXPERIENCE (Case study: TruBilling) ────────────────────────────────────
  // Showcases a product you've built. Update the text to match a different project.
  experience: {
    eyebrow: "Our Experience · Product Development", // ✏️
    kicker:
      "Struggling to track where your money goes? Tired of chasing unpaid invoices?", // ✏️ Opening hook

    // Product name display (renders as: prefix + typed word + suffix)
    productPrefix: "tru", // ✏️ e.g. "tru"
    productTyped: ["billing"], // ✏️ The animated typed word(s)
    productSuffix: "", // ✏️ Anything after the typed word

    productTypedsub: [
      "expenses, quotes, inventory, task manager, insights, payments, invoicing, analytics, tax calculator",
    ], // ✏️ Sub-label that types below the product name

    intro:
      "TruBilling is a financial management platform designed to help small and growing businesses manage billing, track payments, and maintain financial clarity in one structured system. The goal was to simplify how businesses handle day-to-day financial operations without overwhelming them with complexity.", // ✏️ Project description paragraph

    dashboardUrl: "trubilling.com/dashboard", // ✏️ URL shown on the mock browser bar
    screenImage: "/image.jpg", // 🖼️ Screenshot shown in the browser mockup
    screenImageAlt: "TruBilling", // ✏️ Alt text for the screenshot

    video:
      "https://res.cloudinary.com/drxxei318/video/upload/q_auto/f_auto/v1778342850/qt_xnluza.mov", // 🖼️ Demo video URL

    statusStamp: "Cancelled", // ✏️ Badge on the case study (e.g. "Live", "Cancelled", "In Progress")
    badge: "Built by MAD", // ✏️ Credit badge
    cta: "Work With Us Today →", // ✏️ CTA button

    // ✏️ Three columns: The Problem / Our Approach / The Solution
    needs: [
      { icon: "grid", text: "Unstructured billing and expense processes" },
      {
        icon: "messageSquare",
        text: "Difficulty tracking quotes, invoices & payments",
      },
      {
        icon: "bookOpen",
        text: "No real-time visibility into financial health",
      },
      { icon: "shuffle", text: "Over-reliance on manual and fragmented tools" },
    ],
    approach: [
      {
        icon: "smartphone",
        text: "Unified hub for expenses, quotes & payments",
      },
      { icon: "layout", text: "Clean, intuitive workflows for every module" },
      {
        icon: "creditCard",
        text: "Products & services catalogue built to scale",
      },
      { icon: "bell", text: "Business, design & technology fully aligned" },
    ],
    solutions: [
      { icon: "fileText", text: "Log and categorise expenses in seconds" },
      { icon: "clock", text: "Generate quotes and convert them to invoices" },
      { icon: "database", text: "Manage a full products & services catalogue" },
      { icon: "barChart", text: "Track payments and analyse income flow live" },
    ],
    // ⚠️ icon values must be one of: grid, messageSquare, bookOpen, shuffle,
    //    smartphone, layout, creditCard, bell, fileText, clock, database, barChart

    outcome:
      "A more structured, efficient, and\nscalable approach to business billing.", // ✏️ Outcome summary (use \n for a line break)

    stats: [
      { value: "24", label: "Paid", color: "#fff" },
      { value: "70", label: "Pending", color: "#fff" },
      { value: "28", label: "Overdue", color: "#e05a4e" }, // ✏️ value + label; color is the text colour
    ],
  },

  // ── BEYOND (Partnership pitch) ──────────────────────────────────────────────
  beyond: {
    eyebrow: "Work With Us", // ✏️
    title: "We don't just deliver projects,\nwe build long-term partnerships.", // ✏️ Use \n for a line break
    body: "Our work extends beyond initial delivery. We support organizations across digital platforms, brand systems, and communication needs as they grow and evolve.", // ✏️
    emphasis: "Let's build something that performs.", // ✏️ Bold accent line
    image: "/mad.png", // 🖼️ Section image (place in /public)
    primaryCta: "Start a Project →", // ✏️ Main button
    secondaryCta: "View Our Work", // ✏️ Secondary link

    stats: [
      { to: 50, suffix: "+", label: "Projects launched" }, // ✏️ Number animates up to `to`
      { to: 98, suffix: "%", label: "Client retention" },
      { to: 6, suffix: " wk", label: "Avg. ship time" },
    ],
  },

  // ── CONTACT ────────────────────────────────────────────────────────────────
  contact: {
    eyebrow: "Work With Us", // ✏️
    title: "Not sure what comes next?\nTalk to MAD.", // ✏️ Use \n for a line break
    body: "Whether you have a clear brief or just an idea, we'll help you shape it into something structured and actionable.", // ✏️
    subbody:
      "Tell us what you're working on, and we'll help you structure the next step.", // ✏️

    // ✏️ Three principles shown below the heading
    principles: [
      [
        "01",
        "Strategy first",
        "We align on what success looks like before touching a pixel.",
      ],
      [
        "02",
        "Design that converts",
        "Every decision is made with your audience and goal in mind.",
      ],
      [
        "03",
        "Ship, then improve",
        "We launch fast and iterate based on real data.",
      ],
    ],

    // ✏️ Contact form labels
    fields: {
      name: "Your name",
      email: "Email address",
      message: "What are you working on?",
    },
    submit: "Send Message →", // ✏️ Form submit button
    successTitle: "Message received", // ✏️ Shown after form is sent
    successBody: "We'll be in touch within 24 hours.", // ✏️

    emailPrefix: "Or email us at", // ✏️
    email: "contact@mindfullyarticulated.com", // ✏️ Contact email

    // ⚠️ TECHNICAL — Google Form config. Do not edit unless you are replacing the form.
    gform: {
      url: "https://docs.google.com/forms/d/e/1FAIpQLScXJImaoWDkZRZy6YGl4fhO2_8q-ufBWUO-cxwCXh8on8rW8w/formResponse",
      entryName: "entry.1835461984",
      entryEmail: "entry.459953531",
      entryMsg: "entry.124908731",
    },

    // ── AI Chat widget ───────────────────────────────────────────────────────
    ai: {
      name: "MAD AI", // ✏️ Chat bot display name
      status: "Strategic Partner · Online", // ✏️ Status line under the name
      idleTitle: "Talk to MAD AI", // ✏️ Heading before chat starts
      idleBody:
        "Tell us what you're building and we'll walk you through how MAD can help.", // ✏️
      start: "Start a conversation →", // ✏️ Button to open the chat
      greeting:
        "Hi 👋 I'm MAD AI — a strategic partner, not just a bot. What area would you like to explore?", // ✏️ First message from the bot
      transferPrompt:
        "Want me to connect you with one of our strategists for a deeper conversation?", // ✏️
      noTransfer:
        "No problem — feel free to reach out anytime. You can also fill in the form on the left.", // ✏️
      emailPrompt:
        "Perfect. What email address should I send your project summary to?", // ✏️
      donePrefix: "✓ Done! A project summary is heading to", // ✏️
      doneSuffix: "now. Our team will follow up within 24 hours.", // ✏️
      notificationTitle: "Madesign", // ✏️
      notificationBody: "Your project summary is ready — let's build.", // ✏️

      // ✏️ The three service options the user can pick in the chat
      services: [
        {
          id: "product",
          label: "Product & Digital", // ✏️ Button label
          icon: "💻",
          reply: [
            "Great choice. Product & Digital is our core.",
            "We build websites, web apps, SaaS platforms, and internal tools end-to-end — from discovery and wireframes through to UI design, development, and launch. Typical timelines run 4–8 weeks depending on scope.",
            "Our stack is modern and performant. We care about speed, accessibility, and experiences that actually convert — not just look good in a Figma file.",
            "Past builds include e-commerce stores, SaaS dashboards, fintech platforms, and brand microsites. Every project ships with documentation and a handoff your team can build on.",
          ], // ✏️ Each string is a separate chat bubble
        },
        {
          id: "marketing",
          label: "Marketing & Comms",
          icon: "📣",
          reply: [
            "Marketing & Comms — solid choice.",
            "We build marketing systems that run, not one-off campaigns. That means content strategy, social calendars, email sequences, paid media frameworks, and brand messaging — all aligned.",
            "We start by understanding your audience, then we craft narratives that reach them at the right moment. Everything is tracked, measured, and iterated on.",
            "We've run campaigns across product launches, investor communications, growth sprints, and rebrands. The goal is always the same: the right message to the right person at the right time.",
          ],
        },
        {
          id: "brand",
          label: "Brand & Design",
          icon: "✦",
          reply: [
            "Brand & Design — this is where intention meets execution.",
            "We start with brand strategy: positioning, tone of voice, values, and how you want to be perceived. That foundation drives everything visual.",
            "From there we build the full identity — logo system, typography, colour palette, iconography, and brand guidelines your whole team can use consistently.",
            "The result isn't just a pretty logo. It's a system with rules, rationale, and flexibility — built to scale as your business does.",
          ],
        },
      ],
    },
  },

  // ── FOOTER ─────────────────────────────────────────────────────────────────
  footer: {
    description:
      "Product, marketing & design firm creating systems that help organizations grow stronger and perform over time.", // ✏️ Tagline under the logo

    social: [
        { label: "X", href: "https://x.com/Madesignsltd", iconClass: "fa fa-twitter" }, // ✏️ href = your X URL
      { label: "Instagram", href: "https://www.instagram.com/madesignsltd/", iconClass: "fa fa-instagram" }, // ✏️ href = your Instagram URL
      { label: "LinkedIn", href: "https://www.linkedin.com/company/101036897", iconClass: "fa fa-linkedin" }, // ✏️ href = your LinkedIn URL
    ],

    // ✏️ Footer link columns — each column has a title and a list of [label, url] pairs
    columns: [
      {
        title: "Navigate",
        links: [
          ["Home", "#hero"],
          ["What We Do", "#work"],
          ["Our Products", "#products"],
          ["Services", "#services"],
          ["Contact", "#contact"],
        ],
      },
      {
        title: "Get In Touch",
        links: [
          [
            "contact@mindfullyarticulated.com",
            "mailto:contact@mindfullyarticulated.com",
          ],
          ["X", "https://x.com/Madesignsltd"],
          ["Instagram", "https://www.instagram.com/madesignsltd/"],
          ["LinkedIn", "https://www.linkedin.com/company/101036897"],
        ],
      },
    ],

    copyright: "© 2025 MAD. All rights reserved.", // ✏️
  },
};
