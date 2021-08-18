<template>
  <div id="reCAPTCHA"></div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onBeforeMount,
  PropType,
  toRefs,
} from "vue";

export default defineComponent({
  name: "VueRecaptcha",
  props: {
    theme: { type: String as PropType<ReCaptchaV2.Theme>, default: "light" },
    size: { type: String as PropType<ReCaptchaV2.Size>, default: "normal" },
    tabindex: { type: Number, default: 0 },
  },
  setup: (props, { emit }) => {
    const { theme, size, tabindex } = toRefs(props);
    const siteKey = inject("reCaptchaSiteKey");

    const propTheme = computed<ReCaptchaV2.Theme>(() => theme.value);
    const propSize = computed<ReCaptchaV2.Size>(() => size.value);
    const propTabindex = computed<number>(() => tabindex.value);

    const renderRecaptcha = () => {
      grecaptcha.ready(() => {
        grecaptcha.render("reCAPTCHA", {
          sitekey: siteKey as string,
          theme: propTheme.value,
          size: propSize.value,
          tabindex: propTabindex.value,
          callback: (response) => emit("verify", response),
          "expired-callback": () => emit("expired"),
          "error-callback": () => emit("fail"),
        });
      });
    };

    onBeforeMount(() => {
      document.getElementById("vue3-recaptcha-v2")!.onload = () => {
        renderRecaptcha();
      };
    });
  },
});
</script>
