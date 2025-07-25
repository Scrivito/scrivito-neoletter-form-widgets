import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { Mandatory } from "../FormStepContainerWidget/components/MandatoryComponent";
import { FormDateWidget } from "./FormDateWidgetClass";
import { isEmpty } from "../FormStepContainerWidget/utils/lodashPolyfills";
import { useFormContext } from "../FormStepContainerWidget/FormContext";
import { useValidationField } from "../../FormValidation/hooks/useValidationField";
import { MessageBlock } from "../FormStepContainerWidget/components/MessageBlock";
import "./FormDateWidget.scss";


Scrivito.provideComponent(FormDateWidget, ({ widget }) => {
  const fieldName = getFieldName(widget);
  const [value, setValue] = React.useState("");
  const mandatory = widget.get("required");
  const validationText = widget.get("validationText") || "Please enter a date";
  const alignment = widget.get("alignment") as string || "left";

  const ctx = useFormContext();
  if (!ctx) {
    return <MessageBlock type="noContext" />;
  }
  const { isLocallyValid, setIsLocallyValid, ref } = useValidationField(fieldName, mandatory);

  const onChangeValue = (e: React.BaseSyntheticEvent) => {
    const isoStringDate = isEmpty(e.target.value) ? "" : new Date(e.target.value).toISOString();
    mandatory && setIsLocallyValid(!isEmpty(isoStringDate));
    setValue(isoStringDate);
    ctx.onInputChange(fieldName, isoStringDate);
  };
  const isInvalid = !isLocallyValid;
  return (
    <div
      ref={ref}
      className="form-date mb-3"
    >
      {widget.get("title") &&
        <div className={`date-title ${alignment}`} >
          <Scrivito.ContentTag
            attribute="title"
            content={widget}
            tag="span"
          />
          {widget.get("required") && <Mandatory />}
          {widget.get("helpText") && <HelpText widget={widget} />}
        </div>
      }
      <input
        onChange={onChangeValue}
        className={`datepicker form-control ${isInvalid ? "is-invalid" : ""} ${alignment}`}
        type={widget.get("dateType")!}
      />
      <input
        type="hidden"
        className="show-in-review"
        name={getFieldName(widget)}
        value={value} />
      {
        isInvalid && <div className={`invalid-feedback ${alignment}`}>
          {validationText}
        </div>
      }
    </div>
  );
});
