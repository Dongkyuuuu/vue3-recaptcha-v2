<template>
  <div ref="reCAPTCHA"></div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  PropType,
  toRefs,
  ref,
  onUnmounted,
} from "vue";
import type { recaptchaTheme, recaptchaSize } from "../types";
import { state } from "../config/state";

export default defineComponent({
  name: "VueRecaptcha",
  props: {
    theme: { type: String as PropType<recaptchaTheme>, default: "light" },
    size: {
      type: String as PropType<recaptchaSize>,
      default: "normal",
    },
    tabindex: { type: Number, default: 0 },
  },
  setup: (props, { emit }) => {
    const { theme, size, tabindex } = toRefs(props);
    const recaptchaWidgetID = ref<number | null>(null);
    const reCAPTCHA = ref<HTMLElement | string>("");
    const siteKey = ref<string>(state.siteKey);

    const propTheme = computed<recaptchaTheme>(() => theme.value);
    const propSize = computed<recaptchaSize>(() => size.value);
    const propTabindex = computed<number>(() => tabindex.value);

    const renderRecaptcha = () => {
      window.grecaptcha.ready(() => {
        recaptchaWidgetID.value = window.grecaptcha.render(reCAPTCHA.value, {
          sitekey: siteKey.value,
          theme: propTheme.value,
          size: propSize.value,
          tabindex: propTabindex.value,
          callback: (response) => emit("verify", response),
          "expired-callback": () => emit("expired"),
          "error-callback": () => emit("fail"),
        });

        emit("widgetId", recaptchaWidgetID.value);
      });
    };

    onBeforeMount(() => {
      if (!window.grecaptcha) {
        document.getElementById("vue3-recaptcha-v2")!.onload = () => {
          renderRecaptcha();
        };
      } else {
        renderRecaptcha();
      }
    });

    onUnmounted(() => (reCAPTCHA.value = ""));

    return {
      reCAPTCHA,
    };
  },
});
</script>
