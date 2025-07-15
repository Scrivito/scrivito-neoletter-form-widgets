import * as React from "react";
import * as Scrivito from "scrivito";
import { ConditionalHeader } from "../FormStepContainerWidget/components/ConditionalHeaderComponent";
import { FormConditionalContainerWidget } from "./FormConditionalContainerWidgetClass";
import { StringMap } from "../../../types/types";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { isEmpty } from "../FormStepContainerWidget/utils/lodashPolyfills";
import { useFormContext } from "../FormStepContainerWidget/FormContext";
import { ConditionProvider } from "./ConditionContext";
import "./FormConditionalContainerWidget.scss";
import { MessageBlock } from "../FormStepContainerWidget/components/MessageBlock";

Scrivito.provideComponent(FormConditionalContainerWidget, ({ widget }) => {
  const [selectedConditionId, setSelectedConditionId] = React.useState("");
  const isDropdownHeader = widget.get("headerType") == "dropdown";

  const ctx = useFormContext();
  if (!ctx) {
    return <MessageBlock type="noContext" />;
  }

  const resetFieldsInConditions = (conditions: Scrivito.Widget[]) => {
    const resetFields = conditions
      .flatMap(condition => condition.get("content") as Scrivito.Widget[])
      .map(widget => getFieldName(widget))
      .filter(fieldName => !isEmpty(fieldName))
      .reduce((acc, fieldName) => {
        acc[fieldName] = "";
        return acc;
      }, {} as StringMap<string>);

    ctx.onInputChange(resetFields);
  };

  const onChangeSelected = (e: React.BaseSyntheticEvent) => {
    const selectedId = isDropdownHeader
      ? e.target.options[e.target.selectedIndex].id
      : e.target.id;
    setSelectedConditionId(selectedId);
    if (!ctx.onInputChange) {
      return;
    }
    // update the field corresponding to the selected condition
    ctx.onInputChange(widget.get("customFieldName"), e.target.value);

    // gather all field names to reset for the current condition
    const conditions: Scrivito.Widget[] = widget.get("conditions");
    resetFieldsInConditions(conditions);
  };

  const getConditionData = (conditionId: string) => {
    const conditions: Scrivito.Widget[] = widget.get("conditions") || [];
    let isActive = false;
    conditions.some(condition => {
      if (condition.id() === conditionId) {
        isActive = selectedConditionId === conditionId;
        return true;
      }
      return false;
    });
    return { isActive };
  };

  return (
    <>
      <ConditionalHeader widget={widget} onChangeSelected={onChangeSelected} />
      <ConditionProvider value={{ getConditionData }}>
        <Scrivito.ContentTag
          content={widget}
          attribute="conditions"
        />
      </ConditionProvider>
    </>
  );
});
