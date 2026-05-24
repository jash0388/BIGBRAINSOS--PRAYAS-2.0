import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

const buildTime = Date.now();

// A simple Vite plugin to create version.json during build
const versionPlugin = () => ({
  name: 'version-plugin',
  buildStart() {
    if (!fs.existsSync('public')) fs.mkdirSync('public');
    fs.writeFileSync('public/version.json', JSON.stringify({ version: buildTime }));
  }
});

export default defineConfig({
  plugins: [react(), versionPlugin()],
  define: {
    '__APP_VERSION__': buildTime
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
})
