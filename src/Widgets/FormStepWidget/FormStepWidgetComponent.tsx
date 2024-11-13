import React from "react";
import * as Scrivito from "scrivito";
import { FormStepWidget } from "./FormStepWidgetClass";
import { useFormContext } from "../FormStepContainerWidget/FormContext";
import "./FormStepWidget.scss";

Scrivito.provideComponent(FormStepWidget, ({ widget }) => {
  const { getStepInfo } = useFormContext();
  const data = getStepInfo(widget.id());
  const isMultiStepsWithActiveEditing = Scrivito.isInPlaceEditingActive() && !data.isSingleStep;

  return (
    <div
      className={`${isMultiStepsWithActiveEditing ? "step-border" : data.isActive || data.isSingleStep ? "" : "hide"}`}
      data-step-number={data.stepNumber}
    >
      {isMultiStepsWithActiveEditing && (
        <span className="step-preview-count">{"Step " + data.stepNumber}</span>
      )}
      <div className="row">
        <Scrivito.ContentTag
          content={widget}
          attribute="items"
        />
      </div>
    </div>
  );
});
