import * as React from "react";
import * as Scrivito from "scrivito";

export const FormFooterSingleStep = Scrivito.connect(({ widget, onSubmit }) => {
  return (
    <div
      className={`${
        widget.get("singleSubmitButtonAlignment") === "block"
          ? ""
          : widget.get("singleSubmitButtonAlignment")
      }`}
    >
      <button
        className={`btn btn-primary${
          widget.get("singleSubmitButtonAlignment") === "block"
            ? " btn-block"
            : ""
        }`}
        onClick={onSubmit}
      >
        {widget.get("submitButtonText")}
      </button>
    </div>
  );
});
