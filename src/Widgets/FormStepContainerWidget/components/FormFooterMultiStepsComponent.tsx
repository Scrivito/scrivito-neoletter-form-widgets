import * as React from "react";
import * as Scrivito from "scrivito";
import { Review } from "./ReviewComponent";
import { prepareReviewContent } from "../utils/prepareReviewContent";
import { ReviewContent } from "../../../../types/types";
interface FormFooterMultiStepsProps {
  widget: Scrivito.Widget;
  onPageChange: (forward: boolean) => void;
  onSubmit: React.MouseEventHandler;
  currentStep: number;
  isLastPage: boolean;
  stepsLength: number;
  showReview: boolean;
}

export const FormFooterMultiSteps: React.FC<FormFooterMultiStepsProps> =
  Scrivito.connect(
    ({
      widget,
      onPageChange,
      onSubmit,
      currentStep,
      isLastPage,
      stepsLength,
      showReview
    }) => {
      const [show, setShow] = React.useState(false);
      const [reviewContent, setReviewContent] = React.useState<ReviewContent>(
        []
      );
      const doShowReview = isLastPage && showReview;
      return (
        <>
          <div className="form-buttons">
            <button
              className="btn btn-primary backward-button"
              onClick={() => onPageChange(false)}
              hidden={currentStep == 1 && !Scrivito.isInPlaceEditingActive()}>
              {widget.get("backwardButtonText") as string}
            </button>
            <div className="step-counter">
              {currentStep + " / " + stepsLength}
            </div>
            {doShowReview && (
              <button
                className="btn btn-primary review-button"
                onClick={() => onShowReview(widget, setReviewContent, setShow)}>
                {widget.get("reviewButtonText") as string}
              </button>
            )}
            <button
              className="btn btn-primary forward-button"
              onClick={isLastPage ? onSubmit : () => onPageChange(true)}>
              {isLastPage
                ? (widget.get("submitButtonText") as string)
                : (widget.get("forwardButtonText") as string)}
            </button>
          </div>
          {doShowReview && show && (
            <Review
              widget={widget}
              reviewContent={reviewContent}
              onHide={() => setShow(false)}
            />
          )}
        </>
      );
    }
  );

function onShowReview(
  widget: Scrivito.Widget,
  setReviewContent: (content: ReviewContent) => void,
  setShow: (show: boolean) => void
) {
  const reviewContent = prepareReviewContent(widget);

  setReviewContent(reviewContent);
  setShow(true);
}
