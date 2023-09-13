# vue3-recaptcha-v2

![GitHub package.json version](https://img.shields.io/github/package-json/v/dongkyuuuu/vue3-recaptcha-v2)
![npm bundle size](https://img.shields.io/bundlephobia/min/vue3-recaptcha-v2)
![NPM](https://img.shields.io/npm/l/vue3-recaptcha-v2)

reCAPTCHA v2 for Vue3 and Nuxt3.

## Installation

install the packge from `yarn`:

```sh
$ yarn add vue3-recaptcha-v2
```

In `Vue3`, add it to your `main.ts file`:

```typescript
import { createApp } from "vue";
import App from "./App.vue";

import { install } from "vue3-recaptcha-v2";

createApp(install, {
  sitekey: "YOUT_SITE_KEY",
  cnDomains: false, // Optional, If you use in China, set this value true
}).mount("#app");
```

In `Nuxt3`, add it to your `plugin folder`:

The file name must contain the `.client`.

```typescript
// <ProjectRoot>/plugins/recaptcha.client.ts
import { install } from "vue3-recaptcha-v2";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(install, {
    sitekey: "YOUT_SITE_KEY",
    cnDomains: false,
  });
});
```

More detail about install options, you can check this [Install Options](#install-options)

## Usage

The components used are the same for `Vue3` and `Nuxt3`. Only the installation is different.

For more information, including the props to `change the language(hl option)`, check [Component Options](#component-options)

```vue
<script setup lang="ts">
import { RecaptchaV2 } from "vue3-recaptcha-v2";

const handleWidgetId = (widgetId: number) => {
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
  <RecaptchaV2
    @widget-id="handleWidgetId"
    @error-callback="handleErrorCalback"
    @expired-callback="handleExpiredCallback"
    @load-callback="handleLoadCallback"
  />
</template>
```

### Reset widget

Resets the reCAPTCHA widget.

```vue
<script setup lang="ts">
import { RecaptchaV2, useRecaptcha } from "vue3-recaptcha-v2";

const { handleReset } = useRecaptcha();

const handleWidgetId = (widgetId: number) => {
  console.log("Widget ID: ", widgetId);
  handleReset(widgetId);
};
</script>

<template>
  <RecaptchaV2 @widget-id="handleWidgetId" />
</template>
```

### Get response widget

Gets the response for the reCAPTCHA widget.

```vue
<script setup lang="ts">
import { RecaptchaV2, useRecaptcha } from "vue3-recaptcha-v2";

const { handleGetResponse } = useRecaptcha();

const handleWidgetId = (widgetId: number) => {
  console.log("Widget ID: ", widgetId);
  handleGetResponse(widgetId);
};
</script>

<template>
  <RecaptchaV2 @widget-id="handleWidgetId" />
</template>
```

## Options

### Install Options

| Options     | Type     | Required | Description                                                                                            |     |
| ----------- | -------- | -------- | ------------------------------------------------------------------------------------------------------ | --- |
| `sitekey`   | `string` | true     | recaptcha siteKey                                                                                      |     |
| `cnDomains` | `string` |          | default is `false`. if you set `true`, script url is replace `www.google.com` with `www.recaptcha.net` |     |

### Component Options

#### Props

| Options    | Type                   | Required | Description                                                                                                     |
| ---------- | ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `language` | `string`               |          | recaptcha language, you can find code in [language code](https://developers.google.com/recaptcha/docs/language) |
| `theme`    | `light` \| `dark`      |          | default is `light`, recaptcha theme                                                                             |
| `tabindex` | `number`               |          | default is `0`, tabindex                                                                                        |
| `size`     | `normal` \| `comapact` |          | default is `normal`, recaptcha widget size                                                                      |

#### emits

| Options            | Type                       | Required | Description                                                                                                                                                                                                                                                           |
| ------------------ | -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `widget-id`        | `(value:number)=>void`     |          | when recaptcha widget is created, return widgetId                                                                                                                                                                                                                     |
| `error-callback`   | `()=>void`                 |          | The name of your callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry. |
| `expired-callback` | `()=>void`                 |          | The name of your callback function, executed when the reCAPTCHA response expires and the user needs to re-verify.                                                                                                                                                     |
| `load-callback`    | `(response:unknown)=>void` |          | The name of your callback function, executed when the user submits a successful response. The g-recaptcha-response token is passed to your callback.                                                                                                                  |
