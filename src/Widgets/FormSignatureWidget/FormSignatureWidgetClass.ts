import * as Scrivito from "scrivito";

export const FormSignatureWidget = Scrivito.provideWidgetClass("FormSignatureWidget", {
  attributes: {
    title: "html",
    alignment: [
      "enum", {
        values: ["left", "center", "right"]
      }
    ],
    helpText: "html",
    customFieldName: "string",
    strokeThickness: "integer",
    strokeColor: "string",
    backgroundColor: "string",
    deleteButtonText: "string",
    deleteButtonAlignment: [
      "enum",
      {
        values: ["left", "text-center", "text-end", "block"]
      }
    ],
    buttonSize: [
      "enum",
      {
        values: ["btn-sm", "btn-md", "btn-lg"]
      }
    ],
  }
});
