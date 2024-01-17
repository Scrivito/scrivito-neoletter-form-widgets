import * as React from "react";
import * as Scrivito from "scrivito";
import { render, fireEvent } from "@testing-library/react";
import { FormFooterMultiSteps } from "../../../../src/Widgets/FormStepContainerWidget/components/FormFooterMultiStepsComponent";
import { DummyWidget } from "../../../helpers/dummyWidget";
import { prepareReviewContent } from "../../../../src/Widgets/FormStepContainerWidget/utils/prepareReviewContent";
import renderer from "react-test-renderer";

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
    const { getByText } = render(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => {}}
        onSubmit={() => {}}
        currentStep={1}
        isLastPage={false}
        stepsLength={3}
        showReview={true}
      />
    );

    expect(getByText("Back")).toBeInTheDocument();
    expect(getByText("1 / 3")).toBeInTheDocument();
    expect(getByText("Forward")).toBeInTheDocument();
  });

  it("triggers review display correctly when Review button is clicked", () => {
    const { getByText } = render(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => {}}
        onSubmit={() => {}}
        currentStep={1}
        isLastPage={true}
        stepsLength={3}
        showReview={true}
      />
    );

    const reviewButton = getByText("Review");
    fireEvent.click(reviewButton);

    expect(mockPrepareReviewContent).toHaveBeenCalledWith(widget);
  });

  it("displays Submit button on last page", () => {
    const { getByText } = render(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => {}}
        onSubmit={() => {}}
        currentStep={3}
        isLastPage={true}
        stepsLength={3}
        showReview={true}
      />
    );

    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("hides backward-button on the first page", () => {
    const { getByText } = render(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => {}}
        onSubmit={() => {}}
        currentStep={1}
        isLastPage={false}
        stepsLength={3}
        showReview={true}
      />
    );

    const backButton = getByText("Back");
    expect(backButton).toHaveAttribute("hidden");
  });

  it("shows backward-button on page 2", () => {
    const { getByText } = render(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => {}}
        onSubmit={() => {}}
        currentStep={2}
        isLastPage={false}
        stepsLength={3}
        showReview={true}
      />
    );

    const backButton = getByText("Back");
    expect(backButton).not.toHaveAttribute("hidden");
  });

  it("does not show Review button on last page if showReview is false", () => {
    const { queryByText } = render(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => {}}
        onSubmit={() => {}}
        currentStep={3}
        isLastPage={true}
        stepsLength={3}
        showReview={false}
      />
    );

    expect(queryByText("Review")).not.toBeInTheDocument();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <FormFooterMultiSteps
          widget={widget}
          onPageChange={() => {}}
          onSubmit={() => {}}
          currentStep={1}
          isLastPage={true}
          stepsLength={3}
          showReview={true}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
