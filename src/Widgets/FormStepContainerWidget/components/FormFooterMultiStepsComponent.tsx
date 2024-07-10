import * as React from "react";
import * as Scrivito from "scrivito";
import { prepareReviewContent } from "../utils/prepareReviewContent";
import { ReviewContent } from "../../../../types/types";
import { ReviewPortal } from "./ReviewPortal";
interface FormFooterMultiStepsProps {
  widget: Scrivito.Widget;
  onPageChange: (forward: boolean) => void;
  onSubmit: React.MouseEventHandler;
  currentStep: number;
  isLastPage: boolean;
  stepsLength: number;
  showReview: boolean;
  submitDisabled: boolean;
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
      showReview,
      submitDisabled
    }) => {
      const [show, setShow] = React.useState(false);
      const [reviewContent, setReviewContent] = React.useState<ReviewContent>(
        []
      );
      const doShowReview = (isLastPage || Scrivito.isInPlaceEditingActive()) && showReview;
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
              className={`btn btn-primary forward-button ${Scrivito.isInPlaceEditingActive() ? "edit-mode-margin" : ""}`}
              onClick={() => onPageChange(true)}
              hidden={isLastPage}
            >
              {(widget.get("forwardButtonText") as string)}
            </button>

            <button
              className="btn btn-primary"
              onClick={onSubmit}
              disabled={isLastPage && submitDisabled}
              hidden={!(isLastPage || Scrivito.isInPlaceEditingActive())}
            >
              {(widget.get("submitButtonText") as string)}
            </button>

          </div>
          {doShowReview && show && (
            <ReviewPortal
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
