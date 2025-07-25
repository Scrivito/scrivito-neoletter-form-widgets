import React from "react";
import { render } from "@testing-library/react";
import { FormAttributesProvider } from "../../src/Widgets/FormStepContainerWidget/FormAttributesContext";
import { defaultFormContextAttrValues } from "./testData";

export function renderWithFormContext(ui: React.ReactElement) {
  return render(
    <FormAttributesProvider values={defaultFormContextAttrValues} >
      {ui}
    </FormAttributesProvider>

  );
}