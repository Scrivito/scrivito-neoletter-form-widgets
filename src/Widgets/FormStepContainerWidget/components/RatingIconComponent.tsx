import * as React from "react";
interface RatingIconProps {
  icon: string;
  color: string;
  size: string;
  onSelect?: React.MouseEventHandler;
  onHover?: React.MouseEventHandler;
  onHoverOut?: React.MouseEventHandler;
}
export const RatingIcon: React.FC<RatingIconProps> = ({
  icon,
  color,
  size,
  onSelect,
  onHover,
  onHoverOut,
}) => (
  <i
    className={`fa ${icon} ${size} rating-icon`}
    style={{
      color: color,
      paddingRight: "0.08em",
    }}
    onClick={onSelect}
    onMouseOver={onHover}
    onMouseOut={onHoverOut}
  />
);
