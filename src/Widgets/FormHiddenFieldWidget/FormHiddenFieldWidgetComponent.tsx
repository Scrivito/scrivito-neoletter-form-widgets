import * as React from "react";
import * as Scrivito from "scrivito";
import { isEmpty } from "lodash-es";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { FormHiddenFieldWidget } from "./FormHiddenFieldWidgetClass";

Scrivito.provideComponent(FormHiddenFieldWidget, ({ widget }) => {
  const name = getFieldName(widget);
  if (isEmpty(name)) return null;
  return <input type="hidden" name={name} value={widget.get("hiddenValue")} />;
});
