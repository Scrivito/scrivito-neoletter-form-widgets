import * as React from "react";
import * as Scrivito from "scrivito";
import { FormButtonWidget } from "./FormButtonWidgetClass";
interface WrapIfClassNameProps {
  className: string;
}

Scrivito.provideComponent(FormButtonWidget, ({ widget }) => (
  <WrapIfClassName className={alignmentClassName(widget.get("alignment"))}>
    <button
      className={`btn btn-primary${
        widget.get("alignment") === "block" ? " btn-block" : ""
      }`}
      type="submit">
      <Scrivito.ContentTag tag="span" content={widget} attribute="buttonText" />
    </button>
  </WrapIfClassName>
));

function WrapIfClassName({
  className,
  children
}: React.PropsWithChildren<WrapIfClassNameProps>) {
  return className ? <div className={className}>{children}</div> : children;
}
function alignmentClassName(widgetAlignment: string | null) {
  if (widgetAlignment === "center") return "text-center";
  if (widgetAlignment === "right") return "text-end";
  return "";
}
