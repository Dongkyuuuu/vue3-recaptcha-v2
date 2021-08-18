<template>
  <vue-recaptcha
    theme="light"
    @verify="callbackVerify($event)"
    @expired="callbackExpired()"
    @fail="callbackFail()"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  setup: () => {
    const callbackVerify = (reponse: string) => {
      console.log(reponse);
    };
    const callbackExpired = () => {
      console.log("expired!");
    };
    const callbackFail = () => {
      console.log("fail");
    };

    return {
      callbackVerify,
      callbackExpired,
      callbackFail,
    };
  },
});
</script>

<style></style>
