import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

export default defineConfig({
  base: "/todosher/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("vue-router")) return "vendor.vue-router";
            if (id.includes("vue")) return "vendor.vue";
            if (id.includes("pinia")) return "vendor.pinia";
            return "vendor.packages";
          }
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "Styles/colors";
          `,
      },
    },
  },
  resolve: {
    alias: {
      Assets: resolve("./src/assets"),
      Components: resolve("./src/components"),
      Router: resolve("./src/router"),
      Stores: resolve("./src/stores"),
      Styles: resolve("./src/styles"),
      Types: resolve("./src/types"),
      Utils: resolve("./src/utils"),
      Views: resolve("./src/views"),
      "@": resolve("./src"),
    },
  },
  plugins: [vue()],
});
