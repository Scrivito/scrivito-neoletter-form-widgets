import * as Scrivito from "scrivito";

export const FormHiddenFieldWidget = Scrivito.provideWidgetClass(
  "FormHiddenFieldWidget",
  {
    onlyInside: ["FormStepContainerWidget", "FormStepWidget"],
    attributes: {
      customFieldName: "string",
      hiddenValue: "string",
    },
  }
);
