import { Widget } from "scrivito";
import { getFieldName } from "./getFieldName";
import { getFormContainer } from "./getFormContainer";
import { isEmpty } from "./lodashPolyfills";

export function isFieldNameUnique(widget: Widget) {
  const fieldName = getFieldName(widget);
  if (isEmpty(fieldName)) {
    return true;
  }

  const formContainer = getFormContainer(widget);
  if (!formContainer) {
    return true;
  }

  const otherWidget = formContainer
    .widgets()
    .find(
      (child) => getFieldName(child) === fieldName && child.id() !== widget.id()
    );

  return !otherWidget;
}
