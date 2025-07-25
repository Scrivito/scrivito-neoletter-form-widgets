import * as React from "react";
import * as Scrivito from "scrivito";
import { useFormAttributesContext } from "../FormAttributesContext";

interface FormFooterSingleStepProps {
  widget: Scrivito.Widget;
  onSubmit: React.MouseEventHandler;
  submitDisabled: boolean;
}

export const FormFooterSingleStep: React.FC<FormFooterSingleStepProps> =
  Scrivito.connect(({ widget, onSubmit, submitDisabled }) => {

    const { footerButtonsSize } = useFormAttributesContext();

    return (
      <div
        className={`${widget.get("singleSubmitButtonAlignment") === "block"
          ? ""
          : widget.get("singleSubmitButtonAlignment")
          }`}>
        <button
          className={`btn btn-primary ${widget.get("singleSubmitButtonAlignment") === "block"
            ? " btn-block "
            : " "
            }${footerButtonsSize}`}
          onClick={onSubmit}
          disabled={submitDisabled}
        >
          {widget.get("submitButtonText") as string}
        </button>
      </div>
    );
  });
