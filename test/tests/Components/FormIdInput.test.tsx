import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import * as Scrivito from "scrivito";
import { FormIdInput } from "../../../src/Components/FormIdInput";
import renderer from "react-test-renderer";

// Mock data for validation results
const validationResults = [
  { severity: "error", message: "Error message" },
  { severity: "warning", message: "Warning message" }
];

jest.mock("scrivito", () => ({
  connect: (component: React.FC) => component,
  validationResultsFor: jest.fn(() => validationResults)
}));

describe("FormIdInput Component", () => {
  const mockWidget = {
    get: jest.fn((attr: string) => {
      if (attr === "formId") return "testFormId";
    }),
    update: jest.fn()
  } as unknown as Scrivito.Widget;

  const initialId = "initialId";
  const currentId = "currentId";
  const onGenerateNewId = jest.fn();
  const onRestoreId = jest.fn();
  const onInputChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("renders the FormIdInput component with validation results", () => {
    const title = "Test Title";
    const description = "Test Description";

    const { getByText, getByDisplayValue } = render(
      <FormIdInput
        widget={mockWidget}
        title={title}
        description={description}
        initialId={initialId}
        currentId={currentId}
        onGenerateNewId={onGenerateNewId}
        onRestoreId={onRestoreId}
        onInputChange={onInputChange}
      />
    );

    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Description")).toBeInTheDocument();
    expect(getByDisplayValue("currentId")).toBeInTheDocument();

    validationResults.forEach((result) => {
      expect(getByText(result.message)).toBeInTheDocument();
    });
  });

  it("calls onInputChange when input value changes", () => {
    const title = "Test Title";
    const description = "Test Description";

    const { getByDisplayValue } = render(
      <FormIdInput
        widget={mockWidget}
        title={title}
        description={description}
        initialId={initialId}
        currentId={currentId}
        onGenerateNewId={onGenerateNewId}
        onRestoreId={onRestoreId}
        onInputChange={onInputChange}
      />
    );

    const input = getByDisplayValue("currentId") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "newId" } });

    expect(onInputChange).toHaveBeenCalledWith("newId");
  });


  it("calls onRestoreId when restore button is clicked", () => {
    const modifiedId = "modifiedId";

    const { getByRole, rerender } = render(
      <FormIdInput
        widget={mockWidget}
        title="Test Title"
        description="Test Description"
        initialId={initialId}
        currentId={modifiedId}
        onGenerateNewId={onGenerateNewId}
        onRestoreId={onRestoreId}
        onInputChange={onInputChange}
      />
    );

    const button = getByRole("button");
    fireEvent.click(button);

    expect(onRestoreId).toHaveBeenCalled();

    // ensure the button icon updates correctly
    rerender(
      <FormIdInput
        widget={mockWidget}
        title="Test Title"
        description="Test Description"
        initialId={initialId}
        currentId={initialId}
        onGenerateNewId={onGenerateNewId}
        onRestoreId={onRestoreId}
        onInputChange={onInputChange}
      />
    );

    expect(button.querySelector("i.bi-plus-circle")).toBeInTheDocument();
  });
  it("calls onGenerateNewId when generate button is clicked", () => {
    const title = "Test Title";
    const description = "Test Description";

    const { getByRole } = render(
      <FormIdInput
        widget={mockWidget}
        title={title}
        description={description}
        initialId={initialId}
        currentId={initialId}
        onGenerateNewId={onGenerateNewId}
        onRestoreId={onRestoreId}
        onInputChange={onInputChange}
      />
    );

    const button = getByRole("button");
    expect(button.querySelector("i.bi-plus-circle")).toBeInTheDocument();
    fireEvent.click(button);

    expect(onGenerateNewId).toHaveBeenCalled();
  });

  it("renders correctly and matches snapshot", () => {
    const title = "Test Title";
    const description = "Test Description";

    const tree = renderer
      .create(
        <FormIdInput
          widget={mockWidget}
          title={title}
          description={description}
          initialId={initialId}
          currentId={currentId}
          onGenerateNewId={onGenerateNewId}
          onRestoreId={onRestoreId}
          onInputChange={onInputChange}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
