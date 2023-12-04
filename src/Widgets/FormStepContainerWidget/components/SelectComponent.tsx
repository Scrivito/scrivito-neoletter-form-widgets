import * as React from "react";
import * as Scrivito from "scrivito";
import { LinearScale } from "./LinearScaleComponent";
interface SelectProps {
  isMultiSelect: boolean;
  required: boolean;
  widget: Scrivito.Widget;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
interface SelectItemProps {
  selectionType: string;
  value: string;
  id?: string;
  name: string;
  required: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Select: React.FC<SelectProps> = Scrivito.connect(
  ({ isMultiSelect, required, widget, name, onChange }) => {
    const type = widget.get("selectionType") as string;
    if (type == "radio" || type == "multi") {
      const items = widget.get("items") as string[];
      return (
        <div className={`${widget.get("inlineView") ? "inline" : "row"}`}>
          {items.map((itemValue, index) => (
            <SelectItem
              selectionType={isMultiSelect ? "multi" : "radio"}
              name={name}
              value={itemValue}
              required={required}
              key={index}
              onChange={onChange}
            />
          ))}
        </div>
      );
    }
    return (
      <LinearScale
        name={name}
        widget={widget}
        onChange={onChange}
      ></LinearScale>
    );
  },
);

export const SelectItem: React.FC<SelectItemProps> = ({
  selectionType,
  value,
  id,
  name,
  required,
  onChange,
}: SelectItemProps) => {
  return (
    <label
      className={`select-label ${
        selectionType == "linear-scale" ? "linear-scale" : ""
      }`}
    >
      <input
        className="form-check-input"
        name={name}
        required={
          (selectionType == "radio" || selectionType == "linear-scale") &&
          required
        }
        type={
          selectionType == "radio" || selectionType == "linear-scale"
            ? "radio"
            : "checkbox"
        }
        value={value}
        onChange={onChange}
        id={id}
      />
      <span>{value}</span>
    </label>
  );
};
