import * as Scrivito from "scrivito";
import { insideFormContainerValidation } from "../FormContainerWidget/utils/validations/insideFormContainerValidation";
import formStepWidgetIcon from "../../assets/images/form_widget_step.svg";
import { insideMultipleStepsContainerValidation } from "../FormContainerWidget/utils/validations/insideMultipleStepsContainerValidation";

Scrivito.provideEditingConfig("FormStepWidget", {
  title: "Form Step",
  titleForContent: (widget) => {
    return "Step " + widget.get("stepNumber");
  },
  thumbnail: formStepWidgetIcon,
  attributes: {
    items: {
      title: "Items",
    },
  },
  properties: ["items"],

  validations: [
    insideFormContainerValidation,
    insideMultipleStepsContainerValidation,
  ],
});
