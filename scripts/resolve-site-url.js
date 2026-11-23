/**
 * Single source for public site URL (no trailing slash).
 * Reads DOMEN / VITE_DOMEN / VITE_SITE_URL from env or .env-backed object.
 */
export function resolveSiteUrl(env = process.env) {
  return (
    env.DOMEN ||
    env.VITE_DOMEN ||
    env.VITE_SITE_URL ||
    'https://happ-lab.top'
  ).replace(/\/$/, '');
}