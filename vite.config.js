import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks: (id) => {
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) return "react";
          if (id.includes("node_modules/framer-motion")) return "motion";
          if (id.includes("node_modules/lucide-react"))  return "icons";
          if (id.includes("node_modules/three"))         return "three";
          if (id.includes("node_modules/@fontsource"))   return "fonts";
        },
      },
    },
  },

});