import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { isCustomType } from "../FormStepContainerWidget/utils/isCustomType";
import { Mandatory } from "../FormStepContainerWidget/components/MandatoryComponent";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { FormInputFieldWidget } from "./FormInputFieldWidgetClass";
import { isEmpty } from "../FormStepContainerWidget/utils/lodashPolyfills";
import "./FormInputFieldWidget.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Scrivito.provideComponent(FormInputFieldWidget, ({ widget, onInputChange }: any) => {
  const id = `form_text_input_widget_${widget.id()}`;
  const fieldName = getFieldName(widget);
  const useFloatingLabel = widget.get("useFloatingLabel");
  const [isSelected, setIsSelected] = React.useState(false);


  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setIsSelected(event.target.value !== "");
    onInputChange && onInputChange(getFieldName(widget), event.target.value);
  };
  return (
    <div className={`mb-3 form-input-container ${useFloatingLabel ? 'floating-label' : ''} ${isSelected ? "is-selected" : ""}`} >
      {!isEmpty(widget.get("label")) && (
        <>
          {widget.get("label") &&
            <label htmlFor={id} className="input-label">
              <Scrivito.ContentTag
                attribute="label"
                content={widget}
                tag="span"
              />
              {widget.get("required") && <Mandatory />}
              {widget.get("helpText") && <HelpText widget={widget} />}
            </label>
          }
        </>
      )
      }

      {isCustomType(widget) && widget.get("customType") === "multi_line" ? (
        <textarea
          className="form-control"
          id={id}
          rows={3}
          name={fieldName}
          placeholder={widget.get("placeholder")}
          required={widget.get("required")}
          onChange={handleChange}
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
          onChange={handleChange}
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
