import * as React from "react";
import * as Scrivito from "scrivito";
import { fireEvent, render } from "@testing-library/react";
import { DropdownHeader } from "../../../../src/Widgets/FormStepContainerWidget/components/ConditionalDropdownHeader";
import { DummyWidget } from "../../../helpers/dummyWidget";
import renderer from "react-test-renderer";

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
  const onChangeMock = () => {};

  it("has condition-wrapper when isInPlaceEditingActive is true", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
    const { container } = render(
      <DropdownHeader widget={widget} onChangeSelected={onChangeMock} />
    );
    expect(container.firstChild).toHaveClass("condition-wrapper");
  });

  it("renders dropdown options based on conditions", () => {
    const { getByText } = render(
      <DropdownHeader widget={widget} onChangeSelected={onChangeMock} />
    );

    expect(getByText("Apples")).toBeInTheDocument();
    expect(getByText("Bananas")).toBeInTheDocument();
  });

  it("triggers onChangeSelected callback", () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(
      <DropdownHeader widget={widget} onChangeSelected={onChangeMock} />
    );
    fireEvent.change(getByRole("combobox"));
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("renders the empty option", () => {
    render(<DropdownHeader widget={widget} onChangeSelected={onChangeMock} />);
    const emptyOption = document.querySelector("#empty-option");
    expect(emptyOption).toBeInTheDocument();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <DropdownHeader widget={widget} onChangeSelected={onChangeMock} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
