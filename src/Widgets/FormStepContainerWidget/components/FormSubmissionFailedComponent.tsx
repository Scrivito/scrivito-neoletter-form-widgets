import * as React from "react";
import * as Scrivito from "scrivito";
import { useFormAttributesContext } from "../FormAttributesContext";

interface FormSubmissionFailedProps {
  widget: Scrivito.Widget;
  fixedFormHeight: boolean;
  formHeight: number;
  getClassNames: () => string;
  onReSubmit: React.MouseEventHandler;
}
//TODO: Use OWN text-center styles
export const FormSubmissionFailed: React.FC<FormSubmissionFailedProps> = ({
  widget,
  fixedFormHeight,
  formHeight,
  getClassNames,
  onReSubmit
}) => {
  const { buttonsSize, buttonsStyle, retryButtonText, showRetryButton, failedMessage, failedMessageType, retryButtonAlignment } = useFormAttributesContext();
  return (
    <div className={`form-submission-failed ${getClassNames()}`} style={fixedFormHeight ? { height: `${formHeight}px` } : {}}>
      {failedMessageType == "default" ?
        <div className="text-center">
          <i
            className="bi bi-exclamation-triangle-fill bi-2x"
            aria-hidden="true"></i>{" "}
          <span >{failedMessage}</span>
        </div>
        :
        <Scrivito.ContentTag
          content={widget}
          attribute={"failedMessageWidgets"}
        />
      }
      {showRetryButton &&
        <div
          className={`${retryButtonAlignment === "block"
            ? ""
            : retryButtonAlignment
            }`}>
          <button
            className={`btn ${buttonsStyle} retry-button ${buttonsSize} ${retryButtonAlignment === "block"
              ? "btn-block"
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
