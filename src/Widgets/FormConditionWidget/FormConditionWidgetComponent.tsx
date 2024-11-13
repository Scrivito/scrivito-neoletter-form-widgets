import * as React from "react";
import * as Scrivito from "scrivito";
import { FormConditionWidget } from "./FormConditionWidgetClass";
import { useConditionContext } from "../FormConditionalContainerWidget/ConditionContext";
import "./FormConditionWidget.scss";

Scrivito.provideComponent(FormConditionWidget, ({ widget }) => {
  const { getConditionData } = useConditionContext();
  const data = getConditionData(widget.id());
  if (!data.isActive && !Scrivito.isInPlaceEditingActive()) {
    return null;
  }

  return (
    <>
      {Scrivito.isInPlaceEditingActive() && (
        <span className="condition-info">
          {"Condition: " + widget.get("title")}
        </span>
      )}
      <Scrivito.ContentTag
        content={widget}
        attribute="content"
        className={
          Scrivito.isInPlaceEditingActive() ? "conditional-content" : ""
        }
      />
    </>
  );
});
