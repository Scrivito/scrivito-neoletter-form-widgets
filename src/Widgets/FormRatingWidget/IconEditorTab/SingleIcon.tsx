import * as React from "react";

interface SingleIconProps {
  icon: string;
  setWidgetIcon: Function;
  currentIcon: string;
}
export const SingleIcon: React.FC<SingleIconProps> = ({
  icon,
  setWidgetIcon,
  currentIcon,
}) => {
  const cssIcon = `bi-${icon}`;

  const aClassNames = [];
  if (currentIcon === cssIcon) aClassNames.push("active");

  return (
    <div className="bi-icon">
      <a
        href="#"
        className={aClassNames.join(" ")}
        onClick={(e) => setWidgetIcon(e, cssIcon)}
      >
        <i className={`bi ${cssIcon}`}></i>
        <span className="sr-only">Example of </span>
        {icon}
      </a>
    </div>
  );
};
