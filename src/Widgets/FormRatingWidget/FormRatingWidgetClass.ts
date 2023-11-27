import * as Scrivito from "scrivito";

export const FormRatingWidget = Scrivito.provideWidgetClass(
  "FormRatingWidget",
  {
    attributes: {
      title: "string",
      colorType: [
        "enum",
        {
          values: ["default", "primary", "secondary", "custom"],
        },
      ],
      size: [
        "enum",
        { values: ["fa-1x", "fa-lg", "fa-2x", "fa-3x", "fa-4x", "fa-5x"] },
      ],
      icon: "string",
      customColor: "string",
      hoverEffect: "boolean",
      helpText: "html",
      customFieldName: "string",
    },
  }
);
