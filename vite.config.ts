import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    host: true,
    port: 3000,
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    },
  },

  // ... previous code remains the same
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
});
