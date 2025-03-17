import * as React from "react";
import { render } from "@testing-library/react";
import { LinearScale } from "../../../../src/Widgets/FormStepContainerWidget/components/LinearScaleComponent";
import { DummyWidget } from "../../../helpers/dummyWidget";
import { Widget } from "scrivito";
import renderer from "react-test-renderer";

describe("LinearScale", () => {
  const widgetProperties = {
    linearScaleLowerLimit: "1",
    linearScaleUpperLimit: "5",
    linearScaleLowerLabel: "Lower Label",
    linearScaleUpperLabel: "Upper Label",
    required: true,
    isInvalid: false
  };

  const widget = new DummyWidget(widgetProperties) as unknown as Widget;

  it("renders LinearScale component with provided widget properties", () => {
    const { getByText, getAllByRole } = render(
      <LinearScale name="linearScaleName" isInvalid={false} widget={widget} onChange={() => { }} />
    );

    expect(getByText("Lower Label")).toBeInTheDocument();
    expect(getByText("Upper Label")).toBeInTheDocument();

    const items = getAllByRole("radio");
    expect(items).toHaveLength(5);
  });

  it("does not show is-invalid class when input is valid", () => {
    widget.update({ required: true });
    const { container } = render(
      <LinearScale name="linearScaleName" isInvalid={false} widget={widget} onChange={() => { }} />
    );

    const radios = container.querySelectorAll(".form-check-input");
    radios.forEach(radio => {
      expect(radio).not.toHaveClass("is-invalid");
    });
  });

  it("shows is-invalid class when input is invalid", () => {
    widget.update({ required: true });

    const { container } = render(
      <LinearScale name="linearScaleName" isInvalid={true} widget={widget} onChange={() => { }} />
    );

    const radios = container.querySelectorAll(".form-check-input");
    radios.forEach(radio => {
      expect(radio).toHaveClass("is-invalid");
    });
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <LinearScale
          name="linearScaleName"
          isInvalid={false}
          widget={widget}
          onChange={() => { }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
