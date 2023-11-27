import * as Scrivito from "scrivito";

export const FormRatingWidget = Scrivito.provideWidgetClass(
  "FormRatingWidget",
  {
    attributes: {
      title: "string",
      helpText: "html",
      customFieldName: "string",
    },
  }
);
