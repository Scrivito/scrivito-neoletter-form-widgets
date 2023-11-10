import * as React from "react";

export const FormSubmissionFailed = ({ submissionFailureText }) => {
  return (
    <div className="scrivito-form-widgets form-container-widget text-center">
      <i className="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i>{" "}
      <span className="text-super">{submissionFailureText}</span>
    </div>
  );
};
