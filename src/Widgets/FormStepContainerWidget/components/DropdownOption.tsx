import * as React from "react";
interface DropdownOptionProps {
  value: string;
  id: string;
}
export const DropdownOption: React.FC<DropdownOptionProps> = ({
  value,
  id
}) => {
  return (
    <option value={value} id={id}>
      {value}
    </option>
  );
};
