export type InstallOptions = {
  siteKey: string;
  language?: string;
  cnDomains?: boolean; // in China, https://github.com/Dongkyuuuu/vue3-recaptcha-v2/issues/2
};

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        conatiner: HTMLElement,
        options: Record<string, unknown>
      ) => string;
      reset: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
    };
  }
}
