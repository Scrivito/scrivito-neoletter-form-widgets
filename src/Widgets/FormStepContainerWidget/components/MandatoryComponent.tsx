import * as React from "react";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Popover from "react-bootstrap/esm/Popover";

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
