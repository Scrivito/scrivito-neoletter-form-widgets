/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Scrivito from "scrivito";
import { CaptchaOptions } from "../../types/types";
import { isEmpty } from "../Widgets/FormStepContainerWidget/utils/lodashPolyfills";

const GLOBAL_OBJ = typeof window !== 'undefined' ? window : global;

export const initNeoletterFormWidgets = (
  instanceId?: string,
  captchaOptions?: CaptchaOptions
): void => {
  if (instanceId) {
    (GLOBAL_OBJ as any).neoletterFormInstanceId = instanceId;
  }
  (GLOBAL_OBJ as any).neoletterFormCaptchaOptions = captchaOptions
    ? captchaOptions
    : { siteKey: "", captchaType: null };

  loadWidgets();
};

export const getInstanceId = (): string => {
  return (
    (GLOBAL_OBJ as any).neoletterFormInstanceId ||
    (Scrivito.getInstanceId && Scrivito.getInstanceId()) ||
    ""
  );
};

export const getCaptchaOptions = (): CaptchaOptions => {
  return (GLOBAL_OBJ as any).neoletterFormCaptchaOptions;
};

function loadWidgets(): void {
  if (isEmpty(import.meta)) {
    const widgetImportsContext = require.context(
      "../Widgets",
      true,
      /Widget(Class|Component)\.tsx?$/
    );
    widgetImportsContext.keys().forEach(widgetImportsContext);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (import.meta as any).glob(
      ["../Widgets/**/*WidgetClass.ts", "../Widgets/**/*WidgetComponent.tsx"],
      {
        eager: true
      }
    );
  }
}
