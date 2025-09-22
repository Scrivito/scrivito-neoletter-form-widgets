import * as React from "react";
import * as Scrivito from "scrivito";
import { useFormAttributesContext } from "../FormAttributesContext";

interface FormSubmissionSucceededProps {
  widget: Scrivito.Widget;
  fixedFormHeight: boolean;
  formHeight: number;
  getClassNames: () => string;
}

export const FormSubmissionSucceeded: React.FC<
  FormSubmissionSucceededProps
> = ({ widget, fixedFormHeight, formHeight, getClassNames }) => {
  const { submittedMessage, submittedMessageType } = useFormAttributesContext()
  return (
    <div className={`form-submission-succeeded ${getClassNames()}`} style={fixedFormHeight ? { height: `${formHeight}px` } : {}}>
      {submittedMessageType == "default" ?
        <div className="text-center">
          <i className="bi bi-check-lg bi-2x" aria-hidden="true"></i>{" "}
          <span>{submittedMessage}</span>
        </div>
        :
        <Scrivito.ContentTag
          content={widget}
          attribute={"submittedMessageWidgets"}
        />
      }
    </div >
  );
};
