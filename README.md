# Reeds on the Ridge

A simple static website for taking oboe reed orders in South Africa, designed to be hosted free on GitHub Pages.

## How it works

- `index.html` — the whole site (catalog, order form, contact info)
- `js/products.js` — **edit this file** to change reed types, strengths, and prices
- `js/app.js` — renders the catalog and calculates the order total (no need to edit)
- `css/styles.css` — site styling

There's no backend/database — orders are submitted via [Formspree](https://formspree.io), a free service that forwards form submissions to your email.

## One-time setup before going live

- [x] Formspree is already wired up (`https://formspree.io/f/xeagzvjr` in `index.html`) — orders go to the email you verified on that form.
- [ ] Edit `js/products.js` with your real reed names, descriptions, prices, and shipping fees (`SHIPPING_OPTIONS`) if anything changes.

Formspree's free tier caps submissions per month — check your dashboard at [formspree.io](https://formspree.io) occasionally to make sure you haven't hit the limit.

## Publishing on GitHub Pages

1. Create a new repository on GitHub (e.g. `oboe-reeds`).
2. Push this project to it:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`.
5. Save. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/` within a minute or two.

## Testing locally

Just open `index.html` in a browser, or run a local server from this folder, e.g.:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Updating the site later

Edit `js/products.js` for catalog/price changes, commit, and push — GitHub Pages redeploys automatically.
