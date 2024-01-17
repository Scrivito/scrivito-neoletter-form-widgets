import * as React from "react";
import * as Scrivito from "scrivito";
import { render } from "@testing-library/react";
import { InPlaceEditingPlaceholder } from "../../../src/Components/InPlaceEditingPlaceholder";
import renderer from "react-test-renderer";

describe("InPlaceEditingPlaceholder", () => {
  test("renders placeholder when isInPlaceEditingActive is true", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);

    const { getByText } = render(
      <InPlaceEditingPlaceholder>
        Your Placeholder Text Here
      </InPlaceEditingPlaceholder>
    );
    expect(getByText("Your Placeholder Text Here")).toBeInTheDocument();
  });

  test("does not render placeholder when isInPlaceEditingActive is false", () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(false);

    const { queryByText } = render(
      <InPlaceEditingPlaceholder>
        Your Placeholder Text Here
      </InPlaceEditingPlaceholder>
    );
    expect(queryByText("Your Placeholder Text Here")).toBeNull();
  });
  test('applies "text-center" class when center prop is true', () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);

    const { container } = render(
      <InPlaceEditingPlaceholder center>
        Your Placeholder Text Here
      </InPlaceEditingPlaceholder>
    );

    const placeholderElement = container.firstChild;
    expect(placeholderElement).toHaveClass("text-center");
  });

  test('does not apply "text-center" class when center prop is false', () => {
    jest.spyOn(Scrivito, "isInPlaceEditingActive").mockReturnValue(true);

    const { container } = render(
      <InPlaceEditingPlaceholder>
        Your Placeholder Text Here
      </InPlaceEditingPlaceholder>
    );

    const placeholderElement = container.firstChild;
    expect(placeholderElement).not.toHaveClass("text-center");
  });
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <InPlaceEditingPlaceholder>
          Your Placeholder Text Here
        </InPlaceEditingPlaceholder>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
