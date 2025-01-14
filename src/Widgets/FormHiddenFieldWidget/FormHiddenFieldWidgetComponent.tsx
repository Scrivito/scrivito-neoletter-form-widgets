import * as React from "react";
import * as Scrivito from "scrivito";

import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { FormHiddenFieldWidget } from "./FormHiddenFieldWidgetClass";
import { isEmpty } from "../FormStepContainerWidget/utils/lodashPolyfills";
import { getUrlParameter } from "../FormStepContainerWidget/utils/getUrlParamter";

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
  if (widget.get("type") == "urlParam") {
    const key = widget.get("urlParameterKey") as string || "";
    return getUrlParameter(key);
  }
  return widget.get("hiddenValue") as string;
}
