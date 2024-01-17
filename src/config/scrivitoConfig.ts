import { isEmpty } from "lodash-es";

let _instanceId: string = "";

export const initNeoletterFormWidgets = (instanceId: string): void => {
  _instanceId = instanceId;
  loadWidgets();
};

export const getInstanceId = (): string => {
  return _instanceId;
};

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
