import * as React from "react";

interface FormSubmissionSucceededProps {
  submissionSuccessText: string;
}

export const FormSubmissionSucceeded: React.FC<
  FormSubmissionSucceededProps
> = ({ submissionSuccessText }) => {
  return (
    <div className="scrivito-neoletter-form-widgets form-container-widget text-center">
      <i className="bi bi-check-lg bi-2x" aria-hidden="true"></i>{" "}
      <span className="text-super">{submissionSuccessText}</span>
    </div>
  );
};
