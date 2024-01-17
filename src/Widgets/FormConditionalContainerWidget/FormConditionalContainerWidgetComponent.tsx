import * as React from "react";
import * as Scrivito from "scrivito";
import { ConditionalHeader } from "../FormStepContainerWidget/components/ConditionalHeaderComponent";
import { FormConditionalContainerWidget } from "./FormConditionalContainerWidgetClass";
import "./FormConditionalContainerWidget.scss";

Scrivito.provideComponent(FormConditionalContainerWidget, ({ widget }) => {
  const [selectedConditionId, setSelectedConditionId] = React.useState("");
  const isDropdownHeader = widget.get("headerType") == "dropdown";
  const onChangeSelected = (e: React.BaseSyntheticEvent) => {
    const selectedId = isDropdownHeader
      ? e.target.options[e.target.selectedIndex].id
      : e.target.id;
    setSelectedConditionId(selectedId);
  };

  return (
    <>
      <ConditionalHeader widget={widget} onChangeSelected={onChangeSelected} />
      <Scrivito.ContentTag
        content={widget}
        attribute="conditions"
        widgetProps={{
          getData: (conditionId: string) => {
            const conditions = widget.get("conditions");
            let isActive = false;
            conditions.some(condition => {
              if (condition.id() == conditionId) {
                isActive = selectedConditionId == conditionId;
                return true;
              }
            });
            return { isActive };
          }
        }}
      />
    </>
  );
});
