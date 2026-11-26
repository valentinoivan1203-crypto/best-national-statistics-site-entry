// views.js — one render function per page. Each returns an HTML string for #app.
// All figures come from data.js; every figure on the page carries its source and year.

import { DATA, INDICATORS } from "./data.js";
import { barChart, lineChart, hbarChart, donutChart } from "./charts.js";

function sourceNote(text) {
  return `<p class="src">Sumber: ${text}</p>`;
}

function kpiCard(ind) {
  return `<a class="kpi" href="${ind.route}">
    <span class="kpi-label">${ind.label}</span>
    <span class="kpi-value">${ind.value}</span>
    <span class="kpi-detail">${ind.detail}</span>
    <span class="kpi-src">${ind.source}</span>
  </a>`;
}

function factRow(f) {
  return `<tr><td>${f.label}</td><td class="num">${f.value}</td><td>${f.detail}</td><td class="src-cell">${f.source}</td></tr>`;
}

function pageHead(title, intro, source) {
  return `<header class="page-head"><h1>${title}</h1><p class="lede">${intro}</p>${sourceNote(source)}</header>`;
}

// ---------------- Overview ----------------
export function viewOverview() {
  const cards = DATA.overview.map(kpiCard).join("");
  const gdp = lineChart(
    DATA.economy.growth.map((g) => ({ label: String(g.year), value: g.value })),
    { color: "#0e7c7b" },
  );
  const pop = barChart(
    DATA.population.census.map((c) => ({ label: String(c.year), value: c.value })),
    { highlightIndex: 3 },
  );
  return `
  <section class="hero">
    <p class="eyebrow">Indonesia · Data resmi terbaru</p>
    <h1>Indonesia dalam angka</h1>
    <p class="lede">Delapan indikator utama, tujuh bidang, satu tempat. Semua angka di bawah ini berasal dari Badan Pusat Statistik (BPS) dan Bank Indonesia — klik sebuah kartu untuk membuka bidangnya.</p>
  </section>
  <section class="kpi-grid">${cards}</section>
  <section class="split">
    <article class="panel">
      <h2>Pertumbuhan ekonomi, 2020–2025</h2>
      <p class="panel-sub">PDB tumbuh (% yoy). Kontraksi 2020, lalu pulih dan stabil di kisaran 5%.</p>
      ${gdp}
      <p class="panel-foot"><a href="#/ekonomi">Buka bidang Ekonomi →</a></p>
      ${sourceNote("BPS, Pertumbuhan Ekonomi Indonesia")}
    </article>
    <article class="panel">
      <h2>Penduduk menurut sensus</h2>
      <p class="panel-sub">Jumlah penduduk (juta jiwa) dari empat pendataan terakhir.</p>
      ${pop}
      <p class="panel-foot"><a href="#/penduduk">Buka bidang Penduduk →</a></p>
      ${sourceNote("BPS, SP2010 · SUPAS 2015 · SP2020 · SUPAS 2025")}
    </article>
  </section>
  <section class="panel">
    <h2>Rilis terbaru yang dipakai situs ini</h2>
    <ul class="releases">
      <li><strong>IPM 2025: 75,90</strong> — naik 0,88 poin dari 75,02 (2024). <span class="src-inline">BPS, 5 Nov 2025</span></li>
      <li><strong>Kemiskinan Maret 2026: 8,07%</strong> — 22,93 juta orang, terendah dalam tiga tahun. <span class="src-inline">BPS, Susenas</span></li>
      <li><strong>Pengangguran November 2025: 4,74%</strong> — dari 155,27 juta angkatan kerja. <span class="src-inline">BPS, Sakernas</span></li>
      <li><strong>Penduduk SUPAS 2025: 284,67 juta</strong> — tumbuh 1,08% per tahun. <span class="src-inline">BPS, SUPAS 2025</span></li>
    </ul>
  </section>`;
}

// ---------------- Population ----------------
export function viewPopulation() {
  const p = DATA.population;
  const chart = barChart(p.census.map((c) => ({ label: String(c.year), value: c.value })), { highlightIndex: 3 });
  const growthRows = p.growth.map((g) => `<tr><td>${g.period}</td><td class="num">${g.value.toLocaleString("id-ID")}% per tahun</td></tr>`).join("");
  return `
  ${pageHead("Penduduk", "284,67 juta jiwa pada 2025 — dan laju pertumbuhannya terus melambat.", "BPS, Survei Penduduk Antar Sensus (SUPAS) 2025")}
  <section class="bigstat"><span class="bigstat-value">${p.total.value}</span><span class="bigstat-label">jiwa penduduk Indonesia, ${p.total.year}</span></section>
  <section class="panel">
    <h2>Jumlah penduduk menurut sensus &amp; survei</h2>
    ${chart}
    <table class="tbl"><thead><tr><th>Pendataan</th><th class="num">Juta jiwa</th></tr></thead>
    <tbody>${p.census.map((c) => `<tr><td>${c.label} (${c.year})</td><td class="num">${c.value.toLocaleString("id-ID")}</td></tr>`).join("")}</tbody></table>
  </section>
  <section class="split">
    <article class="panel">
      <h2>Laju pertumbuhan melambat</h2>
      <table class="tbl"><thead><tr><th>Periode</th><th class="num">Laju</th></tr></thead><tbody>${growthRows}</tbody></table>
      <p>Dalam 15 tahun penduduk bertambah 47 juta jiwa, tetapi laju tahunannya turun dari 1,43% menjadi 1,08%.</p>
    </article>
    <article class="panel">
      <h2>Siapa penduduk Indonesia?</h2>
      <table class="tbl"><thead><tr><th>Ukuran</th><th class="num">Nilai</th><th>Keterangan</th><th>Sumber</th></tr></thead>
      <tbody>${p.facts.map(factRow).join("")}</tbody></table>
    </article>
  </section>`;
}

// ---------------- Economy (year selector wired in main.js) ----------------
export function viewEconomy() {
  const e = DATA.economy;
  const chart = lineChart(e.growth.map((g) => ({ label: String(g.year), value: g.value })), { highlightIndex: 5 });
  const buttons = e.growth.map((g, i) => `<button class="yr-btn${i === 5 ? " active" : ""}" data-year="${g.year}" data-idx="${i}">${g.year}</button>`).join("");
  const sectors = e.sectors.map((s) => `<tr><td>${s.label}</td><td class="num">${s.value}</td><td class="src-cell">${s.source}</td></tr>`).join("");
  return `
  ${pageHead("Ekonomi", "PDB Rp22.139 triliun pada 2024, tumbuh 5,03% — dan 5,11% pada 2025.", "BPS, Pertumbuhan Ekonomi Indonesia")}
  <section class="panel">
    <h2>Pertumbuhan PDB, 2020–2025 (% yoy)</h2>
    ${chart}
    <div class="yr-row" role="group" aria-label="Pilih tahun">
      <span class="yr-label">Pilih tahun:</span>${buttons}
    </div>
    <div class="yr-detail" id="yr-detail"></div>
    ${sourceNote(e.source)}
  </section>
  <section class="split">
    <article class="panel">
      <h2>Besaran ekonomi 2024</h2>
      <dl class="defs">
        <div><dt>PDB harga berlaku</dt><dd>${e.gdpNominal2024}</dd></div>
        <div><dt>PDB per kapita</dt><dd>${e.gdpPerCapita2024}</dd></div>
        <div><dt>PDB (US$)</dt><dd>${e.gdpUsd2024} — ${e.gdpRank2024}</dd></div>
      </dl>
    </article>
    <article class="panel">
      <h2>Apa yang menggerakkan 2024?</h2>
      <table class="tbl"><thead><tr><th>Ukuran</th><th class="num">Nilai</th><th>Sumber</th></tr></thead><tbody>${sectors}</tbody></table>
    </article>
  </section>`;
}

// ---------------- Prices ----------------
export function viewPrices() {
  const pr = DATA.prices;
  const chart = lineChart(pr.inflation.map((d) => ({ label: String(d.year), value: d.value })), { highlightIndex: 4, color: "#c8102e" });
  const comps = pr.components2024.map((c) => `<tr><td>${c.label}</td><td class="num">${c.value}</td><td>${c.note}</td></tr>`).join("");
  return `
  ${pageHead("Harga &amp; Inflasi", "Inflasi 2024 hanya 1,57% — terendah sejak BPS mulai menghitung inflasi pada 1958.", "BPS; Bank Indonesia")}
  <section class="bigstat"><span class="bigstat-value">${pr.headline2024.value}</span><span class="bigstat-label">inflasi tahun kalender 2024 (yoy)</span></section>
  <section class="panel">
    <h2>Inflasi tahunan (IHK, % yoy), 2020–2025</h2>
    ${chart}
    <p>Inflasi melonjak ke 5,51% pada 2022, lalu turun ke 2,61% (2023) dan 1,57% (2024) — di bawah rekor rendah sebelumnya 1,68% pada 2020. Sasaran pemerintah 2024: ${pr.target2024}.</p>
    ${sourceNote("BPS; Bank Indonesia")}
  </section>
  <section class="split">
    <article class="panel">
      <h2>Komponen inflasi 2024</h2>
      <table class="tbl"><thead><tr><th>Komponen</th><th class="num">Inflasi</th><th>Keterangan</th></tr></thead><tbody>${comps}</tbody></table>
      <p>IHK Desember 2024: <strong>${pr.ihk.dec2024}</strong> (Desember 2023: ${pr.ihk.dec2023}).</p>
    </article>
    <article class="panel">
      <h2>Inflasi menurut provinsi, 2024</h2>
      <table class="tbl"><tbody>${pr.provinces.map((x) => `<tr><td>${x.label}</td><td class="num">${x.value}</td></tr>`).join("")}</tbody></table>
      <p>Inflasi dihitung di 150 kota di 38 provinsi.</p>
      ${sourceNote("BPS, Desember 2024")}
    </article>
  </section>`;
}

// ---------------- Labour (province picker wired in main.js) ----------------
export function viewLabour() {
  const l = DATA.labour;
  const chart = barChart(l.tpt.map((t) => ({ label: t.period.replace(" ", "\n"), value: t.value })), { highlightIndex: 4 });
  const provRows = l.provinces.map((p, i) => `<button class="prov-btn${i === 3 ? " active" : ""}" data-idx="${i}">${p.name} — ${p.tpt.toLocaleString("id-ID")}%</button>`).join("");
  const sectors = l.sectors.map((s) => `<tr><td>${s.label}</td><td class="num">${s.value}</td></tr>`).join("");
  return `
  ${pageHead("Tenaga Kerja", "4,74% penduduk angkatan kerja menganggur pada November 2025 — 7,35 juta orang.", "BPS, Survei Angkatan Kerja Nasional (Sakernas)")}
  <section class="panel">
    <h2>Tingkat pengangguran terbuka (TPT, %)</h2>
    ${chart}
    <dl class="defs">
      <div><dt>Angkatan kerja, Nov 2025</dt><dd>${l.nov2025.labourForce}</dd></div>
      <div><dt>Bekerja</dt><dd>${l.nov2025.working}</dd></div>
      <div><dt>Menganggur</dt><dd>${l.nov2025.unemployed}</dd></div>
      <div><dt>TPAK, Agu 2025</dt><dd>${l.tpAk}</dd></div>
      <div><dt>Pekerja formal, Nov 2025</dt><dd>${l.formal}</dd></div>
    </dl>
    <p>TPT perkotaan Nov 2025: <strong>${l.nov2025.urban}</strong>; perdesaan: <strong>${l.nov2025.rural}</strong>. TPT Februari: 2022: 5,83% · 2023: 5,45% · 2024: 4,82% · 2025: 4,76%.</p>
    ${sourceNote(l.source)}
  </section>
  <section class="split">
    <article class="panel">
      <h2>Pengangguran menurut provinsi, Agustus 2025</h2>
      <p class="panel-sub">Ketuk sebuah provinsi untuk melihat rinciannya.</p>
      <div class="prov-list">${provRows}</div>
      <div class="prov-detail" id="prov-detail"></div>
      ${hbarChart(l.provinces.map((p) => ({ label: p.name, value: p.tpt, suffix: "%", hot: p.name === "Nasional" })))}
    </article>
    <article class="panel">
      <h2>Di mana orang bekerja?</h2>
      <table class="tbl"><thead><tr><th>Lapangan usaha</th><th class="num">Pangsa pekerja</th></tr></thead><tbody>${sectors}</tbody></table>
      <p>Pertanian masih menyerap pekerja terbanyak (27,99%), disusul perdagangan (18,67%) dan industri pengolahan (13,86%).</p>
      ${sourceNote("BPS, Sakernas November 2025")}
    </article>
  </section>`;
}

// ---------------- Poverty ----------------
export function viewPoverty() {
  const pv = DATA.poverty;
  const chart = barChart(pv.series.map((s) => ({ label: s.period.replace(" ", "\n"), value: s.rate })), { highlightIndex: 4 });
  const seriesRows = pv.series.map((s) => `<tr><td>${s.period}</td><td class="num">${s.rate.toLocaleString("id-ID")}%</td><td class="num">${s.millions.toLocaleString("id-ID")} jt</td></tr>`).join("");
  return `
  ${pageHead("Kemiskinan", "8,07% penduduk miskin pada Maret 2026 — 22,93 juta orang, terendah dalam tiga tahun.", "BPS, Survei Sosial Ekonomi Nasional (Susenas)")}
  <section class="bigstat"><span class="bigstat-value">${pv.latest.rate}</span><span class="bigstat-label">penduduk miskin, ${pv.latest.period.toLowerCase()} · ${pv.latest.millions}</span></section>
  <section class="panel">
    <h2>Tingkat kemiskinan menurun (%)</h2>
    ${chart}
    <table class="tbl"><thead><tr><th>Periode</th><th class="num">Persentase</th><th class="num">Juta orang</th></tr></thead><tbody>${seriesRows}</tbody></table>
    ${sourceNote(pv.source)}
  </section>
  <section class="split">
    <article class="panel">
      <h2>Kota vs desa, Maret 2025</h2>
      <table class="tbl"><thead><tr><th>Wilayah</th><th class="num">Tingkat</th><th>Jumlah</th></tr></thead>
      <tbody>${pv.urbanRural.map((r) => `<tr><td>${r.label}</td><td class="num">${r.value}</td><td>${r.note}</td></tr>`).join("")}</tbody></table>
      <p>Kemiskinan ekstrem Maret 2025: <strong>${pv.extreme[0].value}</strong> (${pv.extreme[0].detail}), turun dari ${pv.extreme[1].value} (${pv.extreme[1].detail}) pada Maret 2024. Gini ratio Maret 2025: <strong>${pv.gini.mar2025}</strong> (September 2024: ${pv.gini.sep2024}).</p>
    </article>
    <article class="panel">
      <h2>Garis kemiskinan, Maret 2025</h2>
      <p class="panel-sub">${pv.povertyLine.total} ${pv.povertyLine.unit}</p>
      ${donutChart([
        { label: "Makanan", share: pv.povertyLine.food.share },
        { label: "Bukan makanan", share: pv.povertyLine.nonFood.share },
      ])}
      <table class="tbl"><tbody>
        <tr><td>${pv.povertyLine.food.label}</td><td class="num">Rp${pv.povertyLine.food.value.toLocaleString("id-ID")}</td><td class="num">${pv.povertyLine.food.share.toLocaleString("id-ID")}%</td></tr>
        <tr><td>${pv.povertyLine.nonFood.label}</td><td class="num">Rp${pv.povertyLine.nonFood.value.toLocaleString("id-ID")}</td><td class="num">${pv.povertyLine.nonFood.share.toLocaleString("id-ID")}%</td></tr>
      </tbody></table>
      ${sourceNote("BPS, Susenas Maret 2025")}
    </article>
  </section>`;
}

// ---------------- Education ----------------
export function viewEducation() {
  const ed = DATA.education;
  const apm = hbarChart(ed.apm.map((a) => ({ label: a.level, value: a.value, suffix: "%" })));
  const apk = hbarChart(ed.apk.map((a) => ({ label: a.level, value: a.value, suffix: "%" })));
  return `
  ${pageHead("Pendidikan", "Sekolah dasar hampir universal — tetapi hanya 70,74% anak usia SMA yang bersekolah di jenjangnya.", "BPS, Statistik Pendidikan; Susenas")}
  <section class="split">
    <article class="panel">
      <h2>Angka partisipasi murni (APM), TA 2024/2025</h2>
      <p class="panel-sub">Anak yang bersekolah pada jenjang usianya. Makin tinggi jenjang, makin lebar jurang.</p>
      ${apm}
      <p>APM SD 93,77% · SMP 79,87% · SMA/SMK 70,74%.</p>
    </article>
    <article class="panel">
      <h2>Angka partisipasi kasar (APK), TA 2024/2025</h2>
      <p class="panel-sub">APK di atas 100% berarti ada siswa di luar kelompok usia resmi pada jenjang itu.</p>
      ${apk}
      <p>APK PAUD 47,00% · SD 102,64% · SMP 103,20% · SMA/SMK 97,36%.</p>
    </article>
  </section>
  <section class="split">
    <article class="panel">
      <h2>Lama sekolah &amp; partisipasi</h2>
      <dl class="defs">
        <div><dt>Rata-rata lama sekolah 2025</dt><dd>${ed.rls.value2025} (2024: ${ed.rls.value2024})</dd></div>
        <div><dt>Perkotaan vs perdesaan</dt><dd>${ed.rls.urban} vs ${ed.rls.rural}</dd></div>
        <div><dt>Harapan lama sekolah 2025</dt><dd>${ed.hls}</dd></div>
        <div><dt>APS usia 7–12 tahun</dt><dd>${ed.aps[0].value}</dd></div>
        <div><dt>APS usia 13–15 tahun</dt><dd>${ed.aps[1].value}</dd></div>
      </dl>
    </article>
    <article class="panel">
      <h2>Yang masih tertinggal</h2>
      <dl class="defs">
        <div><dt>Anak putus sekolah, TA 2024/2025</dt><dd>${ed.dropouts.total} (SD ${ed.dropouts.sd} · SMP ${ed.dropouts.smp} · SMA/SMK ${ed.dropouts.sma})</dd></div>
        <div><dt>PISA 2022 — matematika level 2</dt><dd>${ed.pisa.math} siswa Indonesia vs ${ed.pisa.oecd} rata-rata OECD</dd></div>
      </dl>
      <p>${ed.pisa.note}</p>
      ${sourceNote(ed.source)}
    </article>
  </section>`;
}

// ---------------- Health & HDI ----------------
export function viewHealth() {
  const h = DATA.health;
  const ipm = lineChart(h.ipm.map((d) => ({ label: String(d.year), value: d.value })), { highlightIndex: 5 });
  const uhh = lineChart(h.uhh.map((d) => ({ label: String(d.year), value: d.value })), { highlightIndex: 5, color: "#c8102e" });
  return `
  ${pageHead("Kesehatan &amp; Pembangunan Manusia", "IPM 75,90 pada 2025 — kategori tinggi — dengan harapan hidup 74,47 tahun.", "BPS, Indeks Pembangunan Manusia 2025")}
  <section class="split">
    <article class="panel">
      <h2>Indeks Pembangunan Manusia, 2020–2025</h2>
      ${ipm}
      <p>IPM naik setiap tahun: 72,81 (2020) → 75,90 (2025), rata-rata +0,83 poin per tahun.</p>
    </article>
    <article class="panel">
      <h2>Umur harapan hidup saat lahir (tahun)</h2>
      ${uhh}
      <p>Bayi lahir 2025 diperkirakan hidup hingga 74,47 tahun — naik 0,32 tahun dari 2024.</p>
    </article>
  </section>
  <section class="split">
    <article class="panel">
      <h2>Penyusun IPM 2025</h2>
      <dl class="defs">
        <div><dt>Umur harapan hidup</dt><dd>74,47 tahun</dd></div>
        <div><dt>Harapan lama sekolah</dt><dd>13,30 tahun</dd></div>
        <div><dt>Rata-rata lama sekolah</dt><dd>9,07 tahun</dd></div>
        <div><dt>Pengeluaran riil per kapita</dt><dd>${h.spending2025} per tahun (+Rp461.000 dari 2024)</dd></div>
      </dl>
    </article>
    <article class="panel">
      <h2>IPM menurut provinsi, 2025</h2>
      <table class="tbl"><tbody>${h.provinces.map((x) => `<tr><td>${x.label}</td><td class="num">${x.value}</td></tr>`).join("")}</tbody></table>
      <p>Rentang IPM provinsi: 54,91 (Papua Pegunungan) hingga 85,05 (DKI Jakarta).</p>
      ${sourceNote(h.source)}
    </article>
  </section>`;
}

// ---------------- All indicators (search wired in main.js) ----------------
export function viewIndicators() {
  const rows = INDICATORS.map((ind, i) => `
    <tr class="ind-row" data-name="${ind.name.toLowerCase()} ${ind.value.toLowerCase()} ${ind.source.toLowerCase()}">
      <td><a href="${ind.route}">${ind.name}</a></td>
      <td class="num">${ind.value}</td>
      <td>${ind.year}</td>
      <td class="src-cell">${ind.source}</td>
    </tr>`).join("");
  return `
  ${pageHead("Semua Indikator", "Cari dan saring seluruh indikator di situs ini — ketik kata kunci, daftarnya menyaring seketika.", "BPS; Bank Indonesia")}
  <section class="panel">
    <label class="search-label" for="ind-search">Cari indikator</label>
    <input id="ind-search" class="search-box" type="search" placeholder="mis. inflasi, kemiskinan, sekolah…" autocomplete="off">
    <p class="panel-sub"><span id="ind-count">${INDICATORS.length}</span> indikator ditampilkan. Klik nama indikator untuk membuka bidangnya.</p>
    <table class="tbl" id="ind-table">
      <thead><tr><th>Indikator</th><th class="num">Nilai</th><th>Tahun</th><th>Sumber</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="empty-note" id="ind-empty" hidden>Tidak ada indikator yang cocok dengan pencarian itu.</p>
  </section>`;
}
