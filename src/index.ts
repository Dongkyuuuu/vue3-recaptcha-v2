import type { App } from "vue";
import type { InstallOptions } from "./types";
import { INSTALL_OPTIONS_KEY } from "./constants";
import { useRecaptcha } from "./composables";
import RecaptchaV2 from "./components/Recaptcha.vue";

function install(app: App, options: InstallOptions = {}) {
  app.provide(INSTALL_OPTIONS_KEY, options);
}

export { useRecaptcha, install, RecaptchaV2 };
