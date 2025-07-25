import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { isCustomType } from "../FormStepContainerWidget/utils/isCustomType";
import { Mandatory } from "../FormStepContainerWidget/components/MandatoryComponent";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { FormInputFieldWidget } from "./FormInputFieldWidgetClass";
import { isEmpty } from "../FormStepContainerWidget/utils/lodashPolyfills";
import { useFormContext } from "../FormStepContainerWidget/FormContext";
import { useValidationField } from "../../FormValidation/hooks/useValidationField";
import { MessageBlock } from "../FormStepContainerWidget/components/MessageBlock";
import "./FormInputFieldWidget.scss";

Scrivito.provideComponent(FormInputFieldWidget, ({ widget }) => {
  const id = `form_text_input_widget_${widget.id()}`;
  const fieldName = getFieldName(widget);
  const mandatory = widget.get("required");
  const validationText = widget.get("validationText") || "Please fill out this field ";
  const useFloatingLabel = widget.get("useFloatingLabel");
  const alignment = widget.get("alignment") || "left";
  const [isSelected, setIsSelected] = React.useState(false);
  const ctx = useFormContext();
  if (!ctx) {
    return <MessageBlock type="noContext" />;
  }

  const { isLocallyValid, setIsLocallyValid, ref } = useValidationField(fieldName, mandatory);

  const isInvalid = !isLocallyValid;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setIsSelected(event.target.value !== "");
    mandatory && setIsLocallyValid(event.target.value !== "");
    ctx.onInputChange && ctx.onInputChange(getFieldName(widget), event.target.value);
  };

  const getDefaultInputValue = () => {
    const type = widget.get("type") as string
    if (!widget.get("useUserCredentials")) {
      return "";
    }
    if (!Scrivito.isUserLoggedIn() || !Scrivito.currentPage()?.isRestricted()) {
      return "";
    }
    if (type == "email") {
      return Scrivito.currentUser()?.email() || "";
    }
    if (type == "name") {
      return Scrivito.currentUser()?.name() || "";
    }
    return "";
  }

  return (
    <div
      ref={ref}
      className={`mb-3 form-input-container ${useFloatingLabel ? 'floating-label' : ''} ${isSelected ? "is-selected" : ""} ${!useFloatingLabel ? `${alignment}` : ``}`}
    >
      {!isEmpty(widget.get("label")) && (
        <>
          {widget.get("label") &&
            <label htmlFor={id} className={`input-label`}>
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
          className={`form-control ${isInvalid ? "is-invalid" : ""} ${!useFloatingLabel ? `${alignment}` : ``}`}
          id={id}
          rows={3}
          name={fieldName}
          placeholder={widget.get("placeholder")}
          onChange={handleChange}
        />
      ) : (
        <input
          className={`form-control ${isInvalid ? "is-invalid" : ""} ${!useFloatingLabel ? `${alignment}` : ``}`}
          id={id}
          name={fieldName}
          maxLength={calculateMaxLength(fieldName)}
          placeholder={widget.get("placeholder")}
          type={calculateType(fieldName)}
          defaultValue={getDefaultInputValue()}
          onChange={handleChange}
        />
      )
      }
      {isInvalid && <div className={`invalid-feedback ${!useFloatingLabel ? `${alignment}` : ``}`}>
        {validationText}
      </div>}
    </div >
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
