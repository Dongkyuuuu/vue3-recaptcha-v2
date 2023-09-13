export class ReCaptchaError extends Error {
  constructor(message: string) {
    super(message);
    this.message = "[vue3-recaptcha-v2] " + message;
  }
}
