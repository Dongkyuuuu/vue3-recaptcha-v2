export interface Recaptcha {
  resetRecaptcha(widgetId: number): void;
}

export function useRecaptcha(): Recaptcha {
  const resetRecaptcha = (widgetId: number): void => {
    if (typeof widgetId !== "number")
      throw new Error("resetRecaptcha must have 'widgetId'");

    window.grecaptcha.reset(widgetId);
  };

  return {
    resetRecaptcha,
  };
}
