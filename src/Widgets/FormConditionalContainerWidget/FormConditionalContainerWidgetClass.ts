import * as Scrivito from "scrivito";

export const FormConditionalContainerWidget = Scrivito.provideWidgetClass(
  "FormConditionalContainerWidget",
  {
    attributes: {
      headerType: [
        "enum",
        {
          values: ["dropdown", "radio"]
        }
      ],
      title: "html",
      customFieldName: "string",
      conditions: ["widgetlist", { only: "FormConditionWidget" }],
      required: "boolean",
      helpText: "html"
    }
  }
);
