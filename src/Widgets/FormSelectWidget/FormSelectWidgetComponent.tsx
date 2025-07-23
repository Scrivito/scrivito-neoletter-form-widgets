import * as React from "react";
import * as Scrivito from "scrivito";
import { isEmpty } from "../FormStepContainerWidget/utils/lodashPolyfills";
import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { Select } from "../FormStepContainerWidget/components/SelectComponent";
import { Mandatory } from "../FormStepContainerWidget/components/MandatoryComponent";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { Dropdown } from "../FormStepContainerWidget/components/SelectDropdownComponent";
import { FormSelectWidget } from "./FormSelectWidgetClass";
import { ResetInputs } from "../FormStepContainerWidget/components/ResetInputsComponent";
import { useFormContext } from "../FormStepContainerWidget/FormContext";
import { useValidationField } from "../../FormValidation/hooks/useValidationField";
import { MessageBlock } from "../FormStepContainerWidget/components/MessageBlock";
import "./FormSelectWidget.scss";

Scrivito.provideComponent(FormSelectWidget, ({ widget }) => {

  const [selected, setSelected] = React.useState(false);
  const items = widget.get("items");
  const fieldName = getFieldName(widget);
  const mandatory = widget.get("required");
  const isMultiSelect = widget.get("selectionType") == "multi";
  const isDropdown = widget.get("selectionType") == "dropdown";
  const validationText = widget.get("validationText") || "Please select an item ";
  const titleAlignment = widget.get("titleAlignment") || "left";
  const floatingLabel = widget.get("useFloatingLabel")
  const ctx = useFormContext();
  if (!ctx) {
    return <MessageBlock type="noContext" />;
  }

  const { isLocallyValid, setIsLocallyValid, ref } = useValidationField(fieldName, mandatory);

  const isInvalid = !isLocallyValid;

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
      mandatory && setIsLocallyValid(!isEmpty(selectedValues));
      ctx.onInputChange(getFieldName(widget), selectedValues.join(", "));
    }
  }
  const onChangeDropdown = (fieldName: string, value: string) => {
    mandatory && setIsLocallyValid(!isEmpty(value));
    ctx.onInputChange(fieldName, value);
  }

  const onReset = () => {
    setSelected(false);
    ctx.onInputChange(getFieldName(widget), "");
    mandatory && setIsLocallyValid(false);
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
          titleAlignment={titleAlignment}
          onInputChange={onChangeDropdown}
          isInvalid={isInvalid}
        />
      ) : (
        <>
          {widget.get("title") && <div className={`select-title ${titleAlignment}`}>
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
            isInvalid={isInvalid}
            widget={widget}
            name={getFieldName(widget)}
            onChange={onChangeSelect}
            onClickNavigate={() => (isMultiSelect || !widget.get("navigateOnClick")) ? null : ctx.navigateOnClick()}
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
      {(mandatory && isInvalid) && <div className={`invalid-feedback ${!floatingLabel ? `${titleAlignment}` : ``}`}>
        {validationText}
      </div>}
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
