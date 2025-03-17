import * as React from "react";
import * as Scrivito from "scrivito";
import { fireEvent, render } from "@testing-library/react";
import { DropdownHeader } from "../../../../src/Widgets/FormStepContainerWidget/components/ConditionalDropdownHeader";
import { DummyWidget } from "../../../helpers/dummyWidget";
import renderer from "react-test-renderer";
import { ValidationProvider } from "../../../../src/FormValidation/ValidationContext";

const widget = new DummyWidget({
  title: "Select from dropdown",
  helptext: "Help me",
  required: true,
  customFieldName: "custom_dropdown",
  conditions: [
    new DummyWidget({ title: "Apples" }),
    new DummyWidget({ title: "Bananas" })
  ]
}) as unknown as Scrivito.Widget;

describe("DropdownHeader", () => {
  const onChangeMock = () => { };

  it("has condition-wrapper when isInPlaceEditingActive is true", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
    const { container } = render(
      <ValidationProvider>
        <DropdownHeader widget={widget} onChangeSelected={onChangeMock} />
      </ValidationProvider>
    );
    expect(container.firstChild).toHaveClass("condition-wrapper");
  });

  it("renders dropdown options based on conditions", () => {
    const { getByText } = render(
      <ValidationProvider>
        <DropdownHeader widget={widget} onChangeSelected={onChangeMock} />
      </ValidationProvider>
    );

    expect(getByText("Apples")).toBeInTheDocument();
    expect(getByText("Bananas")).toBeInTheDocument();
  });

  it("triggers onChangeSelected callback", () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(
      <ValidationProvider>
        <DropdownHeader widget={widget} onChangeSelected={onChangeMock} />
      </ValidationProvider>
    );
    fireEvent.change(getByRole("combobox"));
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("renders the empty option", () => {
    render(
      <ValidationProvider>
        <DropdownHeader widget={widget} onChangeSelected={onChangeMock} />
      </ValidationProvider>
    );
    const emptyOption = document.querySelector("#empty-option");
    expect(emptyOption).toBeInTheDocument();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ValidationProvider>
          <DropdownHeader widget={widget} onChangeSelected={onChangeMock} />
        </ValidationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
