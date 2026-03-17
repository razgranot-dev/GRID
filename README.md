# GRID — Website

Premium boutique digital agency website. Single HTML file, Hebrew RTL, dark theme.

## Quick Start

Open `index.html` in a browser. No build tools, no dependencies.

To deploy: upload `index.html` to any static host (Netlify, Vercel, GitHub Pages, shared hosting).

---

## How to Edit Content

All content lives in `index.html`. Open it in any code editor and search for the markers below.

### Text & Headlines

Search for the Hebrew text you want to change. All headings use `<h1>`, `<h2>`, `<h3>` tags. Body text is in `<p>` tags.

Key sections and their approximate line locations:
- **Hero headline** — search for `לא סתם אתר`
- **Hero subheadline** — search for `מחברת אסטרטגיה`
- **Services** — search for `חמישה תחומי מומחיות`
- **Why GRID** — search for `שותפים דיגיטליים`

### Portfolio Projects

Search for `project-card` to find the 4 project blocks. Each project has:

```html
<div class="project-card reveal">
  <div class="project-image">
    <!-- Replace with: <img src="your-image.jpg" alt="Project name" style="width:100%;height:100%;object-fit:cover;"> -->
  </div>
  <div class="project-body">
    <span class="project-tag">Category Tag</span>
    <h3>Project Name</h3>
    <p>One-line description</p>
  </div>
</div>
```

To add a real image: replace the `<div class="project-image">` contents with an `<img>` tag. Keep `aspect-ratio: 16/10` by using `object-fit: cover`.

To add/remove projects: copy or delete entire `project-card` blocks.

### Testimonials

Search for `testimonial-card` to find the 3 testimonial blocks. Each has:

```html
<div class="testimonial-card reveal">
  <div class="testimonial-accent">✦</div>
  <blockquote>Quote text here</blockquote>
  <div class="testimonial-author">
    <div class="testimonial-name">Name</div>
    <div class="testimonial-role">Role, Company</div>
  </div>
</div>
```

Replace the placeholder quotes with real client testimonials.

### Trust Bar Logos

Search for `trust-logo` to find the placeholder logos. Replace with real SVG logos or images:

```html
<!-- Replace this: -->
<span class="trust-logo">BRAND</span>

<!-- With this: -->
<img src="logo.svg" alt="Client Name" class="trust-logo" style="height:24px;opacity:0.15;">
```

### SEO & Meta Tags

Edit the `<head>` section (top of file):

```html
<title>Your page title here</title>
<meta name="description" content="Your description here">
<meta property="og:title" content="Same as title">
<meta property="og:description" content="Same as description">
<meta property="og:image" content="https://your-domain.com/og-image.jpg">
```

For the OG image: create a 1200x630px image and host it at a public URL.

### Colors

All colors are defined as CSS custom properties in `:root` near the top of the `<style>` block:

```css
:root {
  --bg-void: #0a0a0f;          /* Page background */
  --bg-surface: #111116;       /* Cards */
  --text-primary: #ffffff;     /* Headlines */
  --text-secondary: #94a3b8;   /* Body text */
  --text-muted: #64748b;       /* Labels */
  --accent: #3b82f6;           /* Blue accent — buttons, links, motifs */
  --accent-hover: #2563eb;     /* Button hover */
}
```

Change any value to update the entire site's color scheme.

---

## Contact Form Setup

The form uses [Formspree](https://formspree.io) (free tier: 50 submissions/month).

### One-time setup:

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — set the destination email to your email
3. Copy your form ID (looks like `xabcdefg`)
4. In `index.html`, search for `YOUR_FORM_ID` and replace it with your real ID:

```html
<form id="contactForm" action="https://formspree.io/f/xabcdefg" method="POST" novalidate>
```

That's it. Form submissions will arrive in your email inbox.

### Contact details

- **WhatsApp number** — search for `wa.me/972504455065` to update
- **Email is hidden** — it's configured only inside Formspree, never shown on the site
- **Social links** — search for `footer-socials` to uncomment and add LinkedIn/Instagram URLs

---

## Deployment

### Option A: Netlify (Recommended)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag and drop the `GRID` folder onto the page
3. Site is live instantly
4. Connect your custom domain in Site Settings > Domain management

### Option B: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the GRID folder
3. Follow prompts to deploy

### Option C: Any web host

Upload `index.html` to your hosting root. No server configuration needed.

### After deployment:

- Enable HTTPS (automatic on Netlify/Vercel)
- Update the OG image URL in `<head>` to the live domain
- Test the contact form with a real submission
- Verify WhatsApp link opens correctly on mobile

---

## File Structure

```
GRID/
├── index.html          ← Complete website (single file)
├── README.md           ← This file
├── .gitignore          ← Ignores .superpowers/
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-03-15-grid-website-design.md  ← Design spec
```

## Tech Stack

- HTML5 + CSS3 + vanilla JS (no frameworks, no build tools)
- Google Fonts: Heebo (Hebrew) + Inter (English)
- Formspree for form submissions
- CSS custom properties for theming
- IntersectionObserver for scroll animations
- Full RTL support with CSS logical properties
