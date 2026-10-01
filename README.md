# حلويات النخوة – digital menu
1. **Open locally:** double-click `index.html` (or run `python3 -m http.server` and visit http://localhost:8000). Arabic font loads from Google Fonts when online; falls back to system fonts offline.
2. **Replace hero/logo:** overwrite `assets/hero.jpg` (keep the name, wide ~3:1 photo). The logo is part of the storefront photo; no separate logo file is used.
3. **Edit products:** open `script.js`, edit the `MENU` array (`ar`, `en`, `price` as a plain number in LBP, `category`, optional `unit`). New categories must also be added to `CATEGORIES` and a button in `index.html`.
4. **GitHub Pages:** create a repo, upload these files (keep `assets/`), then Settings → Pages → Deploy from branch → `main` / root. Your site appears at `https://USERNAME.github.io/REPO/`.
