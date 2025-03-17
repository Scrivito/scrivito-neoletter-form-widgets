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
import { FormProvider } from "./FormContext";
import { ValidationProvider } from "../../FormValidation/ValidationContext";
import "./FormStepContainerWidget.scss";

Scrivito.provideComponent(FormStepContainerWidget, ({ widget }) => {
  const tenant = getInstanceId();
  if (isEmpty(tenant)) {
    return <FormNoTenant />;
  }
  return (
    <ValidationProvider>
      <FormStepContainerWidgetContent widget={widget} tenant={tenant} />
    </ValidationProvider>
  )
});

const FormStepContainerWidgetContent = ({ widget, tenant }: { widget: Scrivito.Widget, tenant: string }) => {

  const {
    currentStep,
    isSingleStep,
    stepsLength,
    isSubmitting,
    successfullySent,
    submissionFailed,
    totalFormHeight,
    containerRef,
    setReCaptchaToken,
    isSubmitDisabled,
    handleInputChange,
    getStepInfo,
    onSubmit,
    onPageChange,
    getFormClassNames
  } = useFormStepContainer(widget, tenant);

  const isLastPage = currentStep == stepsLength;
  const showReview = widget.get("showReview") as boolean;
  const showCaptcha = widget.get("showCaptcha") as boolean;
  const containerClassNames = widget.get("customClassNames") as string || "";
  const fixedFormHeight = widget.get("fixedFormHeight") as boolean || false;
  const formHeight = widget.get("formHeight") as number || 35;

  if (isSubmitting) {
    return <FormSubmitting
      submittingText={widget.get("submittingMessage") as string}
      type={widget.get("submittingMessageType") as string || "default"}
      fixedFormHeight={fixedFormHeight}
      formHeight={totalFormHeight || formHeight}
      getClassNames={getFormClassNames}
      widget={widget}
    />;
  }

  if (successfullySent) {
    return (
      <FormSubmissionSucceeded
        submissionSuccessText={widget.get("submittedMessage") as string}
        type={widget.get("submittedMessageType") as string || "default"}
        fixedFormHeight={fixedFormHeight}
        formHeight={totalFormHeight || formHeight}
        getClassNames={getFormClassNames}
        widget={widget}
      />
    );
  }

  if (submissionFailed) {
    return (
      <FormSubmissionFailed
        submissionFailureText={widget.get("failedMessage") as string}
        type={widget.get("failedMessageType") as string || "default"}
        widget={widget}
        onReSubmit={onSubmit}
        showRetryButton={widget.get("showRetryButton") as boolean || false}
        retryButtonText={widget.get("retryButtonText") as string}
        buttonAlignment={widget.get("retryButtonAlignment") as string}
        fixedFormHeight={fixedFormHeight}
        formHeight={totalFormHeight || formHeight}
        getClassNames={getFormClassNames}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`scrivito-neoletter-form-widgets form-container-widget ${containerClassNames} ${widget.get("showBorder") ? "form-border" : ""
        } ${Scrivito.isInPlaceEditingActive() ? "edit-mode" : ""}`}
    >
      <form method="post" id={widget.get("formId") as string} className={getFormClassNames()} style={fixedFormHeight ? { height: `${formHeight}em` } : {}}>
        <FormHiddenFields widget={widget} />
        <FormProvider
          value={{
            getStepInfo,
            navigateOnClick: () => onPageChange(true),
            onInputChange: handleInputChange
          }}
        >
          <Scrivito.ContentTag
            content={widget}
            attribute={"steps"}
          />
        </FormProvider>
        {showCaptcha && (
          <FormCaptcha
            widget={widget}
            alignment={widget.get("captchaAlignment") as string || "center"}
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
}
