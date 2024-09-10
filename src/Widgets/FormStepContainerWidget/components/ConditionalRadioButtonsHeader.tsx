import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../utils/getFieldName";
import { SelectItem } from "./SelectComponent";
import { Mandatory } from "./MandatoryComponent";
import { HelpText } from "./HelpTextComponent";

export const RadioButtonsHeader = Scrivito.connect(
  ({ widget, onChangeSelected }) => {
    return (
      <div
        className={`mb-3 select-container ${Scrivito.isInPlaceEditingActive() ? "condition-wrapper" : ""
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
        <div className="row ">
          {widget.get("conditions").map((condition: Scrivito.Widget) => (
            <SelectItem
              selectionType={"radio"}
              name={getFieldName(widget)}
              onChange={onChangeSelected}
              value={condition.get("title") as string}
              id={condition.id()}
              required={widget.get("required")}
              key={condition.id()}
            />
          ))}
        </div>
      </div>
    );
  }
);
