import * as React from "react";
import * as Scrivito from "scrivito";
import { render } from "@testing-library/react";
import { FormFooterSingleStep } from "../../../../src/Widgets/FormStepContainerWidget/components/FormFooterSingleStepComponent";
import { DummyWidget } from "../../../helpers/dummyWidget";
import renderer from "react-test-renderer";

const widget = new DummyWidget({
  singleSubmitButtonAlignment: "block",
  submitButtonText: "Submit"
}) as unknown as Scrivito.Widget;

describe("FormFooterSingleStep", () => {
  const onSubmitMock = () => {};

  it("renders correctly with block alignment", () => {
    const { getByText } = render(
      <FormFooterSingleStep widget={widget} onSubmit={() => {}} />
    );

    const button = getByText("Submit");
    expect(button).toHaveClass("btn-primary");
    expect(button).toHaveClass("btn-block");
  });

  it("renders correctly with left alignment", () => {
    widget.update({ singleSubmitButtonAlignment: "left" });

    const { getByText, container } = render(
      <FormFooterSingleStep widget={widget} onSubmit={onSubmitMock} />
    );

    const button = getByText("Submit");
    expect(button).toHaveClass("btn-primary");
    expect(button).not.toHaveClass("btn-block");
    expect(container.firstChild).toHaveClass("left");
  });

  it("renders correctly with right alignment", () => {
    widget.update({
      singleSubmitButtonAlignment: "text-end",
      submitButtonText: "Send"
    });

    const { getByText, container } = render(
      <FormFooterSingleStep widget={widget} onSubmit={onSubmitMock} />
    );

    const button = getByText("Send");
    expect(button).toHaveClass("btn-primary");
    expect(button).not.toHaveClass("btn-block");
    expect(container.firstChild).toHaveClass("text-end");
  });
  it("renders correctly with centered alignment", () => {
    widget.update({ singleSubmitButtonAlignment: "text-center" });

    const { getByText, container } = render(
      <FormFooterSingleStep widget={widget} onSubmit={onSubmitMock} />
    );

    const button = getByText("Send");
    expect(button).toHaveClass("btn-primary");
    expect(button).not.toHaveClass("btn-block");
    expect(container.firstChild).toHaveClass("text-center");
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(<FormFooterSingleStep widget={widget} onSubmit={onSubmitMock} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
