import { createApp } from "vue";
import App from "./App.vue";
import VueRecaptcha from "../dist/vue3-recaptcha-v2";

/**
 * create config.ts file
 * export default "your site key"
 */
import siteKey from "./config";

const app = createApp(App);

app.use(VueRecaptcha, { siteKey: siteKey }).mount("#app");
