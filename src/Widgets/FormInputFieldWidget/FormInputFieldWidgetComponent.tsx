import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { isCustomType } from "../FormStepContainerWidget/utils/isCustomType";
import { Mandatory } from "../FormStepContainerWidget/components/MandatoryComponent";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { FormInputFieldWidget } from "./FormInputFieldWidgetClass";
Scrivito.provideComponent(FormInputFieldWidget, ({ widget }) => {
  const id = `form_text_input_widget_${widget.id()}`;
  const fieldName = getFieldName(widget);

  return (
    <div className="mb-3">
      <Scrivito.ContentTag
        content={widget}
        attribute="label"
        tag="label"
        htmlFor={id}
      />
      {widget.get("required") && <Mandatory />}

      {widget.get("helpText") && <HelpText widget={widget} />}

      {isCustomType(widget) && widget.get("customType") === "multi_line" ? (
        <textarea
          className="form-control"
          id={id}
          rows={3}
          name={fieldName}
          placeholder={widget.get("placeholder")}
          required={widget.get("required")}
        />
      ) : (
        <input
          className="form-control"
          id={id}
          name={fieldName}
          maxLength={calculateMaxLength(fieldName)}
          placeholder={widget.get("placeholder")}
          type={calculateType(fieldName)}
          required={widget.get("required")}
        />
      )}
    </div>
  );
});

function calculateMaxLength(fieldName: string): number {
  switch (fieldName) {
    case "phone_number":
      return 50;
    case "email":
      return 120;
    default:
      return 250;
  }
}

function calculateType(type: string): string {
  if (type === "email") {
    return "email";
  }

  if (type === "phone_number") {
    return "tel";
  }

  return "text";
}
