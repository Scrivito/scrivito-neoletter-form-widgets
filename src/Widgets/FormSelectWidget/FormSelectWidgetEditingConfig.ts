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
        { value: "linear-scale", title: "Linear scale" }
      ]
    },
    items: {
      title: "Items"
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
    inlineView: {
      title: "Arrange items horizontally",
      description: "When enabled, all items will be displayed in a single row."
    },
    useFloatingLabel: {
      title: "Enable floating label",
      description: "Places the label inside the dropdown."
    },
    navigateOnClick: {
      title: "Navigate on click",
      description: "Automatically navigate to the next step when an item is clicked."
    }
  },
  properties: widget => {
    return getProperties(widget as unknown as Scrivito.Widget);
  },
  initialContent: {
    selectionType: "radio",
    title: "Please choose",
    items: ["Yes", "No"],
    customFieldName: "custom_",
    linearScaleLowerLimit: "1",
    linearScaleUpperLimit: "5",
    clearSelectionText: "Clear selection",
    inlineView: false,
    useFloatingLabel: false,
    navigateOnClick: false
  },
  validations: [
    insideFormContainerValidation,
    [
      "items",

      (items: string[]) => {
        if (items.length < 2) {
          return {
            message: "The widget must include at least two items.",
            severity: "error"
          };
        }
      }
    ],
    customFieldNameValidation
  ]
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getProperties(widget: Scrivito.Widget): any[] {
  const type = widget.get("selectionType");
  const props = [
    "selectionType",
    "title",
    "customFieldName",
    ["required", { enabled: type !== "multi" }],
    "helpText"
  ];
  // show/hide inlineView
  if (type == "radio" || type == "multi") {
    props.splice(3, 0, "inlineView");
  }
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
      "linearScaleUpperLabel"
    );
  }
  // show/hide clearSelectionText
  if (!widget.get("required") && (type == "linear-scale" || type == "radio")) {
    props.splice(props.length - 1, 0, "clearSelectionText");
  }
  // show/hide useFloatingLabel
  if (type == "dropdown") {
    props.splice(props.length - 2, 0, "useFloatingLabel");
  }
  // show/hide navigateOnClick
  if (type == "radio" && !widget.container()?.get("isSingleStep")) {
    props.splice(4, 0, "navigateOnClick");
  }
  return props;
}
