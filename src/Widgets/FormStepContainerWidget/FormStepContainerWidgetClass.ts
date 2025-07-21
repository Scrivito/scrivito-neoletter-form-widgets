import * as Scrivito from "scrivito";

export const FormStepContainerWidget = Scrivito.provideWidgetClass(
  "FormStepContainerWidget",
  {
    attributes: {
      overscrollBehavior: ["enum",
        {
          values: ["default", "none"]
        }
      ],

      fixedFormHeight: "boolean",
      formHeight: "integer",
      scrollbarWidth: ["enum",
        {
          values: ["default", "thin", "none"]
        }
      ],
      showCaptcha: "boolean",
      friendlyCaptchaLanguage: "string",
      googleRecaptchaLanguage: "string",
      captchaAlignment: [
        "enum",
        {
          values: ["left", "center", "right"]
        }
      ],
      captchaTheme: [
        "enum",
        {
          values: ["light", "dark"]
        }
      ],
      friendlyCaptchaStartMode: ["enum",
        {
          values: ["none", "auto", "focus"]
        }
      ],
      formId: "string",
      customClassNames: "string",
      failedMessage: "string",
      submittedMessage: "string",
      submittingMessage: "string",
      failedMessageType: [
        "enum",
        {
          values: ["default", "widget-list"]
        }
      ],
      submittedMessageType: [
        "enum",
        {
          values: ["default", "widget-list"]
        }
      ],
      submittingMessageType: [
        "enum",
        {
          values: ["default", "widget-list"]
        }
      ],
      failedMessageWidgets: "widgetlist",
      submittedMessageWidgets: "widgetlist",
      submittingMessageWidgets: "widgetlist",
      previewFailedMessage: "boolean",
      previewSubmittedMessage: "boolean",
      previewSubmittingMessage: "boolean",
      showRetryButton: "boolean",
      retryButtonText: "string",
      retryButtonAlignment: [
        "enum",
        {
          values: ["left", "text-center", "text-end"]
        }
      ],
      retryButtonSize: [
        "enum",
        {
          values: ["btn-sm", "btn-md", "btn-lg"]
        }
      ],
      hiddenFields: ["widgetlist", { only: "FormHiddenFieldWidget" }],
      formType: [
        "enum",
        {
          values: ["single-step", "multi-step"]
        }
      ],
      steps: ["widgetlist", { only: "FormStepWidget" }],
      forwardButtonText: "string",
      backwardButtonText: "string",
      submitButtonText: "string",
      footerButtonsSize: [
        "enum",
        {
          values: ["btn-sm", "btn-md", "btn-lg"]
        }
      ],
      showBorder: "boolean",
      showReview: "boolean",
      includeEmptyAnswers: "boolean",
      showStepsInReview: "boolean",
      showReviewHeader: "boolean",
      showReviewFooter: "boolean",
      reviewButtonText: "string",
      reviewHeaderTitle: "string",
      reviewCloseButtonText: "string",
      singleSubmitButtonAlignment: [
        "enum",
        {
          values: ["left", "text-center", "text-end", "block"]
        }
      ]
    },
    extractTextAttributes: ["steps"]
  }
);
