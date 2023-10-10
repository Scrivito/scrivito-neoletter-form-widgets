import * as React from "react";
import { DropdownOption } from "./DropdownOption";

export const Dropdown = ({ options, name, id, required }) => {
  return (
    <select className="dropdown-select" name={name} id={id} required={required}>
      {<DropdownOption value={""} id={"empty-option"} key={"empty-option"} />}
      {options.map((optionValue, index) => (
        <DropdownOption value={optionValue} id={index} key={index} />
      ))}
    </select>
  );
};
