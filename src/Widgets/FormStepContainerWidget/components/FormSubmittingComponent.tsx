import * as React from "react";
import * as Scrivito from "scrivito";
import { useFormAttributesContext } from "../FormAttributesContext";
interface FormSubmittingProps {
  widget: Scrivito.Widget
  fixedFormHeight: boolean
  formHeight: number
  getClassNames: () => string
}
export const FormSubmitting: React.FC<FormSubmittingProps> = ({
  widget,
  fixedFormHeight,
  formHeight,
  getClassNames
}) => {
  const { submittingMessage, submittingMessageType } = useFormAttributesContext()
  return (
    <div className={`form-submission-submitting ${getClassNames()}`} style={fixedFormHeight ? { height: `${formHeight}px` } : {}}>
      {
        submittingMessageType == "default" ?
          <div className="text-center">
            <i
              className="bi bi-arrow-repeat bi-2x rotate-form-submitting-icon"
              aria-hidden="true"></i>{" "}
            <span>{submittingMessage}</span>
          </div>
          :
          <Scrivito.ContentTag
            content={widget}
            attribute={"submittingMessageWidgets"}
          />
      }
    </div >
  );
};
