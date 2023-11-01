import * as Scrivito from "scrivito";

export const FormHiddenFieldWidget = Scrivito.provideWidgetClass(
  "FormHiddenFieldWidget",
  {
    onlyInside: ["FormStepWidget"],
    attributes: {
      customFieldName: "string",
      hiddenValue: "string",
    },
  }
);
