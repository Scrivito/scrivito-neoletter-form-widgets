import * as React from "react";
type SelectProps = {
  items: string[];
  isMultiSelect: boolean;
  required: boolean;
  name: string;
};
type SelectItemProps = {
  selectionType: string;
  value: string;
  id?: string;
  name: string;
  required: boolean | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const Select = ({
  items,
  isMultiSelect,
  required,
  name,
}: SelectProps) => {
  return (
    <div className="row">
      {items.map((itemValue, index) => (
        <SelectItem
          selectionType={isMultiSelect ? "multi" : "radio"}
          name={name}
          value={itemValue}
          required={required}
          key={index}
        />
      ))}
    </div>
  );
};

export const SelectItem = ({
  selectionType,
  value,
  id,
  name,
  required,
  onChange,
}: SelectItemProps) => {
  return (
    <label className="select-label">
      <input
        className="form-check-input"
        name={name}
        required={selectionType == "radio" ? required : undefined}
        type={selectionType == "radio" ? "radio" : "checkbox"}
        value={value}
        onChange={onChange}
        id={id}
      />
      <span>{value}</span>
    </label>
  );
};
