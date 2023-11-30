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
        { values: ["bi-1x", "bi-default", "bi-2x", "bi-3x", "bi-4x", "bi-5x"] },
      ],
      icon: "string",
      customColor: "string",
      hoverEffect: "boolean",
      helpText: "html",
      customFieldName: "string",
    },
  },
);
