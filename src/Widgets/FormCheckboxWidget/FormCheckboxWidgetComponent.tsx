import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { Mandatory } from "../FormStepContainerWidget/components/MandatoryComponent";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { FormCheckboxWidget } from "./FormCheckboxWidgetClass";
import "./FormCheckboxWidget.scss";

Scrivito.provideComponent(FormCheckboxWidget, ({ widget }) => {
  const id = `form_checkbox_widget_${widget.id()}`;

  return (
    <div className="form-check mb-3">
      <input
        className="form-check-input"
        id={id}
        type="checkbox"
        name={getFieldName(widget)}
        required={widget.get("required")}
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
