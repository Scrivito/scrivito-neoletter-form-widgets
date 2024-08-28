import * as React from "react";
import * as Scrivito from "scrivito";
import { DropdownOption } from "./DropdownOption";
import { Mandatory } from "./MandatoryComponent";
import { HelpText } from "./HelpTextComponent";

interface DropdownProps {
  options: string[];
  name: string;
  useFloatingLabel: boolean;
  widget: Scrivito.Widget;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  name,
  useFloatingLabel,
  widget
}) => {
  const id = widget.id();
  const required = widget.get("required") as boolean;
  const [isSelected, setIsSelected] = React.useState(false);


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsSelected(event.target.value !== "");
  };

  return (
    <div className={`dropdown-wrapper ${useFloatingLabel ? 'floating-label' : ''} ${isSelected ? "is-selected" : ""}`}>
      <label htmlFor={id} className="dropdown-label">
        {widget.get("title") as string} {required && <Mandatory />}
        {widget.get("helpText") && <HelpText widget={widget} />}
      </label>
      <select
        className="dropdown-select"
        name={name}
        id={id}
        required={required}
        onChange={handleChange}
      >
        <DropdownOption value={""} id={"empty-option"} key={"empty-option"} />
        {options.map((optionValue, index) => (
          <DropdownOption value={optionValue} id={index.toString()} key={index} />
        ))}
      </select>
    </div>
  );
};
