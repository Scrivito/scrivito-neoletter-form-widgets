import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { Mandatory } from "../FormStepContainerWidget/components/MandatoryComponent";
import { FormDateWidget } from "./FormDateWidgetClass";
import "./FormDateWidget.scss";

Scrivito.provideComponent(FormDateWidget, ({ widget }) => {
  const [value, setValue] = React.useState("");
  const onChangeValue = (e: React.BaseSyntheticEvent) => {
    const d = new Date(e.target.value);
    setValue(d.toISOString());
  };
  return (
    <div className="form-date mb-3">
      <div className="date-title">
        <span className="text-super">{widget.get("title")}</span>
        {widget.get("required") && <Mandatory />}
        {widget.get("helpText") && <HelpText widget={widget} />}
      </div>

      <input
        onChange={onChangeValue}
        className="datepicker"
        type={widget.get("dateType")!}
        required={widget.get("required")}
      ></input>
      <input
        type="hidden"
        className="show-in-review"
        name={getFieldName(widget)}
        value={value}
      ></input>
    </div>
  );
});
