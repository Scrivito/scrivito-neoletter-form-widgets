import * as Scrivito from "scrivito";
import { fireEvent } from "@testing-library/react";

import { FormDateWidget } from "../../../../src/Widgets/FormDateWidget/FormDateWidgetClass";
import "../../../../src/Widgets/FormDateWidget/FormDateWidgetComponent";
import PageRenderer from "../../../helpers/pageRenderer";

Scrivito.configure({ tenant: "inMemory" });

const pageRenderer = new PageRenderer();
const widgetProps = {
  title: "Choose date",
  helpText: "This is the help text.",
  required: false,
  customFieldName: "custom_date",
  dateType: "date"
};

describe("HelpText", () => {
  it("renders the help icon", () => {
    const { container } = pageRenderer.render({
      body: [new FormDateWidget(widgetProps)]
    });
    const helpIcon = container.querySelector(".bi-question-circle");
    expect(helpIcon).toBeInTheDocument();
  });

  it("displays help text on hover", async () => {
    const { getByText, container } = pageRenderer.render({
      body: [new FormDateWidget(widgetProps)]
    });
    const helpIcon = container.querySelector(".bi-question-circle")!;
    fireEvent.mouseOver(helpIcon);

    const helpText = getByText("This is the help text.");
    expect(helpText).toBeInTheDocument();
  });

  it("renders correctly", () => {
    const tree = pageRenderer.getAsJSON({
      body: [new FormDateWidget(widgetProps)]
    });
    expect(tree).toMatchSnapshot();
  });
});
