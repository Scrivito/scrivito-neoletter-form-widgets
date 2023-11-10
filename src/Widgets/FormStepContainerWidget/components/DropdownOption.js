import * as React from "react";

export const DropdownOption = ({ value, id }) => {
  return (
    <option value={value} id={id}>
      {value}
    </option>
  );
};
