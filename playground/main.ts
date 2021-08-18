import { createApp } from "vue";
import App from "./App.vue";
import VueRecaptcha from "../dist/vue3-recaptcha-v2";

const app = createApp(App);

app.use(VueRecaptcha, { siteKey: "" }).mount("#app");
