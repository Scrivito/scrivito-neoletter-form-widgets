import * as React from "react";

interface FormSubmissionFailedProps {
  submissionFailureText: string;
}
export const FormSubmissionFailed = ({
  submissionFailureText,
}: FormSubmissionFailedProps) => {
  return (
    <div className="scrivito-neoletter-form-widgets form-container-widget text-center">
      <i className="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i>{" "}
      <span className="text-super">{submissionFailureText}</span>
    </div>
  );
};
