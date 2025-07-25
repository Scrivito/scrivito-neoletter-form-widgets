import * as Scrivito from "scrivito";
import formCheckboxWidgetIcon from "../../assets/images/form_checkbox_widget.svg";
import { isCustomType } from "../FormStepContainerWidget/utils/isCustomType";
import { customFieldNameValidation } from "../FormStepContainerWidget/utils/validations/customFieldNameValidation";
import { typeValidation } from "../FormStepContainerWidget/utils/validations/typeValidation";
import { insideFormContainerValidation } from "../FormStepContainerWidget/utils/validations/insideFormContainerValidation";

Scrivito.provideEditingConfig("FormCheckboxWidget", {
  title: "Neoletter Form Checkbox",
  thumbnail: formCheckboxWidgetIcon,
  attributes: {
    required: { title: "Mandatory" },
    type: {
      title: "Input type",
      values: [
        { value: "accept_terms", title: "Accept terms" },
        { value: "subscription", title: "Subscription" },
        { value: "custom", title: "Custom" }
      ]
    },
    customFieldName: { title: "Field name" },
    helpText: { title: "Help text" },
    validationText: {
      title: "Validation Message",
      description: "This message appears when the input is invalid."
    },
    alignment: {
      title: "Alignment",
    },
  },
  properties: (widget: Scrivito.Widget): any =>
    isCustomType(widget)
      ? ["type", "customFieldName", "label", "alignment", "required", ["validationText", { enabled: widget.get("required") }], "helpText"]
      : ["type", "label", "alignment", "required", ["validationText", { enabled: widget.get("required") }], "helpText"],
  initialContent: {
    type: "custom",
    customFieldName: "custom_checkbox",
    label: "Please send me your free printed product catalog.",
    validationText: "Please tick the box",
    alignment: "left",

  },
  validations: [
    insideFormContainerValidation,
    typeValidation,
    customFieldNameValidation
  ]
});
