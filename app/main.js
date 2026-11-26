// main.js — router and controls. Hash routes switch pages; every control on the
// page updates the page when used: the year picker, the province picker and the
// indicator search all work with real clicks and keystrokes.

import { DATA } from "./data.js";
import {
  viewOverview,
  viewPopulation,
  viewEconomy,
  viewPrices,
  viewLabour,
  viewPoverty,
  viewEducation,
  viewHealth,
  viewIndicators,
} from "./views.js";

const ROUTES = {
  "/": viewOverview,
  "/penduduk": viewPopulation,
  "/ekonomi": viewEconomy,
  "/harga": viewPrices,
  "/kerja": viewLabour,
  "/kemiskinan": viewPoverty,
  "/pendidikan": viewEducation,
  "/kesehatan": viewHealth,
  "/indikator": viewIndicators,
};

const NAV = [
  ["/", "Beranda"],
  ["/penduduk", "Penduduk"],
  ["/ekonomi", "Ekonomi"],
  ["/harga", "Harga"],
  ["/kerja", "Tenaga Kerja"],
  ["/kemiskinan", "Kemiskinan"],
  ["/pendidikan", "Pendidikan"],
  ["/kesehatan", "Kesehatan"],
  ["/indikator", "Semua Indikator"],
];

function currentRoute() {
  const hash = window.location.hash || "#/";
  const path = hash.slice(1).split("?")[0] || "/";
  return ROUTES[path] ? path : "/";
}

// ---- Economy year picker: buttons update the detail panel and the active year. ----
function wireYearPicker() {
  const detail = document.getElementById("yr-detail");
  if (!detail) return;
  const show = (idx) => {
    const g = DATA.economy.growth[idx];
    detail.innerHTML = `<strong>${g.year}: ${g.value.toLocaleString("id-ID")}%</strong> — ${g.note} <span class="src-inline">Sumber: BPS</span>`;
    document.querySelectorAll(".yr-btn").forEach((b) => {
      b.classList.toggle("active", Number(b.dataset.idx) === idx);
    });
  };
  document.querySelectorAll(".yr-btn").forEach((b) => {
    b.addEventListener("click", () => show(Number(b.dataset.idx)));
  });
  show(DATA.economy.growth.length - 1);
}

// ---- Labour province picker: buttons update the detail panel. ----
function wireProvincePicker() {
  const detail = document.getElementById("prov-detail");
  if (!detail) return;
  const show = (idx) => {
    const p = DATA.labour.provinces[idx];
    detail.innerHTML = `<strong>${p.name}: TPT ${p.tpt.toLocaleString("id-ID")}%</strong> — ${p.change}. Penganggur: ${p.unemployed}. <span class="src-inline">Sumber: BPS, Sakernas Agustus 2025</span>`;
    document.querySelectorAll(".prov-btn").forEach((b) => {
      b.classList.toggle("active", Number(b.dataset.idx) === idx);
    });
  };
  document.querySelectorAll(".prov-btn").forEach((b) => {
    b.addEventListener("click", () => show(Number(b.dataset.idx)));
  });
  show(3); // Nasional
}

// ---- Indicator search: typing filters the table rows live. ----
function wireIndicatorSearch() {
  const input = document.getElementById("ind-search");
  const count = document.getElementById("ind-count");
  const empty = document.getElementById("ind-empty");
  if (!input) return;
  const apply = () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll(".ind-row").forEach((row) => {
      const hit = !q || row.dataset.name.includes(q);
      row.style.display = hit ? "" : "none";
      if (hit) shown += 1;
    });
    count.textContent = shown;
    empty.hidden = shown !== 0;
  };
  input.addEventListener("input", apply);
}

function render() {
  const route = currentRoute();
  const app = document.getElementById("app");
  app.innerHTML = ROUTES[route]();
  document.querySelectorAll("nav a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${route}`);
    if (route === "/" && a.getAttribute("href") === "#/") a.classList.add("active");
  });
  wireYearPicker();
  wireProvincePicker();
  wireIndicatorSearch();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
