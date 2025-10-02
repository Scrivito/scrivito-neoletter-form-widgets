import React from "react";
import { render } from "@testing-library/react";
import { FormAttributesProvider } from "../../src/Widgets/FormStepContainerWidget/FormAttributesContext";
import { defaultFormContextAttrValues } from "./testData";
import type { FormWidgetAttributes } from "../../types/types";

export function renderWithFormContext(
  ui: React.ReactElement,
  overrides: Partial<FormWidgetAttributes> = {}
) {
  const values: FormWidgetAttributes = {
    ...defaultFormContextAttrValues,
    ...overrides,
  } as FormWidgetAttributes;

  return render(
    <FormAttributesProvider values={values}>
      {ui}
    </FormAttributesProvider>
  );
}
