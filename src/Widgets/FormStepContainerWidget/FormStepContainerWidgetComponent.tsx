import * as React from "react";
import * as Scrivito from "scrivito";
import { isEmpty } from "./utils/lodashPolyfills";
import { scrollIntoView } from "./utils/scrollIntoView";
import { FormFooterMultiSteps } from "./components/FormFooterMultiStepsComponent";
import { FormFooterSingleStep } from "./components/FormFooterSingleStepComponent";
import { FormHiddenFields } from "./components/FormHiddenFieldsComponent";
import { getInstanceId } from "../../config/scrivitoConfig";
import { getFormData, submitForm } from "./utils/submitForm";
import { FormNoTenant } from "./components/FormNoTenantComponent";
import { FormSubmissionFailed } from "./components/FormSubmissionFailedComponent";
import { FormSubmissionSucceeded } from "./components/FormSubmissionSucceededComponent";
import { FormSubmitting } from "./components/FormSubmittingComponent";
import { FormStepContainerWidget } from "./FormStepContainerWidgetClass";
import { FormCaptcha } from "./components/FormCaptchaComponent";
import { CaptchaTheme, InputValidationElement, StringMap } from "../../../types/types";
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
  const [reCaptchaToken, setReCaptchaToken] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(false);
  const isSingleStep = widget.get("formType") == "single-step";
  const stepsLength = widget.get("steps").length;
  const isLastPage = currentStep == stepsLength;
  const showReview = widget.get("showReview");
  const showCaptcha = widget.get("showCaptcha");
  const showSubmittingPreview = widget.get("previewSubmittingMessage") || false;
  const showSubmittedPreview = widget.get("previewSubmittedMessage") || false;
  const showFailedPreview = widget.get("previewFailedMessage") || false;
  //TODO: custom hook

  const handleInputChange = (fieldUpdates: StringMap<string> | string, value?: string) => {
    if (typeof fieldUpdates === "string") {
      // update a single field
      setFormData(prevState => ({
        ...prevState,
        [fieldUpdates]: value || ""
      }));
    } else {
      // batch update multiple fields
      setFormData(prevState => ({
        ...prevState,
        ...fieldUpdates
      }));
    }
  };

  React.useEffect(() => {
    const initialData = getFormData(widget);
    if (initialData) {
      setFormData(Object.fromEntries(initialData));
    }
  }, []);

  React.useEffect(() => {
    if (!Scrivito.isInPlaceEditingActive()) {
      return;
    }
    // update some properties for older forms if they are not set!
    if (!widget.get("submittingMessageType")) {
      widget.update({ "submittingMessageType": "default" });
    }
    if (!widget.get("submittedMessageType")) {
      widget.update({ "submittedMessageType": "default" });
    }
    if (!widget.get("failedMessageType")) {
      widget.update({ "failedMessageType": "default" });
    }
  }, []);

  React.useEffect(() => {
    if (!Scrivito.isInPlaceEditingActive()) {
      return;
    }
    if (showSubmittingPreview) {
      indicateProgress();
    } else if (showSubmittedPreview) {
      indicateSuccess();
    } else if (showFailedPreview) {
      indicateFailure();
    } else {
      setIsSubmitting(false);
      setSubmissionFailed(false);
      setSuccessfullySent(false);
    }
  }, [showFailedPreview, showSubmittedPreview, showSubmittingPreview]);



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
    return <FormSubmitting
      submittingText={widget.get("submittingMessage")}
      type={widget.get("submittingMessageType") || "default"}
      widget={widget}
    />;
  }

  if (successfullySent) {
    return (
      <FormSubmissionSucceeded
        submissionSuccessText={widget.get("submittedMessage")}
        type={widget.get("submittedMessageType") || "default"}
        widget={widget}
      />
    );
  }

  if (submissionFailed) {
    return (
      <FormSubmissionFailed
        submissionFailureText={widget.get("failedMessage")}
        type={widget.get("failedMessageType") || "default"}
        widget={widget}
      />
    );
  }

  return (
    <div
      className={`scrivito-neoletter-form-widgets form-container-widget ${widget.get("showBorder") ? "form-border" : ""
        } ${Scrivito.isInPlaceEditingActive() ? "edit-mode" : ""}`}
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
            },
            navigateOnClick: () => onPageChange,
            onInputChange: handleInputChange
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
    if (!formData) {
      return;
    }
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
      await submitForm(formData, formEndpoint);
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
