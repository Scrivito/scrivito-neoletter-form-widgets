import * as Scrivito from "scrivito";

export const FormSelectWidget = Scrivito.provideWidgetClass(
  "FormSelectWidget",
  {
    attributes: {
      selectionType: [
        "enum",
        {
          values: ["radio", "dropdown", "multi", "linear-scale", "ranking"]
        }
      ],
      title: "html",
      alignment: [
        "enum", {
          values: ["left", "center", "right"]
        }
      ],
      items: "stringlist",
      maxSelections: "integer",
      customFieldName: "string",
      required: "boolean",
      helpText: "html",
      linearScaleLowerLimit: ["enum", { values: ["0", "1"] }],
      linearScaleUpperLimit: [
        "enum",
        { values: ["2", "3", "4", "5", "6", "7", "8", "9", "10"] }
      ],
      linearScaleLowerLabel: "string",
      linearScaleUpperLabel: "string",
      clearSelectionButtonText: "string",
      inlineView: "boolean",
      updateRankingNumbers: "boolean",
      useFloatingLabel: "boolean",
      navigateOnClick: "boolean",
      showClearSelectionButton: "boolean",
      validationText: "string"
    }
  }
);
