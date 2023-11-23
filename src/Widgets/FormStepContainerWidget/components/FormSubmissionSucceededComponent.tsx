import * as React from "react";

interface FormSubmissionSucceededProps {
  submissionSuccessText: string;
}

export const FormSubmissionSucceeded = ({
  submissionSuccessText,
}: FormSubmissionSucceededProps) => {
  return (
    <div className="scrivito-neoletter-form-widgets form-container-widget text-center">
      <i className="fa fa-check fa-2x" aria-hidden="true"></i>{" "}
      <span className="text-super">{submissionSuccessText}</span>
    </div>
  );
};
