import type { App } from "vue";
import type { InstallOptions } from "./types";
import { INSTALL_OPTIONS_KEY } from "./constants";
import { ReCaptchaError } from "./utils";
import { useRecaptcha } from "./composables";
import RecaptchaV2 from "./components/Recaptcha.vue";

function install(app: App, options: InstallOptions) {
  if (!options.sitekey) throw new ReCaptchaError("sitekey is required");
  app.provide(INSTALL_OPTIONS_KEY, options);
}

export { useRecaptcha, install, RecaptchaV2 };
