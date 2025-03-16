import * as Scrivito from "scrivito";
export const FormCheckboxWidget = Scrivito.provideWidgetClass(
  "FormCheckboxWidget",
  {
    attributes: {
      type: [
        "enum",
        {
          values: ["custom", "subscription", "accept_terms"]
        }
      ],
      customFieldName: "string",
      label: "html",
      required: "boolean",
      helpText: "html",
      validationText: "string"
    }
  }
);
