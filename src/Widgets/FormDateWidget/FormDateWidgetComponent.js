import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";
import { HelpText } from "../FormContainerWidget/components/HelpTextComponent";
import { Mandatory } from "../FormContainerWidget/components/MandatoryComponent";
import "./FormDateWidget.scss";

Scrivito.provideComponent("FormDateWidget", ({ widget }) => {
  const [value, setValue] = React.useState("");
  const onChangeValue = (e) => {
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
        type={widget.get("dateType")}
        required={widget.get("required")}
      ></input>
      <input type="hidden" name={getFieldName(widget)} value={value}></input>
    </div>
  );
});
