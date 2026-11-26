// charts.js — small SVG chart builders. Pure functions: data in, SVG string out.
// No libraries, no network. All charts are drawn in code from the site's own data.

const NS = "http://www.w3.org/2000/svg";

function fmt(n, digits = 2) {
  return n.toLocaleString("id-ID", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

// Vertical bar chart. points: [{label, value}]. highlightIndex: index to paint red.
export function barChart(points, opts = {}) {
  const w = opts.width ?? 640;
  const h = opts.height ?? 260;
  const padL = 44, padB = 28, padT = 26, padR = 8;
  const max = Math.max(...points.map((p) => p.value)) * 1.12;
  const min = Math.min(0, ...points.map((p) => p.value));
  const span = max - min;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const bw = Math.min(64, (iw / points.length) * 0.62);
  const step = iw / points.length;
  const y = (v) => padT + ih - ((v - min) / span) * ih;
  const zeroY = y(0);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Diagram batang" xmlns="${NS}">`;
  s += `<line x1="${padL}" y1="${zeroY}" x2="${w - padR}" y2="${zeroY}" stroke="#94a3b8" stroke-width="1"/>`;
  points.forEach((p, i) => {
    const x = padL + i * step + (step - bw) / 2;
    const top = y(Math.max(p.value, 0));
    const bot = y(Math.min(p.value, 0));
    const fill = i === opts.highlightIndex ? "#c8102e" : p.value < 0 ? "#b45309" : "#0e7c7b";
    s += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1, bot - top).toFixed(1)}" rx="3" fill="${fill}"/>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="#14213d">${fmt(p.value)}</text>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${(h - 8).toFixed(1)}" text-anchor="middle" font-size="12" fill="#475569">${p.label}</text>`;
  });
  s += "</svg>";
  return s;
}

// Line chart with dots and value labels. points: [{label, value}].
export function lineChart(points, opts = {}) {
  const w = opts.width ?? 640;
  const h = opts.height ?? 260;
  const padL = 44, padB = 28, padT = 26, padR = 18;
  const vals = points.map((p) => p.value);
  let max = Math.max(...vals);
  let min = Math.min(...vals);
  if (max === min) { max += 1; min -= 1; }
  const pad = (max - min) * 0.15;
  max += pad; min -= pad;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const x = (i) => padL + (i / (points.length - 1)) * iw;
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Diagram garis" xmlns="${NS}">`;
  // gridlines at min/mid/max
  [min, (min + max) / 2, max].forEach((g) => {
    s += `<line x1="${padL}" y1="${y(g).toFixed(1)}" x2="${w - padR}" y2="${y(g).toFixed(1)}" stroke="#e2e8f0" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${(y(g) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#94a3b8">${fmt(g, 1)}</text>`;
  });
  s += `<path d="${line}" fill="none" stroke="${opts.color ?? "#0e7c7b"}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    const hot = i === opts.highlightIndex;
    s += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="${hot ? 6 : 4}" fill="${hot ? "#c8102e" : "#fff"}" stroke="${hot ? "#c8102e" : opts.color ?? "#0e7c7b"}" stroke-width="2.5"/>`;
    s += `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#14213d">${fmt(p.value)}</text>`;
    s += `<text x="${x(i).toFixed(1)}" y="${(h - 8).toFixed(1)}" text-anchor="middle" font-size="12" fill="#475569">${p.label}</text>`;
  });
  s += "</svg>";
  return s;
}

// Horizontal bar chart for rankings/comparisons. rows: [{label, value, suffix}].
export function hbarChart(rows, opts = {}) {
  const w = opts.width ?? 640;
  const rowH = 34;
  const h = rows.length * rowH + 16;
  const padL = 150, padR = 64;
  const max = Math.max(...rows.map((r) => r.value)) * 1.08;
  const iw = w - padL - padR;
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Diagram batang horizontal" xmlns="${NS}">`;
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const bw = (r.value / max) * iw;
    const fill = r.hot ? "#c8102e" : "#0e7c7b";
    s += `<text x="${padL - 10}" y="${y + 15}" text-anchor="end" font-size="13" fill="#14213d">${r.label}</text>`;
    s += `<rect x="${padL}" y="${y}" width="${Math.max(2, bw).toFixed(1)}" height="20" rx="3" fill="${fill}"/>`;
    s += `<text x="${(padL + bw + 8).toFixed(1)}" y="${y + 15}" font-size="13" font-weight="700" fill="#14213d">${fmt(r.value)}${r.suffix ?? ""}</text>`;
  });
  s += "</svg>";
  return s;
}

// Donut chart for a two-part split. parts: [{label, share}] shares sum to ~100.
export function donutChart(parts, opts = {}) {
  const size = opts.size ?? 220;
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, thick = 34;
  const total = parts.reduce((a, p) => a + p.share, 0);
  let acc = 0;
  let s = `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Diagram donat" xmlns="${NS}">`;
  const colors = ["#0e7c7b", "#d9a441"];
  parts.forEach((p, i) => {
    const a0 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((acc + p.share) / total) * Math.PI * 2 - Math.PI / 2;
    acc += p.share;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    s += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="${thick}"/>`;
  });
  s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="20" font-weight="800" fill="#14213d">${fmt(parts[0].share, 1)}%</text>`;
  s += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#475569">${parts[0].label}</text>`;
  s += "</svg>";
  return s;
}
