import * as React from "react";
import { useAttributeDefinition, Widget } from "scrivito";
import { ReviewContent, ReviewItemContent } from "../../../../types/types";
import { useFormWidgetAttributes } from "../UseFormAttributes";
import { useFormAttributesContext } from "../FormAttributesContext";

interface ReviewProps {
  widget: Widget;
  reviewContent: ReviewContent;
  onHide: () => void;
}
interface ReviewItemProps {
  item: ReviewItemContent;
}

export const Review: React.FC<ReviewProps> = ({
  widget,
  reviewContent,
  onHide
}) => {
  const [show, setShow] = React.useState(false);
  const previousOverflowRef = React.useRef<string | null>(null);
  const { buttonsSize, buttonsStyle } = useFormAttributesContext();

  React.useEffect(() => {
    setShow(true);
    // save the current overflow value
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflowRef.current ?? "visible";
    };
  }, [reviewContent]);

  const handleClose = () => {
    setShow(false);
    onHide();
  };
  const handleOnClickContainer = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.currentTarget == event.target) {
      handleClose();
    }
  };
  return (
    <div
      onClick={(e) => handleOnClickContainer(e)}
      hidden={!show}
      className="scrivito-neoletter-review-form-modal"
    >
      <div className="review-modal-dialog">
        <div className="review-modal-content">
          {widget.get("showReviewHeader") && (
            <div className="review-modal-header">
              <h4>{widget.get("reviewHeaderTitle") as string}</h4>
            </div>
          )}
          <div className="review-modal-body form-review">
            {reviewContent.map((steps, i) => (
              <div
                className="step-review-container"
                key={"step-review-container-" + i}
              >
                {widget.get("showStepsInReview") && (
                  <h4 className="step-review">Step {i}</h4>
                )}
                {steps.map((d, i) => (
                  <ReviewItem key={"item-" + i} item={d} />
                ))}
              </div>
            ))}
          </div>
          {widget.get("showReviewFooter") && (
            <div className="review-modal-footer">
              <button className={`btn ${buttonsSize} ${buttonsStyle}`} onClick={handleClose}>
                {widget.get("reviewCloseButtonText") as string}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReviewItem: React.FC<ReviewItemProps> = ({ item }) => {
  return (
    <div>
      <div className="review-item-title">
        <span>{item.title}</span>
      </div>
      <div className="review-item-value">{item.value}</div>
    </div>
  );
};
