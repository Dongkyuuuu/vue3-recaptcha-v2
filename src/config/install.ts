import { App } from "vue";
import type { options } from "../types";
import VueRecaptcha from "../components/vueRecaptcha.vue";
import { state } from "./state";

const ERROR_MSG_SITEKEY = "options must be included siteKey";

export function install(app: App<Element>, options: options) {
  if (!options.siteKey) throw new Error(ERROR_MSG_SITEKEY);
  _script();

  state.siteKey = options.siteKey;
  app.component("vue-recaptcha", VueRecaptcha);
}

function _script() {
  const isExist = document.getElementById("vue3-recaptcha-v2");
  if (isExist) return;

  const script = document.createElement("script");
  script.setAttribute("id", "vue3-recaptcha-v2");
  script.setAttribute(
    "src",
    "https://www.google.com/recaptcha/api.js?render=explicit"
  );
  script.setAttribute("async", "");
  script.setAttribute("defer", "");
  script.onerror = () => {
    new Error(`'vue3-recaptcha-v2' is failed to load`);
  };
  document.head.appendChild(script);
}
