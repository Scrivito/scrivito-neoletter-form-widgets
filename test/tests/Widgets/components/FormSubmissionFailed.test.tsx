import * as React from "react";
import * as Scrivito from "scrivito";
import { screen, render } from "@testing-library/react";
import { FormSubmissionFailed } from "../../../../src/Widgets/FormStepContainerWidget/components/FormSubmissionFailedComponent";
import renderer from "react-test-renderer";
import { DummyWidget } from "../../../helpers/dummyWidget";
import { Widget } from "scrivito";
import { FormDateWidget } from "../../../../src/Widgets/FormDateWidget/FormDateWidgetClass";
import { FormStepContainerWidget } from "../../../../src/Widgets/FormStepContainerWidget/FormStepContainerWidgetClass";
import "../../../../src/Widgets/FormStepContainerWidget/FormStepContainerWidgetComponent";
import "../../../../src/Widgets/FormDateWidget/FormDateWidgetComponent";
import PageRenderer from "../../../helpers/pageRenderer";

Scrivito.configure({ tenant: "inMemory" });
const submissionFailureText = "Submission failed!";

const formProps = {
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
  retryButtonText: "retry"
};

jest.mock("../../../../src/config/scrivitoConfig", () => ({
  getInstanceId: () => "abc",
  getCaptchaOptions: () => ({ siteKey: "", captchaType: "none" }),
  isTrackingEnabled: () => true
}));

const pageRenderer = new PageRenderer();

describe("FormSubmissionFailed", () => {
  const widgetProps = {
    submissionFailureText: submissionFailureText,
    type: "default",

    showRetryButton: false,
    retryButtonText: "Retry",
    onReSubmit: () => { },
    buttonAlignment: "text-center",
    fixedFormHeight: false,
    formHeight: 0,
    getClassNames: () => ""

  }
  const widget = new DummyWidget(widgetProps) as unknown as Widget;

  it("renders the exclamation icon and outputs the text", () => {
    const { container, getByText } = render(
      <FormSubmissionFailed
        {...widgetProps}
        widget={widget}
      />
    );

    const icon = container.querySelector(".bi-exclamation-triangle-fill");
    const textElement = getByText(submissionFailureText);
    expect(icon).toBeInTheDocument();
    expect(icon?.tagName.toLowerCase()).toBe("i");

    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName.toLowerCase()).toBe("span");
  });

  it("renders the widget list without a retry button if edit mode is true", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
    const submissionWidgets = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];

    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...formProps, failedMessageWidgets: submissionWidgets, failedMessageType: "widget-list", previewFailedMessage: true })]
    });

    const submissionContainer = document.querySelector(".form-submission-failed");
    const textContainer = document.querySelector(".text-center");
    const dateWidget = document.querySelector('input[type="date"]');
    const retryButton = document.querySelector("button");
    expect(textContainer).toBeNull();
    expect(dateWidget).toBeInTheDocument();
    expect(submissionContainer).toBeInTheDocument();
    expect(retryButton).not.toBeInTheDocument();
  });

  it("does not render if edit mode is false", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(false);

    const submissionWidgets = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];

    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...formProps, failedMessageWidgets: submissionWidgets, failedMessageType: "widget-list", previewFailedMessage: true })]
    });

    const textContainer = document.querySelector(".text-center");
    const dateWidget = document.querySelector('input[type="date"]');
    const form = document.getElementById("test-id");

    expect(textContainer).toBeNull();
    expect(dateWidget).not.toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it("does not render if preview is false and edit mode is true", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(false);

    const submissionWidgets = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];

    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...formProps, failedMessageWidgets: submissionWidgets, failedMessageType: "widget-list", previewFailedMessage: false })]
    });

    const textContainer = document.querySelector(".text-center");
    const spanElement = screen.queryByText(submissionFailureText);
    const dateWidget = document.querySelector('input[type="date"]');
    const form = document.getElementById("test-id");

    expect(textContainer).toBeNull();
    expect(spanElement).not.toBeInTheDocument();
    expect(dateWidget).not.toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it("shows the retry button ", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);

    const submissionWidgets = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];

    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...formProps, failedMessageWidgets: submissionWidgets, failedMessageType: "widget-list", previewFailedMessage: true, showRetryButton: true })]
    });

    const spanElement = screen.queryByText(submissionFailureText);
    const dateWidget = document.querySelector('input[type="date"]');
    const form = document.getElementById("test-id");
    const retryButton = screen.getByRole("button");
    expect(spanElement).not.toBeInTheDocument();
    expect(dateWidget).toBeInTheDocument();
    expect(form).not.toBeInTheDocument();
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).toHaveTextContent("retry");
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <FormSubmissionFailed
          {...widgetProps}
          widget={widget}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
