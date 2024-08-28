import * as Scrivito from "scrivito";
import { customFieldNameValidation } from "../FormStepContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormContainerValidation } from "../FormStepContainerWidget/utils/validations/insideFormContainerValidation";
import formSignatureWidgetIcon from "../../assets/images/form-signature-widget.svg";

Scrivito.provideEditingConfig("FormSignatureWidget", {
  title: "Neoletter Form Signature",
  thumbnail: formSignatureWidgetIcon,
  attributes: {
    title: { title: "Label" },
    customFieldName: { title: "Field name" },
    strokeThickness: { title: "Stroke thickness", description: 'Default: "2"' },
    strokeColor: { title: "Stroke color", description: 'Default: "black"' },
    backgroundColor: { title: "Background color", description: 'Default: "#ffffff"' },
    deleteButtonText: { title: "Delete button text" },
    deleteButtonAlignment: {
      title: "Delete button alignment",
      values: [
        { value: "left", title: "Left" },
        { value: "text-center", title: "Center" },
        { value: "text-end", title: "Right" },
        { value: "block", title: "Full width" }
      ]
    },
    helpText: { title: "Help text" }
  },
  properties: ["title", "customFieldName", "strokeThickness", "strokeColor", "backgroundColor", "deleteButtonText", "deleteButtonAlignment", "helpText"],
  initialContent: {
    title: "Sign here",
    customFieldName: "custom_",
    deleteButtonText: "Delete",
    strokeThickness: 2,
    strokeColor: "black",
    backgroundColor: "#ffffff",
    deleteButtonAlignment: "left"

  },
  validations: [insideFormContainerValidation, customFieldNameValidation]
});
