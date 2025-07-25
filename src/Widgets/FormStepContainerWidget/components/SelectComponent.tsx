import * as React from "react";
import * as Scrivito from "scrivito";
import { LinearScale } from "./LinearScaleComponent";
interface SelectProps {
  isMultiSelect: boolean;
  required: boolean;
  isInvalid: boolean;
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
  isInvalid: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClickNavigate?: React.MouseEventHandler<HTMLInputElement>;
}

export const Select: React.FC<SelectProps> = Scrivito.connect(
  ({ isMultiSelect, required, isInvalid, widget, name, onChange, onClickNavigate }) => {
    const type = widget.get("selectionType") as string;
    // works only for inline view for now
    const itemsAlignment = widget.get("alignment") as string || "left";
    if (type == "radio" || type == "multi") {
      const items = widget.get("items") as string[];
      return (
        <div className={`${widget.get("inlineView") ? "inline" : "row"} ${itemsAlignment}`}>
          {items.map((itemValue, index) => (
            <SelectItem
              selectionType={isMultiSelect ? "multi" : "radio"}
              name={name}
              value={itemValue}
              required={required}
              isInvalid={isInvalid}
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
        isInvalid={isInvalid}
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
  isInvalid,
  onChange,
  onClickNavigate
}: SelectItemProps) => {
  const isRequired = required && (selectionType == "radio" || selectionType == "linear-scale");
  const type = selectionType == "radio" || selectionType == "linear-scale" ? "radio" : "checkbox";
  return (
    <label className={`select-label ${selectionType}`}>
      <input
        className={`form-check-input ${(isRequired && isInvalid) ? "is-invalid" : ""}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onClick={onClickNavigate}
        id={id}
      />
      <span>{value}</span>
    </label>
  );
};
