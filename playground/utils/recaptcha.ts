import { App } from "vue";
import VueRecaptcha from "../../dist/vue3-recaptcha-v2";
/**
 * create config.ts file
 * export default "your site key"
 */
import siteKey from "../config";

export default function install(app: App<Element>) {
  app.use(VueRecaptcha, { siteKey: siteKey, alternativeDomain: true });
}
