import { createApp } from "vue";
import App from "./App.vue";
import { install } from "../../dist";

const app = createApp(App);

app
  .use(install, {
    sitekey: "",
  })
  .mount("#app");
