import * as React from "react";
import * as Scrivito from "scrivito";
import { DropdownOption } from "./DropdownOption";
import { Mandatory } from "./MandatoryComponent";
import { HelpText } from "./HelpTextComponent";
import { getFieldName } from "../utils/getFieldName";

interface DropdownProps {
  options: string[];
  name: string;
  useFloatingLabel: boolean;
  widget: Scrivito.Widget;
  required: boolean;
  helptext: string;
  title: string;
  onInputChange: (fieldName: string, value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  name,
  useFloatingLabel,
  widget,
  required,
  helptext,
  title,
  onInputChange
}) => {
  const id = widget.id();

  const [isSelected, setIsSelected] = React.useState(false);


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsSelected(event.target.value !== "");
    onInputChange(getFieldName(widget), event.target.value);
  };

  return (
    <div className={`dropdown-wrapper ${useFloatingLabel ? 'floating-label' : ''} ${isSelected ? "is-selected" : ""}`}>
      {title && <label htmlFor={id} className="dropdown-label">
        <Scrivito.ContentTag
          attribute="title"
          content={widget}
          tag="span"
        />
        {required && <Mandatory />}
        {helptext && <HelpText widget={widget} />}
      </label>
      }
      <select
        className="dropdown-select form-select form-control"
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
