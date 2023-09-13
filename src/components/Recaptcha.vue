<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from "vue";
import { RECAPTCHA_SCRIPT_ID } from "../constants";
import { useInstall } from "./../composables";
import { ReCaptchaError } from "./../utils";

const reCAPTCHARef = ref<null | HTMLElement | HTMLDivElement>(null);
const { handleGenerateScript, options } = useInstall();
const props = defineProps<{
  theme?: "light" | "dark";
  size?: "normal" | "compact";
  tabindex?: number;
  language?: string;
}>();
const emit = defineEmits<{
  (e: "widgetId", value: string): void;
  (e: "loadCallback", response: unknown): void;
  (e: "expiredCallback"): void;
  (e: "errorCallback"): void;
}>();

const handleRenderRecaptcha = () => {
  if (!window.grecaptcha) throw new ReCaptchaError("reCAPTCHA is not loaded");
  if (!reCAPTCHARef.value) throw new ReCaptchaError("element is not defined");

  window.grecaptcha.ready(() => {
    try {
      const { sitekey } = options;
      const { theme, size, tabindex } = props;
      const widgetId = window.grecaptcha!.render(reCAPTCHARef.value!, {
        sitekey,
        theme,
        size,
        tabindex,
        callback: (response: unknown) => emit("loadCallback", response),
        "expired-callback": () => emit("expiredCallback"),
        "error-callback": () => emit("errorCallback"),
      });

      emit("widgetId", widgetId);
    } catch (e) {
      throw new ReCaptchaError((e as Error).message);
    }
  });
};

onBeforeMount(() => {
  handleGenerateScript(props.language);
});
onMounted(() => {
  document.getElementById(RECAPTCHA_SCRIPT_ID)!.onload = () => {
    handleRenderRecaptcha();
  };
});
</script>

<template>
  <div ref="reCAPTCHARef" />
</template>
