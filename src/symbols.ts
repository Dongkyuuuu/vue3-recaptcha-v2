import { InjectionKey } from "vue";
import type { Recaptcha } from "./useRecaptchar";

export const recaptchaSiteKey: InjectionKey<string> =
  Symbol("recaptchaSiteKey");

export const recaptchaV2Key: InjectionKey<Recaptcha> = Symbol(
  "[vue3-recaptcha-v2]useRecaptcha"
);
