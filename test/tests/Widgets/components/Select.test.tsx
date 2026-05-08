import React from "react";
import { fireEvent, render } from "@testing-library/react";
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
  navigateOnClick: false,
  updateRankingNumbers: false
};

const widget = new DummyWidget(widgetProps) as unknown as Widget;

describe("Select", () => {
  it("renders the Select component with radio type", () => {
    const { getByText, container } = render(
      <Select
        isMultiSelect={false}
        required={false}
        isInvalid={false}
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
        isInvalid={false}
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
        isInvalid={false}
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
        isInvalid={false}
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

  it("shows is-invalid class for required checkbox groups when invalid", () => {
    widget.update({ inlineView: false, selectionType: "multi" });

    const { container } = render(
      <Select
        isMultiSelect={true}
        required={true}
        isInvalid={true}
        widget={widget}
        name="testName"
        onChange={jest.fn()}
        onClickNavigate={jest.fn()}
      />
    );

    const inputs = container.querySelectorAll("input");
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("type", "checkbox");
      expect(input).toHaveClass("is-invalid");
      expect(input).not.toHaveAttribute("required");
    });
  });

  it("does not show is-invalid class for required checkbox groups when valid", () => {
    widget.update({ inlineView: false, selectionType: "multi" });

    const { container } = render(
      <Select
        isMultiSelect={true}
        required={true}
        isInvalid={false}
        widget={widget}
        name="testName"
        onChange={jest.fn()}
        onClickNavigate={jest.fn()}
      />
    );

    const inputs = container.querySelectorAll("input");
    inputs.forEach((input) => {
      expect(input).not.toHaveClass("is-invalid");
      expect(input).not.toHaveAttribute("required");
    });
  });

  it("renders the Select component with linear scale type", () => {
    widget.update({ selectionType: "linear-scale" });

    const { getByText, container } = render(
      <Select
        isMultiSelect={false}
        required={false}
        isInvalid={false}
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

  it("renders the Select component with ranking type", () => {
    widget.update({ selectionType: "ranking" });

    const { getByText, container } = render(
      <Select
        isMultiSelect={false}
        required={false}
        isInvalid={false}
        widget={widget}
        name="testName"
        onChange={jest.fn()}
        onRankingChange={jest.fn()}
        onClickNavigate={jest.fn()}
      />
    );

    expect(container.querySelector(".ranking-select")).toBeInTheDocument();
    expect(container.querySelectorAll(".ranking-item")).toHaveLength(3);
    expect(getByText("Item 1")).toBeInTheDocument();
    expect(getByText("Item 2")).toBeInTheDocument();
    expect(getByText("Item 3")).toBeInTheDocument();

    const hiddenInput = container.querySelector("input");
    expect(hiddenInput).toHaveAttribute("type", "hidden");
    expect(hiddenInput).toHaveAttribute("name", "testName");
    expect(hiddenInput).toHaveValue("Item 1, Item 2, Item 3");
  });

  it("updates the ranking order with keyboard controls", () => {
    widget.update({ selectionType: "ranking", updateRankingNumbers: false });
    const onRankingChange = jest.fn();

    const { container } = render(
      <Select
        isMultiSelect={false}
        required={false}
        isInvalid={false}
        widget={widget}
        name="testName"
        onChange={jest.fn()}
        onRankingChange={onRankingChange}
        onClickNavigate={jest.fn()}
      />
    );

    const secondItem = container.querySelectorAll(".ranking-item")[1];
    fireEvent.keyDown(secondItem, { key: "ArrowUp" });

    expect(container.querySelector("input")).toHaveValue("Item 2, Item 1, Item 3");
    expect(onRankingChange).toHaveBeenCalledWith("Item 2, Item 1, Item 3");
    expect(Array.from(container.querySelectorAll(".ranking-position")).map((position) => position.textContent)).toEqual(["2", "1", "3"]);
  });

  it("updates ranking numbers when configured", () => {
    widget.update({ selectionType: "ranking", updateRankingNumbers: true });

    const { container } = render(
      <Select
        isMultiSelect={false}
        required={false}
        isInvalid={false}
        widget={widget}
        name="testName"
        onChange={jest.fn()}
        onRankingChange={jest.fn()}
        onClickNavigate={jest.fn()}
      />
    );

    const secondItem = container.querySelectorAll(".ranking-item")[1];
    fireEvent.keyDown(secondItem, { key: "ArrowUp" });

    expect(container.querySelector("input")).toHaveValue("Item 2, Item 1, Item 3");
    expect(Array.from(container.querySelectorAll(".ranking-position")).map((position) => position.textContent)).toEqual(["1", "2", "3"]);
  });

  it("updates the ranking order with pointer drag controls", () => {
    widget.update({ selectionType: "ranking", updateRankingNumbers: false });
    const onRankingChange = jest.fn();

    const { container } = render(
      <Select
        isMultiSelect={false}
        required={false}
        isInvalid={false}
        widget={widget}
        name="testName"
        onChange={jest.fn()}
        onRankingChange={onRankingChange}
        onClickNavigate={jest.fn()}
      />
    );

    const rankingItems = Array.from(container.querySelectorAll(".ranking-item")) as HTMLElement[];
    rankingItems.forEach((item, index) => {
      item.setPointerCapture = jest.fn();
      item.releasePointerCapture = jest.fn();
      item.hasPointerCapture = jest.fn(() => true);
      item.getBoundingClientRect = jest.fn(() => ({
        bottom: index * 50 + 40,
        height: 40,
        left: 0,
        right: 300,
        top: index * 50,
        width: 300,
        x: 0,
        y: index * 50,
        toJSON: jest.fn()
      }));
    });

    fireEvent.pointerDown(rankingItems[1], { button: 0, clientX: 10, clientY: 60, pointerId: 1 });

    const activeItem = container.querySelectorAll(".ranking-item")[1] as HTMLElement;
    activeItem.releasePointerCapture = jest.fn();
    activeItem.hasPointerCapture = jest.fn(() => true);
    fireEvent.pointerMove(activeItem, { clientX: 10, clientY: 150, pointerId: 1 });
    fireEvent.pointerUp(activeItem, { clientX: 10, clientY: 150, pointerId: 1 });

    expect(container.querySelector("input")).toHaveValue("Item 1, Item 3, Item 2");
    expect(onRankingChange).toHaveBeenCalledWith("Item 1, Item 3, Item 2");
  });

  it("does not show is-invalid class when linear scale input is valid", () => {
    widget.update({ selectionType: "linear-scale", required: true });

    const { container } = render(
      <Select
        isMultiSelect={false}
        required={true}
        isInvalid={false}
        widget={widget}
        name="testName"
        onChange={jest.fn()}
        onClickNavigate={jest.fn()}
      />
    );

    const inputs = container.querySelectorAll("input");
    inputs.forEach((radioInput) => {
      expect(radioInput).not.toHaveClass("is-invalid");
    });
  });

  it("shows is-invalid class when linear scale input is invalid", () => {
    widget.update({ selectionType: "linear-scale", required: true });

    const { container } = render(
      <Select
        isMultiSelect={false}
        required={true}
        isInvalid={true}
        widget={widget}
        name="testName"
        onChange={jest.fn()}
        onClickNavigate={jest.fn()}
      />
    );
    const inputs = container.querySelectorAll("input");
    inputs.forEach((radioInput) => {
      expect(radioInput).toHaveClass("is-invalid");
    });
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Select
          isMultiSelect={false}
          required={false}
          isInvalid={false}
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
        isInvalid={false}
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
        required={false}
        isInvalid={false}
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
        isInvalid={false}
        onChange={jest.fn()}
      />
    );

    expect(getByText("lowest")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("linear-scale");
  });


  it("renders correctly", () => {
    const tree = renderer
      .create(
        <SelectItem
          selectionType="multi"
          name="testName"
          value="lowest"
          required={false}
          isInvalid={false}
          onChange={jest.fn()}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
