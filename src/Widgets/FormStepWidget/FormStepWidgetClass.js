import * as Scrivito from "scrivito";

export const FormStepWidget = Scrivito.provideWidgetClass("FormStepWidget", {
  onlyInside: "FormContainerWidget",
  attributes: {
    items: "widgetlist",
    stepNumber: "integer",
  },
});
