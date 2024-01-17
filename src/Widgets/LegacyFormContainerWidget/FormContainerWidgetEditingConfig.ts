import * as Scrivito from "scrivito";
import { pseudoRandom32CharHex } from "../FormStepContainerWidget/utils/pseudoRandom32CharHex";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormIdComponent } from "../FormStepContainerWidget/components/FormIdComponent";
Scrivito.provideEditingConfig("FormContainerWidget", {
  title: "Legacy Form",
  hideInSelectionDialogs: true,
  attributes: {
    formId: {
      title: "Form ID",
      description: "This ID identifies the form in Neoletter."
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
    hiddenFields: {
      title: "Hidden fields"
    }
  },
  properties: ["submittingMessage", "submittedMessage", "failedMessage"],
  propertiesGroups: [
    {
      title: "Hidden fields",
      key: "FormContainerWidgetHiddenFields",
      properties: ["hiddenFields"]
    },
    {
      title: "Form submissions",
      key: "FormContainerWidgetFormSubmissions",
      properties: ["formId"],
      component: "FormIdComponent"
    }
  ],
  initialContent: {
    formId: () => pseudoRandom32CharHex(),
    submittingMessage: "Submitting...",
    submittedMessage:
      "Your message has been successfully sent. Thank you for your request. We will get back to you as soon as possible.",
    failedMessage:
      "We are sorry, your request could not be completed. Please try again later."
  },
  validations: [
    widget => {
      if (widget.widgets().every(w => w.objClass() !== "FormButtonWidget")) {
        return "A submit button is missing.";
      }
    },

    [
      "submittingMessage",
      submittingMessage => {
        if (!submittingMessage) {
          return "Specify the message to be displayed during form submission.";
        }
      }
    ],

    [
      "submittedMessage",
      submittedMessage => {
        if (!submittedMessage) {
          return "Specify the message to be displayed after successful form submission.";
        }
      }
    ],

    [
      "failedMessage",
      failedMessage => {
        if (!failedMessage) {
          return "Specify the message to be displayed after form submission failed.";
        }
      }
    ],

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
