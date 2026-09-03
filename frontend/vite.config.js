import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router", "react-router-dom"],
          "vendor-animation": ["motion", "gsap", "lenis"],
          "vendor-icons": ["@phosphor-icons/react", "lucide-react"],
          "vendor-ui": [
            "radix-ui",
            "sonner",
            "embla-carousel-react",
            "styled-components",
          ],
          "vendor-utils": [
            "date-fns",
            "clsx",
            "tailwind-merge",
            "axios",
            "class-variance-authority",
          ],
        },
      },
    },
  },
});
