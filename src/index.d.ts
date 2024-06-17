export interface CaptchaOptions {
  siteKey: string;
  captchaType: "google-recaptcha" | "friendly-captcha" | null;
}
export declare function initNeoletterFormWidgets(
  instanceId?: string,
  captchaOptions?: CaptchaOptions
): void;
