<template>
  <vue-recaptcha
    @widgetId="recaptchaWidget = $event"
    @verify="callbackVerify($event)"
    @expired="callbackExpired()"
    @fail="callbackFail()"
  />
  {{ recaptchaWidget }}
  <button @click="actionReset()">reset recaptcha</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRecaptcha } from "../dist/vue3-recaptcha-v2";

export default defineComponent({
  name: "App",
  setup: () => {
    // const { resetRecaptcha } = useRecaptcha();
    // const recaptchaWidget = ref<any>(null);
    // const callbackVerify = (reponse: string) => {
    //   console.log(reponse);
    // };
    // const callbackExpired = () => {
    //   console.log("expired!");
    // };
    // const callbackFail = () => {
    //   console.log("fail");
    // };
    // const actionReset = () => {
    //   resetRecaptcha(recaptchaWidget.value!);
    // };

    return {
      // callbackVerify,
      // callbackExpired,
      // callbackFail,
      // recaptchaWidget,
      // actionReset,
    };
  },
  data() {
    return {
      recaptchaWidget: null as null | number,
    };
  },
  methods: {
    callbackVerify(reponse: string) {
      console.log(reponse);
    },
    callbackExpired() {
      console.log("expired!");
    },
    callbackFail() {
      console.log("fail");
    },
    actionReset() {
      const { resetRecaptcha } = useRecaptcha();
      resetRecaptcha(this.recaptchaWidget!);
    },
  },
});
</script>

<style></style>
