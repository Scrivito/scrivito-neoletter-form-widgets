import * as React from "react";
import * as Scrivito from "scrivito";
import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { Select } from "../FormStepContainerWidget/components/SelectComponent";
import { Mandatory } from "../FormStepContainerWidget/components/MandatoryComponent";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { Dropdown } from "../FormStepContainerWidget/components/SelectDropdownComponent";
import { FormSelectWidget } from "./FormSelectWidgetClass";
import { ResetInputs } from "../FormStepContainerWidget/components/ResetInputsComponent";
import "./FormSelectWidget.scss";

Scrivito.provideComponent(FormSelectWidget, ({ widget }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [selected, setSelected] = React.useState(false);
  const items = widget.get("items");
  const isMultiSelect = widget.get("selectionType") == "multi";
  const isDropdown = widget.get("selectionType") == "dropdown";
  if (!items.length && widget.get("selectionType") != "linear-scale") {
    return (
      <InPlaceEditingPlaceholder center>
        Add items in the widget properties.
      </InPlaceEditingPlaceholder>
    );
  }

  return (
    <div className="select-container mb-3" ref={ref}>
      {isDropdown ? (
        <Dropdown
          name={getFieldName(widget)}
          options={items}
          useFloatingLabel={widget.get("useFloatingLabel") || false}
          widget={widget}
        />
      ) : (
        <>
          <div className="select-title">
            <span className="text-super"> {widget.get("title")} </span>
            {!isMultiSelect && widget.get("required") && <Mandatory />}
            {widget.get("helpText") && <HelpText widget={widget} />}
          </div>
          <Select
            isMultiSelect={isMultiSelect}
            required={widget.get("required")}
            widget={widget}
            name={getFieldName(widget)}
            onChange={() => setSelected(true)}
          />
        </>
      )}
      {showReset() && (
        <ResetInputs
          setSelectedCallback={setSelected}
          text={widget.get("clearSelectionText")}
          parentRef={ref}
        />
      )}
    </div>
  );
  function showReset(): boolean {
    return (
      selected &&
      !widget.get("required") &&
      (widget.get("selectionType") == "radio" ||
        widget.get("selectionType") == "linear-scale")
    );
  }
});
