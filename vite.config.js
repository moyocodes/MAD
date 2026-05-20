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
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react")) {
              return "react-vendor";
            }
            if (id.includes("react-router-dom")) {
              return "router";
            }
            if (id.includes("framer-motion") || id.includes("lucide-react")) {
              return "ui";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
