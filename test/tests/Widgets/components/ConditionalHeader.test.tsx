import React from "react";
import * as Scrivito from "scrivito";
import { render } from "@testing-library/react";
import { ConditionalHeader } from "../../../../src/Widgets/FormStepContainerWidget/components/ConditionalHeaderComponent";
import { DummyWidget } from "../../../helpers/dummyWidget";
import renderer from "react-test-renderer";
import { ValidationProvider } from "../../../../src/FormValidation/ValidationContext";

const onChangeSelectedMock = jest.fn();
const widget = new DummyWidget({
  headerType: "dropdown",
  title: "Select some",
  helptext: "",
  required: true,
  customFieldName: "custom_header",
  conditions: [
    new DummyWidget({ title: "Apples" }),
    new DummyWidget({ title: "Bananas" })
  ]
}) as unknown as Scrivito.Widget;

describe("ConditionalHeader", () => {
  it("renders header-info when isInPlaceEditingActive is true", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
    const { queryByText } = render(
      <ValidationProvider>
        <ConditionalHeader
          widget={widget}
          onChangeSelected={onChangeSelectedMock}
        />
      </ValidationProvider>
    );

    expect(queryByText("Conditional Header")).toBeInTheDocument();
  });

  it('renders DropdownHeader when headerType is "dropdown"', () => {
    render(
      <ValidationProvider>
        <ConditionalHeader
          widget={widget}
          onChangeSelected={onChangeSelectedMock}
        />
      </ValidationProvider>
    );

    const options = document.querySelectorAll("option");
    options.forEach(option => {
      expect(option).toBeInTheDocument();
    });
    expect(options).toHaveLength(3);
  });

  it('renders RadioButtonsHeader when headerType is not "dropdown"', () => {
    widget.update({ headerType: "radio" });
    render(
      <ValidationProvider>
        <ConditionalHeader
          widget={widget}
          onChangeSelected={onChangeSelectedMock}
        />
      </ValidationProvider>
    );

    const inputs = document.querySelectorAll(".form-check-input");
    inputs.forEach(input => {
      expect(input).toHaveAttribute("type", "radio");
    });
    expect(inputs).toHaveLength(2);
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ValidationProvider>
          <ConditionalHeader
            widget={widget}
            onChangeSelected={onChangeSelectedMock}
          />
        </ValidationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
