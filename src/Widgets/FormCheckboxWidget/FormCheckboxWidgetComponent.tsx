import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { Mandatory } from "../FormStepContainerWidget/components/MandatoryComponent";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { FormCheckboxWidget } from "./FormCheckboxWidgetClass";
import "./FormCheckboxWidget.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Scrivito.provideComponent(FormCheckboxWidget, ({ widget, onInputChange }: any) => {
  const id = `form_checkbox_widget_${widget.id()}`;

  return (
    <div className="form-check mb-3">
      <input
        className="form-check-input"
        id={id}
        type="checkbox"
        name={getFieldName(widget)}
        required={widget.get("required")}
        onChange={(e) => onInputChange(getFieldName(widget), e.target.checked ? "on" : "")}
      />
      <label className="form-check-label" htmlFor={id}>
        <Scrivito.ContentTag
          content={widget}
          attribute="label"
          tag="span"
        />
        {widget.get("required") && <Mandatory />}
        {widget.get("helpText") && <HelpText widget={widget} />}
      </label>
    </div>
  );
});
