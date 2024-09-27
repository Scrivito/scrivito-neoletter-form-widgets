import * as Scrivito from "scrivito";
import formCheckboxWidgetIcon from "../../assets/images/form_checkbox_widget.svg";
import { isCustomType } from "../FormStepContainerWidget/utils/isCustomType";
import { customFieldNameValidation } from "../FormStepContainerWidget/utils/validations/customFieldNameValidation";
import { typeValidation } from "../FormStepContainerWidget/utils/validations/typeValidation";
import { insideFormContainerValidation } from "../FormStepContainerWidget/utils/validations/insideFormContainerValidation";
import localizer from "../../localization/localizer";

Scrivito.provideEditingConfig("FormCheckboxWidget", {
  title: "Neoletter Form Checkbox",
  thumbnail: formCheckboxWidgetIcon,
  attributes: {
    required: { title: localizer.localize("required") },
    type: {
      title: "Input type",
      values: [
        { value: "accept_terms", title: "Accept terms" },
        { value: "subscription", title: "Subscription" },
        { value: "custom", title: "Custom" }
      ]
    },
    customFieldName: { title: "Field name" },
    helpText: { title: "Help text" }
  },
  properties: (widget: Scrivito.Widget) =>
    isCustomType(widget)
      ? ["type", "customFieldName", "label", "required", "helpText"]
      : ["type", "label", "required", "helpText"],
  initialContent: {
    type: "custom",
    customFieldName: "custom_checkbox",
    label: "Please send me your free printed product catalog."
  },
  validations: [
    insideFormContainerValidation,
    typeValidation,
    customFieldNameValidation
  ]
});
