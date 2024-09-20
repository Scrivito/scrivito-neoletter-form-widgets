import * as React from "react";
import { render } from "@testing-library/react";
import { FormSubmissionFailed } from "../../../../src/Widgets/FormStepContainerWidget/components/FormSubmissionFailedComponent";
import renderer from "react-test-renderer";
import { DummyWidget } from "../../../helpers/dummyWidget";
import { Widget } from "scrivito";

const submissionFailureText = "Submission failed!";
describe("FormSubmissionFailed", () => {
  const widgetProps = {
    submissionFailureText: submissionFailureText,
    type: "default",

    showRetryButton: false,
    retryButtonText: "Retry",
    onReSubmit: () => { },
    buttonAlignment: "text-center"
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
