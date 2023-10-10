import * as React from "react";
import * as Scrivito from "scrivito";
import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import "./FormStepWidget.scss";

Scrivito.provideComponent("FormStepWidget", ({ widget }) => {
  const stepNumber = widget.get("stepNumber");
  const items = widget.get("items");

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
        Scrivito.isInPlaceEditingActive()
          ? "step-border"
          : `${widget.get("isActive") ? "" : "hide"}`
      } `}
      data-step-number={stepNumber}
    >
      {Scrivito.isInPlaceEditingActive() && (
        <span className="step-preview-count">{"Step " + stepNumber}</span>
      )}
      <div className="row">
        <Scrivito.ContentTag content={widget} attribute="items" />
      </div>
    </div>
  );
});
