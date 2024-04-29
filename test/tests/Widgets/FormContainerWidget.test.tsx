import * as Scrivito from "scrivito";
import { FormDateWidget } from "../../../src/Widgets/FormDateWidget/FormDateWidgetClass";
import { FormContainerWidget } from "../../../src/Widgets/LegacyFormContainerWidget/FormContainerWidgetClass";
import "../../../src/Widgets/FormDateWidget/FormDateWidgetComponent";
import "../../../src/Widgets/LegacyFormContainerWidget/FormContainerWidgetComponent";
import PageRenderer from "../../helpers/pageRenderer";

Scrivito.configure({ tenant: "inMemory" });
jest.mock(
  "../../../src/Widgets/FormStepContainerWidget/utils/lodashPolyfills",
  () => ({
    ...jest.requireActual(
      "../../../src/Widgets/FormStepContainerWidget/utils/lodashPolyfills"
    ),
    isEmpty: jest.fn(() => true)
  })
);
const pageRenderer = new PageRenderer();
const widgetProps = {
  content: [],
  formId: "123",
  failedMessage: "Failed",
  submittedMessage: "Done",
  submittingMessage: "Submitting",
  hiddenFields: []
};
describe("FormContainerWidget", () => {
  it("does not render if instanceId is empty", () => {
    pageRenderer.render({
      body: [new FormContainerWidget(widgetProps)]
    });
    const form = document.querySelector("form");
    expect(form).not.toBeInTheDocument();
    jest.resetAllMocks();
  });

  it("renders the form with content", () => {
    const content = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];
    pageRenderer.render({
      body: [new FormContainerWidget({ ...widgetProps, content: content })]
    });

    const form = document.querySelector("form");
    const dateItem = document.querySelector('input[type="date"]');
    expect(form).toBeInTheDocument();
    expect(dateItem).toBeInTheDocument();
  });
  it("renders winnie-the-pooh", () => {
    pageRenderer.render({
      body: [new FormContainerWidget(widgetProps)]
    });

    const input = document.querySelector('input[name="fax"]');
    expect(input).toBeInTheDocument();
  });

  it("renders correctly", () => {
    const content = [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ];
    const tree = pageRenderer.getAsJSON({
      body: [new FormContainerWidget({ ...widgetProps, content: content })]
    });
    expect(tree).toMatchSnapshot();
  });
});
