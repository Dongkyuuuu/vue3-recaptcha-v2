import { inject, InjectionKey } from "vue";
import type { Recaptcha } from "./useRecaptchar";

export function useRecaptcha() {
  const recaptcha: InjectionKey<Recaptcha> = Symbol();
  return inject(recaptcha)!;
}
