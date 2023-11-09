import * as React from "react";
import * as Scrivito from "scrivito";
import { Star } from "../FormStepContainerWidget/components/StarComponent";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import "./FormRatingWidget.scss";

Scrivito.provideComponent("FormRatingWidget", ({ widget }) => {
  const [selectedStars, setSelectedStars] = React.useState(0);

  return (
    <div className="form-rating mb-3">
      <div className="rating-title">
        <span className="text-super">{widget.get("title")}</span>
        {widget.get("helpText") && <HelpText widget={widget} />}
      </div>
      {createArray(5).map((n, i) => (
        <Star
          key={i}
          color={"gold"}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <input
        type="hidden"
        className="show-in-review"
        name={getFieldName(widget)}
        value={selectedStars == 0 ? "" : selectedStars}
      ></input>
    </div>
  );
});

const createArray = (length) => [...Array(length)];
