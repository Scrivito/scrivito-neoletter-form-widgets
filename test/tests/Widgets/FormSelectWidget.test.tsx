import * as Scrivito from "scrivito";
import { screen, fireEvent } from "@testing-library/react";
import { FormSelectWidget } from "../../../src/Widgets/FormSelectWidget/FormSelectWidgetClass";
import "../../../src/Widgets/FormSelectWidget/FormSelectWidgetComponent";
import PageRenderer from "../../helpers/pageRenderer";

Scrivito.configure({ tenant: "inMemory" });

const pageRenderer = new PageRenderer();

const widgetProps = {
  title: "Test Select Title",
  helpText: "Sample help text",
  selectionType: "dropdown",
  required: true,
  items: ["Item 1", "Item 2", "Item 3"],
  clearSelectionButtonText: "Clear Selection",
  linearScaleLowerLimit: "1",
  linearScaleUpperLimit: "5",
  linearScaleLowerLabel: "low",
  linearScaleUpperLabel: "high",
  inlineView: false,
  useFloatingLabel: false,
  showClearSelectionButton: true
};

describe("FormSelectWidget", () => {
  it("renders FormSelectWidget as a dropdown", () => {
    pageRenderer.render({
      body: [new FormSelectWidget(widgetProps)]
    });

    const title = screen.getByText(widgetProps.title);
    const dropdown = document.querySelector(".dropdown-select");

    expect(title).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveAttribute("required");
  });

  it("renders FormSelectWidget as a select list", () => {
    const selectProps = { ...widgetProps, selectionType: "radio" };

    pageRenderer.render({
      body: [new FormSelectWidget(selectProps)]
    });

    const title = screen.getByText(selectProps.title);
    const selectTitle = document.querySelector(".select-title");
    const radioInputs = document.querySelectorAll(".form-check-input");

    expect(title).toBeInTheDocument();
    expect(selectTitle).toBeInTheDocument();
    expect(radioInputs.length).toBe(selectProps.items.length);

    radioInputs.forEach((radioInput) => {
      expect(radioInput).toHaveAttribute("required");
    });
  });

  it("handles selection change in the select list", () => {
    const selectProps = { ...widgetProps, selectionType: "radio" };

    pageRenderer.render({
      body: [new FormSelectWidget(selectProps)]
    });

    const radioInput = document.querySelector(
      '[type="radio"][value="Item 2"]'
    )!;
    fireEvent.change(radioInput, { target: { checked: true } });

    expect(radioInput).toBeInTheDocument();
    expect(radioInput).toBeChecked();
  });

  it("renders FormSelectWidget with checkboxes and inlineView", () => {
    const selectProps = {
      ...widgetProps,
      inlineView: true,
      selectionType: "multi",
      required: false
    };

    pageRenderer.render({
      body: [new FormSelectWidget(selectProps)]
    });

    const title = screen.getByText(selectProps.title);
    const selectTitle = document.querySelector(".select-title");
    const checkboxes = document.querySelectorAll(".form-check-input");
    const selectContainer = document.querySelector(".inline")!;

    expect(title).toBeInTheDocument();
    expect(selectTitle).toBeInTheDocument();
    expect(checkboxes.length).toBe(selectProps.items.length);

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toHaveAttribute("type", "checkbox");
      expect(checkbox).not.toHaveAttribute("required");
    });

    expect(selectContainer).toBeInTheDocument();
    expect(selectContainer.classList).toContain("inline");
  });

  it("renders FormSelectWidget with linear-scale selection", () => {
    const selectProps = {
      ...widgetProps,
      selectionType: "linear-scale"
    };

    pageRenderer.render({
      body: [new FormSelectWidget(selectProps)]
    });

    const linearScaleContainer = document.querySelector(
      ".linear-scale-container"
    );
    const lowerScaleLabel = screen.getByText(selectProps.linearScaleLowerLabel);
    const upperScaleLabel = screen.getByText(selectProps.linearScaleUpperLabel);
    const inputRange = document.querySelectorAll(".form-check-input");

    expect(linearScaleContainer).toBeInTheDocument();
    expect(lowerScaleLabel).toBeInTheDocument();
    expect(upperScaleLabel).toBeInTheDocument();
    expect(inputRange).toHaveLength(5);

    inputRange.forEach((input) => {
      expect(input).toHaveAttribute("required");
      expect(input).toHaveAttribute("type", "radio");
    });
  });

  it("renders correctly", () => {
    const tree = pageRenderer.getAsJSON({
      body: [new FormSelectWidget(widgetProps)]
    });
    expect(tree).toMatchSnapshot();
  });
});
