import * as Scrivito from "scrivito";

export const FormHiddenFieldWidget = Scrivito.provideWidgetClass(
  "FormHiddenFieldWidget",
  {
    onlyInside: [
      "FormStepContainerWidget",
      "FormStepWidget",
      "FormContainerWidget"
    ],
    attributes: {
      customFieldName: "string",
      hiddenValue: "string",
      type: [
        "enum",
        {
          values: ["custom", "subscription", "email", "name", "urlParam"]
        }
      ],
      urlParameterKey: "string",
      urlParameterFieldName: "string"
    }
  }
);
