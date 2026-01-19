import { defineConfig } from 'vite';
export default defineConfig({
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  },
  publicDir: 'assets',
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [
        'three',
        'three/examples/jsm/controls/OrbitControls.js',
        'three/examples/jsm/loaders/GLTFLoader.js',
        'three/examples/jsm/loaders/EXRLoader.js'
      ]
    }
  },
  optimizeDeps: {
    exclude: [
      'three',
      'three/examples/jsm/controls/OrbitControls.js',
      'three/examples/jsm/loaders/GLTFLoader.js',
      'three/examples/jsm/loaders/EXRLoader.js'
    ]
  }
});
