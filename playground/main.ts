import { createApp } from "vue";
import App from "./App.vue";
import recaptch from "./utils/recaptcha";

const app = createApp(App);

app.use(recaptch).mount("#app");
