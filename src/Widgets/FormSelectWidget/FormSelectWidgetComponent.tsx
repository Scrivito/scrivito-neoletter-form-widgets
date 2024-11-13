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
import { useFormContext } from "../FormStepContainerWidget/FormContext";

Scrivito.provideComponent(FormSelectWidget, ({ widget }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [selected, setSelected] = React.useState(false);
  const items = widget.get("items");
  const isMultiSelect = widget.get("selectionType") == "multi";
  const isDropdown = widget.get("selectionType") == "dropdown";
  const { onInputChange, navigateOnClick } = useFormContext();

  const onChangeSelect = () => {
    setSelected(true);
    if (ref && ref.current) {
      const inputs = ref.current.getElementsByTagName("input");
      const inputArray = Array.from(inputs);
      const selectedValues: string[] = [];
      inputArray.forEach((input) => {
        if (input.checked) {
          selectedValues.push(input.value)
        }
      });

      onInputChange(getFieldName(widget), selectedValues.join(", "))
    }
  }

  const onReset = () => {
    setSelected(false);
    onInputChange(getFieldName(widget), "");
  }

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
          required={widget.get("required")}
          helptext={widget.get("helpText")}
          title={widget.get("title")}
          onInputChange={onInputChange}
        />
      ) : (
        <>
          {widget.get("title") && <div className="select-title">
            <Scrivito.ContentTag
              attribute="title"
              content={widget}
              tag="span"
            />
            {!isMultiSelect && widget.get("required") && <Mandatory />}
            {widget.get("helpText") && <HelpText widget={widget} />}
          </div>
          }
          <Select
            isMultiSelect={isMultiSelect}
            required={widget.get("required")}
            widget={widget}
            name={getFieldName(widget)}
            onChange={onChangeSelect}
            onClickNavigate={() => (isMultiSelect || !widget.get("navigateOnClick")) ? null : navigateOnClick()}
          />
        </>
      )}
      {showReset() && (
        <ResetInputs
          onReset={onReset}
          text={widget.get("clearSelectionButtonText")}
          parentRef={ref}
        />
      )}
    </div>
  );
  function showReset(): boolean {
    return (
      widget.get("showClearSelectionButton") &&
      selected &&
      !widget.get("required") &&
      (widget.get("selectionType") == "radio" ||
        widget.get("selectionType") == "linear-scale")
    );
  }
});
