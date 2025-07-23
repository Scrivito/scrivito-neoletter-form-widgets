import * as Scrivito from "scrivito";

export const FormDateWidget = Scrivito.provideWidgetClass("FormDateWidget", {
  attributes: {
    title: "html",
    alignment: [
      "enum", {
        values: ["left", "center", "right"]
      }
    ],
    helpText: "html",
    required: "boolean",
    customFieldName: "string",
    dateType: [
      "enum",
      {
        values: ["date", "datetime-local"]
      }
    ],
    validationText: "string"
  }
});
