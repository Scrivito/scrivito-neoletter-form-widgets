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
    required: true
  };

  const widget = new DummyWidget(widgetProperties) as unknown as Widget;

  it("renders LinearScale component with provided widget properties", () => {
    const { getByText, getAllByRole } = render(
      <LinearScale name="linearScaleName" widget={widget} onChange={() => {}} />
    );

    expect(getByText("Lower Label")).toBeInTheDocument();
    expect(getByText("Upper Label")).toBeInTheDocument();

    const items = getAllByRole("radio");
    expect(items).toHaveLength(5);

    items.forEach((item) => {
      expect(item).toHaveAttribute("required");
    });
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <LinearScale
          name="linearScaleName"
          widget={widget}
          onChange={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
