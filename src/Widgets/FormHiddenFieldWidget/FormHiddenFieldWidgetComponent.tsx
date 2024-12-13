import * as React from "react";
import * as Scrivito from "scrivito";

import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { FormHiddenFieldWidget } from "./FormHiddenFieldWidgetClass";
import { isEmpty } from "../FormStepContainerWidget/utils/lodashPolyfills";

Scrivito.provideComponent(FormHiddenFieldWidget, ({ widget }) => {
  const name = getFieldName(widget);
  const value = getValue(widget, name);
  if (isEmpty(name)) return null;
  return <input type="hidden" name={name} value={value} />;
});

const getValue = (widget: Scrivito.Widget, fieldName: string) => {
  const useUserCredentials = Scrivito.currentPage()?.isRestricted() && Scrivito.isUserLoggedIn() && (fieldName == "email" || fieldName == "name");
  if (useUserCredentials) {
    return fieldName == "name" ? Scrivito.currentUser()?.name() || "" : Scrivito.currentUser()?.email() || "";
  }
  return widget.get("hiddenValue") as string;
}
