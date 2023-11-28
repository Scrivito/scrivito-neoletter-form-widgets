import * as Scrivito from "scrivito";

export const FormSelectWidget = Scrivito.provideWidgetClass(
  "FormSelectWidget",
  {
    attributes: {
      selectionType: [
        "enum",
        {
          values: ["radio", "dropdown", "multi"],
        },
      ],
      title: "string",
      items: "stringlist",
      customFieldName: "string",
      required: "boolean",
      helpText: "html",
    },
  },
);
