import * as Scrivito from "scrivito";
import { defaultInputTypes } from "../FormStepContainerWidget/utils/formConstants";

export const FormInputFieldWidget = Scrivito.provideWidgetClass(
  "FormInputFieldWidget",
  {
    attributes: {
      label: "html",
      placeholder: "string",
      required: "boolean",
      helpText: "html",
      type: [
        "enum",
        {
          values: [
            ...defaultInputTypes,
            "custom"
          ]
        }
      ],
      customType: ["enum", { values: ["single_line", "multi_line"] }],
      customFieldName: "string",
      useFloatingLabel: "boolean",
      useUserCredentials: "boolean",
      validationText: "string"
    }
  }
);
