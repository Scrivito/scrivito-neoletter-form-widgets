import * as React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Widget } from "scrivito";
import { ReviewContent, ReviewItemContent } from "../../../../types/types";

interface ReviewProps {
  widget: Widget;
  reviewContent: ReviewContent;
  onHide: Function;
}
interface ReviewItemProps {
  item: ReviewItemContent;
}

export const Review: React.FC<ReviewProps> = ({
  widget,
  reviewContent,
  onHide,
}) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(true);
  }, [reviewContent]);

  const handleClose = () => {
    setShow(false);
    onHide();
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      {widget.get("showReviewHeader") && (
        <Modal.Header style={{ alignSelf: "center" }}>
          <Modal.Title>{widget.get("reviewHeaderTitle") as string}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body className="form-review">
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
      </Modal.Body>
      {widget.get("showReviewFooter") && (
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {widget.get("reviewCloseButtonText") as string}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
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
