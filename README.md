# Mason Catt — Portfolio

Personal portfolio site for **Mason Catt**, Senior Product Designer and Visual Systems Designer. Case studies, resume, and scrapbook — built as a static site with no build step.

**Live site:** [masoncatt.com](https://masoncatt.com)

---

## Overview

This repo is the source for a multi-page portfolio highlighting product design, design systems, and visual work across Microsoft, Amazon, BUCK Design, and freelance clients. Pages share a consistent visual language (dark theme, Libre Baskerville + DM Sans) and lightweight scroll/interaction patterns in vanilla HTML, CSS, and JavaScript.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home — hero, project grid, experience, contact |
| `about.html` | Bio, timeline, skills |
| `scrapbook.html` | Personal work gallery with lightbox |
| `amazon-pay-studio.html` | Amazon Business Pay Studio design system (2023) |
| `amazon-business-card.html` | Amazon Business Credit Card ECM experience (2024) |
| `facebook-libra.html` | Facebook Libra / Diem — BUCK Design |
| `windows-system-personalization.html` | Windows personalization vision prototype (gated) |
| `mason-catt-resume.pdf` | Resume download |

**Work in progress / internal**

- `prototype.html` — Windows featured-card prototype sandbox
- `card-snippet.html` — Reusable homepage card snippet
- `mason-catt-portfolio.html` — Alternate/experimental layout

## Project access

Some work is **password protected** on the live site and in development here:

- **Public case studies:** Amazon Pay Studio, Amazon Business Credit Card, Facebook Libra
- **Gated (request access via email):** Windows System Personalization, Fluent Visual System, Fluent Icons, Amazon Advertising

Gated case studies use shared gate assets:

- `project-gate.css` — Lock screen UI
- `project-gate.js` — Hides content until unlocked (session storage; password form hook planned)

On `index.html`, locked projects use a prominent **Request access** button and a muted **View project** control.

## Tech stack

- **HTML / CSS / JavaScript** — no framework, bundler, or package manager
- **Fonts** — [Google Fonts](https://fonts.google.com/) (Libre Baskerville, DM Sans)
- **Embeds** — Figma prototypes where noted
- **Assets** — Images (PNG, WebP, GIF), video (MP4), PDF resume

## Local development

Any static file server works. Examples:

```bash
# Python 3
python3 -m http.server 8080

# Node (npx, no install required)
npx serve .

# PHP
php -S localhost:8080
```

Then open [http://localhost:8080](http://localhost:8080) (or the port your server prints).

> **Note:** Opening `index.html` directly from the filesystem (`file://`) can break some paths and embeds. Prefer a local server.

## Deployment

The site is static and deploys to any static host:

- [GitHub Pages](https://pages.github.com/) — serve from `/` or `/docs` with `index.html` as entry
- Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, etc.

No build command is required; upload the repo root (or connect the repo and set publish directory to `.`).

### GitHub Pages (quick setup)

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment** → Source: **Deploy from a branch**.
3. Branch: `main` (or `master`), folder: `/ (root)`.
4. Save; the site will be available at `https://<username>.github.io/<repo-name>/` unless you use a custom domain.

For a custom domain (e.g. `masoncatt.com`), add a `CNAME` file or configure DNS in Pages settings.

## Repo structure (high level)

```
├── index.html                 # Homepage
├── about.html
├── scrapbook.html
├── *-case-study.html          # Project pages
├── project-gate.css/js        # Password gate (WIP)
├── img-*                      # Project & scrapbook assets
├── mason-catt-resume.pdf
└── README.md
```

Large media (e.g. `img-libra-diem-video.mp4`) are committed for self-hosting; consider Git LFS or external CDN if the repo grows.

## Contact

**Mason Catt** — Los Angeles  
Portfolio inquiries and project access: [masoncatt@gmail.com](mailto:masoncatt@gmail.com)

---

© Mason Catt. All case study work belongs to respective employers and clients.
