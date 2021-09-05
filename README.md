# vue3-recaptcha-v2

![GitHub package.json version](https://img.shields.io/github/package-json/v/dongkyuuuu/vue3-recaptcha-v2)
![npm bundle size](https://img.shields.io/bundlephobia/min/vue3-recaptcha-v2)
![NPM](https://img.shields.io/npm/l/vue3-recaptcha-v2)

`reCAPTCHA v2` for `Vue3` : CompositionAPI, Types

If you use [`v0.x`](https://github.com/DongKyuuuu/vue3-recaptcha-v2/tree/v0.3.1), recommend using `v1.x` or higher.

# Installation

#### Yarn

```sh
$ yarn add vue3-recaptcha-v2
```

#### npm

```sh
$ npm install vue3-recaptcha-v2 --save
```

# Example

### Setup

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import VueRecaptcha from "vue3-recaptcha-v2";

const app = createApp(App);

app
  .use(VueRecaptcha, {
    siteKey: "your recaptcha sitekey",
    alterDomain: false, // default: false
  })
  .mount("#app");
```

### \*install options

| Option        | Type      | Description                                                      |
| ------------- | --------- | ---------------------------------------------------------------- |
| `siteKey`     | `string`  | (required) recaptcha siteKey                                     |
| `alterDomain` | `boolean` | `true`: domain replace `www.google.com` with `www.recaptcha.net` |

### Usage

```html
<template>
  <vue-recaptcha
    theme="light"
    size="normal"
    :tabindex="0"
    @widgetId="recaptchaWidget = $event"
    @verify="callbackVerify($event)"
    @expired="callbackExpired()"
    @fail="callbackFail()"
  />

  <button @click="actionReset()">reset!</button>
</template>

<script>
  import { ref } from "vue";
  import { VueRecaptcha, useRecaptcha } from "vue3-recaptcha-v2";

  export default {
    name: "recaptcha",
    components: { VueRecaptcha },
    setup: () => {
      // Reset Recaptcha
      const { resetRecaptcha } = useRecaptcha();
      const recaptchaWidget = ref(null);

      const callbackVerify = (response) => {
        console.log(response);
      };
      const callbackExpired = () => {
        console.log("expired!");
      };
      const callbackFail = () => {
        console.log("fail");
      };
      // Reset Recaptcha action
      const actionReset = () => {
        resetRecaptcha(recaptchaWidget.value);
      };

      return {
        recaptchaWidget,
        callbackVerify,
        callbackFail,
        actionReset,
      };
    },
  };
</script>
```

# API

## Props

**vue-recaptcha** components props list

### theme

- `optional`
- type : `light` | `dark`
- default : `light`

### size

- `optional`
- type : `normal` | `compact` | `invisible`
- default : `normal`

### tabindex

- `optional`
- type : `number`
- default : 0

## Emit

**vue-recaptcha** components emit list

### widgetId

- return : `number`

### verify

- return : `string`

### expired

- return : `void`

### fail

- return : `void`

## methods

**vue-recaptcha** components methods list

### resetRecaptcha

- param : `widgetId`
- return : `void`
