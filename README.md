# SBTech Consulting — Website

Marketing website for **SBTech Consulting**, an independent IT consulting firm based in
Palmer, MA. Built as a fast, dependency-free static site (HTML / CSS / vanilla JS) that
can be hosted anywhere — including GoDaddy.

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, services, expertise areas, about, partners, CTA |
| `contact.html` | Contact page — form and contact details |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms of Use |
| `styles.css` | All styling (responsive) |
| `script.js` | Mobile nav, form handling, footer year |
| `llms.txt` | AI agent info file (llmstxt.org standard) |
| `llm.txt` | AI/LLM information file (legacy filename) |
| `assets/` | Logo, hero illustration, favicon, partner logos |

## Local preview

No build step required. Serve the folder with any static server:

```bash
python -m http.server 8000
# then open http://localhost:8000/
```

## Contact form setup (one step)

The contact form on `contact.html` uses [Web3Forms](https://web3forms.com) to email
submissions to you — no server required, free for the volume a small site needs.

To activate it:

1. Go to https://web3forms.com and enter the email where you want submissions sent
   (e.g. `info@sbtechma.com`). A free **Access Key** is emailed to you instantly.
2. In `contact.html`, find this line and replace the placeholder with your key:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
   ```
3. Done — submissions now arrive in your inbox.

Until the key is set, the form gracefully falls back to opening the visitor's email
client addressed to `info@sbtechma.com`, so it still works.

## Deploying

See **[DEPLOY.md](DEPLOY.md)** for how to publish this site to `sbtechma.com`. Note: GoDaddy's
drag-and-drop *Website Builder* cannot host custom code — the guide covers the working options
(GoDaddy cPanel hosting, or a free static host like Cloudflare Pages with your domain pointed at it).

## Contact

- Web: https://sbtechma.com
- Email: info@sbtechma.com
- Phone: (413) 813-9224
