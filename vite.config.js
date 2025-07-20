import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: 'taskpro.local',
    port: 5173,
    strictPort: true,         
    allowedHosts: ['taskpro.local'],
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.crt'))
    }
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
