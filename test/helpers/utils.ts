import { Widget } from "scrivito";
import { DummyWidget } from "./dummyWidget";

// Utility function to set up the widgets and mocked form element for prepareReviewContent.test.ts
export function setUpWidgetsAndForm(includeEmptyAnswers: boolean): Widget {
  const formElement = document.createElement("form");
  formElement.id = "formId";
  formElement.innerHTML = `
      <input type="date" name="custom_date" />
      <input type="date" name="custom_date2"  value="2023-12-31" />
      <input type="checkbox" name="custom_test" checked />
      <input type="hidden" name="custom_hidden"  value="i am hidden but included" class="show-in-review" />
      <input type="hidden" name="custom_hidden_ignored" value="i am not included" />
    `;

  document.getElementById = jest.fn().mockReturnValue(formElement);

  const stepWidget1 = new DummyWidget(
    {
      type: "custom",
      customFieldName: "custom_test",
      label: "Label 1",
      text: "Text 1"
    },
    "FormCheckboxWidget"
  );
  const stepWidget2 = new DummyWidget(
    { customFieldName: "custom_date", title: "date", dateType: "date" },
    "FormDateWidget"
  );
  const stepWidget3 = new DummyWidget(
    { customFieldName: "custom_date2", title: "second date", dateType: "date" },
    "FormDateWidget"
  );
  const stepWidget4 = new DummyWidget(
    {
      customFieldName: "custom_hidden",
      hiddenValue: "i am hidden but included",
      title: "hidden input"
    },
    "FormHiddenFieldWidget"
  );
  const stepWidget5 = new DummyWidget(
    {
      customFieldName: "custom_hidden_ignored",
      hiddenValue: "i am not included"
    },
    "FormHiddenFieldWidget"
  );

  const items = [stepWidget1, stepWidget2, stepWidget5];
  const items2 = [stepWidget3, stepWidget4];

  const step1 = new DummyWidget({ stepNumber: 1, items: items });
  const step2 = new DummyWidget({ stepNumber: 2, items: items2 });
  const mainWidget = new DummyWidget({
    formId: "formId",
    formType: "multi-step",
    steps: [step1, step2],
    includeEmptyAnswers: includeEmptyAnswers
  }) as unknown as Widget;

  return mainWidget;
}
