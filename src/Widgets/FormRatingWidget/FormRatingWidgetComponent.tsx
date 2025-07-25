import * as React from "react";
import * as Scrivito from "scrivito";
import { RatingIcon } from "../FormStepContainerWidget/components/RatingIconComponent";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { FormRatingWidget } from "./FormRatingWidgetClass";
import { getIconColor } from "../FormStepContainerWidget/utils/getIconColor";
import { useFormContext } from "../FormStepContainerWidget/FormContext";
import { MessageBlock } from "../FormStepContainerWidget/components/MessageBlock";
import "./FormRatingWidget.scss";

Scrivito.provideComponent(FormRatingWidget, ({ widget }) => {
  const [selectedIcons, setSelectedIcons] = React.useState(0);
  const [hoveredIcons, setHoveredIcons] = React.useState(0);
  const hoverEffect = widget.get("hoverEffect");
  const alignment = widget.get("alignment");
  const color = getIconColor(widget);
  const ctx = useFormContext();
  if (!ctx) {
    return <MessageBlock type="noContext" />;
  }

  const handleSelect = (rating: number) => {
    setSelectedIcons(rating);
    ctx.onInputChange && ctx.onInputChange(getFieldName(widget), rating == 0 ? "" : rating.toString());

  }
  return (
    <div className={`form-rating mb-3 ${alignment}`}>
      {widget.get("title") && <div className={`rating-title `}>
        <Scrivito.ContentTag
          attribute="title"
          content={widget}
          tag="span"
        />
        {widget.get("helpText") && <HelpText widget={widget} />}
      </div>
      }
      <div className="icons-container">
        {createArray(5).map((n, i) => (
          <RatingIcon
            key={i}
            icon={widget.get("icon") || "bi-star-fill"}
            color={getColor(
              color,
              selectedIcons > i,
              hoverEffect && hoveredIcons > i
            )}
            size={widget.get("size") || "bs-icon-default"}
            onSelect={() => handleSelect(i + 1)}
            onHover={() => hoverEffect && setHoveredIcons(i + 1)}
            onHoverOut={() => hoverEffect && setHoveredIcons(0)}
          />
        ))}
      </div>
      <input
        type="hidden"
        className="show-in-review"
        name={getFieldName(widget)}
        value={selectedIcons == 0 ? "" : selectedIcons}></input>
    </div>
  );
});

const createArray = (length: number) => [...Array(length)];

const getColor = (
  color: string,
  selected: boolean,
  hoveredOver: boolean
): string => {
  return selected || hoveredOver ? color : "";
};
