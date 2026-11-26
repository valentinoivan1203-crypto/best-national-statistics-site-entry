// DataNusa — all figures verified from official sources (BPS and Bank Indonesia).
// Every figure carries its source and year; nothing here is invented.
// Values use Indonesian number formatting in the views (comma decimals).

export const SOURCES = {
  bps: "Badan Pusat Statistik (BPS)",
  bi: "Bank Indonesia (data BPS)",
};

export const DATA = {
  meta: {
    siteName: "DataNusa",
    tagline: "Statistik Indonesia dalam angka",
    updated: "26 November 2026",
    note: "Seluruh angka di situs ini berasal dari Badan Pusat Statistik (BPS) dan Bank Indonesia. DataNusa bukan situs resmi BPS; situs ini menyajikan ulang data resmi agar mudah dibaca.",
  },

  // ---- Overview key indicators ----
  overview: [
    { label: "Penduduk", value: "284,67 jt", detail: "jiwa, SUPAS 2025", route: "#/penduduk", source: "BPS, SUPAS 2025" },
    { label: "PDB", value: "Rp22.139 T", detail: "harga berlaku, 2024", route: "#/ekonomi", source: "BPS, 2024" },
    { label: "Pertumbuhan ekonomi", value: "5,11%", detail: "tahun 2025", route: "#/ekonomi", source: "BPS, 2025" },
    { label: "Inflasi", value: "1,57%", detail: "tahun 2024, terendah sejak 1958", route: "#/harga", source: "BPS, 2024" },
    { label: "Pengangguran (TPT)", value: "4,74%", detail: "November 2025", route: "#/kerja", source: "BPS, Sakernas Nov 2025" },
    { label: "Kemiskinan", value: "8,07%", detail: "Maret 2026 · 22,93 jt orang", route: "#/kemiskinan", source: "BPS, Susenas Mar 2026" },
    { label: "IPM", value: "75,90", detail: "kategori tinggi, 2025", route: "#/kesehatan", source: "BPS, IPM 2025" },
    { label: "Harapan hidup", value: "74,47 th", detail: "saat lahir, 2025", route: "#/kesehatan", source: "BPS, IPM 2025" },
  ],

  // ---- Population (BPS SUPAS 2025) ----
  population: {
    total: { value: "284,67 juta", year: 2025, source: "BPS, SUPAS 2025" },
    census: [
      { year: 2010, value: 237.64, label: "SP2010" },
      { year: 2015, value: 255.18, label: "SUPAS 2015" },
      { year: 2020, value: 270.2, label: "SP2020" },
      { year: 2025, value: 284.67, label: "SUPAS 2025" },
    ],
    growth: [
      { period: "2010–2015", value: 1.43 },
      { period: "2015–2020", value: 1.1 },
      { period: "2020–2025", value: 1.08 },
    ],
    facts: [
      { label: "Penduduk Pulau Jawa", value: "158,41 juta", detail: "55,65% dari total penduduk", source: "BPS, SUPAS 2025" },
      { label: "Usia produktif (15–64 th)", value: "68,94%", detail: "dari total penduduk", source: "BPS, SUPAS 2025" },
      { label: "Rasio ketergantungan", value: "45,05", detail: "100 penduduk produktif menanggung 45 nonproduktif", source: "BPS, SUPAS 2025" },
      { label: "Angka kelahiran total (TFR)", value: "2,13", detail: "mendekati replacement level", source: "BPS, SUPAS 2025" },
      { label: "Generasi terbesar", value: "Gen Z · 24,93%", detail: "kelompok generasi terbesar di Indonesia", source: "BPS, SUPAS 2025" },
    ],
  },

  // ---- Economy (BPS) ----
  economy: {
    growth: [
      { year: 2020, value: -2.07, note: "Kontraksi pandemi COVID-19." },
      { year: 2021, value: 3.7, note: "Pemulihan mulai menguat." },
      { year: 2022, value: 5.31, note: "Rebound kuat seiring pembukaan aktivitas." },
      { year: 2023, value: 5.05, note: "Kembali pada kisaran 5 persen." },
      { year: 2024, value: 5.03, note: "PDB Rp22.139 triliun; per kapita Rp78,61 juta (US$4.960,3)." },
      { year: 2025, value: 5.11, note: "Triwulan IV-2025 tumbuh 5,39% yoy." },
    ],
    gdpNominal2024: "Rp22.139 triliun",
    gdpPerCapita2024: "Rp78,61 juta (US$4.960,3)",
    gdpUsd2024: "US$1,396 triliun",
    gdpRank2024: "peringkat 17 dari 196 negara",
    sectors: [
      { label: "Lapangan usaha tumbuh tercepat 2024", value: "Jasa Lainnya · 9,80%", source: "BPS, 2024" },
      { label: "Komponen pengeluaran tumbuh tercepat 2024", value: "PK-LNPRT · 12,48%", source: "BPS, 2024" },
      { label: "Pangsa pertambangan & penggalian thd PDB 2024", value: "9,15%", source: "BPS, 2024" },
      { label: "PDB nominal 2020 → 2024", value: "Rp15.434,2 T → Rp22.139,0 T", source: "BPS, 2024" },
    ],
    source: "BPS, Pertumbuhan Ekonomi Indonesia",
  },

  // ---- Prices / inflation (BPS, via Bank Indonesia) ----
  prices: {
    inflation: [
      { year: 2020, value: 1.68 },
      { year: 2021, value: 1.87 },
      { year: 2022, value: 5.51 },
      { year: 2023, value: 2.61 },
      { year: 2024, value: 1.57 },
      { year: 2025, value: 2.92 },
    ],
    headline2024: { value: "1,57%", note: "Inflasi tahun kalender 2024 — terendah sejak BPS mulai menghitung inflasi (1958). Rekor rendah sebelumnya 1,68% pada 2020.", source: "BPS, 2 Jan 2025" },
    components2024: [
      { label: "Inflasi inti", value: "2,26%", note: "Komponen inti Desember 2024 (yoy)." },
      { label: "Volatile food", value: "0,12%", note: "Jauh di bawah 6,73% pada akhir 2023." },
      { label: "Administered prices", value: "0,56%", note: "Di bawah 1,72% pada tahun sebelumnya." },
    ],
    ihk: { dec2024: "106,80", dec2023: "105,15", note: "Indeks Harga Konsumen, Desember." },
    target2024: "2,5% ± 1%",
    provinces: [
      { label: "Inflasi provinsi tertinggi 2024", value: "Papua Pegunungan · 5,36%", source: "BPS, Des 2024" },
      { label: "Inflasi provinsi terendah 2024", value: "Sulawesi Utara · 0,44%", source: "BPS, Des 2024" },
    ],
    source: "BPS; Bank Indonesia",
  },

  // ---- Labour (BPS Sakernas) ----
  labour: {
    tpt: [
      { period: "Feb 2024", value: 4.82 },
      { period: "Agu 2024", value: 4.91 },
      { period: "Feb 2025", value: 4.76 },
      { period: "Agu 2025", value: 4.85 },
      { period: "Nov 2025", value: 4.74 },
    ],
    febSeries: [
      { year: 2022, value: 5.83 },
      { year: 2023, value: 5.45 },
      { year: 2024, value: 4.82 },
      { year: 2025, value: 4.76 },
    ],
    nov2025: {
      labourForce: "155,27 juta orang",
      working: "147,91 juta orang",
      unemployed: "7,35 juta orang",
      tpt: "4,74%",
      urban: "5,65%",
      rural: "3,31%",
    },
    provinces: [
      { name: "Papua", tpt: 6.96, change: "+0,48 poin dari 2024", unemployed: "32.475 orang" },
      { name: "Papua Barat Daya", tpt: 6.85, change: "+0,37 poin dari 2024", unemployed: "22.209 orang" },
      { name: "Jawa Barat", tpt: 6.77, change: "+0,02 poin dari 2024", unemployed: "1.779.622 orang" },
      { name: "Nasional", tpt: 4.85, change: "−0,06 poin dari 2024", unemployed: "7,46 juta orang" },
      { name: "Bali", tpt: 1.49, change: "terendah di Indonesia", unemployed: "—" },
    ],
    tpAk: "70,59%",
    formal: "42,30%",
    sectors: [
      { label: "Pertanian", value: "27,99%" },
      { label: "Perdagangan", value: "18,67%" },
      { label: "Industri pengolahan", value: "13,86%" },
    ],
    source: "BPS, Sakernas Agustus & November 2025",
  },

  // ---- Poverty (BPS Susenas) ----
  poverty: {
    series: [
      { period: "Mar 2024", rate: 9.03, millions: 25.22 },
      { period: "Sep 2024", rate: 8.57, millions: 24.06 },
      { period: "Mar 2025", rate: 8.47, millions: 23.85 },
      { period: "Sep 2025", rate: 8.25, millions: 23.36 },
      { period: "Mar 2026", rate: 8.07, millions: 22.93 },
    ],
    latest: { period: "Maret 2026", rate: "8,07%", millions: "22,93 juta orang", note: "Terendah dalam tiga tahun terakhir.", source: "BPS, Susenas Mar 2026" },
    urbanRural: [
      { label: "Perkotaan, Mar 2025", value: "6,73%", note: "11,27 juta orang" },
      { label: "Perdesaan, Mar 2025", value: "11,03%", note: "12,58 juta orang" },
    ],
    povertyLine: {
      total: "Rp609.160",
      unit: "per kapita per bulan, Maret 2025",
      food: { label: "Garis kemiskinan makanan", value: 454299, share: 74.58 },
      nonFood: { label: "Garis kemiskinan bukan makanan", value: 154861, share: 25.42 },
    },
    extreme: [
      { label: "Kemiskinan ekstrem, Mar 2025", value: "0,85%", detail: "2,38 juta orang" },
      { label: "Kemiskinan ekstrem, Mar 2024", value: "1,26%", detail: "3,56 juta orang" },
    ],
    gini: { mar2025: "0,375", sep2024: "0,381" },
    source: "BPS, Susenas",
  },

  // ---- Education (BPS, tahun ajaran 2024/2025) ----
  education: {
    apm: [
      { level: "SD", value: 93.77 },
      { level: "SMP", value: 79.87 },
      { level: "SMA/SMK", value: 70.74 },
    ],
    apk: [
      { level: "PAUD", value: 47.0 },
      { level: "SD", value: 102.64 },
      { level: "SMP", value: 103.2 },
      { level: "SMA/SMK", value: 97.36 },
    ],
    rls: { value2025: "9,07 tahun", urban: "10,08 tahun", rural: "≈ 7 tahun", value2024: "8,85 tahun" },
    aps: [
      { label: "Usia 7–12 tahun", value: "99,23%" },
      { label: "Usia 13–15 tahun", value: "96,30%" },
    ],
    dropouts: { total: "66.866 anak", sd: "38.540", smp: "12.219", sma: "16.107" },
    hls: "13,30 tahun",
    pisa: { math: "18%", oecd: "69%", note: "Siswa Indonesia yang mencapai kemampuan matematika minimal level 2, PISA 2022; rata-rata OECD 69%." },
    source: "BPS, Statistik Pendidikan; Susenas",
  },

  // ---- Health & human development (BPS IPM 2025) ----
  health: {
    ipm: [
      { year: 2020, value: 72.81 },
      { year: 2021, value: 73.16 },
      { year: 2022, value: 73.77 },
      { year: 2023, value: 74.39 },
      { year: 2024, value: 75.02 },
      { year: 2025, value: 75.9 },
    ],
    uhh: [
      { year: 2020, value: 73.37 },
      { year: 2021, value: 73.46 },
      { year: 2022, value: 73.7 },
      { year: 2023, value: 73.93 },
      { year: 2024, value: 74.15 },
      { year: 2025, value: 74.47 },
    ],
    hls: [
      { year: 2020, value: 12.98 },
      { year: 2021, value: 13.08 },
      { year: 2022, value: 13.1 },
      { year: 2023, value: 13.15 },
      { year: 2024, value: 13.21 },
      { year: 2025, value: 13.3 },
    ],
    rls: [
      { year: 2020, value: 8.48 },
      { year: 2021, value: 8.54 },
      { year: 2022, value: 8.69 },
      { year: 2023, value: 8.77 },
      { year: 2024, value: 8.85 },
      { year: 2025, value: 9.07 },
    ],
    spending2025: "Rp12.802.000",
    provinces: [
      { label: "IPM tertinggi", value: "DKI Jakarta · 85,05" },
      { label: "IPM terendah", value: "Papua Pegunungan · 54,91" },
      { label: "DI Yogyakarta", value: "82,48" },
      { label: "Kepulauan Riau", value: "80,53" },
    ],
    source: "BPS, Indeks Pembangunan Manusia 2025",
  },
};

// ---- Flat indicator index for the search page ----
// Each entry: name, value, year, source, route.
export const INDICATORS = [
  { name: "Jumlah penduduk", value: "284,67 juta jiwa", year: 2025, source: "BPS, SUPAS 2025", route: "#/penduduk" },
  { name: "Laju pertumbuhan penduduk", value: "1,08% per tahun", year: "2020–2025", source: "BPS, SUPAS 2025", route: "#/penduduk" },
  { name: "Penduduk Pulau Jawa", value: "158,41 juta (55,65%)", year: 2025, source: "BPS, SUPAS 2025", route: "#/penduduk" },
  { name: "Penduduk usia produktif (15–64 tahun)", value: "68,94%", year: 2025, source: "BPS, SUPAS 2025", route: "#/penduduk" },
  { name: "Rasio ketergantungan", value: "45,05", year: 2025, source: "BPS, SUPAS 2025", route: "#/penduduk" },
  { name: "Angka kelahiran total (TFR)", value: "2,13", year: 2025, source: "BPS, SUPAS 2025", route: "#/penduduk" },
  { name: "PDB harga berlaku", value: "Rp22.139 triliun", year: 2024, source: "BPS", route: "#/ekonomi" },
  { name: "Pertumbuhan ekonomi (PDB)", value: "5,11%", year: 2025, source: "BPS", route: "#/ekonomi" },
  { name: "PDB per kapita", value: "Rp78,61 juta (US$4.960,3)", year: 2024, source: "BPS", route: "#/ekonomi" },
  { name: "PDB (US$)", value: "US$1,396 triliun", year: 2024, source: "BPS", route: "#/ekonomi" },
  { name: "Inflasi tahunan (IHK)", value: "1,57%", year: 2024, source: "BPS", route: "#/harga" },
  { name: "Inflasi inti", value: "2,26%", year: 2024, source: "BPS", route: "#/harga" },
  { name: "Indeks Harga Konsumen (IHK)", value: "106,80", year: "Des 2024", source: "BPS", route: "#/harga" },
  { name: "Tingkat pengangguran terbuka (TPT)", value: "4,74%", year: "Nov 2025", source: "BPS, Sakernas", route: "#/kerja" },
  { name: "Angkatan kerja", value: "155,27 juta orang", year: "Nov 2025", source: "BPS, Sakernas", route: "#/kerja" },
  { name: "Tingkat partisipasi angkatan kerja (TPAK)", value: "70,59%", year: "Agu 2025", source: "BPS, Sakernas", route: "#/kerja" },
  { name: "Pekerja formal", value: "42,30%", year: "Nov 2025", source: "BPS, Sakernas", route: "#/kerja" },
  { name: "Tingkat kemiskinan", value: "8,07%", year: "Mar 2026", source: "BPS, Susenas", route: "#/kemiskinan" },
  { name: "Jumlah penduduk miskin", value: "22,93 juta orang", year: "Mar 2026", source: "BPS, Susenas", route: "#/kemiskinan" },
  { name: "Garis kemiskinan", value: "Rp609.160/kapita/bulan", year: "Mar 2025", source: "BPS, Susenas", route: "#/kemiskinan" },
  { name: "Kemiskinan ekstrem", value: "0,85%", year: "Mar 2025", source: "BPS, Susenas", route: "#/kemiskinan" },
  { name: "Gini ratio", value: "0,375", year: "Mar 2025", source: "BPS, Susenas", route: "#/kemiskinan" },
  { name: "Angka partisipasi murni SD", value: "93,77%", year: "TA 2024/2025", source: "BPS", route: "#/pendidikan" },
  { name: "Angka partisipasi murni SMP", value: "79,87%", year: "TA 2024/2025", source: "BPS", route: "#/pendidikan" },
  { name: "Angka partisipasi murni SMA/SMK", value: "70,74%", year: "TA 2024/2025", source: "BPS", route: "#/pendidikan" },
  { name: "Rata-rata lama sekolah", value: "9,07 tahun", year: 2025, source: "BPS", route: "#/pendidikan" },
  { name: "Harapan lama sekolah", value: "13,30 tahun", year: 2025, source: "BPS", route: "#/pendidikan" },
  { name: "Anak putus sekolah", value: "66.866 anak", year: "TA 2024/2025", source: "BPS", route: "#/pendidikan" },
  { name: "Indeks Pembangunan Manusia (IPM)", value: "75,90", year: 2025, source: "BPS", route: "#/kesehatan" },
  { name: "Umur harapan hidup saat lahir", value: "74,47 tahun", year: 2025, source: "BPS", route: "#/kesehatan" },
  { name: "Pengeluaran riil per kapita", value: "Rp12.802.000/tahun", year: 2025, source: "BPS", route: "#/kesehatan" },
];
