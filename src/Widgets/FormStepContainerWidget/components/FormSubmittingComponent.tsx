import * as React from "react";
interface FormSubmittingProps {
  submittingText: string;
}
export const FormSubmitting: React.FC<FormSubmittingProps> = ({
  submittingText
}) => {
  return (
    <div className="scrivito-neoletter-form-widgets form-container-widget text-center">
      <i
        className="bi bi-arrow-repeat bi-2x rotate-icon"
        aria-hidden="true"></i>{" "}
      <span className="text-super">{submittingText}</span>
    </div>
  );
};
