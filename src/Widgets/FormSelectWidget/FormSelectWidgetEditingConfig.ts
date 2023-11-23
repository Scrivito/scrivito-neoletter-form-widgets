import * as Scrivito from "scrivito";
import { customFieldNameValidation } from "../FormStepContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormContainerValidation } from "../FormStepContainerWidget/utils/validations/insideFormContainerValidation";
import formSelectWidgetIcon from "../../assets/images/form_widget_select.svg";

Scrivito.provideEditingConfig("FormSelectWidget", {
  title: "Neoletter Form Select",
  thumbnail: formSelectWidgetIcon,
  attributes: {
    selectionType: {
      title: "Input type",
      values: [
        { value: "radio", title: "Radio buttons" },
        { value: "dropdown", title: "Dropdown" },
        { value: "multi", title: "Checkboxes" },
      ],
    },
    items: {
      title: "Items",
    },
    title: { title: "Label" },
    customFieldName: { title: "Field name" },
    required: { title: "Mandatory" },
    helpText: { title: "Help text" },
  },
  properties: (widget) => [
    "selectionType",
    "title",
    "items",
    "customFieldName",
    ["required", { enabled: widget.get("selectionType") !== "multi" }],
    "helpText",
  ],
  initialContent: {
    selectionType: "radio",
    title: "Please choose",
    items: ["Yes", "No"],
    customFieldName: "custom_",
  },
  validations: [
    insideFormContainerValidation,
    [
      "items",

      (items: string[]) => {
        if (items.length < 2) {
          return {
            message: "The widget must include at least two items.",
            severity: "error",
          };
        }
      },
    ],
    customFieldNameValidation,
  ],
});
