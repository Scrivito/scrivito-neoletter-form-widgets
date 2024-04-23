import * as React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export const Mandatory = () => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Popover>
          <Popover.Body>mandatory</Popover.Body>
        </Popover>
      }
    >
      <span className="text-mandatory">*</span>
    </OverlayTrigger>
  );
};
