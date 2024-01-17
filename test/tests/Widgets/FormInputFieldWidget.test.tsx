import { screen } from "@testing-library/react";
import * as Scrivito from "scrivito";
import { FormInputFieldWidget } from "../../../src/Widgets/FormInputFieldWidget/FormInputFieldWidgetClass";
import "../../../src/Widgets/FormInputFieldWidget/FormInputFieldWidgetComponent";
import PageRenderer from "../../helpers/pageRenderer";

Scrivito.configure({ tenant: "inMemory" });

const pageRenderer = new PageRenderer();

const widgetProps = {
  label: "Test Label",
  placeholder: "Test placeholder",
  required: true,
  helpText: "Sample help text",
  type: "custom",
  customType: "single_line",
  customFieldName: "custom_test"
};
describe("FormInputFieldWidget Component", () => {
  it("renders input field with custom type & all attributes filled", () => {
    pageRenderer.render({
      body: [new FormInputFieldWidget(widgetProps)]
    });

    const label = screen.getByText(widgetProps.label);
    const mandatoryText = document.querySelector(".text-mandatory");
    const helpTextElement = document.querySelector("i");
    const inputElement = screen.getByPlaceholderText("Test placeholder");

    expect(label).toBeInTheDocument();
    expect(mandatoryText).toBeInTheDocument();
    expect(helpTextElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("name", "custom_test");
    expect(inputElement).toHaveAttribute("maxLength", "250");
    expect(inputElement).toHaveAttribute("required");
  });

  it("renders input field with email type, not required & no helptext", () => {
    pageRenderer.render({
      body: [
        new FormInputFieldWidget({
          ...widgetProps,
          type: "email",
          required: false,
          helpText: ""
        })
      ]
    });

    const label = screen.getByText(widgetProps.label);
    const mandatoryText = document.querySelector(".text-mandatory");
    const helpTextElement = document.querySelector("i");
    const inputElement = screen.getByPlaceholderText("Test placeholder");

    expect(label).toBeInTheDocument();
    expect(mandatoryText).not.toBeInTheDocument();
    expect(helpTextElement).not.toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "email");
    expect(inputElement).toHaveAttribute("maxLength", "120");
    expect(inputElement).not.toHaveAttribute("required");
  });

  it("renders input field with telephone type, required & with help text", () => {
    pageRenderer.render({
      body: [
        new FormInputFieldWidget({
          ...widgetProps,
          type: "phone_number",
          required: true,
          placeholder: "Another Test placeholder"
        })
      ]
    });
    const label = screen.getByText(widgetProps.label);
    const mandatoryText = document.querySelector(".text-mandatory");
    const helpTextElement = document.querySelector("i");
    const inputElement = screen.getByPlaceholderText(
      "Another Test placeholder"
    );

    expect(label).toBeInTheDocument();
    expect(mandatoryText).toBeInTheDocument();
    expect(helpTextElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "tel");
    expect(inputElement).toHaveAttribute("maxLength", "50");
    expect(inputElement).toHaveAttribute("required");
  });

  it("renders correctly", () => {
    const tree = pageRenderer.getAsJSON({
      body: [new FormInputFieldWidget(widgetProps)]
    });
    expect(tree).toMatchSnapshot();
  });
});
