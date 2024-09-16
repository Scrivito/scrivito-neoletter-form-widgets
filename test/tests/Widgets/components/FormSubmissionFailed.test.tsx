import * as React from "react";
import { render } from "@testing-library/react";
import { FormSubmissionFailed } from "../../../../src/Widgets/FormStepContainerWidget/components/FormSubmissionFailedComponent";
import renderer from "react-test-renderer";

const submissionFailureText = "Submission failed!";
describe("FormSubmissionFailed", () => {
  it("renders the exclamation icon and outputs the text", () => {
    const { container, getByText } = render(
      <FormSubmissionFailed submissionFailureText={submissionFailureText} />
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
        <FormSubmissionFailed submissionFailureText={submissionFailureText} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
