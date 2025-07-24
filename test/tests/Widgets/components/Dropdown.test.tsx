import React from "react";
import * as Scrivito from "scrivito";
import { fireEvent, render } from "@testing-library/react";
import { Dropdown } from "../../../../src/Widgets/FormStepContainerWidget/components/SelectDropdownComponent";
import { DummyWidget } from "../../../helpers/dummyWidget";
import { renderWithFormContext } from "../../../helpers/renderWithFormContext";

describe("Dropdown", () => {
  const widget = new DummyWidget({
    title: "Select some",
    helptext: "",
    required: true,
    customFieldName: "custom_dropdown"
  }) as unknown as Scrivito.Widget;

  const widgetProps = {
    options: ["Option 1", "Option 2", "Option 3"],
    name: "testDropdown",
    useFloatingLabel: false,
    alignment: "left",
    widget: widget,
    required: true,
    helptext: "",
    title: "Select some",
    isInvalid: false,
    onInputChange: () => { }
  }
  it("renders the Dropdown component with options and empty dropdown", () => {

    const { container, getByText } = renderWithFormContext(
      <Dropdown {...widgetProps} />
    );

    const emptyDropdown = container.querySelector("#empty-option");
    expect(emptyDropdown).toBeInTheDocument();

    widgetProps.options.forEach(option => {
      const optionElement = getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it("applies floating label class when useFloatingLabel is true", () => {

    const { container } = renderWithFormContext(
      <Dropdown {...widgetProps} useFloatingLabel={true} />
    );

    const wrapper = container.querySelector(".dropdown-wrapper");
    expect(wrapper).toHaveClass("floating-label");
  });

  it("toggles is-selected class based on user selection", () => {

    const { container, getByRole } = renderWithFormContext(
      <Dropdown  {...widgetProps} useFloatingLabel={true} />
    );

    const selectElement = getByRole("combobox");
    const wrapper = container.querySelector(".dropdown-wrapper");
    expect(wrapper).not.toHaveClass("is-selected");

    fireEvent.change(selectElement, { target: { value: "Option 1" } });
    expect(wrapper).toHaveClass("is-selected");
  });

  it("doesn't show is-invalid class for valid input", () => {
    const { container } = renderWithFormContext(
      <Dropdown {...widgetProps} isInvalid={false} />
    );

    const selectElement = container.querySelector(".dropdown-select");
    expect(selectElement).not.toHaveClass("is-invalid");
  });

  it("shows is-invalid class for invalid input", () => {
    const { container } = renderWithFormContext(
      <Dropdown {...widgetProps} isInvalid={true} />
    );

    const selectElement = container.querySelector(".dropdown-select");
    expect(selectElement).toHaveClass("is-invalid");
  });


  it("renders correctly", () => {

    const { container } = renderWithFormContext(
      <Dropdown {...widgetProps} useFloatingLabel={false} />
    );

    const tree = container.firstChild;
    expect(tree).toMatchSnapshot();
  });
});
