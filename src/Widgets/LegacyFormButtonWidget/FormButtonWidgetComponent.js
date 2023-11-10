import * as React from "react";
import * as Scrivito from "scrivito";
Scrivito.provideComponent("FormButtonWidget", ({ widget }) => (
  <WrapIfClassName className={alignmentClassName(widget.get("alignment"))}>
    <button
      className={`btn btn-primary${
        widget.get("alignment") === "block" ? " btn-block" : ""
      }`}
      type="submit"
    >
      <Scrivito.ContentTag tag="span" content={widget} attribute="buttonText" />
    </button>
  </WrapIfClassName>
));

function WrapIfClassName({ className, children }) {
  return className ? <div className={className}>{children}</div> : children;
}
function alignmentClassName(widgetAlignment) {
  if (widgetAlignment === "center") return "text-center";
  if (widgetAlignment === "right") return "text-end";

  return null;
}
