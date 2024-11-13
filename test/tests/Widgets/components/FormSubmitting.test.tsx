import React from "react";
import * as Scrivito from "scrivito";
import { Widget } from "scrivito";
import { render, screen } from "@testing-library/react";
import { FormSubmitting } from "../../../../src/Widgets/FormStepContainerWidget/components/FormSubmittingComponent";
import renderer from "react-test-renderer";
import { DummyWidget } from "../../../helpers/dummyWidget";
import { FormDateWidget } from "../../../../src/Widgets/FormDateWidget/FormDateWidgetClass";
import { FormStepContainerWidget } from "../../../../src/Widgets/FormStepContainerWidget/FormStepContainerWidgetClass";
import "../../../../src/Widgets/FormStepContainerWidget/FormStepContainerWidgetComponent";
import "../../../../src/Widgets/FormDateWidget/FormDateWidgetComponent";
import PageRenderer from "../../../helpers/pageRenderer";

Scrivito.configure({ tenant: "inMemory" });

const submittingText = "Submitting...";
const widgetProperties = {
  submittingText: submittingText,
  type: "default",
  submittingMessageWidgets: []
};
const widget = new DummyWidget(widgetProperties) as unknown as Widget;

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
  previewSubmittingMessage: false
};

const pageRenderer = new PageRenderer();

describe("FormSubmitting", () => {

  it("renders the spinner icon and outputs the submitting text", () => {
    const { container, getByText } = render(
      <FormSubmitting
        submittingText={submittingText}
        type="default"
        widget={widget}
        fixedFormHeight={false}
        formHeight={0}
        getClassNames={() => ""}
      />
    );

    const icon = container.querySelector(".bi-arrow-repeat");
    const textElement = getByText(submittingText);

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
      body: [new FormStepContainerWidget({ ...formProps, submittingMessageWidgets: submissionWidgets, submittingMessageType: "widget-list", previewSubmittingMessage: true })]
    });

    const textContainer = document.querySelector(".text-center");
    const dateWidget = document.querySelector('input[type="date"]');

    expect(textContainer).toBeNull();
    expect(dateWidget).toBeInTheDocument();
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
      body: [new FormStepContainerWidget({ ...formProps, submittingMessageWidgets: submissionWidgets, submittingMessageType: "widget-list", previewSubmittingMessage: true })]
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
      body: [new FormStepContainerWidget({ ...formProps, submittingMessageWidgets: submissionWidgets, submittingMessageType: "widget-list", previewSubmittingMessage: false })]
    });

    const textContainer = document.querySelector(".text-center");
    const spanElement = screen.queryByText(submittingText);
    const dateWidget = document.querySelector('input[type="date"]');
    const form = document.getElementById("test-id");

    expect(textContainer).toBeNull();
    expect(spanElement).not.toBeInTheDocument();
    expect(dateWidget).not.toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(<FormSubmitting
        submittingText={submittingText}
        type="default"
        widget={widget}
        fixedFormHeight={false}
        formHeight={0}
        getClassNames={() => ""}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
