import { install } from "./config";
import VueRecaptcha from "./components/vueRecaptcha.vue";

export { useRecaptcha } from "./useRecaptchar";
export * from "./useApi";

/**
 * Export Vue Components
 */
export { VueRecaptcha };

export default install;
