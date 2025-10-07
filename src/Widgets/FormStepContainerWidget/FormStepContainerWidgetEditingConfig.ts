import * as Scrivito from "scrivito";
import formContainerWidgetIcon from "../../assets/images/form_container_widget.svg";
import { FormInputFieldWidget } from "../FormInputFieldWidget/FormInputFieldWidgetClass";
import { pseudoRandom32CharHex } from "./utils/pseudoRandom32CharHex";
import { getFormContainer } from "./utils/getFormContainer";
import { FormStepWidget } from "../FormStepWidget/FormStepWidgetClass";
import { getCaptchaOptions, getInstanceId } from "../../config/scrivitoConfig";
import { FormIdComponent } from "./components/FormIdComponent";
import { isEmpty } from "./utils/lodashPolyfills";

Scrivito.provideEditingConfig("FormStepContainerWidget", {
  title: "Neoletter Form",
  thumbnail: formContainerWidgetIcon,
  attributes: {
    formId: {
      title: "Form ID",
      description: "This ID identifies the form in Neoletter."
    },
    customClassNames: {
      title: "Additional CSS Classes",
      description: "Specify additional CSS class names to be added to the main container of the form. Separate multiple class names with spaces."
    },
    showCaptcha: {
      title: "Enable captcha",
      description: "Enables captcha for this form."
    },
    captchaTheme: {
      title: "Theme",
      values: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" }
      ]
    },
    googleRecaptchaLanguage: {
      title: "Language",
      description:
        "Google reCAPTCHA automatically adapts to the browser`s language setting. Changes are applied after refreshing the page."
    },
    friendlyCaptchaLanguage: {
      title: "Language",
      description:
        "Defaults to English. Changes are applied after refreshing the page."
    },
    captchaAlignment: {
      title: "Alignment",
      values: [
        { value: "left", title: "Left" },
        { value: "center", title: "Center" },
        { value: "right", title: "Right" }
      ]
    },
    friendlyCaptchaStartMode: {
      title: "Start verification",
      description:
        "Specify when the captcha should start the verification process.",
      values: [
        { value: "none", title: "After clicking the captcha" },
        { value: "auto", title: "When the form is ready" },
        { value: "focus", title: "After clicking a form field" }
      ]
    },
    submittingMessage: {
      title: "Message shown while the form is being submitted"
    },
    submittedMessage: {
      title: "Message shown after the form was successfully submitted"
    },
    failedMessage: {
      title: "Message shown if the form submission failed"
    },
    failedMessageType: {
      title: "Submission failure message type",
      description: "Select the type of failure message displayed upon submission failure.",
      values: [
        { value: "default", title: "Default text" },
        { value: "widget-list", title: "Custom content" }
      ]
    },
    submittedMessageType: {
      title: "Submission success message type",
      description: "Select the type of message displayed after successful form submission.",
      values: [
        { value: "default", title: "Default text" },
        { value: "widget-list", title: "Custom content" }
      ]
    },
    submittingMessageType: {
      title: "Submitting message type",
      description: "Select the type of message displayed while the form is being submitted.",
      values: [
        { value: "default", title: "Default text" },
        { value: "widget-list", title: "Custom content" }
      ]
    },
    failedMessageWidgets: {
      title: "Submission failure content",
      description: "Customize the content to be displayed upon submission failure."
    },
    submittedMessageWidgets: {
      title: "Submission success content",
      description: "Customize the content to be displayed after successful form submission."
    },
    submittingMessageWidgets: {
      title: "Submitting content",
      description: "Customize the content to be displayed while the form is being submitted."
    },
    previewFailedMessage: {
      title: "Preview failed message/content",
      description: "Preview the failure message or content in edit mode."
    },
    previewSubmittedMessage: {
      title: "Preview success message/content",
      description: "Preview the success message or content in edit mode."
    },
    previewSubmittingMessage: {
      title: "Preview submitting message/content",
      description: "Preview the message or content displayed while the form is being submitted in edit mode."
    },
    showRetryButton: { title: "Show retry button" },
    retryButtonText: { title: "Retry button text" },
    retryButtonAlignment: {
      title: "Retry button alignment",
      values: [
        { value: "left", title: "Left" },
        { value: "text-center", title: "Center" },
        { value: "text-end", title: "Right" },
      ]
    },

    hiddenFields: {
      title: "Hidden fields"
    },
    forwardButtonText: {
      title: "Forward button text"
    },
    backwardButtonText: {
      title: "Backward button text"
    },
    submitButtonText: {
      title: "Submit button text"
    },
    formType: {
      title: "Format",
      values: [
        { value: "single-step", title: "Single step" },
        { value: "multi-step", title: "Multiple steps" }
      ]
    },
    showBorder: {
      title: "Show frame",
      description: "Adds a frame around the form."
    },
    showReview: {
      title: "Enable review",
      description:
        "Adds a button to the last step of multiple steps for reviewing the answers."
    },
    includeEmptyAnswers: {
      title: "Include empty answers",
      description: "Also includes empty answers in the review dialog."
    },
    showReviewHeader: {
      title: "Show header",
      description: "Adds a header to the review dialog."
    },
    showReviewFooter: {
      title: "Show footer",
      description: "Adds a footer with a button for closing the review dialog."
    },
    showStepsInReview: { title: "Show steps", description: "Shows the steps." },
    reviewButtonText: {
      title: "Review button text",
      description: "The text for the review button."
    },
    reviewHeaderTitle: {
      title: "Header title",
      description: "The title of the review header."
    },
    reviewCloseButtonText: {
      title: "Close button text",
      description: "The text on the button for closing the review dialog."
    },
    singleSubmitButtonAlignment: {
      title: "Alignment",
      values: [
        { value: "left", title: "Left" },
        { value: "text-center", title: "Center" },
        { value: "text-end", title: "Right" },
        { value: "block", title: "Full width" }
      ]
    },
    fixedFormHeight: {
      title: "Enable fixed height",
      description: "Manually set the form height."

    },
    overscrollBehavior: {
      title: "Overscroll behavior",
      description: "Select how overscrolling should behave, i.e. it scrolls also the container.",
      values: [
        { value: "default", title: "Default" },
        { value: "none", title: "No scroll" }
      ]
    },
    formHeight: {
      title: "Form height",
      description: "Enter the height of the form content in em."
    },
    scrollbarWidth:
    {
      title: "Scrollbar width",
      description: 'The width of the scrollbar. "None" will hide the scrollbar.',
      values: [{ value: "default", title: "Default" }, { value: "thin", title: "Thin" }, { value: "none", title: "None" }]
    },
    buttonsSize: {
      title: "Buttons size",
      description: "Default: Medium",
      values: [{ value: "btn-sm", title: "Small" }, { value: "btn-md", title: "Medium" }, { value: "btn-lg", title: "Large" }]
    },
    buttonsStyle: {
      title: "Buttons style",

      values: [{ value: "btn-primary", title: "Primary" }, { value: "btn-secondary", title: "Secondary" }]
    },
  },
  properties: (widget) => {
    const useFixedHeight = widget.get("fixedFormHeight");

    return [
      "showBorder",
      "customClassNames",
      "buttonsSize",
      "buttonsStyle",
      "fixedFormHeight",
      ["formHeight", { enabled: useFixedHeight }],
      ["scrollbarWidth", { enabled: useFixedHeight }],
      ["overscrollBehavior", { enabled: useFixedHeight }]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any;
  },
  propertiesGroups: (widget) => {
    const showSubmittingMessage = widget.get("submittingMessageType") !== "widget-list";
    const showSubmittedMessage = widget.get("submittedMessageType") !== "widget-list";
    const showFailedMessage = widget.get("failedMessageType") !== "widget-list";
    const showRetryButton = widget.get("showRetryButton");
    const { siteKey, captchaType } = getCaptchaOptions();
    const groups = [
      {
        title: "Steps",
        key: "FormSteps",
        properties: ["steps"]
      },
      {
        title: "Hidden fields",
        key: "FormStepContainerWidgetHiddenFields",
        properties: ["hiddenFields"]
      },
      {
        title: "Form submissions",
        key: "FormStepContainerWidgetFormSubmissions",
        properties: ["formId"],
        component: FormIdComponent
      },
      {
        title: "Submission Messages",
        key: "FormStepContainerWidgetSubmissionMessages",
        properties: [
          "submittingMessageType",
          showSubmittingMessage ? "submittingMessage" : "submittingMessageWidgets",
          "previewSubmittingMessage",
          "submittedMessageType",
          showSubmittedMessage ? "submittedMessage" : "submittedMessageWidgets",
          "previewSubmittedMessage",
          "failedMessageType",
          showFailedMessage ? "failedMessage" : "failedMessageWidgets",
          "showRetryButton",
          ["retryButtonText", { enabled: showRetryButton }],
          ["retryButtonAlignment", { enabled: showRetryButton }],
          "previewFailedMessage"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ] as any
      },
      {
        title: "Navigation area",
        key: "FormNavigationButtons",
        properties: getNavigationProperties(widget)
      }
    ];
    if (widget.get("formType") == "multi-step")
      groups.splice(
        1,
        0,
        {
          title: "Review",
          key: "FormReview",
          properties: getReviewProperties(widget)
        }
      );
    if (
      !isEmpty(captchaType) &&
      !isEmpty(siteKey) &&
      captchaType !== "google-recaptcha-v3"
    ) {
      groups.splice(0, 0, {
        title:
          captchaType == "friendly-captcha"
            ? "Friendly Captcha"
            : "Google reCAPTCHA V2",
        key: "FormStepContainerWidgetCaptcha",
        properties: getCaptchaProperties(widget)
      });
    }
    return groups;
  },

  initialContent: {
    formId: () => pseudoRandom32CharHex(),
    fixedFormHeight: false,
    formHeight: 35,
    scrollbarWidth: "default",
    overscrollBehavior: "default",
    formType: "single-step",
    singleSubmitButtonAlignment: "text-center",
    steps: [
      new FormStepWidget({
        items: [
          new FormInputFieldWidget({
            type: "given_name",
            label: "First name",
            placeholder: "Your first name",
            required: true
          }),
          new FormInputFieldWidget({
            type: "family_name",
            label: "Last name",
            placeholder: "Your last name",
            required: true
          }),

          new FormInputFieldWidget({
            label: "Email",
            placeholder: "Your email address",
            type: "email",
            required: true
          }),
          new FormInputFieldWidget({
            type: "company",
            label: "Company",
            placeholder: "Your company"
          }),

          new FormInputFieldWidget({
            type: "custom",
            customType: "multi_line",
            customFieldName: "custom_message",
            label: "Message",
            placeholder: "Your message",
            required: true
          })
        ]
      })
    ],
    forwardButtonText: "Forward",
    backwardButtonText: "Backward",
    submitButtonText: "Submit",
    showBorder: false,
    // captcha stuff
    showCaptcha: false,
    captchaTheme: "light",
    friendlyCaptchaStartMode: "none",
    captchaAlignment: "center",
    // review stuff
    showReview: false,
    includeEmptyAnswers: false,
    showStepsInReview: false,
    showReviewHeader: false,
    showReviewFooter: false,
    reviewButtonText: "Review",
    reviewHeaderTitle: "Review",
    reviewCloseButtonText: "Close",
    // submitting stuff
    submittingMessage: "Submitting...",
    submittedMessage: "Your message has been successfully sent. Thank you for your request. We will get back to you as soon as possible.",
    failedMessage: "We are sorry, your request could not be completed. Please try again later.",
    submittingMessageType: "default",
    submittedMessageType: "default",
    failedMessageType: "default",
    previewSubmittingMessage: false,
    previewSubmittedMessage: false,
    previewFailedMessage: false,
    showRetryButton: false,
    retryButtonText: "Retry",
    retryButtonAlignment: "text-center",
    buttonsSize: "btn-md",
    buttonsStyle: "btn-primary"
  },
  validations: [
    (widget: Scrivito.Widget) => {
      if (getFormContainer(widget)) {
        return "Needs to be outside of a Neoletter form.";
      }
    },
    (widget: Scrivito.Widget) => {
      const steps = widget.get("steps") as Scrivito.Widget[];
      if (steps.length <= 0) {
        return "The form must include at least one step.";
      }
    },
    () => {
      if (isEmpty(getInstanceId())) {
        return "No instanceId specified for form widgets.";
      }
    },
    [
      "formId",
      (formId: string) => {
        if (!formId) {
          return "Specify the form ID.";
        }

        if (formId.match(/^[0-9a-fA-F]{32}$/) === null) {
          return "Specify a valid form ID (32 character hex value).";
        }
      }
    ]
  ]
});

/**
 * Retrieves the properties for the navigation tab
 * @param {*} widget
 * @returns an array of strings containing the properties to be shown
 */
function getNavigationProperties(widget: Scrivito.Widget): string[] {
  const singleStepNavigationProps = [
    "submitButtonText",
    "singleSubmitButtonAlignment"
  ];
  const MultiStepNavigationProps = [
    "forwardButtonText",
    "backwardButtonText",
    "submitButtonText"
  ];
  if (widget.get("formType") == "single-step") {
    return singleStepNavigationProps;
  } else {
    return MultiStepNavigationProps;
  }
}

/**
 * Retrieves the properties for the review tab
 * @param {*} widget
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getReviewProperties(widget: Scrivito.Widget): string[] | any[] {
  const reviewPropsDisabled = ["showReview"];
  const reviewPropsEnabled = [
    "showReview",
    "reviewButtonText",
    "showStepsInReview",
    "includeEmptyAnswers",
    "showReviewHeader",
    ["reviewHeaderTitle", { enabled: widget.get("showReviewHeader") }],
    "showReviewFooter",
    ["reviewCloseButtonText", { enabled: widget.get("showReviewFooter") }]
  ];
  return widget.get("showReview") ? reviewPropsEnabled : reviewPropsDisabled;
}
function getCaptchaProperties(widget: Scrivito.Widget): string[] {
  const captchaPropsDisabled = ["showCaptcha"];
  const captchaPropsEnabled = [
    "showCaptcha",
    getCaptchaOptions().captchaType == "friendly-captcha"
      ? "friendlyCaptchaLanguage"
      : "googleRecaptchaLanguage",
    "captchaTheme",
    "captchaAlignment"
  ];
  if (getCaptchaOptions().captchaType == "friendly-captcha") {
    captchaPropsEnabled.splice(2, 0, "friendlyCaptchaStartMode");
  }
  return widget.get("showCaptcha") ? captchaPropsEnabled : captchaPropsDisabled;
}
