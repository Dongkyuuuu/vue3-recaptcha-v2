import { inject } from "vue";
import {
  INTSALL_OPTIONS_KEY,
  IS_SERVER,
  RECAPTCHA_SCRIPT_ID,
  GOOGLE_DOMAINS,
  GOOGLE_DOMAINS_CN,
} from "../constants";
import type { InstallOptions } from "../types";
import { ReCaptchaError } from "../utils";

export const useInstall = () => {
  const options = inject<InstallOptions>(INTSALL_OPTIONS_KEY)!;

  const handleGenerateScript = (language?: string) => {
    if (IS_SERVER) {
      throw new ReCaptchaError("Cannot generate script on server side");
    }

    const el = document.getElementById(RECAPTCHA_SCRIPT_ID);
    if (el) {
      el.remove()
    }

    const script = document.createElement("script");
    const src = options?.cnDomains ? GOOGLE_DOMAINS_CN : GOOGLE_DOMAINS;
    const lang = language ? `&hl=${language}` : "";

    script.setAttribute("id", RECAPTCHA_SCRIPT_ID);
    script.setAttribute("src", `${src}?render=explicit${lang}`);
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
