<script setup lang="ts">
import { ref } from "vue";
import { RecaptchaV2 } from "../../dist";

const siteKey = ref("");

const handleWidgetId = (widgetId: number) => {
  console.log("Widget ID: ", widgetId);
};
const handleErrorCallback = () => {
  console.log("Error callback");
};
const handleExpiredCallback = () => {
  console.log("Expired callback");
};
const handleLoadCallback = (response: unknown) => {
  console.log("Load callback", response);
};

const handleChangeSiteKey = () => {
  siteKey.value = "12312323123";
};
</script>

<template>
  <div>
    <button @click="handleChangeSiteKey">Change</button>
    <RecaptchaV2
      :sitekey="siteKey"
      @widget-id="handleWidgetId"
      @error-callback="handleErrorCallback"
      @expired-callback="handleExpiredCallback"
      @load-callback="handleLoadCallback"
    />
  </div>
</template>
