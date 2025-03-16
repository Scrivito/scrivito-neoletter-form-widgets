import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { Mandatory } from "../FormStepContainerWidget/components/MandatoryComponent";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { FormCheckboxWidget } from "./FormCheckboxWidgetClass";
import { useFormContext } from "../FormStepContainerWidget/FormContext";
import { useValidationField } from "../../FormValidation/hooks/useValidationField";
import "./FormCheckboxWidget.scss";

Scrivito.provideComponent(FormCheckboxWidget, ({ widget }) => {
  const id = `form_checkbox_widget_${widget.id()}`;
  const fieldName = getFieldName(widget);
  const mandatory = widget.get("required");
  const validationText = widget.get("validationText") || "Please tick the box";
  const { onInputChange } = useFormContext();
  const { isLocallyValid, setIsLocallyValid, ref } = useValidationField(fieldName, mandatory);

  const isInvalid = !isLocallyValid;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    mandatory && setIsLocallyValid(checked);
    onInputChange(fieldName, checked ? "on" : "");
  }

  return (
    <div
      ref={ref}
      className="form-check mb-3"
    >
      <input
        className={`form-check-input ${isInvalid ? "is-invalid" : ""}`}
        id={id}
        type="checkbox"
        name={getFieldName(widget)}
        onChange={onChange}
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
      {isInvalid && <div className="invalid-feedback">
        {validationText}
      </div>}
    </div>
  );
});
