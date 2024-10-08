import * as React from "react";
import * as Scrivito from "scrivito";
import { Mandatory } from "./MandatoryComponent";
import { HelpText } from "./HelpTextComponent";
import { getFieldName } from "../utils/getFieldName";
import { DropdownOption } from "./DropdownOption";
export const DropdownHeader = Scrivito.connect(
  ({ widget, onChangeSelected }) => {
    return (
      <div
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
          className="form-select form-control"
          name={getFieldName(widget)}
          id={widget.id()}
          required={widget.get("required")}
          onChange={onChangeSelected}>
          <EmptyOption />
          {widget.get("conditions").map((condition: Scrivito.Widget) => (
            <DropdownOption
              value={condition.get("title") as string}
              id={condition.id()}
              key={condition.id()}
            />
          ))}
        </select>
      </div>
    );
  }
);

//TODO: move to dropdownOption & rename
const EmptyOption = () => {
  return <DropdownOption value={""} id={"empty-option"} key={"empty-option"} />;
};
