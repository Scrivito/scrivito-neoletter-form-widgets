import * as React from "react";

type StarProps = {
  selected: boolean;
  color: string;
  onSelect: React.MouseEventHandler;
};
export const Star = ({ selected = false, color, onSelect }: StarProps) => (
  <i
    className="fa fa-star fa-lg"
    style={{ color: selected ? color : "grey" }}
    onClick={onSelect}
  />
);
