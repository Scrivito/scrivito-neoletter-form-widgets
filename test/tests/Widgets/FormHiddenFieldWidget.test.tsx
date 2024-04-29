import * as Scrivito from "scrivito";
import { FormHiddenFieldWidget } from "../../../src/Widgets/FormHiddenFieldWidget/FormHiddenFieldWidgetClass";
import PageRenderer from "../../helpers/pageRenderer";
import "../../../src/Widgets/FormHiddenFieldWidget/FormHiddenFieldWidgetComponent";

Scrivito.configure({ tenant: "inMemory" });

const pageRenderer = new PageRenderer();

const widgetProps = {
  customFieldName: "custom_hidden",
  hiddenValue: "hidden",
  type: "custom"
};
describe("FormHiddenFieldWidget", () => {
  it("renders null when name is empty", () => {
    pageRenderer.render({
      body: [new FormHiddenFieldWidget({ ...widgetProps, customFieldName: "" })]
    });
    const hiddenInput = document.querySelector('[type="hidden"]')!;
    expect(hiddenInput).not.toBeInTheDocument();
  });

  it("renders input field when name is not empty", () => {
    pageRenderer.render({
      body: [new FormHiddenFieldWidget(widgetProps)]
    });
    const hiddenInput = document.querySelector('[type="hidden"]')!;
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).toHaveAttribute("value", "hidden");
  });

  it("renders correctly", () => {
    const tree = pageRenderer.getAsJSON({
      body: [new FormHiddenFieldWidget(widgetProps)]
    });
    expect(tree).toMatchSnapshot();
  });
});
