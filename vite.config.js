import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { resolveSiteUrl } from './scripts/resolve-site-url.js'

function htmlSiteUrlPlugin(siteUrl) {
  const home = `${siteUrl}/`
  return {
    name: 'html-site-url',
    transformIndexHtml(html) {
      return html
        .replaceAll('__SITE_URL_HOME__', home)
        .replaceAll('__SITE_URL__', siteUrl)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = resolveSiteUrl(env)

  return {
    plugins: [react(), htmlSiteUrlPlugin(siteUrl)],
    define: {
      __SITE_URL__: JSON.stringify(siteUrl),
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@utils': resolve(__dirname, 'src/utils'),
      },
    },
    server: {
      port: 5173,
      host: true,
      allowedHosts: [
        '.ngrok-free.dev',
        '.ngrok-free.app',
        '.ngrok.io',
        '.trycloudflare.com',
        '.loca.lt',
      ],
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: { drop_console: true, drop_debugger: true },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            router: ['react-router-dom'],
            motion: ['framer-motion'],
            ui: ['lucide-react', 'clsx'],
          },
        },
      },
    },
  }
})