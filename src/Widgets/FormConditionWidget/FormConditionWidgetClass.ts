import * as Scrivito from "scrivito";

export const FormConditionWidget = Scrivito.provideWidgetClass(
  "FormConditionWidget",
  {
    onlyInside: "FormConditionalContainerWidget",
    attributes: {
      title: "string",
      content: "widgetlist"
    }
  }
);
