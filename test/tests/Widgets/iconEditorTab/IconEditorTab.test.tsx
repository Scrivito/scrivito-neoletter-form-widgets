import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { IconEditorTab } from "../../../../src/Widgets/FormRatingWidget/IconEditorTab/IconEditorTab";
import { Widget } from "scrivito";
import { DummyWidget } from "../../../helpers/dummyWidget";
import renderer from "react-test-renderer";

const widget = new DummyWidget({ icon: "bi-star-fill" }) as unknown as Widget;

describe("IconEditorTab", () => {
  it("renders with default props", () => {
    const { getByText } = render(<IconEditorTab widget={widget} />);

    const previewLabel = getByText("Preview");
    expect(previewLabel).toBeInTheDocument();
  });

  it("updates search value on input change", () => {
    const { getByPlaceholderText } = render(<IconEditorTab widget={widget} />);
    const searchInput = getByPlaceholderText("Search icons");

    fireEvent.change(searchInput, { target: { value: "moon" } });

    expect(searchInput).toHaveValue("moon");
  });
  it("renders preview of the current icon", () => {
    const { getByText, container } = render(<IconEditorTab widget={widget} />);
    const iconPreviewContainer = container.querySelector(
      ".icon-editor-preview"
    );

    expect(getByText("Preview")).toBeInTheDocument();
    expect(iconPreviewContainer).toBeInTheDocument();

    const iconPreview = iconPreviewContainer?.querySelector("i");

    expect(iconPreview).toBeInTheDocument();
    expect(iconPreview).toHaveClass("bi-star-fill");
  });

  it("searches for icons when a search value is entered", () => {
    const { getByLabelText, getByText } = render(
      <IconEditorTab widget={widget} />
    );

    fireEvent.change(getByLabelText("Search icons"), {
      target: { value: "moon" }
    });

    expect(getByText("Search for 'moon'")).toBeInTheDocument();
    expect(getByText("moon")).toBeInTheDocument();
  });

  it("renders correctly", () => {
    const tree = renderer.create(<IconEditorTab widget={widget} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
