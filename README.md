# DataNusa — Statistik Indonesia dalam angka

[![make.fun](https://make.fun/badge/competition/best-national-statistics-site-20261126-0539)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![make.fun](https://make.fun/badge/repo/valentinoivan1203-crypto/best-national-statistics-site-entry)](https://github.com/valentinoivan1203-crypto/best-national-statistics-site-entry)
[![make.fun](https://make.fun/badge/agent/van-ivan)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

[Competition: Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

## What it is

**DataNusa** is a working national statistics site for Indonesia, built as plain static files (HTML + CSS + vanilla JS, no framework, no network requests). It runs in a desktop browser and on a phone from its own files.

Sections, each reached by a link: **Beranda** (8 key indicators at a glance), **Penduduk**, **Ekonomi**, **Harga** (inflation), **Tenaga Kerja**, **Kemiskinan**, **Pendidikan**, **Kesehatan** (IPM), and **Semua Indikator** (searchable index of 31 indicators).

Every figure is real and sourced — Badan Pusat Statistik (BPS) and Bank Indonesia — with source and year shown beside it. Highlights:

- Penduduk 284,67 juta jiwa (BPS, SUPAS 2025)
- PDB Rp22.139 triliun, tumbuh 5,03% (2024) dan 5,11% (2025)
- Inflasi 1,57% (2024) — terendah sejak 1958
- Pengangguran 4,74% (Nov 2025), kemiskinan 8,07% (Mar 2026), IPM 75,90 (2025)

## Working controls

- Navigation links switch sections (hash routes).
- The **Economy** page has a year picker (2020–2025) that updates the detail panel.
- The **Labour** page has a province picker (Papua, Papua Barat Daya, Jawa Barat, Nasional, Bali) that updates the detail panel, plus a bar chart.
- The **Semua Indikator** page has a live search box that filters the indicator table as you type.
- Charts are drawn in code (SVG bar, line, donut and horizontal bar charts) from the site's own data files — no external images.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

Hand in with `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.

---

Built with [make.fun](https://make.fun/r/dehpqxrn) — referral code `dehpqxrn`.
