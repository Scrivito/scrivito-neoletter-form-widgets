import * as React from "react";
import * as Scrivito from "scrivito";

export const FormFooterMultiSteps = Scrivito.connect(
  ({
    widget,
    onPageChange,
    onSubmit,
    currentStep,
    isLastPage,
    stepsLength,
  }) => {
    return (
      <div className="form-buttons">
        <button
          className="btn btn-primary backward-button"
          onClick={() => onPageChange(false)}
          hidden={currentStep == 1 && !Scrivito.isInPlaceEditingActive()}
        >
          {widget.get("backwardButtonText")}
        </button>
        <div className="step-counter">{currentStep + " / " + stepsLength}</div>
        <button
          className="btn btn-primary forward-button"
          onClick={isLastPage ? onSubmit : () => onPageChange(true)}
        >
          {isLastPage
            ? widget.get("submitButtonText")
            : widget.get("forwardButtonText")}
        </button>
      </div>
    );
  }
);
