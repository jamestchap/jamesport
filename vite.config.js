import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [vue(), tailwindcss()],
    root: ".", // Ensures Vite looks for index.html in the root
    build: {
        outDir: "dist",
        rollupOptions: {
            input: "index.html",
        },
    },
});