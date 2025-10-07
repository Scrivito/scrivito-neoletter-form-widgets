import * as React from "react";
import * as Scrivito from "scrivito";
import { render } from "@testing-library/react";
import { FormFooterSingleStep } from "../../../../src/Widgets/FormStepContainerWidget/components/FormFooterSingleStepComponent";
import { DummyWidget } from "../../../helpers/dummyWidget";
import renderer from "react-test-renderer";
import { renderWithFormContext } from "../../../helpers/renderWithFormContext";

const widget = new DummyWidget({
  singleSubmitButtonAlignment: "block",
  submitButtonText: "Submit"
}) as unknown as Scrivito.Widget;

describe("FormFooterSingleStep", () => {
  const onSubmitMock = () => { };

  it("renders correctly with block alignment", () => {
    const { getByText } = renderWithFormContext(
      <FormFooterSingleStep onSubmit={() => { }} submitDisabled={false} />
    );

    const button = getByText("Submit");
    expect(button).toHaveClass("btn-primary");
    expect(button).toHaveClass("btn-block");
  });

  it("renders correctly with left alignment", () => {
    widget.update({ singleSubmitButtonAlignment: "left" });

    const { getByText, container } = renderWithFormContext(
      <FormFooterSingleStep onSubmit={onSubmitMock} submitDisabled={false} />, { singleSubmitButtonAlignment: "left" }
    );

    const button = getByText("Submit");
    expect(button).toHaveClass("btn-primary");
    expect(button).not.toHaveClass("btn-block");
    expect(container.firstChild).toHaveClass("left");
  });

  it("renders correctly with right alignment", () => {

    const { getByText, container } = renderWithFormContext(
      <FormFooterSingleStep onSubmit={onSubmitMock} submitDisabled={false} />, { singleSubmitButtonAlignment: "text-end" }
    );

    const button = getByText("Submit");
    expect(button).toHaveClass("btn-primary");
    expect(button).not.toHaveClass("btn-block");
    expect(container.firstChild).toHaveClass("text-end");
  });

  it("renders correctly with centered alignment", () => {

    const { getByText, container } = renderWithFormContext(
      <FormFooterSingleStep onSubmit={onSubmitMock} submitDisabled={false} />,
      { singleSubmitButtonAlignment: "text-center" }
    );

    const button = getByText("Submit");
    expect(button).toHaveClass("btn-primary");
    expect(button).not.toHaveClass("btn-block");
    expect(container.firstChild).toHaveClass("text-center");
  });

  it("renders correctly with disabled submit button", () => {
    const { getByText } = renderWithFormContext(
      <FormFooterSingleStep onSubmit={onSubmitMock} submitDisabled={true} />
    );

    const button = getByText("Submit");
    expect(button).toHaveAttribute("disabled");
    expect(button.getAttribute("onclick")).toBe(null);
  });

  it("renders correctly with small submit button", () => {
    const { getByText } = renderWithFormContext(
      <FormFooterSingleStep onSubmit={onSubmitMock} submitDisabled={false} />,
      { buttonsSize: "btn-sm" }
    );

    const button = getByText("Submit");
    expect(button).toHaveClass("btn-sm");
  });

  it("renders correctly with medium submit button", () => {
    const { getByText } = renderWithFormContext(
      <FormFooterSingleStep onSubmit={onSubmitMock} submitDisabled={false} />
    );

    const button = getByText("Submit");
    expect(button).toHaveClass("btn-md");
  });

  it("renders correctly with large submit button", () => {
    const { getByText } = renderWithFormContext(
      <FormFooterSingleStep onSubmit={onSubmitMock} submitDisabled={false} />,
      { buttonsSize: "btn-lg" }
    );

    const button = getByText("Submit");
    expect(button).toHaveClass("btn-lg");
  });

  it("renders correctly with secondary color", () => {
    const { getByText } = renderWithFormContext(
      <FormFooterSingleStep onSubmit={() => { }} submitDisabled={false} />,
      { buttonsStyle: "btn-secondary" }
    );

    const button = getByText("Submit");
    expect(button).toHaveClass("btn-secondary");
  });

  it("renders correctly", () => {
    const { container } = renderWithFormContext(<FormFooterSingleStep onSubmit={onSubmitMock} submitDisabled={false} />)
    expect(container).toMatchSnapshot();
  });

});
