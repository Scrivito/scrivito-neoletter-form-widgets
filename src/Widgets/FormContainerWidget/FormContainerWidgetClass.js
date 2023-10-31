import * as Scrivito from "scrivito";

export const FormContainerWidget = Scrivito.provideWidgetClass(
  "FormContainerWidget",
  {
    attributes: {
      formId: "string",
      failedMessage: "string",
      submittedMessage: "string",
      submittingMessage: "string",
      hiddenFields: ["widgetlist", { only: "FormHiddenFieldWidget" }],
      formType: [
        "enum",
        {
          values: ["single-step", "multi-step"],
        },
      ],
      steps: ["widgetlist", { only: "FormStepWidget" }],
      forwardButtonText: "string",
      backwardButtonText: "string",
      submitButtonText: "string",
      showBorder: "boolean",
      singleSubmitButtonAlignment: [
        "enum",
        {
          values: ["left", "text-center", "text-end", "block"],
        },
      ],
    },
    extractTextAttributes: ["steps"],
  }
);
