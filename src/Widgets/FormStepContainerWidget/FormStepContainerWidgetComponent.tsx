import * as React from "react";
import * as Scrivito from "scrivito";
import { isEmpty } from "./utils/lodashPolyfills";
import { scrollIntoView } from "./utils/scrollIntoView";
import { FormFooterMultiSteps } from "./components/FormFooterMultiStepsComponent";
import { FormFooterSingleStep } from "./components/FormFooterSingleStepComponent";
import { FormHiddenFields } from "./components/FormHiddenFieldsComponent";
import { getInstanceId } from "../../config/scrivitoConfig";
import { submitForm } from "./utils/submitForm";
import { FormNoTenant } from "./components/FormNoTenantComponent";
import { FormSubmissionFailed } from "./components/FormSubmissionFailedComponent";
import { FormSubmissionSucceeded } from "./components/FormSubmissionSucceededComponent";
import { FormSubmitting } from "./components/FormSubmittingComponent";
import { FormStepContainerWidget } from "./FormStepContainerWidgetClass";
import { FormCaptcha } from "./components/FormCaptchaComponent";
import { CaptchaTheme, InputValidationElement } from "../../../types/types";
import "./FormStepContainerWidget.scss";
import "bootstrap-icons/font/bootstrap-icons.scss";

Scrivito.provideComponent(FormStepContainerWidget, ({ widget }) => {
  const tenant = getInstanceId();
  if (isEmpty(tenant)) {
    return <FormNoTenant />;
  }
  const formEndpoint = `https://api.justrelate.com/neoletter/instances/${tenant}/form_submissions`;
  const [currentStep, setCurrentStepNumber] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successfullySent, setSuccessfullySent] = React.useState(false);
  const [submissionFailed, setSubmissionFailed] = React.useState(false);
  const [reCaptchaToken, setReCaptchaToken] = React.useState<string | null>(
    null
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(false);
  const isSingleStep = widget.get("formType") == "single-step";
  const stepsLength = widget.get("steps").length;
  const isLastPage = currentStep == stepsLength;
  const showReview = widget.get("showReview");
  const showCaptcha = widget.get("showCaptcha");

  React.useEffect(() => {
    if (showCaptcha && isLastPage) {
      setIsSubmitDisabled(reCaptchaToken == null);
    }
  }, [reCaptchaToken, showCaptcha, isLastPage]);

  React.useEffect(() => {
    if (!Scrivito.isInPlaceEditingActive()) {
      return;
    }
    // in order to show step number in the props title of each step
    const steps = widget.get("steps");
    steps.forEach((step, i) => {
      const stepNumber = i + 1;
      step.update({
        stepNumber: stepNumber,
        isSingleStep: isSingleStep
      });
    });
    if (stepsLength > 1 && isSingleStep) {
      widget.update({ formType: "multi-step" });
    } else if (stepsLength == 1 && !isSingleStep) {
      widget.update({ formType: "single-step" });
    }
  }, [widget.get("steps")]);

  if (isSubmitting) {
    return <FormSubmitting submittingText={widget.get("submittingMessage")} />;
  }

  if (successfullySent) {
    return (
      <FormSubmissionSucceeded
        submissionSuccessText={widget.get("submittedMessage")}
      />
    );
  }

  if (submissionFailed) {
    return (
      <FormSubmissionFailed
        submissionFailureText={widget.get("failedMessage")}
      />
    );
  }

  return (
    <div
      className={`scrivito-neoletter-form-widgets form-container-widget ${widget.get("showBorder") ? "form-border" : ""
        }`}
    >
      <form method="post" id={widget.get("formId")}>
        <FormHiddenFields widget={widget} />
        <Scrivito.ContentTag
          content={widget}
          attribute={"steps"}
          widgetProps={{
            getData: (stepId: string) => {
              const steps = widget.get("steps");
              let isActive = false;
              let stepNumber = 0;
              steps.some((step, index) => {
                if (step.id() == stepId) {
                  stepNumber = index + 1;
                  isActive = stepNumber == currentStep;
                  return true;
                }
              });
              return { stepNumber, isActive, isSingleStep };
            }
          }}
        />
        {showCaptcha && (
          <FormCaptcha
            widget={widget}
            alignment={widget.get("captchaAlignment") || "center"}
            theme={(widget.get("captchaTheme") || "light") as CaptchaTheme}
            hidden={!(isLastPage || Scrivito.isInPlaceEditingActive())}
            onChangeCaptcha={setReCaptchaToken}
          />
        )}
      </form>
      {isSingleStep ? (
        <FormFooterSingleStep
          widget={widget}
          onSubmit={onSubmit}
          submitDisabled={isSubmitDisabled}
        />
      ) : (
        <FormFooterMultiSteps
          widget={widget}
          onSubmit={onSubmit}
          onPageChange={onPageChange}
          currentStep={currentStep}
          stepsLength={stepsLength}
          isLastPage={isLastPage}
          showReview={showReview}
          submitDisabled={isSubmitDisabled}
        />
      )}
    </div>
  );

  async function onSubmit(): Promise<void> {
    if (Scrivito.isInPlaceEditingActive() && widget.get("formType") == "multi-step") {
      // eslint-disable-next-line no-console
      console.log("In edit mode, only the first step will be validated for mandatory fields.");
    }
    const isValid = validateCurrentStep();
    if (!isValid) {
      return;
    }
    const formElement = document.getElementById(
      widget.get("formId")
    ) as HTMLFormElement;
    scrollIntoView(formElement);

    indicateProgress();
    try {
      await submitForm(formElement, formEndpoint, widget);
      indicateSuccess();
    } catch (e) {
      setTimeout(() => {
        throw e;
      }, 0);

      indicateFailure();
    }
  }

  function indicateProgress(): void {
    setIsSubmitting(true);
    setSuccessfullySent(false);
    setSubmissionFailed(false);
  }

  function indicateSuccess(): void {
    setIsSubmitting(false);
    setSuccessfullySent(true);
    setSubmissionFailed(false);
  }

  function indicateFailure(): void {
    setIsSubmitting(false);
    setSuccessfullySent(false);
    setSubmissionFailed(true);
  }

  function validateCurrentStep(): boolean {
    return doValidate(widget.get("formId"), currentStep);
  }

  function onPageChange(nextPage: boolean) {
    let isValid = true;

    if (Scrivito.isInPlaceEditingActive()) {
      // eslint-disable-next-line no-console
      console.log("Navigation buttons do not work in edit mode.");
      return;
    }
    if (nextPage) {
      isValid = validateCurrentStep();
    }
    if (!isValid) {
      return;
    }
    const stepNumber = nextPage
      ? Math.min(currentStep + 1, stepsLength)
      : Math.max(currentStep - 1, 1);
    setCurrentStepNumber(stepNumber);
    const formElement = document.getElementById(
      widget.get("formId")
    ) as HTMLFormElement;
    scrollIntoView(formElement);
  }
});

function doValidate(formId: string, currentStep: number): boolean {
  let isValid = true;
  const form = document.getElementById(formId);
  if (form) {
    const step = form.querySelector(`[data-step-number='${currentStep}']`);
    if (step) {
      const allInputs: NodeListOf<InputValidationElement> =
        step.querySelectorAll("input, select, textarea") || [];
      for (const node of allInputs.values()) {
        if (!node.checkValidity()) {
          node.reportValidity();
          return (isValid = false);
        }
      }
    }
  }
  return isValid;
}
