<script setup lang="ts">
import { ref, onBeforeMount, onMounted, watch } from "vue";
import { RECAPTCHA_SCRIPT_ID } from "../constants";
import { useInstall } from "../composables";
import { ReCaptchaError } from "./../utils";

const widgetId = ref<number | null>(null);
const reCAPTCHARef = ref<null | HTMLElement | HTMLDivElement>(null);
const { handleGenerateScript, options } = useInstall();
const props = defineProps<{
  sitekey?: string;
  theme?: "light" | "dark";
  size?: "normal" | "compact" | "invisible";
  tabindex?: number;
  language?: string;
}>();
const emit = defineEmits<{
  (e: "widgetId", value: number): void;
  (e: "loadCallback", response: unknown): void;
  (e: "expiredCallback"): void;
  (e: "errorCallback"): void;
}>();

const handleRenderRecaptcha = (sitekey: string) => {
  if (!window.grecaptcha) throw new ReCaptchaError("reCAPTCHA is not loaded");
  if (!reCAPTCHARef.value) throw new ReCaptchaError("element is not defined");

  const { theme, size, tabindex } = props;

  window.grecaptcha.ready(() => {
    try {
      widgetId.value = window.grecaptcha!.render(reCAPTCHARef.value!, {
        sitekey,
        theme,
        size,
        tabindex,
        callback: (response: unknown) => emit("loadCallback", response),
        "expired-callback": () => emit("expiredCallback"),
        "error-callback": () => emit("errorCallback"),
      });

      emit("widgetId", widgetId.value);
    } catch (e) {
      throw new ReCaptchaError((e as Error).message);
    }
  });
};

watch(
  () => props.sitekey,
  (sitekey) => {
    if (sitekey && !widgetId.value) handleRenderRecaptcha(sitekey);
  }
);

onBeforeMount(() => {
  handleGenerateScript(props.language);
});
/** User set sitekey when app initialize, use this lifeCycle */
onMounted(() => {
  const { sitekey } = options;

  document.getElementById(RECAPTCHA_SCRIPT_ID)!.onload = () => {
    sitekey && handleRenderRecaptcha(sitekey);
  };
});
</script>

<template>
  <div ref="reCAPTCHARef" />
</template>
