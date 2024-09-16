import React from "react";
import { render } from "@testing-library/react";
import { FormSubmitting } from "../../../../src/Widgets/FormStepContainerWidget/components/FormSubmittingComponent";
import renderer from "react-test-renderer";

const submittingText = "Submitting...";
describe("FormSubmitting", () => {
  it("renders the spinner icon and outputs the submitting text", () => {
    const { container, getByText } = render(
      <FormSubmitting submittingText={submittingText} />
    );

    const icon = container.querySelector(".bi-arrow-repeat");
    const textElement = getByText(submittingText);

    expect(icon).toBeInTheDocument();
    expect(icon?.tagName.toLowerCase()).toBe("i");

    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName.toLowerCase()).toBe("span");
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(<FormSubmitting submittingText={submittingText} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
