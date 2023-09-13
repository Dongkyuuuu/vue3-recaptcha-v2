import { IS_SERVER } from "../constants";
import { ReCaptchaError } from "../utils";

export const useRecaptcha = () => {
  /** Reset reCAPTCHA widget */
  const handleReset = (widgetId: number) => {
    if (IS_SERVER)
      throw new ReCaptchaError("reCaptcha is not available on server side");
    if (!window.grecaptcha)
      throw new ReCaptchaError("reCaptcha is not available on window");

    window.grecaptcha.reset(widgetId);
  };

  /** Get reCAPTCHA widget response */
  const handleGetResponse = (widgetId: number) => {
    if (IS_SERVER)
      throw new ReCaptchaError("reCaptcha is not available on server side");
    if (!window.grecaptcha)
      throw new ReCaptchaError("reCaptcha is not available on window");

    return window.grecaptcha.getResponse(widgetId);
  };

  const handleExecute = (widgetId: number) => {
    if (IS_SERVER)
      throw new ReCaptchaError("reCaptcha is not available on server side");
    if (!window.grecaptcha)
      throw new ReCaptchaError("reCaptcha is not available on window");

    window.grecaptcha.execute(widgetId);
  };

  return {
    handleReset,
    handleGetResponse,
    handleExecute,
  };
};
