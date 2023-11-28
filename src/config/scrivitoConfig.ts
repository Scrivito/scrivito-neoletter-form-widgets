let _instanceId: string = "";

export const initNeoletterFormWidgets = (instanceId: string): void => {
  _instanceId = instanceId;
  loadWidgets();
};

export const getInstanceId = (): string => {
  return _instanceId;
};

function loadWidgets(): void {
  const widgetImportsContext = require.context(
    "../Widgets",
    true,
    /Widget(Class|Component|EditingConfig)\.tsx?$/,
  );
  widgetImportsContext.keys().forEach(widgetImportsContext);
}
