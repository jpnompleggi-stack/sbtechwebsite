# Deploying SBTech Consulting to sbtechma.com

This is a plain static site (HTML/CSS/JS + images). It can be hosted anywhere that serves
files. The only wrinkle: **your current site uses GoDaddy's Website Builder**, which cannot
host custom code. Below are your realistic options, easiest first.

---

## ⚠️ Important: GoDaddy Website Builder won't work for this

The GoDaddy **Website Builder** (the drag-and-drop editor your current sbtechma.com is built
with) does **not** allow uploading custom HTML/CSS/JavaScript files. There is no file manager
or FTP for Website Builder sites.

To put this coded site on your domain, you need one of the paths below. In every case you keep
your domain (`sbtechma.com`) registered at GoDaddy — you're only changing where the *website
files* are served from.

---

## Option A — GoDaddy "Web Hosting" (cPanel)  ·  stays 100% at GoDaddy

If you have (or add) a GoDaddy **Web Hosting / cPanel** plan (different product from Website
Builder), you can upload the files directly.

1. In your GoDaddy account: **My Products → Web Hosting → Manage → cPanel Admin**.
2. Open **File Manager** and go to the `public_html` folder.
3. Upload **all** the files from this project into `public_html`:
   - `index.html`, `contact.html`, `privacy.html`, `terms.html`
   - `styles.css`, `script.js`
   - `robots.txt`, `sitemap.xml`, `llm.txt`, `llms.txt`
   - the entire `assets/` folder (logo, hero, partner logos, favicon)
   - *(Tip: zip the project, upload the zip, then "Extract" in File Manager.)*
4. Point the domain's document root at `public_html` (default for the primary domain).
5. Visit https://sbtechma.com — done.

> You can also upload via **FTP** (FileZilla) using the FTP credentials in cPanel, into
> `public_html`. Ask me and I'll give you exact FileZilla steps.

---

## Option B — Free static host + keep domain at GoDaddy  ·  recommended if you don't have cPanel

Host the files for free on a static host and point your GoDaddy domain at it. This works great
for a site like this and supports HTTPS automatically.

Good free options: **Cloudflare Pages**, **Netlify**, or **GitHub Pages** (GitHub Pages needs
the repo to be public on the free plan).

General steps (Cloudflare Pages example):
1. Create a free Cloudflare account → **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize GitHub and pick the `sbtechwebsite` repo. Build command: *none*. Output dir: `/`.
3. It deploys to a `*.pages.dev` URL. Verify the site looks right.
4. Add your custom domain in the host's dashboard: `sbtechma.com` (and `www`).
5. In **GoDaddy → Domain → DNS**, update the records the host tells you to (usually a `CNAME`
   for `www` and either an `A`/`ALIAS` record or nameserver change for the root). The host
   gives you the exact values.
6. Wait for DNS to propagate (minutes to a few hours), then https://sbtechma.com serves the new site.

> ⚠️ Pointing DNS to a new host will **replace** your current Website Builder site at that
> domain. Make sure you're happy with the new site first (preview locally or on the `*.pages.dev`
> URL).

---

## Option C — Rebuild inside GoDaddy Website Builder (not recommended)

You could manually recreate this design in the Website Builder, but you'd lose the custom code,
exact layout, structured data, and `llms.txt`. Not worth it given Options A and B.

---

## Before you go live — checklist

- [ ] Set the **Web3Forms access key** in `contact.html` (see README) so the contact form
      emails you. Until then it falls back to opening the visitor's email app.
- [ ] Click through every page and the contact form on your preview URL.
- [ ] Confirm phone, email, and hours are correct.
- [ ] (Optional) Submit `sitemap.xml` in Google Search Console for faster indexing.

## Local preview any time

```bash
python -m http.server 8000   # then open http://localhost:8000/
```

---

**Not sure which option you have?** Tell me what you see under GoDaddy → *My Products*
(e.g. "Website Builder", "Web Hosting", "cPanel", "Managed WordPress") and I'll give you the
exact click-by-click steps for your specific setup.
