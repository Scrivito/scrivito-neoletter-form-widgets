import * as React from "react";
import { Widget } from "scrivito";
import { ReviewContent, ReviewItemContent } from "../../../../types/types";

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

  React.useEffect(() => {
    setShow(true);
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
      className="form-modal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {widget.get("showReviewHeader") && (
            <div className="modal-header">
              <h4>{widget.get("reviewHeaderTitle") as string}</h4>
            </div>
          )}
          <div className="modal-body form-review">
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
            <div className="modal-footer">
              <button className="" onClick={handleClose}>
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
