import { isEmpty } from "./Widgets/FormStepContainerWidget/utils/lodashPolyfills";

export function loadEditingConfigs(): void {
  if (isEmpty(import.meta)) {
    const widgetImportsContext = require.context(
      "./Widgets",
      true,
      /WidgetEditingConfig\.tsx?$/
    );
    widgetImportsContext.keys().forEach(widgetImportsContext);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (import.meta as any).glob(["./Widgets/**/*WidgetEditingConfig.ts"], {
      eager: true
    });
  }
}
