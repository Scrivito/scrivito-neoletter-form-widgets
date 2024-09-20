import * as React from "react";
import { render } from "@testing-library/react";
import { FormSubmissionSucceeded } from "../../../../src/Widgets/FormStepContainerWidget/components/FormSubmissionSucceededComponent";
import renderer from "react-test-renderer";
import { DummyWidget } from "../../../helpers/dummyWidget";
import { Widget } from "scrivito";

const submissionSuccessText = "Submission successful!";
describe("FormSubmissionSucceeded", () => {
  const widget = new DummyWidget({}) as unknown as Widget;

  it("renders the check icon and outputs the text", () => {
    const { container, getByText } = render(
      <FormSubmissionSucceeded
        submissionSuccessText={submissionSuccessText}
        type="default"
        widget={widget}
      />
    );

    const icon = container.querySelector(".bi-check-lg");
    const textElement = getByText(submissionSuccessText);

    expect(icon).toBeInTheDocument();
    expect(icon?.tagName.toLowerCase()).toBe("i");

    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName.toLowerCase()).toBe("span");
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <FormSubmissionSucceeded
          submissionSuccessText={submissionSuccessText}
          type="default"
          widget={widget}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
