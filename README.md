# vue3-recaptcha-v2

![GitHub package.json version](https://img.shields.io/github/package-json/v/dongkyuuuu/vue3-recaptcha-v2)
![npm bundle size](https://img.shields.io/bundlephobia/min/vue3-recaptcha-v2)
![NPM](https://img.shields.io/npm/l/vue3-recaptcha-v2)

`reCAPTCHA v2` for `Vue3` : CompositionAPI, Types

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

`vue-recaptcha` is registered(global) component.

### Setup

```js
// main.ts or main.js
import { createApp } from "vue";
import App from "./App.vue";
import VueRecaptcha from "vue3-recaptcha-v2";

const app = createApp(App);

app
  .use(VueRecaptcha, {
    siteKey: "your recaptcha sitekey",
    componentName: "your custom componet name", // default: 'vue-recaptcha'
    alterDomain: false, // default: false
  })
  .mount("#app");
```

### \*install options

| Option          | Type      | Description                                                                           |
| --------------- | --------- | ------------------------------------------------------------------------------------- |
| `siteKey`       | `string`  | (required) recaptcha siteKey                                                          |
| `componentName` | `string`  | If you want to use custom component name, use this option. (default: `vue-recaptcha`) |
| `alterDomain`   | `boolean` | `true`: domain replace `www.google.com` with `www.recaptcha.net`                      |

### Composition API

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
  import { useRecaptcha } from "vue3-recaptcha-v2";

  export default {
    name: "recaptcha",
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

### Options API

```html
<template>
  <vue-recaptcha
    theme="light"
    size="normal"
    :tabindex="0"
    @widgetId="recaptchaWidget = $event"
    @verify="callbackVerify"
    @expired="callbackExpired"
    @fail="callbackFail"
  />

  <button @click="actionReset">reset!</button>
</template>

<script>
  import { ref } from "vue";
  import { useRecaptcha } from "vue3-recaptcha-v2";

  export default {
    name: "recaptcha",
    data() {
      return {
        recaptchaWidget: null,
      };
    },
    methods: {
      callbackVerify(response) {
        console.log(response);
      },
      callbackExpired() {
        console.log("expired!");
      },
      callbackFail() {
        console.log("fail");
      },
      // Reset Recaptcha action
      actionReset() {
        const { resetRecaptcha } = useRecaptcha();
        resetRecaptcha(this.recaptchaWidget);
      },
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
