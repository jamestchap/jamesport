import { createApp } from "vue";
import App from "./App.vue";
import router from './router'; // Import the router
import $ from "jquery";

const app = createApp(App);

app.config.globalProperties.$ = $; // Register jQuery globally if needed
app.use(router); // Use the router
app.mount("#app");