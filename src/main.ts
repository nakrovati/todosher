import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "Router/index.js";
import "Styles/style.scss";

createApp(App).use(router).use(createPinia()).mount("#app");
