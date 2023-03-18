import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [ react() ],
   resolve: {
      alias: {
         "@src": "/src",
      },
   },
   server: {
      port: 5173,
      host: true,
   },
   preview: {
      port: 5173,
      host: true,
   },
   build: {
      chunkSizeWarningLimit: 1500
   }
});
