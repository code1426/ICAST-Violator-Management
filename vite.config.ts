import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias for cleaner imports
    },
  },
  build: {
    outDir: "dist", // Output directory
    emptyOutDir: true,
    target: "esnext", // Ensure compatibility with modern JavaScript for Electron
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"), // Main entry for the frontend
      },
      output: {
        format: "cjs", // Output as CommonJS for compatibility with Electron
      },
    },
  },
  server: {
    port: 5173, // Development server port
  },
  optimizeDeps: {
    exclude: ["electron"], // Prevent Electron from being bundled by Vite
  },
});
