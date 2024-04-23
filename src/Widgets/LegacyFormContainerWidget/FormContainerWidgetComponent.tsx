import * as React from "react";
import * as Scrivito from "scrivito";
import isEmpty from "lodash-es/isEmpty";

import { scrollIntoView } from "../FormStepContainerWidget/utils/scrollIntoView";
import { getInstanceId } from "../../config/scrivitoConfig";
import { submitForm } from "../FormStepContainerWidget/utils/submitForm";
import { FormHiddenFields } from "../FormStepContainerWidget/components/FormHiddenFieldsComponent";
import { FormNoTenant } from "../FormStepContainerWidget/components/FormNoTenantComponent";
import { FormSubmitting } from "../FormStepContainerWidget/components/FormSubmittingComponent";
import { FormSubmissionFailed } from "../FormStepContainerWidget/components/FormSubmissionFailedComponent";
import { FormSubmissionSucceeded } from "../FormStepContainerWidget/components/FormSubmissionSucceededComponent";
import { FormContainerWidget } from "./FormContainerWidgetClass";
import "../FormStepContainerWidget/FormStepContainerWidget.scss";

Scrivito.provideComponent(FormContainerWidget, ({ widget }) => {
  const tenant = getInstanceId();
  if (isEmpty(tenant)) {
    return <FormNoTenant />;
  }
  const formEndpoint = `https://api.justrelate.com/neoletter/instances/${tenant}/form_submissions`;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successfullySent, setSuccessfullySent] = React.useState(false);
  const [submissionFailed, setSubmissionFailed] = React.useState(false);

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
    <div className="scrivito-neoletter-form-widgets form-container-widget">
      <form method="post" action={formEndpoint} onSubmit={onSubmit}>
        <FormHiddenFields widget={widget} />
        <Scrivito.ContentTag content={widget} attribute="content" />
      </form>
    </div>
  );

  async function onSubmit(element: React.BaseSyntheticEvent): Promise<void> {
    element.preventDefault();
    scrollIntoView(element.target);

    indicateProgress();
    try {
      await submitForm(element.target, formEndpoint, widget);
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
