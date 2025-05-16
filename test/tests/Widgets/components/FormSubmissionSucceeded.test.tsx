import * as React from "react";
import * as Scrivito from "scrivito";
import { screen, render } from "@testing-library/react";
import { FormSubmissionSucceeded } from "../../../../src/Widgets/FormStepContainerWidget/components/FormSubmissionSucceededComponent";
import renderer from "react-test-renderer";
import { DummyWidget } from "../../../helpers/dummyWidget";
import { Widget } from "scrivito";
import { FormDateWidget } from "../../../../src/Widgets/FormDateWidget/FormDateWidgetClass";
import { FormStepContainerWidget } from "../../../../src/Widgets/FormStepContainerWidget/FormStepContainerWidgetClass";
import "../../../../src/Widgets/FormStepContainerWidget/FormStepContainerWidgetComponent";
import "../../../../src/Widgets/FormDateWidget/FormDateWidgetComponent";
import PageRenderer from "../../../helpers/pageRenderer";

Scrivito.configure({ tenant: "inMemory" });
const submissionSuccessText = "Submission successful!";
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
  failedMessageWidgets: []
};

jest.mock("../../../../src/config/scrivitoConfig", () => ({
  getInstanceId: () => "abc",
  getCaptchaOptions: () => ({ siteKey: "", captchaType: "none" }),
  isTrackingEnabled: () => true
}));

const pageRenderer = new PageRenderer();

describe("FormSubmissionSucceeded", () => {
  const widget = new DummyWidget({}) as unknown as Widget;

  it("renders the check icon and outputs the text", () => {
    const { container, getByText } = render(
      <FormSubmissionSucceeded
        submissionSuccessText={submissionSuccessText}
        type="default"
        widget={widget}
        fixedFormHeight={false}
        formHeight={0}
        getClassNames={() => ""}
      />
    );

    const icon = container.querySelector(".bi-check-lg");
    const textElement = getByText(submissionSuccessText);

    expect(icon).toBeInTheDocument();
    expect(icon?.tagName.toLowerCase()).toBe("i");

    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName.toLowerCase()).toBe("span");
  });

  it("renders the widget list if edit mode is true", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
    const submissionWidgets = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];

    pageRenderer.render({
      body: [new FormStepContainerWidget({ ...formProps, submittedMessageWidgets: submissionWidgets, submittedMessageType: "widget-list", previewSubmittedMessage: true })]
    });

    const submissionContainer = document.querySelector(".form-submission-succeeded");
    const textContainer = document.querySelector(".text-center");
    const dateWidget = document.querySelector('input[type="date"]');

    expect(textContainer).toBeNull();
    expect(dateWidget).toBeInTheDocument();
    expect(submissionContainer).toBeInTheDocument();
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
      body: [new FormStepContainerWidget({ ...formProps, submittedMessageWidgets: submissionWidgets, submittedMessageType: "widget-list", previewSubmittedMessage: true })]
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
      body: [new FormStepContainerWidget({ ...formProps, submittedMessageWidgets: submissionWidgets, submittedMessageType: "widget-list", previewSubmittedMessage: false })]
    });

    const textContainer = document.querySelector(".text-center");
    const spanElement = screen.queryByText(submissionSuccessText);
    const dateWidget = document.querySelector('input[type="date"]');
    const form = document.getElementById("test-id");

    expect(textContainer).toBeNull();
    expect(spanElement).not.toBeInTheDocument();
    expect(dateWidget).not.toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it("has fixed height if set", () => {
    const { container, getByText } = render(
      <FormSubmissionSucceeded
        submissionSuccessText={submissionSuccessText}
        type="default"
        widget={widget}
        fixedFormHeight={true}
        formHeight={150}
        getClassNames={() => "test-class"}
      />
    );

    const submissionElement = container.querySelector(".form-submission-succeeded");

    expect(submissionElement).toHaveClass("test-class");
    expect(submissionElement).toHaveStyle("height: 150px");
    expect(getByText(submissionSuccessText)).toBeInTheDocument();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <FormSubmissionSucceeded
          submissionSuccessText={submissionSuccessText}
          type="default"
          widget={widget}
          fixedFormHeight={false}
          formHeight={0}
          getClassNames={() => ""}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
