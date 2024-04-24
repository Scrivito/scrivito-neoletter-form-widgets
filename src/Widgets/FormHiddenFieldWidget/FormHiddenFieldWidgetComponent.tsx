import * as React from "react";
import * as Scrivito from "scrivito";

import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { FormHiddenFieldWidget } from "./FormHiddenFieldWidgetClass";
import { isEmpty } from "../FormStepContainerWidget/utils/lodashPolyfills";

Scrivito.provideComponent(FormHiddenFieldWidget, ({ widget }) => {
  const name = getFieldName(widget);
  if (isEmpty(name)) return null;
  return <input type="hidden" name={name} value={widget.get("hiddenValue")} />;
});
