import * as Scrivito from "scrivito";
import { fireEvent, getByText, screen } from "@testing-library/react";
import { FormStepContainerWidget } from "../../../src/Widgets/FormStepContainerWidget/FormStepContainerWidgetClass";
import { FormStepWidget } from "../../../src/Widgets/FormStepWidget/FormStepWidgetClass";
import { FormDateWidget } from "../../../src/Widgets/FormDateWidget/FormDateWidgetClass";
import "../../../src/Widgets/FormStepContainerWidget/FormStepContainerWidgetComponent";
import "../../../src/Widgets/FormStepWidget/FormStepWidgetComponent";
import "../../../src/Widgets/FormDateWidget/FormDateWidgetComponent";
import "../../../src/Widgets/FormStepContainerWidget/components/FormSubmittingComponent";
import "../../../src/Widgets/FormStepContainerWidget/components/FormSubmissionSucceededComponent";
import "../../../src/Widgets/FormStepContainerWidget/components/FormSubmissionFailedComponent";
import PageRenderer from "../../helpers/pageRenderer";

Scrivito.configure({ tenant: "inMemory" });

jest.mock(
  "../../../src/Widgets/FormStepContainerWidget/utils/lodashPolyfills",
  () => ({
    ...jest.requireActual(
      "../../../src/Widgets/FormStepContainerWidget/utils/lodashPolyfills"
    ),
    isEmpty: jest.fn(() => true)
  })
);

jest.mock("../../../src/config/scrivitoConfig", () => ({
  getInstanceId: () => "",
  getCaptchaOptions: () => ({ siteKey: "", captchaType: "none" }),
  isTrackingEnabled: () => true
}));

const pageRenderer = new PageRenderer();
const widgetProps = {
  formId: "test-id",
  failedMessage: "failed",
  submittedMessage: "submitted",
  submittingMessage: "submitting",
  hiddenFields: [],
  formType: "single-step",
  steps: [],
  forwardButtonText: "forward",
  backwardButtonText: "back",
  submitButtonText: "submit",
  showBorder: false,
  showCaptcha: false,
  captchaAlignment: "center",
  showReview: true,
  includeEmptyAnswers: false,
  showStepsInReview: false,
  showReviewHeader: false,
  showReviewFooter: false,
  reviewButtonText: "Review",
  reviewHeaderTitle: "Review header",
  reviewCloseButtonText: "Close",
  singleSubmitButtonAlignment: "left",
  previewSubmittingMessage: false,
  previewFailedMessage: false,
  previewSubmittedMessage: false,
  submittingMessageType: "default",
  submittedMessageType: "default",
  failedMessageType: "default",
  submittedMessageWidgets: [],
  submittingMessageWidgets: [],
  failedMessageWidgets: [],
  showRetryButton: false,
  retryButtonText: "retry",
  retryButtonAlignment: "text-center",
  fixedFormHeight: false,
  formHeight: 35,
  scrollbarWidth: "default",
  overscrollBehavior: "default"

};

describe("FormStepContainerWidget", () => {

  beforeAll(() => {
    window.HTMLElement.prototype.scroll = jest.fn();
  });

  it("does not render with missing instanceId", () => {
    pageRenderer.render({
      body: [new FormStepContainerWidget(widgetProps)]
    });
    console.log(document.documentElement.outerHTML)
    const container = document.querySelector("form");
    const warningMessageContainer = document.querySelector(".qst-message-block-container");
    const warningMessage = getByText(warningMessageContainer! as HTMLElement,
      "Tenant has not been configured for the form widget."
    );
    expect(warningMessage).toBeInTheDocument();
    expect(container).not.toBeInTheDocument();
    jest.resetAllMocks();
  });

  it("renders with single step mode", () => {
    const items = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];
    const step = new FormStepWidget({ isSingleStep: true, items: items });
    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...widgetProps, steps: [step] })]
    });

    const submitButtonText = screen.getByText(widgetProps.submitButtonText);
    const multiStepsFooterContainer = document.querySelector(".form-buttons");
    const allSteps = document.querySelectorAll("div[data-step-number]");
    expect(submitButtonText).toBeInTheDocument();
    expect(multiStepsFooterContainer).not.toBeInTheDocument();
    expect(allSteps).toHaveLength(1);
  });

  it("renders with multiple steps mode", () => {
    const items = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];
    const firstStep = new FormStepWidget({ isSingleStep: false, items: items });
    const secondStep = new FormStepWidget({
      isSingleStep: false,
      items: items
    });
    pageRenderer.render({
      body: [
        new FormStepContainerWidget({
          ...widgetProps,
          steps: [firstStep, secondStep],
          formType: "multi-step"
        })
      ]
    });

    const multiStepsFooterContainer = document.querySelector(".form-buttons");
    const allSteps = document.querySelectorAll("div[data-step-number]");
    expect(multiStepsFooterContainer).toBeInTheDocument();
    expect(allSteps).toHaveLength(2);
  });

  it("shows submit & review buttons in the last step", () => {
    const items = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];
    const firstStep = new FormStepWidget({ isSingleStep: false, items: items });
    pageRenderer.render({
      body: [
        new FormStepContainerWidget({
          ...widgetProps,
          steps: [firstStep],
          formType: "multi-step"
        })
      ]
    });

    const multiStepsFooterContainer = document.querySelector(".form-buttons");
    const reviewButton = document.querySelector(".review-button");
    const submitButton = document.querySelector(".submit-button");
    const forwardButton = document.querySelector(".forward-button");
    const backwardButton = document.querySelector(".backward-button");
    const allSteps = document.querySelectorAll("div[data-step-number]");
    expect(multiStepsFooterContainer).toBeInTheDocument();
    expect(allSteps).toHaveLength(1);
    expect(reviewButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent(widgetProps.submitButtonText);
    expect(forwardButton).not.toBeVisible();
    expect(backwardButton).not.toBeVisible();
  });

  it("shows border", () => {
    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...widgetProps, showBorder: true })]
    });

    const container = document.querySelector(
      ".scrivito-neoletter-form-widgets.form-container-widget"
    );
    expect(container).toHaveClass("form-border");
  });

  it("renders winnie-the-pooh", () => {
    pageRenderer.render({
      body: [new FormStepContainerWidget(widgetProps)]
    });
    const input = document.querySelector('input[name="fax"]');
    expect(input).toBeInTheDocument();
  });

  it("renders with dynamic height", () => {
    pageRenderer.render({
      body: [new FormStepContainerWidget(widgetProps)]
    });

    const form = document.querySelector('form');

    expect(form).not.toHaveStyle("height: 35em;");
    expect(form).not.toHaveClass("fixed-container-height");
    expect(form).not.toHaveClass("thin-scrollbar");
    expect(form).not.toHaveClass("hidden-scrollbar");
    expect(form).not.toHaveClass("no-overscroll-yr");
  });

  it("renders with fixed height", () => {
    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...widgetProps, fixedFormHeight: true, formHeight: 22 })]
    });
    const form = document.querySelector('form');

    expect(form).toHaveStyle("height: 22em;");
    expect(form).toHaveClass("fixed-container-height");
    expect(form).not.toHaveClass("thin-scrollbar");
    expect(form).not.toHaveClass("hidden-scrollbar");

  });

  it("renders with thin scrollbar", () => {
    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...widgetProps, fixedFormHeight: true, scrollbarWidth: "thin" })]
    });

    const form = document.querySelector('form');

    expect(form).toHaveClass("fixed-container-height");
    expect(form).toHaveClass("thin-scrollbar");
    expect(form).not.toHaveClass("hidden-scrollbar");
  });

  it("renders with hidden scrollbar", () => {
    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...widgetProps, fixedFormHeight: true, scrollbarWidth: "none" })]
    });

    const form = document.querySelector('form');

    expect(form).toHaveClass("fixed-container-height");
    expect(form).not.toHaveClass("thin-scrollbar");
    expect(form).toHaveClass("hidden-scrollbar");
  });

  it("renders with no overscroll-y", () => {
    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...widgetProps, fixedFormHeight: true, overscrollBehavior: "none" })]
    });

    const form = document.querySelector('form');

    expect(form).toHaveClass("fixed-container-height");
    expect(form).toHaveClass("no-overscroll-y");
  });

  it("renders correctly", () => {
    const items = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];
    const firstStep = new FormStepWidget({ isSingleStep: false, items: items });
    const secondStep = new FormStepWidget({
      isSingleStep: false,
      items: items
    });

    const tree = pageRenderer.getAsJSON({
      body: [
        new FormStepContainerWidget({
          ...widgetProps,
          steps: [firstStep, secondStep],
          formType: "multi-step"
        })
      ]
    });
    expect(tree).toMatchSnapshot();
  });

  describe("Neoletter Tracking ID integration", () => {
    let fetchMock: jest.Mock;
    const testTrackingID = "test-tracking-id";

    beforeAll(() => {
      // Set tracking flag to true
      (global as any).tracking = true

      // Mock global fetch function
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve({})
        })
      );

      fetchMock = global.fetch as jest.Mock;
    });

    beforeEach(() => {
      const step = new FormStepWidget({ isSingleStep: true, items: [] });
      pageRenderer.render({
        body: [new FormStepContainerWidget({ ...widgetProps, steps: [step] })]
      });
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    describe("When Tracking ID is present in Local Storage", () => {
      beforeAll(() => {
        localStorage.setItem("neo_tid", testTrackingID);
      });

      it("should include the tracking_id in the API call when submitting the form", async () => {
        const submitButton = await screen.findByRole("button", {
          name: "submit"
        });

        fireEvent.click(submitButton);

        // jest displays complex objects like URLSearchParams as {}, requiring manual inspection for detailed checks.
        const params = new URLSearchParams(fetchMock.mock.calls[0][1].body);
        expect(params.get("tracking_id")).toBe(testTrackingID);
      });
    });

    describe("When Tracking ID is not present in Local Storage", () => {
      beforeAll(() => {
        localStorage.removeItem("neo_tid");
      });

      it("should not include a tracking_id in the API call when submitting the form", async () => {
        const submitButton = await screen.findByRole("button", {
          name: "submit"
        });
        fireEvent.click(submitButton);

        // jest displays complex objects like URLSearchParams as {}, requiring manual inspection for detailed checks.
        const params = new URLSearchParams(fetchMock.mock.calls[0][1].body);
        expect(params.get("tracking_id")).toBe(null);
      });
    });
  });

  describe("Submission messages", () => {
    it("renders submission succeeded widgets if edit mode is active", () => {
      jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
      const submissionWidgets = [
        new FormDateWidget({
          customFieldName: "custom_date",
          title: "date",
          dateType: "date"
        })
      ];

      pageRenderer.render({
        body: [new FormStepContainerWidget({ ...widgetProps, previewSubmittedMessage: true, submittedMessageWidgets: submissionWidgets, submittedMessageType: "widget-list" })]
      });

      const form = document.getElementById("test-id");
      const submissionContainer = document.querySelector(".form-submission-succeeded");
      const defaultTextContainer = submissionContainer?.querySelector(".text-center");
      const dateWidget = document.querySelector('input[type="date"]');
      expect(form).not.toBeInTheDocument();
      expect(submissionContainer).toBeInTheDocument();
      expect(defaultTextContainer).not.toBeInTheDocument();
      expect(dateWidget).toBeInTheDocument();
    });

    it("renders submission succeeded default text if edit mode is active", () => {
      jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
      const submissionWidgets = [
        new FormDateWidget({
          customFieldName: "custom_date",
          title: "date",
          dateType: "date"
        })
      ];

      pageRenderer.render({
        body: [new FormStepContainerWidget({ ...widgetProps, previewSubmittedMessage: true, submittedMessageWidgets: submissionWidgets, submittedMessageType: "default" })]
      });

      const form = document.getElementById("test-id");
      const submissionContainer = document.querySelector(".form-submission-succeeded");
      const defaultTextContainer = submissionContainer?.querySelector(".text-center");
      const dateWidget = document.querySelector('input[type="date"]');
      expect(form).not.toBeInTheDocument();
      expect(submissionContainer).toBeInTheDocument();
      expect(defaultTextContainer).toBeInTheDocument();
      expect(dateWidget).not.toBeInTheDocument();
    });

    it("renders submission failed widgets if edit mode is active", () => {
      jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
      const submissionWidgets = [
        new FormDateWidget({
          customFieldName: "custom_date",
          title: "date",
          dateType: "date"
        })
      ];

      pageRenderer.render({
        body: [new FormStepContainerWidget({ ...widgetProps, previewFailedMessage: true, failedMessageWidgets: submissionWidgets, failedMessageType: "widget-list" })]
      });

      const form = document.getElementById("test-id");
      const failedContainer = document.querySelector(".form-submission-failed");
      const defaultTextContainer = failedContainer?.querySelector(".text-center");
      const dateWidget = document.querySelector('input[type="date"]');
      expect(form).not.toBeInTheDocument();
      expect(failedContainer).toBeInTheDocument();
      expect(defaultTextContainer).not.toBeInTheDocument();
      expect(dateWidget).toBeInTheDocument();
    });

    it("renders submission failed default text if edit mode is active", () => {
      jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
      const submissionWidgets = [
        new FormDateWidget({
          customFieldName: "custom_date",
          title: "date",
          dateType: "date"
        })
      ];

      pageRenderer.render({
        body: [new FormStepContainerWidget({ ...widgetProps, previewFailedMessage: true, failedMessageWidgets: submissionWidgets, failedMessageType: "default" })]
      });

      const form = document.getElementById("test-id");
      const failedContainer = document.querySelector(".form-submission-failed");
      const defaultTextContainer = failedContainer?.querySelector(".text-center");
      const dateWidget = document.querySelector('input[type="date"]');
      expect(form).not.toBeInTheDocument();
      expect(failedContainer).toBeInTheDocument();
      expect(defaultTextContainer).toBeInTheDocument();
      expect(dateWidget).not.toBeInTheDocument();
    });

    it("renders submission Submitting default text if edit mode is active", () => {

      jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
      const submissionWidgets = [
        new FormDateWidget({
          customFieldName: "custom_date",
          title: "date",
          dateType: "date"
        })
      ];

      pageRenderer.render({
        body: [new FormStepContainerWidget({ ...widgetProps, previewSubmittingMessage: true, submittingMessageWidgets: submissionWidgets, submittingMessageType: "default" })]
      });

      const form = document.getElementById("test-id");
      const submittingContainer = document.querySelector(".form-submission-submitting");
      const defaultTextContainer = submittingContainer?.querySelector(".text-center");
      const dateWidget = document.querySelector('input[type="date"]');
      expect(form).not.toBeInTheDocument();
      expect(submittingContainer).toBeInTheDocument();
      expect(defaultTextContainer).toBeInTheDocument();
      expect(dateWidget).not.toBeInTheDocument();
    });

    it("renders submission Submitting widgets if edit mode is active", () => {
      jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
      const submissionWidgets = [
        new FormDateWidget({
          customFieldName: "custom_date",
          title: "date",
          dateType: "date"
        })
      ];

      pageRenderer.render({
        body: [new FormStepContainerWidget({ ...widgetProps, previewSubmittingMessage: true, submittingMessageWidgets: submissionWidgets, submittingMessageType: "widget-list" })]
      });

      const form = document.getElementById("test-id");
      const submittingContainer = document.querySelector(".form-submission-submitting");
      const defaultTextContainer = submittingContainer?.querySelector(".text-center");
      const dateWidget = document.querySelector('input[type="date"]');
      expect(form).not.toBeInTheDocument();
      expect(submittingContainer).toBeInTheDocument();
      expect(defaultTextContainer).not.toBeInTheDocument();
      expect(dateWidget).toBeInTheDocument();
    });

    it("does not render any submission component if edit mode is not active", () => {
      jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(false);
      const submissionWidgets = [
        new FormDateWidget({
          customFieldName: "custom_date",
          title: "date",
          dateType: "date"
        })
      ];

      pageRenderer.render({
        body: [
          new FormStepContainerWidget(
            {
              ...widgetProps,
              previewSubmittingMessage: true,
              previewFailedMessage: true,
              previewSubmittedMessage: true,
              submittingMessageWidgets: submissionWidgets,
              submittingMessageType: "widget-list"
            })
        ]
      });

      const form = document.getElementById("test-id");
      const submittingContainer = document.querySelector(".form-submission-submitting");
      const failedContainer = document.querySelector(".form-submission-failed");
      const submittedContainer = document.querySelector(".form-submission-succeeded");

      expect(form).toBeInTheDocument();
      expect(submittingContainer).not.toBeInTheDocument();
      expect(failedContainer).not.toBeInTheDocument();
      expect(submittedContainer).not.toBeInTheDocument();
    });
  });
});
