import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    visualizer({
      filename: "./dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          bootstrap: ["react-bootstrap", "bootstrap"],
          vendor: ["react-router-dom", "@iconify/react", "react-activity"],
        },
      },
    },
  },
});
