import * as React from "react";
interface SelectProps {
  items: string[];
  isMultiSelect: boolean;
  required: boolean;
  name: string;
}
interface SelectItemProps {
  selectionType: string;
  value: string;
  id?: string;
  name: string;
  required: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Select: React.FC<SelectProps> = ({
  items,
  isMultiSelect,
  required,
  name,
}) => {
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

export const SelectItem: React.FC<SelectItemProps> = ({
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
        required={selectionType === "radio" && required}
        type={selectionType == "radio" ? "radio" : "checkbox"}
        value={value}
        onChange={onChange}
        id={id}
      />
      <span>{value}</span>
    </label>
  );
};
