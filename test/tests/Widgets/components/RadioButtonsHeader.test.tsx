import * as React from "react";
import * as Scrivito from "scrivito";
import { fireEvent, render } from "@testing-library/react";
import { RadioButtonsHeader } from "../../../../src/Widgets/FormStepContainerWidget/components/ConditionalRadioButtonsHeader";
import { DummyWidget } from "../../../helpers/dummyWidget";
import renderer from "react-test-renderer";
import { ValidationProvider } from "../../../../src/FormValidation/ValidationContext";

const widget = new DummyWidget({
  title: "Select some",
  helptext: "",
  required: true,
  customFieldName: "custom_radio",
  conditions: [
    new DummyWidget({ title: "Apples" }),
    new DummyWidget({ title: "Bananas" })
  ]
}) as unknown as Scrivito.Widget;

describe("RadioButtonsHeader", () => {
  const onChangeMock = () => { };

  it("has condition-wrapper when isInPlaceEditingActive is true", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
    const { container } = render(
      <ValidationProvider>
        <RadioButtonsHeader widget={widget} onChangeSelected={onChangeMock} />
      </ValidationProvider>
    );
    expect(container.firstChild).toHaveClass("condition-wrapper");
  });

  it("renders radios based on conditions", () => {
    const { getByText } = render(
      <ValidationProvider>
        <RadioButtonsHeader widget={widget} onChangeSelected={onChangeMock} />
      </ValidationProvider>
    );

    expect(getByText("Apples")).toBeInTheDocument();
    expect(getByText("Bananas")).toBeInTheDocument();
  });

  it("triggers onChangeSelected callback", () => {
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(
      <ValidationProvider>
        <RadioButtonsHeader widget={widget} onChangeSelected={onChangeMock} />
      </ValidationProvider>
    );
    const applesRadio = getByLabelText("Apples") as HTMLInputElement;
    fireEvent.click(applesRadio);
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ValidationProvider>
          <RadioButtonsHeader widget={widget} onChangeSelected={onChangeMock} />
        </ValidationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
