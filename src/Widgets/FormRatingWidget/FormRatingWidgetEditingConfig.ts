import * as Scrivito from "scrivito";
import { customFieldNameValidation } from "../FormStepContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormContainerValidation } from "../FormStepContainerWidget/utils/validations/insideFormContainerValidation";
import formContainerWidgetIcon from "../../assets/images/form_widget_rating.svg";
import { IconEditorTab } from "./IconEditorTab/IconEditorTab";

Scrivito.provideEditingConfig("FormRatingWidget", {
  title: "Neoletter Form Rating",
  thumbnail: formContainerWidgetIcon,
  attributes: {
    title: { title: "Label" },
    customFieldName: { title: "Field name" },
    helpText: { title: "Help text" },
    hoverEffect: {
      title: "Hover effect",
      description: "Previews icon selection on hover."
    },
    size: {
      title: "Size",
      description: "Default: 133%",
      values: [
        { value: "bi-1x", title: "100% (Normal)" },
        { value: "bi-default", title: "133%" },
        { value: "bi-2x", title: "200%" },
        { value: "bi-3x", title: "300%" },
        { value: "bi-4x", title: "400%" },
        { value: "bi-5x", title: "500% (Biggest)" }
      ]
    },
    colorType: {
      title: "Color",
      description: "Choose the color for selected icons.",
      values: [
        { value: "default", title: "Default" },
        { value: "primary", title: "Primary" },
        { value: "secondary", title: "Secondary" },
        { value: "custom", title: "Custom" }
      ]
    },
    customColor: { title: "Custom Hex Color" }
  },
  properties: ["title", "customFieldName", "helpText"],
  propertiesGroups: (widget: Scrivito.Widget) => {
    return [
      {
        title: "Stylings",
        key: "form-icon-styling",
        properties: getStylingProps(widget)
      },
      {
        title: "Icon",
        properties: [],
        component: IconEditorTab,
        key: "form-icon-group"
      }
    ];
  },
  initialContent: {
    title: "Please leave your rating",
    customFieldName: "custom_",
    colorType: "default",
    customColor: "#ffd700",
    hoverEffect: false,
    icon: "bi-star-fill",
    size: "bi-default"
  },
  validations: [
    insideFormContainerValidation,
    customFieldNameValidation,
    [
      "customColor",
      (customColor: string, { widget }: { widget: Scrivito.Widget }) => {
        if (widget.get("colorType") != "custom") return;
        if (!isHexColor(customColor)) {
          return "Specify a valid hex color.";
        }
      }
    ]
  ]
});

function isHexColor(color: string): boolean {
  return /^#([0-9A-F]{3}){1,2}$/i.test(color);
}

function getStylingProps(widget: Scrivito.Widget): string[] {
  const props = ["hoverEffect", "size", "colorType"];
  if (widget.get("colorType") == "custom") {
    props.push("customColor");
  }
  return props;
}
