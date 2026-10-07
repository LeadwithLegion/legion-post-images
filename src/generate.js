import fs from 'node:fs';
import path from 'node:path';

const [, , titleArg = 'Legion Post', subtitleArg = 'Your next big idea starts here.', outputArg] = process.argv;

const title = String(titleArg);
const subtitle = String(subtitleArg);
const outputPath = outputArg ? path.resolve(outputArg) : path.resolve('output', 'post.svg');
const outputDir = path.dirname(outputPath);

const escapeXml = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const svg = `
<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="150" y1="120" x2="1030" y2="1020" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0B1020"/>
      <stop offset="1" stop-color="#1A2340"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#7C3AED"/>
      <stop offset="0.5" stop-color="#22D3EE"/>
      <stop offset="1" stop-color="#34D399"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="1200" height="1200" rx="44" fill="url(#bg)"/>
  <circle cx="980" cy="180" r="280" fill="#7C3AED" fill-opacity="0.12"/>
  <circle cx="240" cy="1010" r="260" fill="#22D3EE" fill-opacity="0.12"/>
  <path d="M150 860C240 750 400 690 520 720C650 754 730 680 820 620C897 565 973 544 1030 552V1050H150V860Z" fill="#0F172A" fill-opacity="0.6"/>

  <rect x="100" y="100" width="180" height="52" rx="26" fill="url(#accent)" opacity="0.9"/>
  <text x="136" y="136" fill="#E2E8F0" font-size="22" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="3">LEGION</text>

  <rect x="100" y="180" width="180" height="8" rx="4" fill="url(#accent)" filter="url(#glow)"/>

  <text x="100" y="430" fill="#F8FAFC" font-size="92" font-weight="800" font-family="Arial, Helvetica, sans-serif">
    <tspan x="100" dy="0">${escapeXml(title.split('\n')[0] || 'Legion Post')}</tspan>
    ${title.split('\n').slice(1).map((line) => `<tspan x="100" dy="95">${escapeXml(line)}</tspan>`).join('')}
  </text>

  <text x="100" y="640" fill="#CBD5E1" font-size="32" font-family="Arial, Helvetica, sans-serif" font-weight="500">
    ${escapeXml(subtitle)}
  </text>

  <g opacity="0.9">
    <rect x="100" y="728" width="248" height="128" rx="22" fill="#111827" stroke="#334155"/>
    <rect x="128" y="756" width="78" height="12" rx="6" fill="url(#accent)"/>
    <rect x="128" y="782" width="160" height="12" rx="6" fill="#475569"/>
    <rect x="128" y="806" width="132" height="12" rx="6" fill="#475569"/>
  </g>

  <g opacity="0.95">
    <rect x="862" y="760" width="220" height="230" rx="30" fill="#111827" stroke="#334155"/>
    <circle cx="972" cy="820" r="54" fill="url(#accent)" opacity="0.8"/>
    <path d="M947 820L967 840L998 806" stroke="#F8FAFC" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="910" y="908" fill="#E2E8F0" font-size="24" font-family="Arial, Helvetica, sans-serif" font-weight="700">READY</text>
    <text x="903" y="944" fill="#94A3B8" font-size="18" font-family="Arial, Helvetica, sans-serif">TO SHARE</text>
  </g>

  <text x="100" y="1060" fill="#94A3B8" font-size="20" font-family="Arial, Helvetica, sans-serif" letter-spacing="5">LEGION.POST.IMAGES</text>
</svg>
`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, svg.trim() + '\n');
console.log(`Created SVG at ${outputPath}`);
