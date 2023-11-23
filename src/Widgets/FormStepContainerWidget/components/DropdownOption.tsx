import * as React from "react";
interface DropdownOptionProps {
  value: string;
  id: string;
}
export const DropdownOption = ({ value, id }: DropdownOptionProps) => {
  return (
    <option value={value} id={id}>
      {value}
    </option>
  );
};
