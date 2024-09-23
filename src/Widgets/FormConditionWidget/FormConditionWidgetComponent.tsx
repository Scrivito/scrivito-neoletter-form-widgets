import * as React from "react";
import * as Scrivito from "scrivito";
import { FormConditionWidget } from "./FormConditionWidgetClass";
import "./FormConditionWidget.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Scrivito.provideComponent(FormConditionWidget, ({ widget, getData, onInputChange }: any) => {
  const data = getData ? getData(widget.id()) : { isActive: false };

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
        widgetProps={{ onInputChange }}
      />
    </>
  );
});
