import * as React from "react";
import { render } from "@testing-library/react";
import { LinearScale } from "../../../../src/Widgets/FormStepContainerWidget/components/LinearScaleComponent";
import { DummyWidget } from "../../../helpers/dummyWidget";
import { Widget } from "scrivito";
import renderer from "react-test-renderer";

describe("LinearScale", () => {
  const widgetProperties = {
    linearScaleLowerLimit: "0",
    linearScaleUpperLimit: "5",
    linearScaleLowerLabel: "Lower Label",
    linearScaleUpperLabel: "Upper Label",
    required: true
  };

  const widget = new DummyWidget(widgetProperties) as unknown as Widget;

  it("renders LinearScale component with provided widget properties", () => {
    const lodashEsModule = require("lodash-es");
    lodashEsModule.range.mockReturnValue([1, 2, 3, 4, 5]);
    lodashEsModule.map.mockImplementation(
      (array: number[], callback: (value: number, index: number) => string) =>
        array.map(callback)
    );

    const { getByText, getAllByRole } = render(
      <LinearScale name="linearScaleName" widget={widget} onChange={() => {}} />
    );

    expect(getByText("Lower Label")).toBeInTheDocument();
    expect(getByText("Upper Label")).toBeInTheDocument();

    const items = getAllByRole("radio");
    expect(items).toHaveLength(5);

    items.forEach(item => {
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
