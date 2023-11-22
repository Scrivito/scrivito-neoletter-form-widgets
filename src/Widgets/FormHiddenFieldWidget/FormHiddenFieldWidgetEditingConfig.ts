import * as Scrivito from "scrivito";
import formHiddenFieldWidgetIcon from "../../assets/images/form_hidden_field_widget.svg";
import { customFieldNameValidation } from "../FormStepContainerWidget/utils/validations/customFieldNameValidation";
import { getFormContainer } from "../FormStepContainerWidget/utils/getFormContainer";

Scrivito.provideEditingConfig("FormHiddenFieldWidget", {
  title: "Neoletter Hidden Form Field",
  thumbnail: formHiddenFieldWidgetIcon,
  attributes: {
    customFieldName: { title: "Field name" },
    hiddenValue: {
      title: "Hidden value",
      description: "This value is sent on every submission of the form.",
    },
  },
  properties: ["customFieldName", "hiddenValue"],
  initialContent: {
    customFieldName: "custom_hidden_field",
  },
  validations: [
    customFieldNameValidation,
    (widget: Scrivito.Widget) => {
      const container = getFormContainer(widget);
      if (container && container.get("hiddenFields")) {
        const hiddenFields = container.get("hiddenFields") as Scrivito.Widget[];
        if (
          hiddenFields &&
          hiddenFields.map((w) => w.id()).includes(widget.id())
        ) {
          return;
        }
      }
      return {
        message: "Hidden fields should be added in the properties of the form.",
        severity: "info",
      };
    },
  ],
  titleForContent: (widget) =>
    `Hidden Form Field: ${[
      widget.get("customFieldName"),
      widget.get("hiddenValue"),
    ]
      .filter((e) => e)
      .join(" - ")}`,
});
