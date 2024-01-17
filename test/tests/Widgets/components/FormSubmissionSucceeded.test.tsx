import * as React from "react";
import { render } from "@testing-library/react";
import { FormSubmissionSucceeded } from "../../../../src/Widgets/FormStepContainerWidget/components/FormSubmissionSucceededComponent";
import renderer from "react-test-renderer";

const submissionSuccessText = "Submission successful!";
describe("FormSubmissionSucceeded", () => {
  it("renders the check icon and outputs the text", () => {
    const { container, getByText } = render(
      <FormSubmissionSucceeded submissionSuccessText={submissionSuccessText} />
    );

    const icon = container.querySelector(".bi-check-lg");
    const textElement = getByText(submissionSuccessText);

    expect(icon).toBeInTheDocument();
    expect(icon?.tagName.toLowerCase()).toBe("i");

    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName.toLowerCase()).toBe("span");
    expect(textElement).toHaveClass("text-super");
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <FormSubmissionSucceeded
          submissionSuccessText={submissionSuccessText}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
