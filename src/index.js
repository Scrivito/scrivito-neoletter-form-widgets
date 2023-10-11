import "./Widgets/FormConditionWidget/FormConditionWidgetClass";
import "./Widgets/FormConditionWidget/FormConditionWidgetComponent";
import "./Widgets/FormConditionWidget/FormConditionWidgetEditingConfig";

import "./Widgets/FormConditionalContainerWidget/FormConditionalContainerWidgetClass";
import "./Widgets/FormConditionalContainerWidget/FormConditionalContainerWidgetComponent";
import "./Widgets/FormConditionalContainerWidget/FormConditionalContainerWidgetEditingConfig";

import "./Widgets/FormContainerWidget/FormContainerWidgetClass";
import "./Widgets/FormContainerWidget/FormContainerWidgetComponent";
import "./Widgets/FormContainerWidget/FormContainerWidgetEditingConfig";

import "./Widgets/FormDateWidget/FormDateWidgetClass";
import "./Widgets/FormDateWidget/FormDateWidgetComponent";
import "./Widgets/FormDateWidget/FormDateWidgetEditingConfig";

import "./Widgets/FormHiddenFieldWidget/FormHiddenFieldWidgetClass";
import "./Widgets/FormHiddenFieldWidget/FormHiddenFieldWidgetComponent";
import "./Widgets/FormHiddenFieldWidget/FormHiddenFieldWidgetEditingConfig";

import "./Widgets/FormInputFieldWidget/FormInputFieldWidgetClass";
import "./Widgets/FormInputFieldWidget/FormInputFieldWidgetComponent";
import "./Widgets/FormInputFieldWidget/FormInputFieldWidgetEditingConfig";

import "./Widgets/FormRatingWidget/FormRatingWidgetClass";
import "./Widgets/FormRatingWidget/FormRatingWidgetComponent";
import "./Widgets/FormRatingWidget/FormRatingWidgetEditingConfig";

import "./Widgets/FormSelectWidget/FormSelectWidgetClass";
import "./Widgets/FormSelectWidget/FormSelectWidgetComponent";
import "./Widgets/FormSelectWidget/FormSelectWidgetEditingConfig";

import "./Widgets/FormStepWidget/FormStepWidgetClass";
import "./Widgets/FormStepWidget/FormStepWidgetComponent";
import "./Widgets/FormStepWidget/FormStepWidgetEditingConfig";

import "./Widgets/FormCheckboxWidget/FormCheckboxWidgetComponent";

import {
  setScrivitoFormWidgetConfig,
  onConfigSet,
} from "./config/scrivitoConfig";

function loadWidgets() {
  import("./Widgets/FormCheckboxWidget/FormCheckboxWidgetClass");
  import("./Widgets/FormCheckboxWidget/FormCheckboxWidgetEditingConfig");
}
// If the config is already set, load the widgets immediately
onConfigSet(loadWidgets);

export { setScrivitoFormWidgetConfig };
