import * as React from "react";
import * as Scrivito from "scrivito";
import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import "./FormSelectWidget.scss";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";
import { Select } from "../FormContainerWidget/components/SelectComponent";
import { Mandatory } from "../FormContainerWidget/components/MandatoryComponent";
import { HelpText } from "../FormContainerWidget/components/HelpTextComponent";
import { Dropdown } from "../FormContainerWidget/components/SelectDropdownComponent";

Scrivito.provideComponent("FormSelectWidget", ({ widget }) => {
  const items = widget.get("items");
  const isMultiSelect = widget.get("selectionType") == "multi";
  const isDropdown = widget.get("selectionType") == "dropdown";
  if (!items.length) {
    return (
      <InPlaceEditingPlaceholder center>
        Add items in the widget properties.
      </InPlaceEditingPlaceholder>
    );
  }

  return (
    <div className="select-container mb-3">
      <div className="select-title">
        <span className="text-super"> {widget.get("title")} </span>
        {!isMultiSelect && widget.get("required") && <Mandatory />}
        {widget.get("helpText") && <HelpText widget={widget} />}
      </div>
      {isDropdown ? (
        <Dropdown
          id={widget.id()}
          name={getFieldName(widget)}
          options={items}
          required={widget.get("required")}
        />
      ) : (
        <Select
          isMultiSelect={isMultiSelect}
          items={widget.get("items")}
          required={widget.get("required")}
          name={getFieldName(widget)}
        />
      )}
    </div>
  );
});
