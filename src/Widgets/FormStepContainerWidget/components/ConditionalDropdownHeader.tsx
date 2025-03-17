import * as React from "react";
import * as Scrivito from "scrivito";
import { isEmpty } from "../utils/lodashPolyfills";
import { Mandatory } from "./MandatoryComponent";
import { HelpText } from "./HelpTextComponent";
import { getFieldName } from "../utils/getFieldName";
import { DropdownOption } from "./DropdownOption";
import { useValidationField } from "../../../FormValidation/hooks/useValidationField";
export const DropdownHeader = Scrivito.connect(
  ({ widget, onChangeSelected }) => {
    const mandatory = widget.get("required") as boolean;
    const fieldName = getFieldName(widget);
    const validationText = widget.get("validationText") as string || "Please select an item";
    const { isLocallyValid, setIsLocallyValid, ref } = useValidationField(fieldName, mandatory);

    const isInvalid = !isLocallyValid;

    const onChange = (e: React.BaseSyntheticEvent) => {
      setIsLocallyValid(!isEmpty(e.currentTarget.value))
      onChangeSelected(e);
    }
    return (
      <div
        ref={ref}
        className={`mb-3 dropdown-container ${Scrivito.isInPlaceEditingActive() ? "condition-wrapper" : ""
          }`}>
        {widget.get("title") && <div className="select-title">
          <Scrivito.ContentTag
            attribute="title"
            content={widget}
            tag="span"
          />
          {widget.get("required") && <Mandatory />}
          {widget.get("helpText") && <HelpText widget={widget} />}
        </div>}
        <select
          className={`form-select ${isInvalid ? "is-invalid" : ""}`}
          name={getFieldName(widget)}
          id={widget.id()}
          onChange={onChange}>
          <EmptyOption />
          {widget.get("conditions").map((condition: Scrivito.Widget) => (
            <DropdownOption
              value={condition.get("title") as string}
              id={condition.id()}
              key={condition.id()}
            />
          ))}
        </select>
        {(mandatory && isInvalid) && <div className="invalid-feedback">
          {validationText}
        </div>}
      </div>
    );
  }
);

//TODO: move to dropdownOption & rename
const EmptyOption = () => {
  return <DropdownOption value={""} id={"empty-option"} key={"empty-option"} />;
};
