import * as Scrivito from "scrivito";
import formHiddenFieldWidgetIcon from "../../assets/images/form_hidden_field_widget.svg";
import { customFieldNameValidation } from "../FormStepContainerWidget/utils/validations/customFieldNameValidation";
import { getFormContainer } from "../FormStepContainerWidget/utils/getFormContainer";
import { isCustomType } from "../FormStepContainerWidget/utils/isCustomType";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { typeValidation } from "../FormStepContainerWidget/utils/validations/typeValidation";
import { isFieldNameUnique } from "../FormStepContainerWidget/utils/isFieldNameUnique";
import { isEmpty } from "../FormStepContainerWidget/utils/lodashPolyfills";
import { validateCustomFieldName } from "../FormStepContainerWidget/utils/validations/validateCustomFieldName";
import { defaultInputTypes } from "../FormStepContainerWidget/utils/formConstants";


Scrivito.provideEditingConfig("FormHiddenFieldWidget", {
  title: "Neoletter Hidden Form Field",
  thumbnail: formHiddenFieldWidgetIcon,
  attributes: {
    customFieldName: { title: "Field name" },
    hiddenValue: {
      title: "Hidden value",
      description: "This value is sent on every submission of the form."
    },
    type: {
      title: "Input type",
      values: [
        { value: "custom", title: "Custom" },
        { value: "subscription", title: "Subscription" },
        { value: "email", title: "Email" },
        { value: "name", title: "Name" },
        { value: "urlParam", title: "URL Parameter" }
      ]
    },
    urlParameterKey: {
      title: "URL Parameter Key",
      description: "The key to read from the URL parameters."
    },
    urlParameterFieldName: {
      title: "Field Name",
      description: "The name used to send the parameter value."
    }
  },
  properties: (widget: Scrivito.Widget) => {
    if (isCustomType(widget)) {
      return ["type", "customFieldName", "hiddenValue"];

    }
    if (widget.get("type") == "email" || widget.get("type") == "name") {
      return ["type"]
    }
    if (widget.get("type") == "urlParam") {
      return ["type", "urlParameterFieldName", "urlParameterKey"];
    }
    return ["type", "hiddenValue"];
  },
  initialContent: {
    customFieldName: "custom_hidden_field",
    type: "custom",
    urlParameterKey: "hidden_key",
    urlParameterFieldName: "custom_hidden_key"
  },
  validations: [
    customFieldNameValidation,
    typeValidation,
    (widget: Scrivito.Widget) => {
      const container = getFormContainer(widget);
      if (container && container.get("hiddenFields")) {
        const hiddenFields = container.get("hiddenFields") as Scrivito.Widget[];
        if (
          hiddenFields &&
          hiddenFields.map(w => w.id()).includes(widget.id())
        ) {
          return;
        }
      }
      return {
        message: "Hidden fields should be added in the properties of the form.",
        severity: "info"
      };
    },
    [
      "hiddenValue",
      (hiddenValue: string, { widget }: { widget: Scrivito.Widget }) => {
        const fieldName = getFieldName(widget);

        if (fieldName === "subscription" && hiddenValue !== "on") {
          return {
            message:
              "Please enter 'on' to activate the subscription process on every submission.",
            severity: "warning"
          };
        }
      }
    ],
    ["type", (type: string) => {
      if (!Scrivito.currentPage()?.isRestricted() && (type == "email" || type == "name")) {
        return "This option can only be enabled on pages that require user login (restricted pages)."
      }
    }],
    [
      "urlParameterFieldName",
      (urlParameterFieldName: string, { widget }: { widget: Scrivito.Widget }) => {
        if (isEmpty(urlParameterFieldName)) {
          return "Field name can not be empty. "
        }
        if (!isFieldNameUnique(widget)) {
          if (urlParameterFieldName.startsWith("custom_")) {
            return "Specify a unique custom field name. There is at least one other element with the same custom field name.";
          }
          return `There must be only one element with the input type “${urlParameterFieldName}"`;
        }

        if (defaultInputTypes.includes(urlParameterFieldName)) {
          // all fine
          return "";
        }
        if (urlParameterFieldName.startsWith("custom_")) {

          return validateCustomFieldName(urlParameterFieldName, widget);
        }
        const defaultInputs = defaultInputTypes.map((type) => `'${type}'`).join(", ");
        return `Specify a valid name. Use a default input field name (${defaultInputs}) or a custom field name starting with 'custom_'.`;
      }
    ],
    [
      "urlParameterKey",
      (urlParameterKey: string) => {
        if (isEmpty(urlParameterKey)) {
          return "Key can not be empty.";
        }
      }
    ]
  ],

  titleForContent: widget => {
    const fieldName = getFieldName(widget);
    return `Hidden Form Field: ${[fieldName, widget.get("hiddenValue")]
      .filter(e => e)
      .join(" - ")}`;
  }
});
