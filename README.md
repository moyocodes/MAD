# MAD — Mindfully Articulated Design
**www.mindfullyarticulated.com**

Product, marketing & design firm creating systems that help organizations grow stronger and perform over time.

---

## Table of Contents

1. [Local Development](#local-development)
2. [Project Structure](#project-structure)
3. [How the CMS Works](#how-the-cms-works)
4. [Editing Content](#editing-content)
5. [CMS Field Reference](#cms-field-reference)
6. [Timing & Animation Settings](#timing--animation-settings)
7. [Deploying](#deploying)
8. [One-time Setup Checklist](#one-time-setup-checklist)

---

## Local Development

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → /dist
npm run preview    # preview the production build locally
```

---

## Project Structure

```
/
├── public/                         ← Static assets served at root (/)
│   ├── *.png / *.jpg               ← All site images — drop new ones here
│   └── favicon.svg
│
├── src/
│   ├── data/
│   │   └── homeCms.js              ← ★ SINGLE SOURCE OF TRUTH for all content & images
│   │
│   ├── pages/
│   │   ├── Home1.jsx               ← Main landing page (route: /)
│   │   └── Guard.jsx               ← Admin login page (route: /guard)
│   │
│   ├── components/
│   │   ├── home/
│   │   │   ├── Nav.jsx             ← Navigation bar
│   │   │   ├── Hero.jsx            ← Full-screen hero slideshow
│   │   │   ├── WhatWeDo.jsx        ← Services overview with auto-cycling cards
│   │   │   ├── ServicesInMotion.jsx← Scroll-jailed service card showcase
│   │   │   ├── Experience.jsx      ← TruBilling case study
│   │   │   ├── Beyond.jsx          ← Partnership pitch + animated stats
│   │   │   ├── Contact.jsx         ← Contact form + MAD AI chat widget
│   │   │   ├── BridgeSection.jsx   ← Transition section between Hero and WhatWeDo
│   │   │   └── Footer.jsx          ← Footer with links + social icons
│   │   │
│   │   └── cms/
│   │       ├── AdminBar.jsx        ← Floating edit controls + PIN lock
│   │       └── CmsPanel.jsx        ← Right-side live-edit panel
│   │
│   └── context/
│       └── CmsContext.jsx          ← CMS state, localStorage persistence, useCms() hook
│
├── .do/
│   └── app.yaml                    ← Digital Ocean App Platform build spec
├── bitbucket-pipelines.yml         ← CI/CD: build + deploy on push to Main
└── vite.config.js
```

> **Note:** `src/pages/mock.jsx`, `mock2.jsx`, `mock3.jsx` are design prototypes — not routed, safe to ignore.

---

## How the CMS Works

All content and image paths live in **`src/data/homeCms.js`**. Every component reads from this file via the `useCms()` hook — nothing is hardcoded in the components.

```
homeCms.js  →  CmsContext (React context)  →  useCms() hook  →  every component
```

**localStorage override:** The browser-based edit panel writes changes to `localStorage` under the key `mad_cms_v2`. On page load, `CmsContext` checks `localStorage` first, falling back to `homeCms.js`. Browser edits appear instantly but are lost if localStorage is cleared — to make them permanent, copy the values back into `homeCms.js` and deploy.

---

## Editing Content

### Option A — Browser edit panel (no code required)

| Step | Action |
|------|--------|
| 1 | Go to `/guard` (`localhost:5173/guard` or `www.mindfullyarticulated.com/guard`) |
| 2 | Click **🔐 Admin** (bottom-right) |
| 3 | Enter the PIN: **`1234`** |
| 4 | You are redirected to the home page in **Edit mode** |
| 5 | Scroll to the section you want to change |
| 6 | Click the **✏️ Edit** button (bottom-left) |
| 7 | Edit fields in the panel that slides in from the right |
| 8 | Changes save automatically as you type |
| 9 | Click **🔒 Lock** when done |

> Browser edits are **not permanent** until you copy them into `homeCms.js` and deploy.

**To change the admin PIN:** open `src/components/cms/AdminBar.jsx` and update:
```js
const PIN = "1234";
```

---

### Option B — Edit the source file (permanent)

Open **`src/data/homeCms.js`**. Every field is annotated:

| Annotation | Meaning |
|-----------|---------|
| `✏️` | Safe to edit — text, labels, button copy |
| `🖼️` | Image path or URL — swap the filename in quotes |
| `⚠️` | Technical field — leave alone unless you know what you're doing |

Save the file → the dev server hot-reloads instantly.  
Commit + push to `Main` → auto-deploys to production.

**Adding a new image:**
1. Drop the file into `/public/` (e.g. `/public/my-image.png`)
2. Reference it in `homeCms.js` as `"/my-image.png"` (leading slash, no `/public` prefix)

---

## CMS Field Reference

### `brand`
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Studio name shown in nav and notifications |
| `logo` | image path | Primary logo (`/ma.png`) |
| `logoWhite` | image path | White logo used in the footer (`/bgwhi.png`) |
| `email` | string | General contact email |
| `serviceByLabel` | string | Small label on the hero Pantone card |

---

### `nav`
| Field | Type | Description |
|-------|------|-------------|
| `links` | string[] | Menu item labels |
| `cta` | string | Button label |

---

### `hero`
| Field | Type | Description |
|-------|------|-------------|
| `slides[].h1` | string | Main headline — use `\n` for a line break |
| `slides[].sub` | string | Subheading below the headline |
| `slides[].card` | string | Label on the Pantone-style card |
| `slides[].left` | image path | Left panel background |
| `slides[].right` | image path | Right panel background |
| `slides[].cardImg` | image path | Image inside the Pantone card |
| `slideDuration` | number (ms) | How long each slide shows — default `6000` |
| `notifications` | string[] | Scrolling toast messages |
| `cta` | string | Primary CTA button label |
| `trustedBy.label` | string | Label above logos |
| `trustedBy.logos` | image path[] | Client logo files |

---

### `whatWeDo`
| Field | Type | Description |
|-------|------|-------------|
| `eyebrow` | string | Small label above the headline |
| `headline` | string | Main headline |
| `highlightedWords.better` | string | ⚠️ Must match the exact word in `headline` |
| `highlightedWords.yesterday` | string | ⚠️ Must match the exact word in `headline` |
| `body` | string | Paragraph text |
| `cta` | string | Button label |
| `slideDuration` | number (ms) | How long each service auto-advances — default `5500` |
| `services[].tag` | string | Number label (`"01"` / `"02"` / `"03"`) |
| `services[].label` | string | Service name |
| `services[].tagline` | string | One-line description |
| `services[].wide` | image path | Full-height left-panel background |
| `services[].top` | image path | Top-right panel image |

---

### `servicesInMotion`

Each service card cycles through three animation stages. Stage 1 and 2 are animated UI mockups (hardcoded in `ServicesInMotion.jsx`). Stage 3 is a full-bleed image from the CMS.

| Field | Type | Description |
|-------|------|-------------|
| `eyebrow` | string | Scroll hint label |
| `title` | string | Section headline |
| `titleAccent` | string | ⚠️ Must match the last word of `title` exactly |
| `stageImages.product` | image path | Product card — stage 1 background |
| `stageImages.productFinal` | image path | Product card — stage 3 full-bleed image |
| `stageImages.marketing` | image path | Marketing card — stage 1 background |
| `stageImages.marketingFinal` | image path | Marketing card — stage 3 full-bleed image |
| `stageImages.brand` | image path | Brand card — stage 1 background |
| `stageImages.brandFinal` | image path | Brand card — stage 3 full-bleed image |
| `cards[].title` | string | Card heading |
| `cards[].sub` | string | Card subtext |
| `cards[].stageSet` | `"product"` \| `"marketing"` \| `"brand"` | ⚠️ Which animation set to render |

---

### `experience`
| Field | Type | Description |
|-------|------|-------------|
| `eyebrow` | string | Section label |
| `kicker` | string | Opening hook line |
| `productPrefix` | string | Static prefix of the product name (e.g. `"tru"`) |
| `productTyped` | string[] | Animated typed word(s) (e.g. `["billing"]`) |
| `productTypedsub` | string[] | Animated sub-label below the product name |
| `intro` | string | Project description paragraph |
| `dashboardUrl` | string | URL shown in the mock browser bar |
| `screenImage` | image path | Screenshot in the browser mockup |
| `video` | URL | Demo video URL (Cloudinary or other CDN) |
| `statusStamp` | string | Badge text — `"Live"`, `"Cancelled"`, `"In Progress"` |
| `needs` / `approach` / `solutions` | array | Three-column breakdown. Each item: `{ icon, text }` |
| `stats` | array | `{ value, label, color }` stat row |

**Valid icon values:** `grid` `messageSquare` `bookOpen` `shuffle` `smartphone` `layout` `creditCard` `bell` `fileText` `clock` `database` `barChart`

---

### `beyond`
| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Headline — use `\n` for a line break |
| `body` | string | Paragraph |
| `emphasis` | string | Bold accent line |
| `image` | image path | Section image |
| `primaryCta` / `secondaryCta` | string | Button labels |
| `stats` | array | `{ to, suffix, label }` — numbers animate up to `to` |

---

### `contact`
| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Headline — use `\n` for a line break |
| `body` / `subbody` | string | Supporting copy |
| `principles` | array | Three `["01", "Title", "Body"]` tuples |
| `fields.name` / `fields.email` / `fields.message` | string | Form placeholder labels |
| `submit` | string | Submit button label |
| `email` | string | Displayed contact email |
| `gform.*` | ⚠️ | Google Form endpoint + entry IDs — do not edit |
| `ai.name` / `ai.status` / `ai.greeting` | string | MAD AI widget copy |
| `ai.services` | array | `{ id, label, icon, reply[] }` — chat option buttons and responses |

---

### `footer`
| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Tagline under the logo |
| `social[].label` | string | Platform name |
| `social[].href` | string | Profile URL |
| `columns` | array | `{ title, links: [[label, url]] }` |
| `copyright` | string | Copyright line |

---

## Timing & Animation Settings

| Setting | CMS key | Default | What it controls |
|---------|---------|---------|-----------------|
| Hero slide speed | `hero.slideDuration` | `6000` ms | Time each hero slide is shown before advancing |
| What We Do speed | `whatWeDo.slideDuration` | `5500` ms | Time each service card is shown before advancing |

---

## Deploying

Pushes to `Main` automatically build and deploy via Bitbucket Pipelines.

1. Push to `Main` on Bitbucket
2. Pipeline runs `npm ci && npm run build` → outputs `/dist`
3. Pipeline triggers a Digital Ocean redeploy via the DO API
4. Live in ~2 minutes

```bash
git add .
git commit -m "your message"
git push origin Main
```

---

## One-time Setup Checklist

Do this once. After that every push deploys automatically.

### Step 1 — Push code
Push to `https://bitbucket.org/plainmadraven/mad-website` on branch `Main`.

### Step 2 — Create the app in Digital Ocean
1. Go to [cloud.digitalocean.com](https://cloud.digitalocean.com) → **Apps → Create App**
2. Connect **Bitbucket** → select `plainmadraven/mad-website` → branch `Main`
3. Digital Ocean reads `.do/app.yaml` automatically
4. Click **Deploy**

### Step 3 — Get your App ID
Look at the URL after the app is created:
```
https://cloud.digitalocean.com/apps/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
                                    ↑ this is your DO_APP_ID
```

### Step 4 — Generate a Digital Ocean API token
1. DO dashboard → **API → Tokens → Generate New Token**
2. Name it `bitbucket-deploy`, enable **Write** scope
3. Copy the token (shown once only)

### Step 5 — Add variables to Bitbucket
**Repository settings → Repository variables:**

| Variable | Value | Secured |
|----------|-------|---------|
| `DO_API_TOKEN` | Token from Step 4 | ✅ Yes |
| `DO_APP_ID` | UUID from Step 3 | No |

### Step 6 — Point your domain
1. DO App → **Settings → Domains** → add `www.mindfullyarticulated.com`
2. In your domain registrar's DNS:
   ```
   Type:  CNAME
   Name:  www
   Value: <the .ondigitalocean.com URL DO gives you>
   ```
3. For the bare domain, add an **A record** or **ALIAS/ANAME** pointing to DO's IP.

> DNS propagation takes up to 24–48 hours.
