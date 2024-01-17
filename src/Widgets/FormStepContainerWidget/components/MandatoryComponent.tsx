import * as React from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";

export const Mandatory = () => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Popover>
          <Popover.Body>mandatory</Popover.Body>
        </Popover>
      }>
      <span className="text-mandatory">*</span>
    </OverlayTrigger>
  );
};
