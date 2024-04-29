import * as Scrivito from "scrivito";
import * as React from "react";
import { render } from "@testing-library/react";
import { FormHiddenFields } from "../../../../src/Widgets/FormStepContainerWidget/components/FormHiddenFieldsComponent";
import { DummyWidget } from "../../../helpers/dummyWidget";
import { FormHiddenFieldWidget } from "../../../../src/Widgets/FormHiddenFieldWidget/FormHiddenFieldWidgetClass";
import "../../../../src/Widgets/FormHiddenFieldWidget/FormHiddenFieldWidgetComponent";
import PageRenderer from "../../../helpers/pageRenderer";

Scrivito.configure({ tenant: "inMemory" });

describe("FormHiddenFields", () => {
  const formId = "myFormId";
  const widget = new DummyWidget({
    formId
  }) as unknown as Scrivito.Widget;

  it("renders the form_id input field", () => {
    const { container } = render(<FormHiddenFields widget={widget} />);
    const formIdInput = container.querySelector('input[name="form_id"]');

    expect(formIdInput).toBeInTheDocument();
    expect(formIdInput).toHaveAttribute("type", "hidden");
    expect(formIdInput).toHaveAttribute("value", formId);
  });

  it("renders the url input field", () => {
    const { container } = render(<FormHiddenFields widget={widget} />);
    const urlInput = container.querySelector('input[name="url"]');

    expect(urlInput).toBeInTheDocument();
    expect(urlInput).toHaveAttribute("type", "hidden");
    expect(urlInput).toHaveAttribute("value", "http://localhost/");
  });

  it("renders the HoneypotField", () => {
    const { container } = render(<FormHiddenFields widget={widget} />);
    const honeypotField = container.querySelector(
      '.winnie-the-pooh input[name="fax"]'
    );
    expect(honeypotField).toHaveAttribute("tabIndex", "-1");
    expect(honeypotField).toHaveAttribute("role", "presentation");
  });

  it("renders the hiddenFields", () => {
    const pageRenderer = new PageRenderer();
    pageRenderer.render({
      body: [
        new FormHiddenFieldWidget({
          customFieldName: "custom_hidden1",
          hiddenValue: "a hidden val",
          type: "custom"
        }),
        new FormHiddenFieldWidget({
          customFieldName: "custom_hidden2",
          hiddenValue: "another hidden val",
          type: "custom"
        })
      ]
    });
    const hiddenFields = document.querySelectorAll("input");
    expect(hiddenFields).toHaveLength(2);
    const expectedValues = ["a hidden val", "another hidden val"];
    hiddenFields.forEach((input, index) => {
      expect(input).toHaveAttribute("type", "hidden");
      expect(input).toHaveAttribute("value", expectedValues[index]);
    });
  });

  it("renders correctly", () => {
    const pageRenderer = new PageRenderer();
    const tree = pageRenderer.getAsJSON({
      body: [
        new FormHiddenFieldWidget({
          customFieldName: "custom_hidden1",
          hiddenValue: "a hidden val"
        }),
        new FormHiddenFieldWidget({
          customFieldName: "custom_hidden2",
          hiddenValue: "another hidden val"
        })
      ]
    });
    expect(tree).toMatchSnapshot();
  });
});
