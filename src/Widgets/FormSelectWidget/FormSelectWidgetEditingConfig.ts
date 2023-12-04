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
        { value: "linear-scale", title: "Linear scale" },
      ],
    },
    items: {
      title: "Items",
    },
    title: { title: "Label" },
    customFieldName: { title: "Field name" },
    required: { title: "Mandatory" },
    helpText: { title: "Help text" },
    linearScaleLowerLimit: { title: "Lower scale limit" },
    linearScaleUpperLimit: { title: "Upper scale limit" },
    linearScaleLowerLabel: { title: "Optional label for lower scale limit" },
    linearScaleUpperLabel: { title: "Optional label for upper scale limit" },
    clearSelectionText: { title: "Clear selection text" },
  },
  properties: (widget) => {
    return getProps(widget);
  },
  initialContent: {
    selectionType: "radio",
    title: "Please choose",
    items: ["Yes", "No"],
    customFieldName: "custom_",
    linearScaleLowerLimit: "1",
    linearScaleUpperLimit: "5",
    clearSelectionText: "Clear selection",
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

function getProps(widget: Scrivito.Obj): any[] {
  const type = widget.get("selectionType");
  const props = [
    "selectionType",
    "title",
    "customFieldName",
    ["required", { enabled: type !== "multi" }],
    "helpText",
  ];
  // show/hide items
  if (type != "linear-scale") {
    props.splice(2, 0, "items");
  } else {
    // show/hide linear scale props
    props.splice(
      2,
      0,
      "linearScaleLowerLimit",
      "linearScaleUpperLimit",
      "linearScaleLowerLabel",
      "linearScaleUpperLabel",
    );
  }
  // show/hide clearSelectionText
  if (!widget.get("required") && (type == "linear-scale" || type == "radio")) {
    props.splice(props.length - 1, 0, "clearSelectionText");
  }
  return props;
}
