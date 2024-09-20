import * as Scrivito from "scrivito";
import { FormStepWidget } from "../../../src/Widgets/FormStepWidget/FormStepWidgetClass";
import { FormDateWidget } from "../../../src/Widgets/FormDateWidget/FormDateWidgetClass";
import "../../../src/Widgets/FormStepWidget/FormStepWidgetComponent";
import "../../../src/Widgets/FormDateWidget/FormDateWidgetComponent";
import PageRenderer from "../../helpers/pageRenderer";

Scrivito.configure({ tenant: "inMemory" });

const pageRenderer = new PageRenderer();
const widgetProps = {
  items: [],
  stepNumber: 1,
  isSingleStep: true
};

describe("FormStepWidget", () => {

  it("renders without editing preview border", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(false);
    const items = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];
    pageRenderer.render({
      body: [new FormStepWidget({ ...widgetProps, items: items })]
    });

    const step = document.querySelector("div[data-step-number]");
    expect(step).not.toHaveClass("step-border");
  });

  it("renders with editing preview border", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
    const items = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];
    pageRenderer.render({
      body: [new FormStepWidget({ ...widgetProps, items: items })]
    });
    const step = document.querySelector("div[data-step-number]");
    expect(step).toHaveClass("step-border");
  });
  it("renders correctly", () => {
    const items = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];

    const tree = pageRenderer.getAsJSON({
      body: [new FormStepWidget({ ...widgetProps, items: items })]
    });
    expect(tree).toMatchSnapshot();
  });
});
