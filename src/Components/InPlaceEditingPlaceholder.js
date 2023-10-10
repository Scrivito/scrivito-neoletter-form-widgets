import * as React from "react";
import * as Scrivito from "scrivito";
const placeholderCss = {
  color: "rgba(64, 64, 64, 0.53)",
  display: "inline-block",
  fontSize: "13px",
  fontStyle: "normal",
  fontWeight: "normal",
  lineHeight: "28px",
  verticalAlign: "middle",
};
/** A copy of Scrivitos InPlaceEditingPlaceholder */
export const InPlaceEditingPlaceholder = ({ children, center, block }) => {
  if (!Scrivito.isInPlaceEditingActive()) return null;

  const innerSpan = <span style={placeholderCss}>{children}</span>;

  if (center) return <div className="text-center">{innerSpan}</div>;

  if (block) return <div>{innerSpan}</div>;

  return innerSpan;
};
