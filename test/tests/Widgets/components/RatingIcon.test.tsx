import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { RatingIcon } from "../../../../src/Widgets/FormStepContainerWidget/components/RatingIconComponent";
import renderer from "react-test-renderer";

const color = "rgb(255, 215, 0)";
const size = "2x";
const icon = "star-fill";

const mockOnSelect = jest.fn();
const mockOnHover = jest.fn();
const mockOnHoverOut = jest.fn();

describe("RatingIcon", () => {
  it("renders a rating icon with specified properties", () => {
    const { container } = render(
      <RatingIcon
        icon={icon}
        color={color}
        size={size}
        onSelect={mockOnSelect}
        onHover={mockOnHover}
        onHoverOut={mockOnHoverOut}
        data-testid="rating-icon"
      />
    );

    const ratingIcon = container.querySelector(".rating-icon")!;
    expect(ratingIcon).toHaveClass(`bs-icon ${icon} ${size} rating-icon`);
    expect(ratingIcon).toHaveStyle(`color: ${color}; paddingRight: 0.08em`);

    fireEvent.click(ratingIcon);
    fireEvent.mouseOver(ratingIcon);
    fireEvent.mouseOut(ratingIcon);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnHover).toHaveBeenCalledTimes(1);
    expect(mockOnHoverOut).toHaveBeenCalledTimes(1);
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(<RatingIcon icon={icon} color={color} size={size} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
