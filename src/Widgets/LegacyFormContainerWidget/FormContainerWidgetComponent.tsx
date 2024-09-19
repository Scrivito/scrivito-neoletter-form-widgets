import * as React from "react";
import * as Scrivito from "scrivito";
import { isEmpty } from "../FormStepContainerWidget/utils/lodashPolyfills";

import { scrollIntoView } from "../FormStepContainerWidget/utils/scrollIntoView";
import { getInstanceId } from "../../config/scrivitoConfig";
import { getFormData, submitForm } from "../FormStepContainerWidget/utils/submitForm";
import { FormHiddenFields } from "../FormStepContainerWidget/components/FormHiddenFieldsComponent";
import { FormNoTenant } from "../FormStepContainerWidget/components/FormNoTenantComponent";
import { FormSubmitting } from "../FormStepContainerWidget/components/FormSubmittingComponent";
import { FormSubmissionFailed } from "../FormStepContainerWidget/components/FormSubmissionFailedComponent";
import { FormSubmissionSucceeded } from "../FormStepContainerWidget/components/FormSubmissionSucceededComponent";
import { FormContainerWidget } from "./FormContainerWidgetClass";
import "../FormStepContainerWidget/FormStepContainerWidget.scss";
import { StringMap } from "../../../types/types";

Scrivito.provideComponent(FormContainerWidget, ({ widget }) => {
  const tenant = getInstanceId();
  if (isEmpty(tenant)) {
    return <FormNoTenant />;
  }
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successfullySent, setSuccessfullySent] = React.useState(false);
  const [submissionFailed, setSubmissionFailed] = React.useState(false);

  if (isSubmitting) {
    return <FormSubmitting
      submittingText={widget.get("submittingMessage")}
      type={"default"}
      widget={widget}
    />;
  }

  if (successfullySent) {
    return (
      <FormSubmissionSucceeded
        submissionSuccessText={widget.get("submittedMessage")}
        type={"default"}
        widget={widget}
      />
    );
  }

  if (submissionFailed) {
    return (
      <FormSubmissionFailed
        submissionFailureText={widget.get("failedMessage")}
        type={"default"}
        widget={widget}
        onReSubmit={onSubmit}
        showRetryButton={false}
        retryButtonText={"Retry"}
        buttonAlignment={"text-center"}
      />
    );
  }

  return (
    <div className={`scrivito-neoletter-form-widgets form-container-widget ${Scrivito.isInPlaceEditingActive() ? "edit-mode" : ""}`}>
      <form method="post" id={widget.get("formId")} onSubmit={onSubmit} >
        <FormHiddenFields widget={widget} />
        <Scrivito.ContentTag
          content={widget}
          attribute="content"
        />
      </form>
    </div>
  );

  async function onSubmit(e: React.SyntheticEvent): Promise<void> {
    e.preventDefault();
    const formData = getFormData(widget);
    if (!formData) {
      return;
    }
    const formElement = document.getElementById(widget.get("formId")) as HTMLFormElement;
    formElement && scrollIntoView(formElement);

    indicateProgress();
    try {
      await submitForm(Object.fromEntries(formData) as StringMap<string>, tenant);
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
});
