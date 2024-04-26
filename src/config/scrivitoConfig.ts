/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Scrivito from "scrivito";

import { CaptchaOptions } from "../../types/types";
import { isEmpty } from "../Widgets/FormStepContainerWidget/utils/lodashPolyfills";

export const initNeoletterFormWidgets = (
  instanceId?: string,
  captchaOptions?: CaptchaOptions
): void => {
  // too early to call Scrivito.getInstanceId() here
  // attach to window in order to read them in editingConfig.
  instanceId && ((window as any).neoletterFormInstanceId = instanceId);
  (window as any).neoletterFormCaptchaOptions = captchaOptions
    ? captchaOptions
    : { siteKey: "", captchaType: null };

  loadWidgets();
};

export const getInstanceId = (): string => {
  return (
    (window as any).neoletterFormInstanceId ||
    (Scrivito.getInstanceId && Scrivito.getInstanceId()) ||
    ""
  );
};

export const getCaptchaOptions = (): CaptchaOptions => {
  return (window as any).neoletterFormCaptchaOptions;
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
