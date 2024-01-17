import * as Scrivito from "scrivito";
import { FormConditionWidget } from "../../../src/Widgets/FormConditionWidget/FormConditionWidgetClass";
import PageRenderer from "../../helpers/pageRenderer";
import { FormDateWidget } from "../../../src/Widgets/FormDateWidget/FormDateWidgetClass";
import { FormConditionalContainerWidget } from "../../../src/Widgets/FormConditionalContainerWidget/FormConditionalContainerWidgetClass";
import "../../../src/Widgets/FormConditionalContainerWidget/FormConditionalContainerWidgetComponent";
import "../../../src/Widgets/FormConditionWidget/FormConditionWidgetComponent";
import "../../../src/Widgets/FormDateWidget/FormDateWidgetComponent";
import { fireEvent } from "@testing-library/react";

Scrivito.configure({ tenant: "inMemory" });

const pageRenderer = new PageRenderer();
const conditions = [
  new FormConditionWidget({
    title: "select me",
    content: [
      new FormDateWidget({
        customFieldName: "custom_date",
        title: "date",
        dateType: "date"
      })
    ]
  }),
  new FormConditionWidget({
    title: "i am better :)",
    content: [
      new FormDateWidget({
        customFieldName: "custom_date2",
        title: "date",
        dateType: "date"
      })
    ]
  })
];
const widgetProps = {
  headerType: "radio",
  title: "Select something",
  customFieldName: "custom_test",
  conditions: conditions,
  required: false,
  helpText: ""
};

describe("FormConditionalContainerWidget", () => {
  it("should show header-info & condition-info if isInPlaceEditingActive is true", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
    pageRenderer.render({
      body: [new FormConditionalContainerWidget(widgetProps)]
    });
    const condtionalContentInfo = document.querySelector(
      ".conditional-content"
    );
    const condtionalHeaderInfo = document.querySelector(".header-info");
    expect(condtionalContentInfo).toBeInTheDocument();
    expect(condtionalHeaderInfo).toBeInTheDocument();
  });

  it("should have radios as header", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(false);

    pageRenderer.render({
      body: [
        new FormConditionalContainerWidget({
          ...widgetProps,
          conditions: [
            // reassign is necessary, otherwise conditions will be empty
            new FormConditionWidget({
              title: "select me",
              content: [
                new FormDateWidget({
                  customFieldName: "custom_date",
                  title: "date",
                  dateType: "date"
                })
              ]
            }),
            new FormConditionWidget({
              title: "i am better :)",
              content: [
                new FormDateWidget({
                  customFieldName: "custom_date2",
                  title: "date",
                  dateType: "date"
                })
              ]
            })
          ]
        })
      ]
    });

    const headerInputs = document.querySelectorAll(".form-check-input");
    expect(headerInputs).toHaveLength(2);
    headerInputs.forEach(input => {
      expect(input).toHaveAttribute("type", "radio");
    });
  });
  it("should have dropdown as header", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(false);

    pageRenderer.render({
      body: [
        new FormConditionalContainerWidget({
          ...widgetProps,
          headerType: "dropdown",
          conditions: [
            // reassign is necessary, otherwise conditions will be empty
            new FormConditionWidget({
              title: "select me",
              content: [
                new FormDateWidget({
                  customFieldName: "custom_date",
                  title: "date",
                  dateType: "date"
                })
              ]
            }),
            new FormConditionWidget({
              title: "i am better :)",
              content: [
                new FormDateWidget({
                  customFieldName: "custom_date2",
                  title: "date",
                  dateType: "date"
                })
              ]
            })
          ]
        })
      ]
    });
    const select = document.querySelector("select");
    const dropdownOptions = document.querySelectorAll("option");
    expect(select).toBeInTheDocument();
    expect(dropdownOptions).toHaveLength(3);
  });

  it("should select the second option in the dropdown and show the corresponding condition for it", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(false);

    const { container } = pageRenderer.render({
      body: [
        new FormConditionalContainerWidget({
          ...widgetProps,
          headerType: "dropdown",
          conditions: [
            new FormConditionWidget({
              title: "select me",
              content: [
                new FormDateWidget({
                  customFieldName: "custom_date_first_condition",
                  title: "date",
                  dateType: "date"
                })
              ]
            }),
            new FormConditionWidget({
              title: "i am better :)",
              content: [
                new FormDateWidget({
                  customFieldName: "custom_date_second_condtion",
                  title: "date",
                  dateType: "date"
                })
              ]
            })
          ]
        })
      ]
    });

    const select = container.querySelector("select")!;
    // Trigger a change event with the second option as selected
    select.value = "i am better :)";
    fireEvent.change(select);

    expect(select.value).toBe("i am better :)");
    const unSelectedCondition = container.querySelector(
      'input[name="custom_date_first_condtion"]'
    );
    const selectedCondition = container.querySelector(
      'input[name="custom_date_second_condtion"]'
    );
    expect(unSelectedCondition).not.toBeInTheDocument();
    expect(selectedCondition).toBeInTheDocument();
  });

  it("renders correctly", () => {
    const tree = pageRenderer.getAsJSON({
      body: [
        new FormConditionalContainerWidget({
          ...widgetProps,
          conditions: [
            // reassign is necessary, otherwise conditions will be empty
            new FormConditionWidget({
              title: "select me",
              content: [
                new FormDateWidget({
                  customFieldName: "custom_date",
                  title: "date",
                  dateType: "date"
                })
              ]
            }),
            new FormConditionWidget({
              title: "i am better :)",
              content: [
                new FormDateWidget({
                  customFieldName: "custom_date2",
                  title: "date",
                  dateType: "date"
                })
              ]
            })
          ]
        })
      ]
    });
    expect(tree).toMatchSnapshot();
  });
});
