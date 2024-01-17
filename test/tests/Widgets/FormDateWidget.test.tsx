import * as Scrivito from "scrivito";
import { screen } from "@testing-library/react";
import { FormDateWidget } from "../../../src/Widgets/FormDateWidget/FormDateWidgetClass";
import "../../../src/Widgets/FormDateWidget/FormDateWidgetComponent";
import PageRenderer from "../../helpers/pageRenderer";

Scrivito.configure({ tenant: "inMemory" });

const pageRenderer = new PageRenderer();

const widgetProps = {
  title: "Test Date",
  required: true,
  helpText: "This is a test help text",
  dateType: "date",
  customFieldName: "custom_test"
};
describe("FormDateWidget", () => {
  it("displays Mandatory component and HelpText", () => {
    pageRenderer.render({
      body: [new FormDateWidget(widgetProps)]
    });

    const mandatoryText = screen.getByText("*", {
      selector: ".text-mandatory"
    });
    const helpTextElement = document.querySelector("i");
    expect(mandatoryText).toBeInTheDocument();
    expect(helpTextElement).toBeInTheDocument();
  });

  it("renders input fields correctly", () => {
    pageRenderer.render({
      body: [new FormDateWidget(widgetProps)]
    });

    const hiddenInput = document.querySelector('[type="hidden"]')!;
    expect(hiddenInput).toHaveAttribute("name", widgetProps.customFieldName);
    expect(hiddenInput).toHaveClass("show-in-review");
  });

  it("renders correctly", () => {
    const tree = pageRenderer.getAsJSON({
      body: [new FormDateWidget(widgetProps)]
    });
    expect(tree).toMatchSnapshot();
  });
});
