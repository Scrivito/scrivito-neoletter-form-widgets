import * as React from "react";
import * as Scrivito from "scrivito";
import { ConditionalHeader } from "../FormStepContainerWidget/components/ConditionalHeaderComponent";
import { FormConditionalContainerWidget } from "./FormConditionalContainerWidgetClass";
import { StringMap } from "../../../types/types";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { isEmpty } from "../FormStepContainerWidget/utils/lodashPolyfills";
import "./FormConditionalContainerWidget.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Scrivito.provideComponent(FormConditionalContainerWidget, ({ widget, onInputChange }: any) => {
  const [selectedConditionId, setSelectedConditionId] = React.useState("");
  const isDropdownHeader = widget.get("headerType") == "dropdown";

  const resetFieldsInConditions = (conditions: Scrivito.Widget[]) => {
    const resetFields = conditions
      .flatMap(condition => condition.get("content") as Scrivito.Widget[])
      .map(widget => getFieldName(widget))
      .filter(fieldName => !isEmpty(fieldName))
      .reduce((acc, fieldName) => {
        acc[fieldName] = "";
        return acc;
      }, {} as StringMap<string>);

    onInputChange(resetFields);
  };

  const onChangeSelected = (e: React.BaseSyntheticEvent) => {
    const selectedId = isDropdownHeader
      ? e.target.options[e.target.selectedIndex].id
      : e.target.id;
    setSelectedConditionId(selectedId);
    if (!onInputChange) {
      return;
    }
    // update the field corresponding to the selected condition
    onInputChange(widget.get("customFieldName"), e.target.value);

    // gather all field names to reset for the current condition
    const conditions: Scrivito.Widget[] = widget.get("conditions");
    resetFieldsInConditions(conditions);
  };

  return (
    <>
      <ConditionalHeader widget={widget} onChangeSelected={onChangeSelected} />
      <Scrivito.ContentTag
        content={widget}
        attribute="conditions"
        widgetProps={{
          getData: (conditionId: string) => {
            const conditions: Scrivito.Widget[] = widget.get("conditions");
            let isActive = false;
            conditions.some(condition => {
              if (condition.id() == conditionId) {
                isActive = selectedConditionId == conditionId;
                return true;
              }
            });
            return { isActive };
          },
          onInputChange
        }
        }
      />
    </>
  );
});
