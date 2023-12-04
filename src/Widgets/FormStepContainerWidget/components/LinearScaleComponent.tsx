import * as React from "react";
import * as Scrivito from "scrivito";
import { map, range } from "lodash-es";
import { SelectItem } from "./SelectComponent";
const LOWER_LIMIT_FALLBACK = 0;
const UPPER_LIMIT_FALLBACK = 5;

interface LinearScaleProps {
  name: string;
  widget: Scrivito.Widget;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
export const LinearScale: React.FC<LinearScaleProps> = Scrivito.connect(
  ({ name, widget, onChange }) => {
    const required = widget.get("required") as boolean;
    const items = getScaleItems(widget);
    const lowerScaleLabel = widget.get("linearScaleLowerLabel");
    const upperScaleLabel = widget.get("linearScaleUpperLabel");
    return (
      <div className="linear-scale-container">
        {lowerScaleLabel && (
          <span className="lower-scale-label">{lowerScaleLabel as string}</span>
        )}
        <div className="row">
          {items.map((itemValue, index) => (
            <SelectItem
              selectionType={"linear-scale"}
              name={name}
              value={itemValue}
              required={required}
              key={index}
              onChange={onChange}
            />
          ))}
        </div>
        {upperScaleLabel && (
          <span className="upper-scale-label">{upperScaleLabel as string}</span>
        )}
      </div>
    );
  },
);

function getScaleItems(widget: Scrivito.Widget): string[] {
  const lowerLimit =
    parseInt(widget.get("linearScaleLowerLimit") as string) ||
    LOWER_LIMIT_FALLBACK;
  const upperLimit =
    parseInt(widget.get("linearScaleUpperLimit") as string) ||
    UPPER_LIMIT_FALLBACK;

  return map(range(lowerLimit, upperLimit + 1), (num) => num.toString());
}
