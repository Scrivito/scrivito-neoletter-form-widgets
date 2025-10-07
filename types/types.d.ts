import { Widget } from "scrivito";

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

export type CaptchaType = "google-recaptcha" | "google-recaptcha-v2" | "google-recaptcha-v3" | "friendly-captcha" | null;
export interface CaptchaOptions {
  siteKey: string;
  captchaType: CaptchaType;
}
export type FriendlyCaptchaStartMode = "auto" | "focus" | "none";
export type FriendlyCaptchaEndpoint = "global" | "eu";
export type CaptchaTheme = "light" | "dark";

export interface Options {
  instanceId?: string,
  captchaOptions?: CaptchaOptions,
  tracking?: boolean
}

export interface FormWidgetAttributes {
  showReview: boolean;
  showCaptcha: boolean;
  containerClassNames: string;
  fixedFormHeight: boolean;
  formHeight: number;
  captchaAlignment: string;
  captchaTheme: CaptchaTheme;
  showBorder: boolean;
  submittingMessage: string;
  submittingMessageType: string;
  submittedMessage: string;
  submittedMessageType: string;
  failedMessage: string;
  failedMessageType: string;
  showRetryButton: boolean;
  retryButtonText: string;
  retryButtonAlignment: string;
  buttonsSize: string;
  buttonsStyle: string;
  formId: string,
  showSubmittingPreview: boolean,
  showSubmittedPreview: boolean,
  showFailedPreview: boolean,
  formScrollbarWidth: string,
  formOverscrollBehavior: string,
  formType: string,
  steps: Widget[],
  backwardButtonText: string,
  forwardButtonText: string,
  submitButtonText: string,
  reviewButtonText: string,
  singleSubmitButtonAlignment: string,
}
