import { inject } from "vue";
import { recaptchaV2Key } from "./symbols";

export function useRecaptcha() {
  return inject(recaptchaV2Key)!;
}
