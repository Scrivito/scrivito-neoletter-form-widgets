import * as React from "react";
import * as Scrivito from "scrivito";
import { fireEvent } from "@testing-library/react";
import { FormFooterMultiSteps } from "../../../../src/Widgets/FormStepContainerWidget/components/FormFooterMultiStepsComponent";
import { DummyWidget } from "../../../helpers/dummyWidget";
import { prepareReviewContent } from "../../../../src/Widgets/FormStepContainerWidget/utils/prepareReviewContent";
import { renderWithFormContext } from "../../../helpers/renderWithFormContext";

jest.mock(
  "../../../../src/Widgets/FormStepContainerWidget/utils/prepareReviewContent"
);

describe("FormFooterMultiSteps", () => {
  const mockPrepareReviewContent = jest.fn(() => [
    [{ title: "Field 1", value: "Value 1" }],
    [{ title: "Field 2", value: "Value 2" }]
  ]);

  const widget = new DummyWidget({
    backwardButtonText: "Back",
    reviewButtonText: "Review",
    submitButtonText: "Submit",
    forwardButtonText: "Forward"
  }) as unknown as Scrivito.Widget;

  afterEach(() => {
    (prepareReviewContent as jest.Mock).mockImplementation(
      mockPrepareReviewContent
    );
  });

  it("renders correctly with required buttons", () => {
    const { getByText } = renderWithFormContext(


      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => { }}
        onSubmit={() => { }}
        currentStep={1}
        isLastPage={false}
        stepsLength={3}
        showReview={true}
        submitDisabled={false}
      />

    );

    expect(getByText("Back")).toBeInTheDocument();
    expect(getByText("1 / 3")).toBeInTheDocument();
    expect(getByText("Forward")).toBeInTheDocument();
  });

  it("renders correctly with disabled submit button", () => {
    const { getByText } = renderWithFormContext(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => { }}
        onSubmit={() => { }}
        currentStep={3}
        isLastPage={true}
        stepsLength={3}
        showReview={true}
        submitDisabled={true}
      />
    );

    const button = getByText("Submit");
    expect(button).toHaveAttribute("disabled");
    expect(button.getAttribute("onclick")).toBe(null);
  });

  it("triggers review display correctly when Review button is clicked", () => {
    const { getByText } = renderWithFormContext(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => { }}
        onSubmit={() => { }}
        currentStep={1}
        isLastPage={true}
        stepsLength={3}
        showReview={true}
        submitDisabled={false}
      />
    );

    const reviewButton = getByText("Review");
    fireEvent.click(reviewButton);

    expect(mockPrepareReviewContent).toHaveBeenCalledWith(widget);
  });

  it("displays Submit button on last page", () => {
    const { getByText } = renderWithFormContext(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => { }}
        onSubmit={() => { }}
        currentStep={3}
        isLastPage={true}
        stepsLength={3}
        showReview={true}
        submitDisabled={false}
      />
    );

    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("hides backward-button on the first page", () => {
    const { getByText } = renderWithFormContext(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => { }}
        onSubmit={() => { }}
        currentStep={1}
        isLastPage={false}
        stepsLength={3}
        showReview={true}
        submitDisabled={false}
      />
    );

    const backButton = getByText("Back");
    expect(backButton).toHaveAttribute("hidden");
  });

  it("shows backward-button on page 2", () => {
    const { getByText } = renderWithFormContext(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => { }}
        onSubmit={() => { }}
        currentStep={2}
        isLastPage={false}
        stepsLength={3}
        showReview={true}
        submitDisabled={false}
      />
    );

    const backButton = getByText("Back");
    expect(backButton).not.toHaveAttribute("hidden");
  });

  it("does not show Review button on last page if showReview is false", () => {
    const { queryByText } = renderWithFormContext(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => { }}
        onSubmit={() => { }}
        currentStep={3}
        isLastPage={true}
        stepsLength={3}
        showReview={false}
        submitDisabled={false}
      />
    );

    expect(queryByText("Review")).not.toBeInTheDocument();
  });

  it("renders correctly", () => {
    const { container } = renderWithFormContext(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => { }}
        onSubmit={() => { }}
        currentStep={1}
        isLastPage={true}
        stepsLength={3}
        showReview={true}
        submitDisabled={false}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
