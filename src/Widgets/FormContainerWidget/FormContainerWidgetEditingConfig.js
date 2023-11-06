import * as Scrivito from "scrivito";
import formContainerWidgetIcon from "../../assets/images/form_container_widget.svg";
import { FormInputFieldWidget } from "../FormInputFieldWidget/FormInputFieldWidgetClass";
import { pseudoRandom32CharHex } from "./utils/pseudoRandom32CharHex";
import { getFormContainer } from "./utils/getFormContainer";
import { FormStepWidget } from "../FormStepWidget/FormStepWidgetClass";
import { FormSelectWidget } from "../FormSelectWidget/FormSelectWidgetClass";
import { FormRatingWidget } from "../FormRatingWidget/FormRatingWidgetClass";
import { getInstanceId } from "../../config/scrivitoConfig";
import { FormIdComponent } from "./components/FormIdComponent";
Scrivito.provideEditingConfig("FormContainerWidget", {
  title: "Form",
  thumbnail: formContainerWidgetIcon,
  attributes: {
    formId: {
      title: "Form ID",
      description: "This ID identifies the form in Neoletter.",
    },
    submittingMessage: {
      title: "Message shown while the form is being submitted",
    },
    submittedMessage: {
      title: "Message shown after the form was successfully submitted",
    },
    failedMessage: {
      title: "Message shown if the form submission failed",
    },
    hiddenFields: {
      title: "Hidden fields",
    },
    forwardButtonText: {
      title: "Forward button text",
    },
    backwardButtonText: {
      title: "Backward button text",
    },
    submitButtonText: {
      title: "Submit button text",
    },
    formType: {
      title: "Format",
      values: [
        { value: "single-step", title: "Single step" },
        { value: "multi-step", title: "Multiple steps" },
      ],
    },
    showBorder: {
      title: "Show as box",
      description: "Adds a border around the form if selected.",
    },
    showReview: {
      title: "Show review",
      description:
        "Shows a review button on last step for multiple steps. If clicked, a modal with answers will be shown.",
    },
    showEmptyAnswers: {
      title: "Show empty answers",
      description: "Shows also empty answers if selected.",
    },
    showReviewHeader: {
      title: "Show header",
      description: "Shows a header in the review modal.",
    },
    showReviewFooter: {
      title: "Show footer",
      description: "Shows a header in the review modal.",
    },
    showStepsInReview: { title: "Show steps", description: "Shows the steps." },
    reviewButtonText: {
      title: "Review button text",
      description: "The text for the review button.",
    },
    reviewHeaderTitle: {
      title: "Header title",
      description: "The title for the review header.",
    },
    reviewCloseButtonText: {
      title: "Close button text",
      description: "The text for the close button inside the review footer.",
    },
    singleSubmitButtonAlignment: {
      title: "Alignment",
      values: [
        { value: "left", title: "Left" },
        { value: "text-center", title: "Center" },
        { value: "text-end", title: "Right" },
        { value: "block", title: "Full width" },
      ],
    },
  },
  properties: [
    "showBorder",
    "submittingMessage",
    "submittedMessage",
    "failedMessage",
  ],
  propertiesGroups: (obj) => {
    const groups = [
      {
        title: "Hidden fields",
        key: "FormContainerWidgetHiddenFields",
        properties: ["hiddenFields"],
      },
      {
        title: "Form submissions",
        key: "FormContainerWidgetFormSubmissions",
        properties: ["formId"],
        component: FormIdComponent,
      },
      {
        title: "Navigation area",
        key: "FormNavigationButtons",
        properties: getNavigationProperties(obj),
      },
    ];
    if (obj.get("formType") == "multi-step")
      groups.unshift(
        {
          title: "Steps",
          key: "FormSteps",
          properties: ["steps"],
        },
        {
          title: "Review",
          key: "FormReview",
          properties: [
            "showReview",
            "showStepsInReview",
            "showEmptyAnswers",
            "showReviewHeader",
            "showReviewFooter",
            "reviewButtonText",
            "reviewHeaderTitle",
            "reviewCloseButtonText",
          ],
        }
      );
    return groups;
  },

  initialContent: {
    formId: () => pseudoRandom32CharHex(),
    submittingMessage: "Submitting...",
    submittedMessage:
      "Your message has been successfully sent. Thank you for your request. We will get back to you as soon as possible.",
    failedMessage:
      "We are sorry, your request could not be completed. Please try again later.",
    formType: "single-step",
    singleSubmitButtonAlignment: "text-center",
    steps: [
      new FormStepWidget({
        items: [
          new FormInputFieldWidget({
            type: "given_name",
            label: "First name",
            placeholder: "Your first name",
            required: true,
          }),
          new FormInputFieldWidget({
            type: "family_name",
            label: "Last name",
            placeholder: "Your last name",
            required: true,
          }),

          new FormInputFieldWidget({
            label: "Email",
            placeholder: "Your email address",
            type: "email",
            required: true,
          }),
          new FormInputFieldWidget({
            type: "company",
            label: "Company",
            placeholder: "Your company",
          }),

          new FormInputFieldWidget({
            type: "custom",
            customType: "multi_line",
            customFieldName: "custom_message",
            label: "Message",
            placeholder: "Your message",
            required: true,
          }),
        ],
      }),
    ],
    forwardButtonText: "Forward",
    backwardButtonText: "Backward",
    submitButtonText: "Submit",
    showBorder: false,
    // review stuff
    showReview: false,
    showEmptyAnswers: false,
    showStepsInReview: false,
    showReviewHeader: false,
    showReviewFooter: false,
    reviewButtonText: "Review",
    reviewHeaderTitle: "Review",
    reviewCloseButtonText: "Close",
  },
  validations: [
    (widget) => {
      if (getFormContainer(widget)) {
        return "Needs to be outside of a form.";
      }
    },
    (widget) => {
      if (widget.get("steps").length <= 0) {
        return "The form must include at least one step.";
      }
    },
    () => {
      if (!getInstanceId()) {
        return "No instanceId specified for form widgets.";
      }
    },

    [
      "submittingMessage",
      (submittingMessage) => {
        if (!submittingMessage) {
          return "Specify the message to be displayed during form submission.";
        }
      },
    ],

    [
      "submittedMessage",
      (submittedMessage) => {
        if (!submittedMessage) {
          return "Specify the message to be displayed after successful form submission.";
        }
      },
    ],

    [
      "failedMessage",
      (failedMessage) => {
        if (!failedMessage) {
          return "Specify the message to be displayed after form submission failed.";
        }
      },
    ],

    [
      "formId",
      (formId) => {
        if (!formId) {
          return "Specify the form ID.";
        }

        if (formId.match(/^[0-9a-fA-F]{32}$/) === null) {
          return "Specify a valid form ID (32 character hex value).";
        }
      },
    ],
  ],
});

/**
 * Retrieves the properties for the navigation tab
 * @param {*} obj
 * @returns an array of strings containing the properties to be shown
 */
function getNavigationProperties(obj) {
  const singleStepNavigationProps = [
    "submitButtonText",
    "singleSubmitButtonAlignment",
  ];
  const MultiStepNavigationProps = [
    "forwardButtonText",
    "backwardButtonText",
    "submitButtonText",
  ];
  if (obj.get("formType") == "single-step") {
    return singleStepNavigationProps;
  } else {
    return MultiStepNavigationProps;
  }
}
