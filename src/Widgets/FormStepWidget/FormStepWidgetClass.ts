import * as Scrivito from "scrivito";

export const FormStepWidget = Scrivito.provideWidgetClass("FormStepWidget", {
  onlyInside: "FormStepContainerWidget",
  attributes: {
    items: "widgetlist",
    stepNumber: "integer",
    isSingleStep: "boolean"
  }
});
