import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { Mandatory } from "../FormStepContainerWidget/components/MandatoryComponent";
import { FormDateWidget } from "./FormDateWidgetClass";
import { isEmpty } from "../FormStepContainerWidget/utils/lodashPolyfills";
import "./FormDateWidget.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Scrivito.provideComponent(FormDateWidget, ({ widget, onInputChange }: any) => {
  const [value, setValue] = React.useState("");
  const onChangeValue = (e: React.BaseSyntheticEvent) => {

    const isoStringDate = isEmpty(e.target.value) ? "" : new Date(e.target.value).toISOString();
    setValue(isoStringDate);
    onInputChange(getFieldName(widget), isoStringDate);
  };
  return (
    <div className="form-date mb-3">
      {widget.get("title") &&
        <div className="date-title">
          <Scrivito.ContentTag
            attribute="title"
            content={widget}
            tag="span"
          />
          {widget.get("required") && <Mandatory />}
          {widget.get("helpText") && <HelpText widget={widget} />}
        </div>
      }
      <input
        onChange={onChangeValue}
        className="datepicker"
        type={widget.get("dateType")!}
        required={widget.get("required")}></input>
      <input
        type="hidden"
        className="show-in-review"
        name={getFieldName(widget)}
        value={value}></input>
    </div>
  );
});
