import React from "react";
import * as Scrivito from "scrivito";
import { fireEvent, render } from "@testing-library/react";
import { Dropdown } from "../../../../src/Widgets/FormStepContainerWidget/components/SelectDropdownComponent";
import { DummyWidget } from "../../../helpers/dummyWidget";

describe("Dropdown", () => {
  const widget = new DummyWidget({
    title: "Select some",
    helptext: "",
    required: true,
    customFieldName: "custom_dropdown"
  }) as unknown as Scrivito.Widget;
  it("renders the Dropdown component with options and empty dropdown", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const name = "testDropdown";

    const { container, getByText } = render(
      <Dropdown options={options} name={name} useFloatingLabel={false} widget={widget} />
    );

    const emptyDropdown = container.querySelector("#empty-option");
    expect(emptyDropdown).toBeInTheDocument();

    options.forEach(option => {
      const optionElement = getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it("applies floating label class when useFloatingLabel is true", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const name = "testDropdown";

    const { container } = render(
      <Dropdown options={options} name={name} useFloatingLabel={true} widget={widget} />
    );

    const wrapper = container.querySelector(".dropdown-wrapper");
    expect(wrapper).toHaveClass("floating-label");
  });

  it("toggles is-selected class based on user selection", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const name = "testDropdown";

    const { container, getByRole } = render(
      <Dropdown options={options} name={name} useFloatingLabel={true} widget={widget} />
    );

    const selectElement = getByRole("combobox");
    const wrapper = container.querySelector(".dropdown-wrapper");
    expect(wrapper).not.toHaveClass("is-selected");

    fireEvent.change(selectElement, { target: { value: "Option 1" } });
    expect(wrapper).toHaveClass("is-selected");
  });



  it("renders correctly", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const name = "testDropdown";

    const { container } = render(
      <Dropdown options={options} name={name} useFloatingLabel={false} widget={widget} />
    );

    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });
});
