import React from "react";
import { render } from "@testing-library/react";
import { Widget } from "scrivito";
import { DummyWidget } from "../../../helpers/dummyWidget";
import {
  Select,
  SelectItem
} from "../../../../src/Widgets/FormStepContainerWidget/components/SelectComponent";
import renderer from "react-test-renderer";

const widgetProps = {
  selectionType: "radio",
  title: "Select some",
  items: ["Item 1", "Item 2", "Item 3"],
  customFieldName: "custom_select",
  required: false,
  helpText: "",
  linearScaleLowerLimit: "1",
  linearScaleUpperLimit: "5",
  linearScaleLowerLabel: "lowest",
  linearScaleUpperLabel: "highest",
  clearSelectionText: "Clear",
  inlineView: false,
  navigateOnClick: false
};

const widget = new DummyWidget(widgetProps) as unknown as Widget;

describe("Select", () => {
  it("renders the Select component with radio type and required", () => {
    const { getByText, container } = render(
      <Select
        isMultiSelect={false}
        required={true}
        widget={widget}
        name="testName"
        onChange={jest.fn()}
        onClickNavigate={jest.fn()}
      />
    );

    expect(getByText("Item 1")).toBeInTheDocument();
    expect(getByText("Item 2")).toBeInTheDocument();
    expect(getByText("Item 3")).toBeInTheDocument();
    const inputs = container.querySelectorAll("input");
    inputs.forEach((radioInput) => {
      expect(radioInput).toHaveAttribute("type", "radio");
      expect(radioInput).toHaveAttribute("required");
    });

    expect(container.firstChild).toHaveClass("row");
    expect(container.firstChild).not.toHaveClass("inline");
  });

  it("renders the Select component with radio and inline view", () => {
    widget.update({ inlineView: true });
    const { container } = render(
      <Select
        isMultiSelect={false}
        required={false}
        widget={widget}
        name="testName"
        onChange={jest.fn()}
        onClickNavigate={jest.fn()}
      />
    );

    const inputs = container.querySelectorAll("input");
    inputs.forEach((radioInput) => {
      expect(radioInput).toHaveAttribute("type", "radio");
    });

    expect(container.firstChild).not.toHaveClass("row");
    expect(container.firstChild).toHaveClass("inline");
  });
  it("renders the Select component with checkboxes", () => {
    widget.update({ inlineView: false, selectionType: "multi" });
    const { container } = render(
      <Select
        isMultiSelect={true}
        required={false}
        widget={widget}
        name="testName"
        onChange={jest.fn()}
        onClickNavigate={jest.fn()}
      />
    );

    const inputs = container.querySelectorAll("input");
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("type", "checkbox");
    });

    expect(container.firstChild).toHaveClass("row");
    expect(container.firstChild).not.toHaveClass("inline");
  });

  it("renders the Select component with checkboxes and inline view", () => {
    widget.update({ inlineView: true });
    const { container } = render(
      <Select
        isMultiSelect={true}
        required={false}
        widget={widget}
        name="testName"
        onChange={jest.fn()}
        onClickNavigate={jest.fn()}
      />
    );

    const inputs = container.querySelectorAll("input");
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("type", "checkbox");
    });
    expect(container.firstChild).not.toHaveClass("row");
    expect(container.firstChild).toHaveClass("inline");
  });

  it("renders the Select component with linear scale type", () => {
    widget.update({ selectionType: "linear-scale" });

    const { getByText, container } = render(
      <Select
        isMultiSelect={false}
        required={false}
        widget={widget}
        name="testName"
        onChange={jest.fn()}
        onClickNavigate={jest.fn()}
      />
    );
    expect(getByText("lowest")).toBeInTheDocument();
    expect(getByText("highest")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("linear-scale-container");
    const inputs = container.querySelectorAll("input");
    inputs.forEach((radioInput) => {
      expect(radioInput).toHaveAttribute("type", "radio");
    });
    const labels = container.querySelectorAll("label");
    labels.forEach((label) => {
      expect(label).toHaveClass("linear-scale");
    });
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Select
          isMultiSelect={false}
          required={false}
          widget={widget}
          name="testName"
          onChange={jest.fn()}
          onClickNavigate={jest.fn()}

        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("SelectItem Component", () => {
  it("renders the SelectItem component for radio type", () => {
    const { getByText, container } = render(
      <SelectItem
        selectionType="radio"
        name="testName"
        value="Item 1"
        required={false}
        onChange={jest.fn()}
      />
    );
    const input = container.querySelector("input");
    expect(getByText("Item 1")).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "radio");
  });

  it("renders the SelectItem component for checkbox type", () => {
    const { getByText, container } = render(
      <SelectItem
        selectionType="checkbox"
        name="testName"
        value="Item 2"
        required={true}
        onChange={jest.fn()}
      />
    );
    const input = container.querySelector("input");
    expect(getByText("Item 2")).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "checkbox");
  });

  it("renders the SelectItem component for linear scale type", () => {
    const { getByText, container } = render(
      <SelectItem
        selectionType="linear-scale"
        name="testName"
        value="lowest"
        required={false}
        onChange={jest.fn()}
      />
    );

    expect(getByText("lowest")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("linear-scale");
  });

  it("should not have required for checkboxes", () => {
    const { container } = render(
      <SelectItem
        selectionType="multi"
        name="testName"
        value="lowest"
        required={true}
        onChange={jest.fn()}
      />
    );

    const input = container.querySelector("input");
    expect(input).toHaveAttribute("type", "checkbox");
    expect(input).not.toHaveAttribute("required");
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <SelectItem
          selectionType="multi"
          name="testName"
          value="lowest"
          required={true}
          onChange={jest.fn()}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
