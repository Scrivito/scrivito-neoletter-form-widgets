import * as React from "react";
import * as Scrivito from "scrivito";
import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import { FormStepWidget } from "./FormStepWidgetClass";
import "./FormStepWidget.scss";

Scrivito.provideComponent(FormStepWidget, ({ widget, getData }: any) => {
  const data = getData ? getData(widget.id()) : { stepNumber: 0 };
  const items = widget.get("items");
  const isMultiStepsWithActiveEditing =
    Scrivito.isInPlaceEditingActive() && !data.isSingleStep;

  if (!items.length) {
    return (
      <InPlaceEditingPlaceholder center>
        Select some items in the widget properties.
      </InPlaceEditingPlaceholder>
    );
  }

  return (
    <div
      className={`${
        isMultiStepsWithActiveEditing
          ? "step-border"
          : `${data.isActive || data.isSingleStep ? "" : "hide"}`
      } `}
      data-step-number={data.stepNumber}
    >
      {isMultiStepsWithActiveEditing && (
        <span className="step-preview-count">{"Step " + data.stepNumber}</span>
      )}
      <div className="row">
        <Scrivito.ContentTag content={widget} attribute="items" />
      </div>
    </div>
  );
});
