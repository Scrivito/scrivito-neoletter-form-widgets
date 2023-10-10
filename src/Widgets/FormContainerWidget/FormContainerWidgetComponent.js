import * as React from "react";
import * as Scrivito from "scrivito";
import { scrollIntoView } from "./utils/scrollIntoView";
import { FormFooterMultiSteps } from "./components/FormFooterMultiStepsComponent";
import { FormFooterSingleStep } from "./components/FormFooterSingleStepComponent";
import { FormHiddenFields } from "./components/FormHiddenFieldsComponent";
import "./FormContainerWidget.scss";
import { getScrivitoFormWidgetConfig } from "../../config/scrivitoConfig";

Scrivito.provideComponent("FormContainerWidget", ({ widget }) => {
  const tenant = getScrivitoFormWidgetConfig().tenant;
  if (!tenant) {
    return (
      <span className="missing-tenant">
        Warning! tenant has not been configured for the form widget.
      </span>
    );
  }
  const formEndpoint = `https://api.justrelate.com/neoletter/instances/${tenant}/form_submissions`;
  const [currentStep, setCurrentStepNumber] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successfullySent, setSuccessfullySent] = React.useState(false);
  const [submissionFailed, setSubmissionFailed] = React.useState(false);
  const isSingleStep = widget.get("formType") == "single-step";
  const stepsLength = widget.get("steps").length;
  const isLastPage = currentStep == stepsLength;

  React.useEffect(() => {
    const steps = widget.get("steps");
    steps.forEach((step, i) => {
      const stepNumber = i + 1;
      step.update({
        stepNumber: stepNumber,
        isActive: currentStep == stepNumber,
      });
    });
  }, [widget.get("steps")]);

  if (isSubmitting) {
    return (
      <div className="form-container-widget text-center">
        <i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i>{" "}
        <span className="text-super">{widget.get("submittingMessage")}</span>
      </div>
    );
  }

  if (successfullySent) {
    return (
      <div className="form-container-widget text-center">
        <i className="fa fa-check fa-2x" aria-hidden="true"></i>{" "}
        <span className="text-super">{widget.get("submittedMessage")}</span>
      </div>
    );
  }

  if (submissionFailed) {
    return (
      <div className="form-container-widget text-center">
        <i className="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i>{" "}
        <span className="text-super">{widget.get("failedMessage")}</span>
      </div>
    );
  }

  return (
    <div
      className={`form-container-widget ${
        widget.get("showBorder") ? "form-border" : ""
      }`}
    >
      <form method="post" id={widget.get("formId")}>
        <FormHiddenFields widget={widget} />
        <Scrivito.ContentTag
          content={widget}
          attribute={isSingleStep ? "singleStepContent" : "steps"}
        />
      </form>
      {isSingleStep ? (
        <FormFooterSingleStep widget={widget} onSubmit={onSubmit} />
      ) : (
        <FormFooterMultiSteps
          widget={widget}
          onSubmit={onSubmit}
          onPageChange={onPageChange}
          currentStep={currentStep}
          stepsLength={stepsLength}
          isLastPage={isLastPage}
        />
      )}
    </div>
  );

  async function onSubmit() {
    if (Scrivito.isInPlaceEditingActive()) {
      return;
    }
    const isValid = validateCurrentStep();
    if (!isValid) {
      return;
    }
    const formElement = document.getElementById(widget.get("formId"));
    scrollIntoView(formElement);

    indicateProgress();
    try {
      await submit(formElement, formEndpoint);
      indicateSuccess();
    } catch (e) {
      setTimeout(() => {
        throw e;
      }, 0);

      indicateFailure();
    }
  }

  function indicateProgress() {
    setIsSubmitting(true);
    setSuccessfullySent(false);
    setSubmissionFailed(false);
  }

  function indicateSuccess() {
    setIsSubmitting(false);
    setSuccessfullySent(true);
    setSubmissionFailed(false);
  }

  function indicateFailure() {
    setIsSubmitting(false);
    setSuccessfullySent(false);
    setSubmissionFailed(true);
  }

  function validateCurrentStep() {
    return doValidate(widget.get("formId"), currentStep, isSingleStep);
  }

  function onPageChange(next) {
    let isValid = true;

    if (Scrivito.isInPlaceEditingActive()) {
      return;
    }
    if (next) {
      isValid = validateCurrentStep();
    }
    if (!isValid) {
      return;
    }
    const stepNumber = next
      ? Math.min(currentStep + 1, stepsLength)
      : Math.max(currentStep - 1, 1);
    setCurrentStepNumber(stepNumber);
    const formElement = document.getElementById(widget.get("formId"));
    scrollIntoView(formElement);
  }
});

async function submit(formElement, formEndpoint) {
  const data = new FormData(formElement);
  const dataToSend = new FormData();
  // workaround to send all field-names with equal name
  // as a comma separated string
  for (const [name, value] of data) {
    if (dataToSend.has(name)) {
      continue;
    } else {
      dataToSend.set(name, data.getAll(name).join(", "));
    }
  }
  const body = new URLSearchParams(dataToSend);
  // console.log("submitting", Object.fromEntries(body.entries()));
  const response = await fetch(formEndpoint, { method: "post", body });
  if (!response.ok) {
    throw new Error(
      `Response was not successful. Status code: ${response.status}.`
    );
  }
}

function doValidate(formId, currentStep, isSingleStep) {
  let isValid = true;
  const form = document.getElementById(formId);
  if (form) {
    const stepOrForm = isSingleStep
      ? form
      : form.querySelectorAll(`[data-step-number='${currentStep}']`);
    if (stepOrForm) {
      const allInputs = isSingleStep
        ? stepOrForm.querySelectorAll("input, select, textarea")
        : stepOrForm.item(0)?.querySelectorAll("input, select, textarea") || [];
      for (const node of allInputs.values()) {
        if (!node.checkValidity()) {
          node.reportValidity();
          return (isValid = false);
        }
      }
    }
    return isValid;
  }
}
