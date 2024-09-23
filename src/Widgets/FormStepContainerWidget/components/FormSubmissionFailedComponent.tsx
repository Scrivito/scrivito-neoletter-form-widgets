import * as React from "react";
import * as Scrivito from "scrivito";

interface FormSubmissionFailedProps {
  submissionFailureText: string;
  type: string;
  widget: Scrivito.Widget;
  retryButtonText: string;
  showRetryButton: boolean;
  buttonAlignment: string;
  onReSubmit: React.MouseEventHandler;
}
//TODO: Use OWN text-center styles
export const FormSubmissionFailed: React.FC<FormSubmissionFailedProps> = ({
  submissionFailureText,
  type,
  widget,
  retryButtonText,
  showRetryButton,
  buttonAlignment,
  onReSubmit
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
      {showRetryButton &&
        <div
          className={`${buttonAlignment === "block"
            ? ""
            : buttonAlignment
            }`}>
          <button
            className={`btn btn-primary retry-button ${buttonAlignment === "block"
              ? " btn-block"
              : ""
              }`}
            onClick={onReSubmit}
          >
            {retryButtonText}
          </button>
        </div>
      }
    </div>
  );
};
