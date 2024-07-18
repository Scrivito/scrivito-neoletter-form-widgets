import * as Scrivito from "scrivito";
import { fireEvent, screen } from "@testing-library/react";
import { FormStepContainerWidget } from "../../../src/Widgets/FormStepContainerWidget/FormStepContainerWidgetClass";
import { FormStepWidget } from "../../../src/Widgets/FormStepWidget/FormStepWidgetClass";
import { FormDateWidget } from "../../../src/Widgets/FormDateWidget/FormDateWidgetClass";
import "../../../src/Widgets/FormStepContainerWidget/FormStepContainerWidgetComponent";
import "../../../src/Widgets/FormStepWidget/FormStepWidgetComponent";
import "../../../src/Widgets/FormDateWidget/FormDateWidgetComponent";
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
  singleSubmitButtonAlignment: "left"
};
describe("FormStepContainerWidget", () => {
  it("does not render with missing instanceId", () => {
    pageRenderer.render({
      body: [new FormStepContainerWidget(widgetProps)]
    });

    const container = document.querySelector("form");
    const emptyTenantElement = document.querySelector(
      ".scrivito-neoletter-form-widgets.missing-id"
    );
    expect(container).not.toBeInTheDocument();
    expect(emptyTenantElement).toBeInTheDocument();
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
});
