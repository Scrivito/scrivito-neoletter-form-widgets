import * as Scrivito from "scrivito";
import { FormConditionWidget } from "../FormConditionWidget/FormConditionWidgetClass";
import { FormInputFieldWidget } from "../FormInputFieldWidget/FormInputFieldWidgetClass";
import { FormSelectWidget } from "../FormSelectWidget/FormSelectWidgetClass";
import { FormDateWidget } from "../FormDateWidget/FormDateWidgetClass";
import { customFieldNameValidation } from "../FormStepContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormContainerValidation } from "../FormStepContainerWidget/utils/validations/insideFormContainerValidation";
import { FormRatingWidget } from "../FormRatingWidget/FormRatingWidgetClass";
import formConditionContainerWidgetIcon from "../../assets/images/form_widget_condition_container.svg";
Scrivito.provideEditingConfig("FormConditionalContainerWidget", {
  title: "Neoletter Form Conditional Container",
  titleForContent(obj) {
    return "Container for: " + obj.get("title");
  },
  thumbnail: formConditionContainerWidgetIcon,
  attributes: {
    headerType: {
      title: "Input type",
      values: [
        { value: "radio", title: "Radio buttons" },
        { value: "dropdown", title: "Dropdown" },
      ],
    },
    title: { title: "Label" },
    customFieldName: { title: "Field name" },
    required: { title: "Mandatory" },
    helpText: { title: "Help text" },
    conditions: {
      title: "Conditions",
    },
  },
  properties: [
    "headerType",
    "title",
    "conditions",
    "customFieldName",
    "required",
    "helpText",
  ],
  initialContent: {
    headerType: "radio",
    title: "Select the reason for your request",
    customFieldName: "custom_request_reason",
    conditions: [
      new FormConditionWidget({
        title: "Report an issue",
        content: [
          new FormSelectWidget({
            title: "Missing parts",
            customFieldName: "custom_missing_parts",
            items: [
              "Device",
              "Device cover",
              "Mounting material",
              "Cables",
              "Installation guide",
            ],
            selectionType: "multi",
          }),
          new FormInputFieldWidget({
            label: "Defective parts",
            type: "custom",
            customType: "multi_line",
            customFieldName: "custom_defective_oarts",
            placeholder: "",
          }),
          new FormDateWidget({
            title: "Late delivery",
            customFieldName: "custom_late_delivery",
            dateType: "date",
          }),
        ],
      }),
      new FormConditionWidget({
        title: "Give feedback",
        content: [
          new FormRatingWidget({
            title: "Rate your customer experience",
            customFieldName: "custom_customer_rating",
          }),
          new FormInputFieldWidget({
            label: "Send us a message",
            type: "custom",
            customType: "multi_line",
            customFieldName: "custom_customer_message",
            placeholder: "",
          }),
        ],
      }),
    ],
  },
  validations: [insideFormContainerValidation, customFieldNameValidation],
});
