import * as React from "react";
import * as Scrivito from "scrivito";
import { useFormAttributesContext } from "../FormAttributesContext";

interface FormFooterSingleStepProps {
  onSubmit: React.MouseEventHandler;
  submitDisabled: boolean;
}

export const FormFooterSingleStep: React.FC<FormFooterSingleStepProps> =
  Scrivito.connect(({ onSubmit, submitDisabled }) => {

    const { footerButtonsSize, submitButtonText, singleSubmitButtonAlignment } = useFormAttributesContext();

    return (
      <div
        className={`${singleSubmitButtonAlignment === "block"
          ? ""
          : singleSubmitButtonAlignment
          }`}>
        <button
          className={`btn btn-primary ${singleSubmitButtonAlignment === "block"
            ? " btn-block "
            : " "
            }${footerButtonsSize}`}
          onClick={onSubmit}
          disabled={submitDisabled}
        >
          {submitButtonText}
        </button>
      </div>
    );
  });
