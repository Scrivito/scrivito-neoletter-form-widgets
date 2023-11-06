import * as React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Review = ({ widget, reviewData, onHide }) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(true);
  }, [reviewData]);

  const handleClose = () => {
    setShow(false);
    onHide();
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      {widget.get("showReviewHeader") && (
        <Modal.Header style={{ alignSelf: "center" }}>
          <Modal.Title>{widget.get("reviewHeaderTitle")}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body className="form-review">
        {reviewData.map((step, i) => (
          <div
            className="step-review-container"
            key={"step-review-container-" + i}
          >
            {widget.get("showStepsInReview") && (
              <h4 className="step-review">Step {i}</h4>
            )}
            {step.map((d, i) => (
              <ReviewItem key={"item-" + i} item={d} />
            ))}
          </div>
        ))}
      </Modal.Body>
      {widget.get("showReviewFooter") && (
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {widget.get("reviewCloseButtonText")}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

const ReviewItem = ({ item }) => {
  return (
    <div>
      <div className="review-item-title">
        <span>{item.title}</span>
      </div>
      <div className="review-item-value">{item.value}</div>
    </div>
  );
};
