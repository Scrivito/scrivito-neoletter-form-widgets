import * as React from "react";
import * as Scrivito from "scrivito";
interface FormSubmittingProps {
  submittingText: string;
  type: string,
  widget: Scrivito.Widget
}
export const FormSubmitting: React.FC<FormSubmittingProps> = ({
  submittingText,
  type,
  widget
}) => {
  return (
    <div className="form-submission-submitting">
      {
        type == "default" ?
          <div className="text-center">
            <i
              className="bi bi-arrow-repeat bi-2x rotate-form-submitting-icon"
              aria-hidden="true"></i>{" "}
            <span>{submittingText}</span>
          </div>
          :
          <Scrivito.ContentTag
            content={widget}
            attribute={"submittingMessageWidgets"}
          />
      }
    </div>
  );
};
