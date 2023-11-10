import * as React from "react";

export const FormSubmissionSucceeded = ({ submissionSuccessText }) => {
  return (
    <div className="scrivito-form-widgets form-container-widget text-center">
      <i className="fa fa-check fa-2x" aria-hidden="true"></i>{" "}
      <span className="text-super">{submissionSuccessText}</span>
    </div>
  );
};
