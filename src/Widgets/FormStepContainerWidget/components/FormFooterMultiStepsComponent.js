import * as React from "react";
import * as Scrivito from "scrivito";
import { Review } from "./ReviewComponent";
import { prepareReviewData } from "../utils/prepareReviewData";
export const FormFooterMultiSteps = Scrivito.connect(
  ({
    widget,
    onPageChange,
    onSubmit,
    currentStep,
    isLastPage,
    stepsLength,
    showReview,
  }) => {
    const [show, setShow] = React.useState(false);
    const [reviewData, setReviewData] = React.useState([]);
    const doShowReview = isLastPage && showReview;
    return (
      <>
        <div className="form-buttons">
          <button
            className="btn btn-primary backward-button"
            onClick={() => onPageChange(false)}
            hidden={currentStep == 1 && !Scrivito.isInPlaceEditingActive()}
          >
            {widget.get("backwardButtonText")}
          </button>
          <div className="step-counter">
            {currentStep + " / " + stepsLength}
          </div>
          {doShowReview && (
            <button
              className="btn btn-primary review-button"
              onClick={() => onShowReview(widget, setReviewData, setShow)}
            >
              {widget.get("reviewButtonText")}
            </button>
          )}
          <button
            className="btn btn-primary forward-button"
            onClick={isLastPage ? onSubmit : () => onPageChange(true)}
          >
            {isLastPage
              ? widget.get("submitButtonText")
              : widget.get("forwardButtonText")}
          </button>
        </div>
        {doShowReview && show && (
          <Review
            widget={widget}
            reviewData={reviewData}
            onHide={() => setShow(false)}
          />
        )}
      </>
    );
  }
);

function onShowReview(widget, setReviewData, setShow) {
  const reviewData = prepareReviewData(widget);

  setReviewData(reviewData);
  setShow(true);
}
