import * as React from "react";
import * as Scrivito from "scrivito";

interface FormSubmissionSucceededProps {
  submissionSuccessText: string;
  type: string;
  widget: Scrivito.Widget
}

export const FormSubmissionSucceeded: React.FC<
  FormSubmissionSucceededProps
> = ({ submissionSuccessText, type, widget }) => {
  return (
    <div className="form-submission-succeeded">
      {type == "default" ?
        <div className="text-center">
          <i className="bi bi-check-lg bi-2x" aria-hidden="true"></i>{" "}
          <span>{submissionSuccessText}</span>
        </div>
        :
        <Scrivito.ContentTag
          content={widget}
          attribute={"submittedMessageWidgets"}
        />
      }
    </div>
  );
};
