import * as React from "react";
import * as Scrivito from "scrivito";
import { SelectItem } from "./SelectComponent";
import { range } from "../utils/lodashPolyfills";

const LOWER_LIMIT_FALLBACK = 0;
const UPPER_LIMIT_FALLBACK = 5;

interface LinearScaleProps {
  name: string;
  isInvalid: boolean;
  widget: Scrivito.Widget;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
export const LinearScale: React.FC<LinearScaleProps> = Scrivito.connect(
  ({ name, isInvalid, widget, onChange }) => {
    const required = widget.get("required") as boolean;
    const items = getScaleItems(widget);
    const lowerScaleLabel = widget.get("linearScaleLowerLabel");
    const upperScaleLabel = widget.get("linearScaleUpperLabel");
    return (
      <div className="linear-scale-container">
        {lowerScaleLabel && (
          <span className="scale-label lower">{lowerScaleLabel as string}</span>
        )}
        <div className="row">
          {items.map((itemValue, index) => (
            <SelectItem
              selectionType={"linear-scale"}
              name={name}
              value={itemValue}
              required={required}
              isInvalid={isInvalid}
              key={index}
              onChange={onChange}
            />
          ))}
        </div>
        {upperScaleLabel && (
          <span className="scale-label upper">{upperScaleLabel as string}</span>
        )}
      </div>
    );
  }
);

function getScaleItems(widget: Scrivito.Widget): string[] {
  const lowerLimit =
    parseInt(widget.get("linearScaleLowerLimit") as string) ||
    LOWER_LIMIT_FALLBACK;
  const upperLimit =
    parseInt(widget.get("linearScaleUpperLimit") as string) ||
    UPPER_LIMIT_FALLBACK;

  return range(lowerLimit, upperLimit + 1).map((num) => num.toString());
}
