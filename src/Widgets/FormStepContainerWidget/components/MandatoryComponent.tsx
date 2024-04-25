import * as React from "react";

export const Mandatory = () => {
  const [showPopover, setShowPopover] = React.useState(false);

  const handleMouseEnter = () => {
    setShowPopover(true);
  };

  const handleMouseLeave = () => {
    setShowPopover(false);
  };

  return (
    <div className="mandatory-container">
      <span
        className="text-mandatory"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        *
      </span>
      {showPopover && (
        <div className="form-popover-container">
          <div className="form-popover-body">mandatory</div>
        </div>
      )}
    </div>
  );
};
