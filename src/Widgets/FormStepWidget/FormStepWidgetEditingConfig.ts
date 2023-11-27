import * as Scrivito from "scrivito";
import formStepWidgetIcon from "../../assets/images/form_widget_step.svg";

Scrivito.provideEditingConfig("FormStepWidget", {
  title: "Neoletter Form Step",
  titleForContent: (widget) => {
    if (widget.get("isSingleStep")) {
      return "Single Step";
    }
    return "Step " + widget.get("stepNumber");
  },
  thumbnail: formStepWidgetIcon,
  attributes: {
    items: {
      title: "Items",
    },
  },
  properties: ["items"],
});
