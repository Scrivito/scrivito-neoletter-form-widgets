import * as React from "react";
import * as Scrivito from "scrivito";
import { RadioButtonsHeader } from "./ConditionalRadioButtonsHeader";
import { DropdownHeader } from "./ConditionalDropdownHeader";

interface ConditionalHeaderProps {
  widget: Scrivito.Widget;
  onChangeSelected: (e: React.BaseSyntheticEvent) => void;
}
export const ConditionalHeader: React.FC<ConditionalHeaderProps> = ({
  widget,
  onChangeSelected
}) => {
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
