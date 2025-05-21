import * as React from "react";
import * as Scrivito from "scrivito";
import { isEmpty } from "./utils/lodashPolyfills";
import { FormFooterMultiSteps } from "./components/FormFooterMultiStepsComponent";
import { FormFooterSingleStep } from "./components/FormFooterSingleStepComponent";
import { FormHiddenFields } from "./components/FormHiddenFieldsComponent";
import { getCaptchaOptions, getInstanceId } from "../../config/scrivitoConfig";
import { FormNoTenant } from "./components/FormNoTenantComponent";
import { FormSubmissionFailed } from "./components/FormSubmissionFailedComponent";
import { FormSubmissionSucceeded } from "./components/FormSubmissionSucceededComponent";
import { FormSubmitting } from "./components/FormSubmittingComponent";
import { FormStepContainerWidget } from "./FormStepContainerWidgetClass";
import { FormCaptcha } from "./components/FormCaptchaComponent";
import { useFormStepContainer } from "./UseFormStepContainer";
import { FormProvider } from "./FormContext";
import { ValidationProvider } from "../../FormValidation/ValidationContext";
import { CaptchaProvider } from "./CaptchaContext";
import { FormAttributesProvider, useFormAttributesContext } from "./FormAttributesContext";
import { useFormWidgetAttributes } from "./UseFormAttributes";
import "./FormStepContainerWidget.scss";

Scrivito.provideComponent(FormStepContainerWidget, ({ widget }) => {
  const tenant = getInstanceId();
  const values = useFormWidgetAttributes(widget);

  if (isEmpty(tenant)) {
    return <FormNoTenant />;
  }
  return (
    <CaptchaProvider>
      <ValidationProvider>
        <FormAttributesProvider values={values}>
          <FormStepContainerWidgetContent widget={widget} tenant={tenant} />
        </FormAttributesProvider>
      </ValidationProvider>
    </CaptchaProvider>
  )
});

interface FormStepContainerWidgetContentProps {
  widget: Scrivito.Widget;
  tenant: string
}
const FormStepContainerWidgetContent: React.FC<FormStepContainerWidgetContentProps> = ({ widget, tenant }) => {

  const { formId, showBorder, failedMessage, failedMessageType, retryButtonAlignment, retryButtonText, showRetryButton, submittedMessage, submittedMessageType, submittingMessage, submittingMessageType, fixedFormHeight, showCaptcha, showReview, containerClassNames, formHeight } = useFormAttributesContext()
  const {
    currentStep,
    isSingleStep,
    stepsLength,
    isSubmitting,
    successfullySent,
    submissionFailed,
    totalFormHeight,
    containerRef,
    isSubmitDisabled,
    handleInputChange,
    getStepInfo,
    onSubmit,
    onPageChange,
    getFormClassNames
  } = useFormStepContainer(widget, tenant);
  const { captchaType } = getCaptchaOptions();
  const isLastPage = currentStep == stepsLength;
  const doShowCaptcha = captchaType == "google-recaptcha-v3" || showCaptcha

  if (isSubmitting) {
    return <FormSubmitting
      submittingText={submittingMessage}
      type={submittingMessageType}
      fixedFormHeight={fixedFormHeight}
      formHeight={totalFormHeight || formHeight}
      getClassNames={getFormClassNames}
      widget={widget}
    />;
  }

  if (successfullySent) {
    return (
      <FormSubmissionSucceeded
        submissionSuccessText={submittedMessage}
        type={submittedMessageType}
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
        submissionFailureText={failedMessage}
        type={failedMessageType}
        widget={widget}
        onReSubmit={onSubmit}
        showRetryButton={showRetryButton}
        retryButtonText={retryButtonText}
        buttonAlignment={retryButtonAlignment}
        fixedFormHeight={fixedFormHeight}
        formHeight={totalFormHeight || formHeight}
        getClassNames={getFormClassNames}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`scrivito-neoletter-form-widgets form-container-widget ${containerClassNames} ${showBorder ? "form-border" : ""
        } ${Scrivito.isInPlaceEditingActive() ? "edit-mode" : ""}`}
    >
      <form method="post" id={formId} className={getFormClassNames()} style={fixedFormHeight ? { height: `${formHeight}em` } : {}}>
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
        {doShowCaptcha && (
          <FormCaptcha
            widget={widget}
            hidden={!(isLastPage || Scrivito.isInPlaceEditingActive())}
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
