import { IS_SERVER } from "../constants";
import { ReCaptchaError } from "../utils";

export const useRecaptcha = () => {
  /** Reset reCAPTCHA widget */
  const handleReset = (widgetId: string) => {
    if (IS_SERVER)
      throw new ReCaptchaError("reCaptcha is not available on server side");
    if (!window.grecaptcha)
      throw new ReCaptchaError("reCaptcha is not available on window");

    window.grecaptcha.reset(widgetId);
  };

  /** Get reCAPTCHA widget response */
  const handleGetResponse = (widgetId: string) => {
    if (IS_SERVER)
      throw new ReCaptchaError("reCaptcha is not available on server side");
    if (!window.grecaptcha)
      throw new ReCaptchaError("reCaptcha is not available on window");

    return window.grecaptcha.getResponse(widgetId);
  };

  return {
    handleReset,
    handleGetResponse,
  };
};
