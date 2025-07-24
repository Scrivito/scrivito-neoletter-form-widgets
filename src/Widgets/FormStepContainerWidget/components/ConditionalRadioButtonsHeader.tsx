import * as React from "react";
import * as Scrivito from "scrivito";
import { isEmpty } from "../utils/lodashPolyfills";
import { getFieldName } from "../utils/getFieldName";
import { SelectItem } from "./SelectComponent";
import { Mandatory } from "./MandatoryComponent";
import { HelpText } from "./HelpTextComponent";
import { useValidationField } from "../../../FormValidation/hooks/useValidationField";

export const RadioButtonsHeader = Scrivito.connect(
  ({ widget, onChangeSelected }) => {
    const fieldName = getFieldName(widget);
    const mandatory = widget.get("required") as boolean;
    const validationText = widget.get("validationText") as string || "Please select an item ";
    const inline = widget.get("inlineView") as boolean;
    const alignment = widget.get("alignment") as string || "left";
    const { isLocallyValid, setIsLocallyValid, ref } = useValidationField(fieldName, mandatory);

    const isInvalid = !isLocallyValid;

    const onChange = (e: React.BaseSyntheticEvent) => {
      setIsLocallyValid(!isEmpty(e.currentTarget.value))
      onChangeSelected(e);
    }
    return (
      <div
        ref={ref}
        className={`mb-3 select-container ${Scrivito.isInPlaceEditingActive() ? "condition-wrapper" : ""
          }`}>
        {widget.get("title") && <div className={`select-title ${inline ? `${alignment}` : ``}`}>
          <Scrivito.ContentTag
            attribute="title"
            content={widget}
            tag="span"
          />
          {widget.get("required") && <Mandatory />}
          {widget.get("helpText") && <HelpText widget={widget} />}
        </div>}
        <div className={`${inline ? `inline ${alignment}` : "row"}`}>
          {widget.get("conditions").map((condition: Scrivito.Widget) => (
            <SelectItem
              selectionType={"radio"}
              name={getFieldName(widget)}
              onChange={onChange}
              value={condition.get("title") as string}
              id={condition.id()}
              required={widget.get("required")}
              isInvalid={isInvalid}
              key={condition.id()}
            />
          ))}
        </div>
        {(mandatory && isInvalid) && <div className={`invalid-feedback ${alignment}`}>
          {validationText}
        </div>}
      </div>
    );
  }
);
