import * as Scrivito from "scrivito";
import { FormConditionWidget } from "../../../src/Widgets/FormConditionWidget/FormConditionWidgetClass";
import PageRenderer from "../../helpers/pageRenderer";
import { FormDateWidget } from "../../../src/Widgets/FormDateWidget/FormDateWidgetClass";
import "../../../src/Widgets/FormConditionWidget/FormConditionWidgetComponent";
import "../../../src/Widgets/FormDateWidget/FormDateWidgetComponent";

Scrivito.configure({ tenant: "inMemory" });
// mocking getData seems to be not possible, therefore isActive will always be false!
const pageRenderer = new PageRenderer();
const widgetProps = {
  title: "select me",
  content: []
};

describe("FormConditionWidget", () => {
  it("should not show content if not if isInPlaceEditingActive is false", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(false);
    pageRenderer.render({
      body: [new FormConditionWidget(widgetProps)]
    });

    const content = document.querySelector(".conditional-content");
    expect(content).not.toBeInTheDocument();
  });

  it("should  show condition-info & content if isInPlaceEditingActive is true", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
    const dummyContent = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];
    pageRenderer.render({
      body: [new FormConditionWidget({ ...widgetProps, content: dummyContent })]
    });

    const content = document.querySelector(".conditional-content");
    const condtionInfo = document.querySelector(".condition-info");
    expect(content).toBeInTheDocument();
    expect(condtionInfo).toBeInTheDocument();
    expect(condtionInfo).toHaveTextContent("Condition: " + widgetProps.title);
  });

  it("renders correctly", () => {
    const dummyContent = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];
    const tree = pageRenderer.getAsJSON({
      body: [new FormConditionWidget({ ...widgetProps, content: dummyContent })]
    });
    expect(tree).toMatchSnapshot();
  });
});
