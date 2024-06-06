/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Scrivito from "scrivito";
import { CaptchaOptions } from "../../types/types";

const GLOBAL_OBJ = typeof window !== 'undefined' ? window : global;

export const initNeoletterFormWidgets = async (
  instanceId?: string,
  captchaOptions?: CaptchaOptions
): Promise<void> => {
  if (instanceId) {
    (GLOBAL_OBJ as any).neoletterFormInstanceId = instanceId;
  }
  (GLOBAL_OBJ as any).neoletterFormCaptchaOptions = captchaOptions
    ? captchaOptions
    : { siteKey: "", captchaType: null };

  await loadWidgets();
};

export const getInstanceId = (): string => {
  return (
    (GLOBAL_OBJ as any).neoletterFormInstanceId ||
    (Scrivito.getInstanceId && Scrivito.getInstanceId()) ||
    ""
  );
};

export const getCaptchaOptions = (): CaptchaOptions => {
  return (GLOBAL_OBJ as any).neoletterFormCaptchaOptions;
};

async function loadWidgets(): Promise<void> {
  await Promise.all([
    import("../Widgets/FormStepContainerWidget/FormStepContainerWidgetClass"),
    import("../Widgets/FormStepContainerWidget/FormStepContainerWidgetComponent"),
    import("../Widgets/FormStepWidget/FormStepWidgetClass"),
    import("../Widgets/FormStepWidget/FormStepWidgetComponent"),
    import("../Widgets/FormCheckboxWidget/FormCheckboxWidgetClass"),
    import("../Widgets/FormCheckboxWidget/FormCheckboxWidgetComponent"),
    import("../Widgets/FormConditionalContainerWidget/FormConditionalContainerWidgetClass"),
    import("../Widgets/FormConditionalContainerWidget/FormConditionalContainerWidgetComponent"),
    import("../Widgets/FormConditionWidget/FormConditionWidgetClass"),
    import("../Widgets/FormConditionWidget/FormConditionWidgetComponent"),
    import("../Widgets/FormDateWidget/FormDateWidgetClass"),
    import("../Widgets/FormDateWidget/FormDateWidgetComponent"),
    import("../Widgets/FormHiddenFieldWidget/FormHiddenFieldWidgetClass"),
    import("../Widgets/FormHiddenFieldWidget/FormHiddenFieldWidgetComponent"),
    import("../Widgets/FormInputFieldWidget/FormInputFieldWidgetClass"),
    import("../Widgets/FormInputFieldWidget/FormInputFieldWidgetComponent"),
    import("../Widgets/FormRatingWidget/FormRatingWidgetClass"),
    import("../Widgets/FormRatingWidget/FormRatingWidgetComponent"),
    import("../Widgets/FormSelectWidget/FormSelectWidgetClass"),
    import("../Widgets/FormSelectWidget/FormSelectWidgetComponent"),
    import("../Widgets/LegacyFormContainerWidget/FormContainerWidgetClass"),
    import("../Widgets/LegacyFormContainerWidget/FormContainerWidgetComponent"),
    import("../Widgets/LegacyFormButtonWidget/FormButtonWidgetClass"),
    import("../Widgets/LegacyFormButtonWidget/FormButtonWidgetComponent")
  ]);
}
