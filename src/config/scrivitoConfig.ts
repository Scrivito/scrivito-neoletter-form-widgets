import { isEmpty } from "lodash-es";
import { CaptchaOptions } from "../../types/types";

let _instanceId: string = "";

let _captchaOptions: CaptchaOptions = {
  siteKey: "",
  captchaType: null
 // endpoint: "global"
}

export const initNeoletterFormWidgets = (instanceId: string, captchaOptions?: CaptchaOptions): void => {
  _instanceId = instanceId;
  captchaOptions && (_captchaOptions = captchaOptions);
  loadWidgets();
};

export const getInstanceId = (): string => {
  return _instanceId;
};

export const getCaptchaOptions = (): CaptchaOptions => {
  return _captchaOptions;
}

function loadWidgets(): void {
  if (isEmpty(import.meta)) {
    const widgetImportsContext = require.context(
      "../Widgets",
      true,
      /Widget(Class|Component|EditingConfig)\.tsx?$/
    );
    widgetImportsContext.keys().forEach(widgetImportsContext);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (import.meta as any).glob(
      [
        "../Widgets/**/*WidgetClass.ts",
        "../Widgets/**/*WidgetComponent.tsx",
        "../Widgets/**/*WidgetEditingConfig.ts"
      ],
      {
        eager: true
      }
    );
  }
}
