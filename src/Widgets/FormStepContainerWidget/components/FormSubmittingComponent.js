import * as React from "react";

export const FormSubmitting = ({ submittingText }) => {
  return (
    <div className="scrivito-neoletter-form-widgets form-container-widget text-center">
      <i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i>{" "}
      <span className="text-super">{submittingText}</span>
    </div>
  );
};
