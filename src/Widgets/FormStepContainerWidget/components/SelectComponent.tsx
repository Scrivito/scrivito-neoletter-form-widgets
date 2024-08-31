import * as React from "react";
import * as Scrivito from "scrivito";
import { LinearScale } from "./LinearScaleComponent";
interface SelectProps {
  isMultiSelect: boolean;
  required: boolean;
  widget: Scrivito.Widget;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClickNavigate: React.MouseEventHandler<HTMLInputElement>;
}
interface SelectItemProps {
  selectionType: string;
  value: string;
  id?: string;
  name: string;
  required: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClickNavigate?: React.MouseEventHandler<HTMLInputElement>;
}

export const Select: React.FC<SelectProps> = Scrivito.connect(
  ({ isMultiSelect, required, widget, name, onChange, onClickNavigate }) => {
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
              onClickNavigate={onClickNavigate}
            />
          ))}
        </div>
      );
    }
    return (
      <LinearScale
        name={name}
        widget={widget}
        onChange={onChange}></LinearScale>
    );
  }
);

export const SelectItem: React.FC<SelectItemProps> = ({
  selectionType,
  value,
  id,
  name,
  required,
  onChange,
  onClickNavigate
}: SelectItemProps) => {
  return (
    <label className={`select-label ${selectionType}`}>
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
        onClick={onClickNavigate}
        id={id}
      />
      <span>{value}</span>
    </label>
  );
};
