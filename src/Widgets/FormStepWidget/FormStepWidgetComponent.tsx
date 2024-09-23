import * as React from "react";
import * as Scrivito from "scrivito";
import { FormStepWidget } from "./FormStepWidgetClass";
import "./FormStepWidget.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Scrivito.provideComponent(FormStepWidget, ({ widget, getData, navigateOnClick, onInputChange }: any) => {
  const data = getData ? getData(widget.id()) : { stepNumber: 0 };
  const doNavigate = navigateOnClick ? navigateOnClick() : null;
  const isMultiStepsWithActiveEditing = Scrivito.isInPlaceEditingActive() && !data.isSingleStep;

  return (
    <div
      className={`${isMultiStepsWithActiveEditing
        ? "step-border"
        : `${data.isActive || data.isSingleStep ? "" : "hide"}`
        } `}
      data-step-number={data.stepNumber}>
      {isMultiStepsWithActiveEditing && (
        <span className="step-preview-count">{"Step " + data.stepNumber}</span>
      )}
      <div className="row">
        <Scrivito.ContentTag
          content={widget}
          attribute="items"
          widgetProps={
            {
              navigate: doNavigate,
              onInputChange
            }
          } />
      </div>
    </div>
  );
});
