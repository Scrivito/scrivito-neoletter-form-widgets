
export async function loadEditingConfigs(): Promise<void> {
	await Promise.all([
		import("./Widgets/FormStepContainerWidget/FormStepContainerWidgetEditingConfig"),
		import("./Widgets/FormStepWidget/FormStepWidgetEditingConfig"),
		import("./Widgets/FormCheckboxWidget/FormCheckboxWidgetEditingConfig"),
		import("./Widgets/FormConditionalContainerWidget/FormConditionalContainerWidgetEditingConfig"),
		import("./Widgets/FormConditionWidget/FormConditionWidgetEditingConfig"),
		import("./Widgets/FormDateWidget/FormDateWidgetEditingConfig"),
		import("./Widgets/FormHiddenFieldWidget/FormHiddenFieldWidgetEditingConfig"),
		import("./Widgets/FormInputFieldWidget/FormInputFieldWidgetEditingConfig"),
		import("./Widgets/FormRatingWidget/FormRatingWidgetEditingConfig"),
		import("./Widgets/FormSelectWidget/FormSelectWidgetEditingConfig"),
		import("./Widgets/LegacyFormContainerWidget/FormContainerWidgetEditingConfig"),
		import("./Widgets/LegacyFormButtonWidget/FormButtonWidgetEditingConfig")
	]);
}
