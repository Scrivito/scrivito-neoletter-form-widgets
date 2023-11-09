import * as React from "react";

export const Star = ({ selected = false, color, onSelect }) => (
  <i
    className="fa fa-star fa-lg"
    style={{ color: selected ? color : "grey" }}
    onClick={onSelect}
  />
);
