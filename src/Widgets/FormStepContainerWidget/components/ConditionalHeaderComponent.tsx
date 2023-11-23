import * as React from "react";
import * as Scrivito from "scrivito";
import { RadioButtonsHeader } from "./ConditionalRadioButtonsHeader";
import { DropdownHeader } from "./ConditionalDropdownHeader";

interface ConditionalHeaderProps {
  widget: Scrivito.Widget;
  onChangeSelected: Function;
}
export const ConditionalHeader = ({
  widget,
  onChangeSelected,
}: ConditionalHeaderProps) => {
  const isDropdownHeader = widget.get("headerType") == "dropdown";
  return (
    <>
      {Scrivito.isInPlaceEditingActive() && (
        <span className="header-info">Conditional Header</span>
      )}
      {isDropdownHeader ? (
        <DropdownHeader widget={widget} onChangeSelected={onChangeSelected} />
      ) : (
        <RadioButtonsHeader
          widget={widget}
          onChangeSelected={onChangeSelected}
        />
      )}
    </>
  );
};
