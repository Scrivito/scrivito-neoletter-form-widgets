import * as React from "react";
import * as Scrivito from "scrivito";
import { LinearScale } from "./LinearScaleComponent";
import { RankingSelect } from "./RankingSelectComponent";
interface SelectProps {
  isMultiSelect: boolean;
  required: boolean;
  isInvalid: boolean;
  widget: Scrivito.Widget;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onRankingChange?: (value: string) => void;
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
  ({ isMultiSelect, required, isInvalid, widget, name, onChange, onRankingChange, onClickNavigate }) => {
    const type = widget.get("selectionType") as string;
    const items = widget.get("items") as string[];
    // works only for inline view for now
    const itemsAlignment = widget.get("alignment") as string || "left";
    if (type == "radio" || type == "multi") {
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
    if (type == "ranking") {
      return (
        <RankingSelect
          items={items}
          name={name}
          isInvalid={isInvalid}
          updateRankingNumbers={widget.get("updateRankingNumbers") as boolean || false}
          onRankingChange={onRankingChange}
        />
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
  const isRequired = required && (
    selectionType == "radio" ||
    selectionType == "linear-scale" ||
    selectionType == "multi" ||
    selectionType == "checkbox"
  );
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
