import { Widget } from "scrivito";
import { isCustomType } from "./isCustomType";

export function getFieldName(widget: Widget): string {
  if (isCustomType(widget)) {
    return widget.get("customFieldName") as string | "";
  }
  return widget.get("type") == "urlParam"
    ? widget.get("urlParameterFieldName") as string || ""
    : (widget.get("type") as string | "");
}
