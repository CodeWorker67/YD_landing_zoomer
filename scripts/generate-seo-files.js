/**
 * Generates public/robots.txt and public/sitemap.xml from DOMEN in .env
 * Run: node scripts/generate-seo-files.js
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function loadDotEnv() {
  try {
    const content = readFileSync(resolve(root, '.env'), 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = value;
    }
  } catch {
    /* no .env */
  }
}

loadDotEnv();

const siteUrl = (
  process.env.DOMEN ||
  process.env.VITE_DOMEN ||
  process.env.VITE_SITE_URL ||
  'https://happ-lab.top'
).replace(/\/$/, '');

const staticPaths = ['/', '/privacy', '/terms'];
const lastmod = new Date().toISOString().slice(0, 10);

const urls = staticPaths
  .map(
    (path) => `  <url>
    <loc>${siteUrl}${path === '/' ? '/' : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : '0.5'}</priority>
  </url>`,
  )
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap, 'utf8');
writeFileSync(resolve(root, 'public/robots.txt'), robots, 'utf8');

console.log(`SEO files for ${siteUrl}`);
console.log('  public/robots.txt');
console.log(`  public/sitemap.xml (${staticPaths.length} URLs)`);
