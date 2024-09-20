import React from "react";
import { Widget } from "scrivito";
import { render } from "@testing-library/react";
import { FormSubmitting } from "../../../../src/Widgets/FormStepContainerWidget/components/FormSubmittingComponent";
import renderer from "react-test-renderer";
import { DummyWidget } from "../../../helpers/dummyWidget";


const submittingText = "Submitting...";
describe("FormSubmitting", () => {
  const widgetProperties = {
    submittingText: "Submitting...",
    type: "default",
    submittingMessageWidgets: []
  };

  const widget = new DummyWidget(widgetProperties) as unknown as Widget;
  it("renders the spinner icon and outputs the submitting text", () => {
    const { container, getByText } = render(
      <FormSubmitting
        submittingText={submittingText}
        type="default"
        widget={widget}
      />
    );

    const icon = container.querySelector(".bi-arrow-repeat");
    const textElement = getByText(submittingText);

    expect(icon).toBeInTheDocument();
    expect(icon?.tagName.toLowerCase()).toBe("i");

    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName.toLowerCase()).toBe("span");
  });
  it("renders the widget list", () => {
    const { container, getByText } = render(
      <FormSubmitting
        submittingText={submittingText}
        type="default"
        widget={widget}
      />
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
      .create(<FormSubmitting
        submittingText={submittingText}
        type="default"
        widget={widget}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
