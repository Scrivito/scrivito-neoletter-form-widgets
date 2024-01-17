import * as Scrivito from "scrivito";
import formHiddenFieldWidgetIcon from "../../assets/images/form_hidden_field_widget.svg";
import { customFieldNameValidation } from "../FormStepContainerWidget/utils/validations/customFieldNameValidation";
import { getFormContainer } from "../FormStepContainerWidget/utils/getFormContainer";
import { isCustomType } from "../FormStepContainerWidget/utils/isCustomType";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { typeValidation } from "../FormStepContainerWidget/utils/validations/typeValidation";

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
        { value: "subscription", title: "Subscription" }
      ]
    }
  },
  properties: (widget: Scrivito.Widget) => {
    if (!isCustomType(widget)) {
      return ["type", "hiddenValue"];
    }
    return ["type", "customFieldName", "hiddenValue"];
  },
  initialContent: {
    customFieldName: "custom_hidden_field",
    type: "custom"
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
    ]
  ],

  titleForContent: widget => {
    const fieldName = getFieldName(widget);
    return `Hidden Form Field: ${[fieldName, widget.get("hiddenValue")]
      .filter(e => e)
      .join(" - ")}`;
  }
});
