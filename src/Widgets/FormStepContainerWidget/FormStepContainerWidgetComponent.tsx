import * as React from "react";
import * as Scrivito from "scrivito";
import { isEmpty } from "./utils/lodashPolyfills";
import { FormFooterMultiSteps } from "./components/FormFooterMultiStepsComponent";
import { FormFooterSingleStep } from "./components/FormFooterSingleStepComponent";
import { FormHiddenFields } from "./components/FormHiddenFieldsComponent";
import { getCaptchaOptions, getInstanceId } from "../../config/scrivitoConfig";
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
import { MessageBlock } from "./components/MessageBlock";
import "./FormStepContainerWidget.scss";

Scrivito.provideComponent(FormStepContainerWidget, ({ widget }) => {
  const tenant = getInstanceId();
  const values = useFormWidgetAttributes(widget);

  if (isEmpty(tenant)) {
    return <MessageBlock type="noTenant" />;
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

  const { formId, showBorder, fixedFormHeight, showCaptcha, showReview, containerClassNames, formHeight } = useFormAttributesContext()
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
    showFailedPreview,
    showSubmittedPreview,
    showSubmittingPreview,
    handleInputChange,
    getStepInfo,
    onSubmit,
    onPageChange,
    getFormClassNames
  } = useFormStepContainer(widget, tenant);
  const { captchaType } = getCaptchaOptions();
  const isLastPage = currentStep == stepsLength;
  const doShowCaptcha = captchaType == "google-recaptcha-v3" || showCaptcha
  const editMode = Scrivito.isInPlaceEditingActive();

  if (isSubmitting) {
    return (
      <>
        <FormSubmitting
          fixedFormHeight={fixedFormHeight}
          formHeight={totalFormHeight || formHeight}
          getClassNames={getFormClassNames}
          widget={widget}
        />;
        {(showSubmittingPreview && editMode) && <MessageBlock type="submittingPreview" />}
      </>)
  }

  if (successfullySent) {
    return (
      <>
        <FormSubmissionSucceeded
          fixedFormHeight={fixedFormHeight}
          formHeight={totalFormHeight || formHeight}
          getClassNames={getFormClassNames}
          widget={widget}
        />
        {(showSubmittedPreview && editMode) && <MessageBlock type="submittedPreview" />}
      </>
    );
  }

  if (submissionFailed) {
    return (
      <>
        <FormSubmissionFailed
          widget={widget}
          onReSubmit={onSubmit}
          fixedFormHeight={fixedFormHeight}
          formHeight={totalFormHeight || formHeight}
          getClassNames={getFormClassNames}
        />
        {(showFailedPreview && editMode) && <MessageBlock type="failedPreview" />}
      </>
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
            submitDisabled={isSubmitDisabled}
          />
        )
      }
    </div >
  );
}
