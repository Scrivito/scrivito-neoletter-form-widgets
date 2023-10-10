import * as React from "react";

export const Select = ({ items, isMultiSelect, required, name }) => {
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
}) => {
  return (
    <label className="select-label">
      <input
        className="form-check-input"
        name={name}
        required={selectionType == "radio" ? required : null}
        type={selectionType == "radio" ? "radio" : "checkbox"}
        value={value}
        onChange={onChange}
        id={id}
      />
      <span>{value}</span>
    </label>
  );
};
