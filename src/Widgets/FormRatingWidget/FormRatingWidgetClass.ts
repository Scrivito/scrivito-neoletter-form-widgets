import * as Scrivito from "scrivito";

export const FormRatingWidget = Scrivito.provideWidgetClass(
  "FormRatingWidget",
  {
    attributes: {
      title: "html",
      alignment: [
        "enum", {
          values: ["left", "center", "right"]
        }
      ],
      colorType: [
        "enum",
        {
          values: ["default", "primary", "secondary", "custom"]
        }
      ],
      size: [
        "enum",
        { values: ["bs-icon-1x", "bs-icon-default", "bs-icon-2x", "bs-icon-3x", "bs-icon-4x", "bs-icon-5x"] }
      ],
      icon: "string",
      customColor: "string",
      hoverEffect: "boolean",
      helpText: "html",
      customFieldName: "string"
    }
  }
);
