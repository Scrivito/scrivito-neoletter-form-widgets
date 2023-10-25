export function insideMultipleStepsContainerValidation(widget) {
  const container = widget.container();
  const type = container.get("formType");
  const stepNumber = widget.get("stepNumber");
  if (type && type == "single-step" && stepNumber == undefined) {
    return {
      message: "Needs to be inside a multiple steps form.",
      severity: "error",
    };
  }
}
