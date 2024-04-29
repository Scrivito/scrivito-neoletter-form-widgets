import * as React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Mandatory } from "../../../../src/Widgets/FormStepContainerWidget/components/MandatoryComponent";
import renderer from "react-test-renderer";

describe("Mandatory", () => {
  it("renders the Mandatory component", () => {
    const { getByText } = render(<Mandatory />);

    const mandatoryText = getByText("*");
    expect(mandatoryText).toBeInTheDocument();

    const popoverBody = document.querySelector(".form-popover-body");
    expect(popoverBody).not.toBeInTheDocument();
  });

  it("renders the Mandatory component with a popover on hover", () => {
    const { getByText } = render(<Mandatory />);

    const mandatoryText = getByText("*");
    expect(mandatoryText).toBeInTheDocument();

    fireEvent.mouseOver(mandatoryText);
    const popoverBody = getByText("mandatory");
    expect(popoverBody).toBeInTheDocument();
  });

  it("renders correctly", () => {
    const tree = renderer.create(<Mandatory />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
