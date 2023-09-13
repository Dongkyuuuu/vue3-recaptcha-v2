export type InstallOptions = {
  sitekey: string;
  cnDomains?: boolean; // in China, https://github.com/Dongkyuuuu/vue3-recaptcha-v2/issues/2
};

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        conatiner: HTMLElement,
        options: Record<string, unknown>
      ) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
      execute: (widgetId: number) => string;
      ready: (callback: () => void) => void;
    };
  }
}
