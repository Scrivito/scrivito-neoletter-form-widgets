import { Widget } from "scrivito";
import { getFormContainer } from "../getFormContainer";

export function insideFormContainerValidation(widget: Widget): string {
  if (!getFormContainer(widget)) {
    return "Needs to be inside a Neoletter form.";
  }
  return "";
}
