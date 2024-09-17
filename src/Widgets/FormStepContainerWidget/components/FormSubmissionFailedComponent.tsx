import * as React from "react";
import * as Scrivito from "scrivito";

interface FormSubmissionFailedProps {
  submissionFailureText: string;
  type: string;
  widget: Scrivito.Widget
}
// TODO: Add retry button!
//TODO: Use OWN text-center styles
export const FormSubmissionFailed: React.FC<FormSubmissionFailedProps> = ({
  submissionFailureText,
  type,
  widget
}) => {
  return (
    <div className="form-submission-failed">
      {type == "default" ?
        <div className="text-center">
          <i
            className="bi bi-exclamation-triangle-fill bi-2x"
            aria-hidden="true"></i>{" "}
          <span >{submissionFailureText}</span>
        </div>
        :
        <Scrivito.ContentTag
          content={widget}
          attribute={"failedMessageWidgets"}
        />
      }
    </div>
  );
};
