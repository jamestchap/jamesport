import { createApp } from "vue";
import App from "./App.vue";
import $ from "jquery";

const app = createApp(App);

app.config.globalProperties.$ = $; // Register jQuery globally if needed

app.mount("#app");