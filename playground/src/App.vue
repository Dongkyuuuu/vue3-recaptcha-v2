<script setup lang="ts">
import { RecaptchaV2 } from "../../dist";

const handleWidgetId = (widgetId: string) => {
  console.log("Widget ID: ", widgetId);
};
const handleErrorCalback = () => {
  console.log("Error callback");
};
const handleExpiredCallback = () => {
  console.log("Expired callback");
};
const handleLoadCallback = (response: unknown) => {
  console.log("Load callback", response);
};
</script>

<template>
  <div>
    <RecaptchaV2
      @widget-id="handleWidgetId"
      @error-callback="handleErrorCalback"
      @expired-callback="handleExpiredCallback"
      @load-callback="handleLoadCallback"
    />
  </div>
</template>
