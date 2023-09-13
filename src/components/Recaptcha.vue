<template>
  <div ref="reCAPTCHARef" />
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from "vue";
import { useInstall } from "./../composables";
import { ReCaptchaError } from "./../utils";

const reCAPTCHARef = ref<null | HTMLElement | HTMLDivElement>(null);
const { handleGenerateScript, options } = useInstall();
const props = defineProps<{
  theme?: "light" | "dark";
  size?: "normal" | "compact";
  tabindex?: number;
}>();
const emit = defineEmits<{
  (e: "widgetId", value: string): void;
  (e: "loadCallback", response: unknown): void;
  (e: "expiredCallback"): void;
  (e: "errorCallback"): void;
}>();

const handleRenderRecaptcha = () => {
  if (!window.grecaptcha) throw new ReCaptchaError("reCAPTCHA is not defined");
  if (!reCAPTCHARef.value) throw new ReCaptchaError("element is not defined");

  const { siteKey } = options;
  const { theme, size, tabindex } = props;
  const widgetId = window.grecaptcha.render(reCAPTCHARef.value, {
    siteKey,
    theme,
    size,
    tabindex,
    callback: (response: unknown) => emit("loadCallback", response),
    "expired-callback": () => emit("expiredCallback"),
    "error-callback": () => emit("errorCallback"),
  });

  emit("widgetId", widgetId);
};

onBeforeMount(() => {
  handleGenerateScript();
});
onMounted(() => {
  handleRenderRecaptcha();
});
</script>
