declare module "scrivito-neoletter-form-widgets" {
  import { Widget } from "scrivito";
  export interface CaptchaOptions {
    siteKey: string;
    captchaType: "google-recaptcha" | "friendly-captcha" | null;
  }
  export function insideFormContainerValidation(widget: Widget): string;
  export function initNeoletterFormWidgets(instanceId?: string, captchaOptions?: CaptchaOptions): void;
  export function getFormContainer(childWidget: Widget): Widget;
  export function customFieldNameValidation(): void;
}
