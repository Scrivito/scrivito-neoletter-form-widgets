import * as React from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";
import * as Scrivito from "scrivito";
interface HelpTextProps {
  widget: Scrivito.Widget;
}
export const HelpText: React.FC<HelpTextProps> = ({ widget }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Popover>
          <Popover.Body>
            <Scrivito.InPlaceEditingOff>
              <Scrivito.ContentTag content={widget} attribute="helpText" />
            </Scrivito.InPlaceEditingOff>
          </Popover.Body>
        </Popover>
      }
    >
      <i className="bi bi-question-circle"></i>
    </OverlayTrigger>
  );
};
