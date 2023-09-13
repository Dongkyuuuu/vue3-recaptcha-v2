import type { App } from "vue";
import type { InstallOptions } from "./types";
import { INTSALL_OPTIONS_KEY } from "./constants";
import { ReCaptchaError } from "./utils";
import { useRecaptcha } from "./composables";
import RecaptchaVue from "./components/Recaptcha.vue";

function install(app: App, options: InstallOptions) {
  if (!options.siteKey) throw new ReCaptchaError("siteKey is required");
  app.provide(INTSALL_OPTIONS_KEY, options);
}

export { useRecaptcha, install, RecaptchaVue };
