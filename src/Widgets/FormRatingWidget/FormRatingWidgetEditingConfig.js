import * as Scrivito from "scrivito";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormContainerValidation } from "../FormContainerWidget/utils/validations/insideFormContainerValidation";
import formContainerWidgetIcon from "../../assets/images/form_widget_rating.svg";

Scrivito.provideEditingConfig("FormRatingWidget", {
  title: "Form Rating",
  thumbnail: formContainerWidgetIcon,
  attributes: {
    title: { title: "Label" },
    customFieldName: { title: "Field name" },
    helpText: { title: "Help text" },
  },
  properties: ["title", "customFieldName", "helpText"],
  initialContent: {
    title: "Please leave your rating",
    customFieldName: "custom_",
  },
  validations: [insideFormContainerValidation, customFieldNameValidation],
});
