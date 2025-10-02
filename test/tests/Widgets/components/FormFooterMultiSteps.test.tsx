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

  const widget = new DummyWidget({}) as unknown as Scrivito.Widget;

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
        submitDisabled={false}
      />

    );

    expect(getByText("Backward")).toBeInTheDocument();
    expect(getByText("1 / 3")).toBeInTheDocument();
    expect(getByText("Forward")).toBeInTheDocument();
  });

  it("applies btn-sm to all buttons when configured small", () => {
    const editSpy = jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
    const { getByText } = renderWithFormContext(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => { }}
        onSubmit={() => { }}
        currentStep={1}
        isLastPage={false}
        stepsLength={3}
        submitDisabled={false}
      />,
      { buttonsSize: "btn-sm", showReview: true }

    );
    expect(getByText("Backward")).toHaveClass("btn-sm");
    expect(getByText("Forward")).toHaveClass("btn-sm");
    expect(getByText("Submit")).toHaveClass("btn-sm");
    expect(getByText("Review")).toHaveClass("btn-sm");
    editSpy.mockRestore();
  });

  it("applies default btn-md to all buttons", () => {
    const editSpy = jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
    const { getByText } = renderWithFormContext(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => { }}
        onSubmit={() => { }}
        currentStep={1}
        isLastPage={false}
        stepsLength={3}
        submitDisabled={false}
      />,
      { showReview: true }
    );

    expect(getByText("Backward")).toHaveClass("btn-md");
    expect(getByText("Forward")).toHaveClass("btn-md");
    expect(getByText("Submit")).toHaveClass("btn-md");
    expect(getByText("Review")).toHaveClass("btn-md");
    editSpy.mockRestore();
  });

  it("applies btn-lg to all buttons when configured large", () => {
    const editSpy = jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);
    const { getByText } = renderWithFormContext(
      <FormFooterMultiSteps
        widget={widget}
        onPageChange={() => { }}
        onSubmit={() => { }}
        currentStep={1}
        isLastPage={false}
        stepsLength={3}
        submitDisabled={false}
      />,
      { buttonsSize: "btn-lg", showReview: true }
    );

    expect(getByText("Backward")).toHaveClass("btn-lg");
    expect(getByText("Forward")).toHaveClass("btn-lg");
    expect(getByText("Submit")).toHaveClass("btn-lg");
    expect(getByText("Review")).toHaveClass("btn-lg");
    editSpy.mockRestore();
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
        submitDisabled={false}
      />,
      { showReview: true }
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
        submitDisabled={false}
      />
    );

    const backButton = getByText("Backward");
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
        submitDisabled={false}
      />
    );

    const backButton = getByText("Backward");
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
        submitDisabled={false}
      />,
      { showReview: true }
    );
    expect(container).toMatchSnapshot();
  });
});
