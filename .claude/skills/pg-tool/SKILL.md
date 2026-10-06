---
name: pg-tool
description: Kerja pada PG Tool milik Taufik (Dealer Public Gold), toolset di pg-tool.taufik.fyi yang ada Prospect Script (template WhatsApp prospek) dan Follow-Up Center (upload database, broadcast, status, sort). Guna bila Taufik sebut "pg-tool", "follow-up center", "prospect script", "tukar template WhatsApp", "tambah tool baru", "edit dashboard", "deploy pg-tool", atau minta ubah apa-apa dalam repo taufikmusa/pg-tool.
---

# PG Tool

Repo `taufikmusa/pg-tool` (public), live di `https://pg-tool.taufik.fyi`. Hos: GitHub Pages, source **GitHub Actions**. DNS di Cloudflare (`CNAME pg-tool` ke `taufikmusa.github.io`, DNS only).

## Susunan repo

```
index.html                 landing, array TOOLS (tambah kad di sini)
CNAME, .nojekyll
apps/followup/             Vite + React 18 + Tailwind 3, base /followup/
apps/prospect/             Vite + React 19 + Tailwind 3, base /prospect/
.github/workflows/pages.yml  build kedua-dua app, gabung dengan landing, deploy
```

Semua edit dibuat pada source, push ke `main`, Actions deploy sendiri (1 hingga 2 minit). Selepas deploy, hard refresh (Ctrl+Shift+R) kerana cache.

## Kandungan yang kerap diedit

- Template mesej Follow-Up: `apps/followup/src/App.jsx`, `DEFAULT_TEMPLATE` dan `QUICK_TEMPLATES`. Tag: `[NAME] [GREET] [YEAR] [PGCode]`.
- Template Prospect: `apps/prospect/src/App.jsx`, blok template di bahagian atas fail.
- Kad landing: array `TOOLS` dalam `index.html` (title, desc, tags, url relatif, color, icon).
- Butang `← HOME` ada dalam `src/main.jsx` kedua-dua app.

## Tambah tool baru

1. Letak source dalam `apps/<nama>/`. Set `base: '/<nama>/'` dalam `vite.config.js`.
2. Tambah langkah build dalam `pages.yml` dan `cp -r apps/<nama>/dist _site/<nama>`. Guna `npm ci` kalau ada `package-lock.json`, kalau tak `npm install`.
3. Tambah entri dalam `TOOLS` pada `index.html`.
4. Tambah butang Home (salin blok akhir `main.jsx`).
5. Tool single HTML: letak terus sebagai `<nama>/index.html` dan salin dalam langkah assemble.

## Peraturan

- Semua jalan 100% dalam browser, tiada backend. Data customer (Excel/CSV) tidak keluar dari browser dan tidak masuk repo. Hanya status follow-up disimpan dalam `localStorage` (kunci `pg_followup_status`), per browser.
- Repo public: jangan commit data customer, API key, IC, atau nombor sebenar. Placeholder guna data palsu.
- Halaman ada `noindex`. Kekalkan.
- Bahasa UI: Melayu Malaysia santai. Gaya visual neo-brutalist (cream `#F4F0E6`, border hitam 2px, shadow keras, kuning `#FFD600`, cyan `#5CE1E6`, ungu `#CB6CE6`).
- Sandbox Claude Code tidak boleh `npm install` (registry disekat), jadi build disahkan melalui tab Actions. Semak run hijau selepas setiap push. Jangan tukar link kad ke laluan baharu sebelum build hijau.
- Push terus ke `main` (Taufik sudah benarkan untuk repo ini).
