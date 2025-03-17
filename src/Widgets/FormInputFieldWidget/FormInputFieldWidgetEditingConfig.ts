import * as Scrivito from "scrivito";
import formInputFieldWidgetIcon from "../../assets/images/form_input_field_widget.svg";
import { isCustomType } from "../FormStepContainerWidget/utils/isCustomType";
import { customFieldNameValidation } from "../FormStepContainerWidget/utils/validations/customFieldNameValidation";
import { typeValidation } from "../FormStepContainerWidget/utils/validations/typeValidation";
import { insideFormContainerValidation } from "../FormStepContainerWidget/utils/validations/insideFormContainerValidation";

Scrivito.provideEditingConfig("FormInputFieldWidget", {
  title: "Neoletter Form Input Field",
  thumbnail: formInputFieldWidgetIcon,
  attributes: {
    required: { title: "Mandatory" },
    validationText: {
      title: "Validation Message",
      description: "This message appears when the input is invalid."
    },
    type: {
      title: "Input type",
      values: [
        { value: "name", title: "Name" },
        { value: "given_name", title: "Given name" },
        { value: "middle_name", title: "Middle name" },
        { value: "family_name", title: "Family name" },
        { value: "email", title: "Email" },
        { value: "phone_number", title: "Phone number" },
        { value: "company", title: "Company" },
        { value: "custom", title: "Custom" }
      ]
    },
    customType: {
      title: "Custom input type",
      values: [
        { value: "single_line", title: "Single-line" },
        { value: "multi_line", title: "Multi-line" }
      ]
    },
    customFieldName: { title: "Field name" },
    helpText: { title: "Help text" },
    useFloatingLabel: {
      title: "Enable floating label",
      description: "Places the label inside the input. Remove the placeholder when enabled."
    },
    useUserCredentials: {
      title: "Auto-fill with logged-in user details",
      description: "Automatically populates the field with the logged-in user`s details. This feature is available only on pages that require user login (restricted pages)."
    }
  },
  initialContent: {
    label: "Custom field",
    placeholder: "Your custom field",
    type: "custom",
    customType: "single_line",
    customFieldName: "custom_field_name",
    useFloatingLabel: false,
    useUserCredentials: false,
    validationText: "Please fill out this field"
  },
  properties: widget => {
    const customProps = [
      "type",
      "customType",
      "customFieldName",
      "label",
      "placeholder",
      "useFloatingLabel",
      "required",
      ["validationText", { enabled: widget.get("required") }],
      "helpText"
    ];
    if (widget.get("type") === "custom") {
      return customProps as any
    }
    if (widget.get("type") === "email" || widget.get("type") === "name") {
      return ["type", "useUserCredentials", "label", "placeholder", "required", ["validationText", { enabled: widget.get("required") }], "useFloatingLabel", "helpText"];
    }

    return ["type", "label", "placeholder", "required", ["validationText", { enabled: widget.get("required") }], "useFloatingLabel", "helpText"];
  },
  validations: [
    insideFormContainerValidation,
    typeValidation,
    [
      "customType",
      (customType, { widget }) => {
        if (isCustomType(widget) && !customType) {
          return "Select the custom input type.";
        }
      }
    ],
    customFieldNameValidation,
    [
      "useUserCredentials", (useUserCredentials, { widget }: { widget: Scrivito.Widget }) => {
        if (useUserCredentials && !Scrivito.currentPage()?.isRestricted() && (widget.get("type") == "email" || widget.get("type") == "name")) {
          return "This option can only be enabled on pages that require user login (restricted pages)."
        }
      }
    ]
  ]
});
