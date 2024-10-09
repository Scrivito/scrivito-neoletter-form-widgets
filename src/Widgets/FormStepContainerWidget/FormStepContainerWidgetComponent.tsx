import * as React from "react";
import * as Scrivito from "scrivito";
import { isEmpty } from "./utils/lodashPolyfills";
import { FormFooterMultiSteps } from "./components/FormFooterMultiStepsComponent";
import { FormFooterSingleStep } from "./components/FormFooterSingleStepComponent";
import { FormHiddenFields } from "./components/FormHiddenFieldsComponent";
import { getInstanceId } from "../../config/scrivitoConfig";
import { FormNoTenant } from "./components/FormNoTenantComponent";
import { FormSubmissionFailed } from "./components/FormSubmissionFailedComponent";
import { FormSubmissionSucceeded } from "./components/FormSubmissionSucceededComponent";
import { FormSubmitting } from "./components/FormSubmittingComponent";
import { FormStepContainerWidget } from "./FormStepContainerWidgetClass";
import { FormCaptcha } from "./components/FormCaptchaComponent";
import { CaptchaTheme } from "../../../types/types";
import { useFormStepContainer } from "./UseFormStepContainer";
import "./FormStepContainerWidget.scss";
import "bootstrap-icons/font/bootstrap-icons.scss";

Scrivito.provideComponent(FormStepContainerWidget, ({ widget }) => {
  const tenant = getInstanceId();
  if (isEmpty(tenant)) {
    return <FormNoTenant />;
  }

  const {
    currentStep,
    isSingleStep,
    stepsLength,
    isSubmitting,
    successfullySent,
    submissionFailed,
    setReCaptchaToken,
    isSubmitDisabled,
    handleInputChange,
    onSubmit,
    onPageChange,
    getFormClassNames
  } = useFormStepContainer(widget, tenant);

  const isLastPage = currentStep == stepsLength;
  const showReview = widget.get("showReview");
  const showCaptcha = widget.get("showCaptcha");
  const containerClassNames = widget.get("customClassNames") as string || "";
  const fixedFormHeight = widget.get("fixedFormHeight") || false;
  const formHeight = widget.get("formHeight") || 35;
  //TODO: add fixed height to submission components
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
        onReSubmit={onSubmit}
        showRetryButton={widget.get("showRetryButton") || false}
        retryButtonText={widget.get("retryButtonText") as string}
        buttonAlignment={widget.get("retryButtonAlignment") as string}
      />
    );
  }

  return (
    <div
      className={`scrivito-neoletter-form-widgets form-container-widget ${containerClassNames} ${widget.get("showBorder") ? "form-border" : ""
        } ${Scrivito.isInPlaceEditingActive() ? "edit-mode" : ""}`}
    >
      <form method="post" id={widget.get("formId")} className={getFormClassNames()} style={fixedFormHeight ? { height: `${formHeight}em` } : {}}>
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
                if (step.id() === stepId) {
                  stepNumber = index + 1;
                  isActive = stepNumber === currentStep;
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
      {
        isSingleStep ? (
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
        )
      }
    </div >
  );
});
