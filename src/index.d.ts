export interface CaptchaOptions {
  siteKey: string;
  captchaType: "google-recaptcha" | "google-recaptcha-v2" | "google-recaptcha-v3" | "friendly-captcha" | null;
}

export interface Options {
  instanceId?: string
  captchaOptions?: CaptchaOptions,
  tracking?: boolean
}

export declare function initNeoletterFormWidgets(
  options?: Options
): void;
