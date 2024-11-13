import * as React from "react";
import * as Scrivito from "scrivito";
interface FormSubmittingProps {
  submittingText: string;
  type: string,
  widget: Scrivito.Widget
  fixedFormHeight: boolean
  formHeight: number
  getClassNames: () => string
}
export const FormSubmitting: React.FC<FormSubmittingProps> = ({
  submittingText,
  type,
  widget,
  fixedFormHeight,
  formHeight,
  getClassNames
}) => {


  return (
    <div className={`form-submission-submitting ${getClassNames()}`} style={fixedFormHeight ? { height: `${formHeight}px` } : {}}>
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
    </div >
  );
};
