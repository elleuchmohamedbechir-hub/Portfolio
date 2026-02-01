import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],

    // Define global constants
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
    },

    server: {
      port: 5173,
      proxy: {
        // Proxy all /api requests to the Spring Boot backend
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          // Enable WebSocket proxying if needed
          ws: true,
          // Configure timeout for long-running requests
          timeout: 30000,
          // Log proxy activity in development
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log(`[Proxy] ${req.method} ${req.url} -> http://localhost:8080${req.url}`);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log(`[Proxy] ${proxyRes.statusCode} ${req.url}`);
            });
            proxy.on('error', (err, req, _res) => {
              console.error(`[Proxy Error] ${req.url}:`, err.message);
            });
          },
        },
      },
    },

    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production', // Only generate sourcemaps in dev
      minify: mode === 'production', // Enable minification in production
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor chunks for better caching
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['framer-motion', 'lucide-react'],
            'form-vendor': ['react-hook-form', 'react-hot-toast'],
          },
        },
      },
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
    },

    // Preview server configuration (for testing production build)
    preview: {
      port: 4173,
      strictPort: true,
    },
  }
})
