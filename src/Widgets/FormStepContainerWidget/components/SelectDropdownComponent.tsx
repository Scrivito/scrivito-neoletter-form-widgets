import * as React from "react";
import { DropdownOption } from "./DropdownOption";
type props = {
  options: string[];
  name: string;
  id: string;
  required: boolean;
};
export const Dropdown = ({ options, name, id, required }: props) => {
  return (
    <select className="dropdown-select" name={name} id={id} required={required}>
      {<DropdownOption value={""} id={"empty-option"} key={"empty-option"} />}
      {options.map((optionValue, index) => (
        <DropdownOption value={optionValue} id={index.toString()} key={index} />
      ))}
    </select>
  );
};
