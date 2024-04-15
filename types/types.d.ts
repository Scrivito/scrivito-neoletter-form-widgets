export type InputValidationElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export type ReviewItemContent = {
  title: string;
  value: string;
};
//TODO: refactor (use StringMap or NumberMap instead)
export type ReviewContent = Array<Array<ReviewItemContent>>;
export type StringMap<T> = { [key: string]: T };

export type CaptchaType = "google-recaptcha" | "friendly-captcha" | null;
export interface CaptchaOptions {
  siteKey: string;
  captchaType: CaptchaType;
}
export type FriendlyCaptchaStartMode = "auto" | "focus" | "none";
export type FriendlyCaptchaEndpoint = "global" | "eu";
export type CaptchaTheme = "light" | "dark";
