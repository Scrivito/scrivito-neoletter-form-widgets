import * as Scrivito from "scrivito";
import { customFieldNameValidation } from "../FormStepContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormContainerValidation } from "../FormStepContainerWidget/utils/validations/insideFormContainerValidation";
import formDateWidgetIcon from "../../assets/images/form_widget_date.svg";

Scrivito.provideEditingConfig("FormDateWidget", {
  title: "Neoletter Form Date",
  thumbnail: formDateWidgetIcon,
  attributes: {
    title: { title: "Label" },
    dateType: {
      title: "Format",
      values: [
        { value: "date", title: "Date" },
        { value: "datetime-local", title: "Date and time" }
      ],
    },
    validationText: {
      title: "Validation Message",
      description: "This message appears when the input is invalid."
    },
    customFieldName: { title: "Field name" },
    helpText: { title: "Help text" },
    required: { title: "Mandatory" }
  },
  properties: (widget) => ["title", "dateType", "customFieldName", "required", ["validationText", { enabled: widget.get("required") }], "helpText"] as any,
  initialContent: {
    title: "Please enter a date",
    customFieldName: "custom_",
    dateType: "date",
    validationText: "Please enter a date"

  },
  validations: [insideFormContainerValidation, customFieldNameValidation]
});
