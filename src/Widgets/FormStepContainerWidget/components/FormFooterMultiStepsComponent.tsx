import * as React from "react";
import * as Scrivito from "scrivito";
import { prepareReviewContent } from "../utils/prepareReviewContent";
import { ReviewContent } from "../../../../types/types";
import { ReviewPortal } from "./ReviewPortal";
import { useFormAttributesContext } from "../FormAttributesContext";
interface FormFooterMultiStepsProps {
  widget: Scrivito.Widget;
  onPageChange: (forward: boolean) => void;
  onSubmit: React.MouseEventHandler;
  currentStep: number;
  isLastPage: boolean;
  stepsLength: number;
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
      submitDisabled
    }) => {
      const editMode = Scrivito.isInPlaceEditingActive();
      const [show, setShow] = React.useState(false);
      const [reviewContent, setReviewContent] = React.useState<ReviewContent>(
        []
      );
      const { showReview, footerButtonsSize, backwardButtonText, forwardButtonText, submitButtonText, reviewButtonText } = useFormAttributesContext();
      const doShowReview = (isLastPage || editMode) && showReview;
      return (
        <>
          <div className="form-buttons">
            <button
              className={`btn btn-primary backward-button ${footerButtonsSize}`}
              onClick={() => onPageChange(false)}
              hidden={currentStep == 1 && !editMode}>
              {backwardButtonText}
            </button>
            <div className="step-counter">
              {currentStep + " / " + stepsLength}
            </div>
            {doShowReview && (
              <button
                className={`btn btn-primary review-button ${footerButtonsSize}`}
                onClick={() => onShowReview(widget, setReviewContent, setShow)}>
                {reviewButtonText}
              </button>
            )}

            <button
              className={`btn btn-primary ${footerButtonsSize} forward-button ${editMode ? "edit-mode-margin" : ""}`}
              onClick={() => onPageChange(true)}
              hidden={isLastPage}
            >
              {forwardButtonText}
            </button>

            <button
              className={`btn btn-primary submit-button ${footerButtonsSize}`}
              onClick={onSubmit}
              disabled={isLastPage && submitDisabled}
              hidden={!(isLastPage || editMode)}
            >
              {submitButtonText}
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
