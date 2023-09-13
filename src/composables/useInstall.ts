import { inject } from "vue";
import {
  INTSALL_OPTIONS_KEY,
  IS_SERVER,
  RECAPTCHA_SCRIPT_ID,
} from "../constants";
import type { InstallOptions } from "../types";
import { ReCaptchaError } from "../utils";

export const useInstall = () => {
  const options = inject<InstallOptions>(INTSALL_OPTIONS_KEY)!;

  const handleGenerateScript = () => {
    if (IS_SERVER) {
      throw new ReCaptchaError("Cannot generate script on server side");
    }

    const script = document.createElement("script");
    const src = options.cnDomains
      ? "https://recaptcha.net/recaptcha/api.js"
      : "https://www.google.com/recaptcha/api.js";

    script.setAttribute("id", RECAPTCHA_SCRIPT_ID);
    script.setAttribute(
      "src",
      src + "?render=explicit" + options.language && `&hl=${options.language}`
    );
    script.setAttribute("async", "");
    script.setAttribute("defer", "");

    script.onerror = () => {
      new ReCaptchaError("Failed to load script");
    };

    document.head.appendChild(script);
  };

  return {
    options,
    handleGenerateScript,
  };
};
