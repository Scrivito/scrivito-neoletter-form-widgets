import * as React from "react";
import { RatingIcon } from "../../FormStepContainerWidget/components/RatingIconComponent";
import { FAIcon } from "../../../../types/types";

interface SingleIconProps {
  icon: FAIcon;
  setWidgetIcon: Function;
  currentIcon: string;
}
export const SingleIcon: React.FC<SingleIconProps> = ({
  icon,
  setWidgetIcon,
  currentIcon,
}) => {
  const cssIcon = `fa-${icon.id}`;

  const aClassNames = [];
  if (currentIcon === cssIcon) aClassNames.push("active");

  return (
    <div className="fa-hover col-md-3 col-sm-4">
      <a
        href="#"
        className={aClassNames.join(" ")}
        onClick={(e) => setWidgetIcon(e, cssIcon)}
      >
        <RatingIcon icon={cssIcon} color={""} size={"fa-lg"} />
        <span className="sr-only">Example of </span>
        {icon.name}
      </a>
    </div>
  );
};
