import React from "react";
import { render } from "@testing-library/react";
import { DropdownOption } from "../../../../src/Widgets/FormStepContainerWidget/components/DropdownOption"; // Update the path according to your actual component structure
import renderer from "react-test-renderer";

describe("DropdownOption", () => {
  const props = {
    value: "Apple",
    id: "apple-option"
  };

  it("renders with correct value and id", () => {
    const { container } = render(<DropdownOption {...props} />);
    const optionElement = container.querySelector("option");

    expect(optionElement).toBeInTheDocument();
    expect(optionElement).toHaveValue("Apple");
    expect(optionElement).toHaveAttribute("id", "apple-option");
    expect(optionElement).toHaveTextContent("Apple");
  });

  it("renders with different value and id", () => {
    const differentProps = {
      value: "Banana",
      id: "banana-option"
    };

    const { container } = render(<DropdownOption {...differentProps} />);
    const optionElement = container.querySelector("option");

    expect(optionElement).toBeInTheDocument();
    expect(optionElement).toHaveValue("Banana");
    expect(optionElement).toHaveAttribute("id", "banana-option");
    expect(optionElement).toHaveTextContent("Banana");
  });

  it("renders correctly", () => {
    const tree = renderer.create(<DropdownOption {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
