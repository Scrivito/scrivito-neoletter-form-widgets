import * as React from "react";

interface StarProps {
  selected: boolean;
  color: string;
  onSelect: React.MouseEventHandler;
}
export const Star: React.FC<StarProps> = ({
  selected = false,
  color,
  onSelect,
}) => (
  <i
    className="fa fa-star fa-lg"
    style={{ color: selected ? color : "grey" }}
    onClick={onSelect}
  />
);
