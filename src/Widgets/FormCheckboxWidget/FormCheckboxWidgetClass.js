import * as Scrivito from "scrivito";
import { getScrivitoFormWidgetConfig } from "../../config/scrivitoConfig";
export const FormCheckboxWidget = Scrivito.provideWidgetClass(
  "FormCheckboxWidget",
  {
    attributes: {
      type: [
        "enum",
        {
          values: ["custom", "accept_terms"].concat(
            getScrivitoFormWidgetConfig().neoletterSubscriptionEnabled
              ? ["subscription"]
              : []
          ),
        },
      ],
      customFieldName: "string",
      label: "string",
      required: "boolean",
      helpText: "html",
    },
  }
);
