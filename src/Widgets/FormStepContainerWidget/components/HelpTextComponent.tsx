import * as React from "react";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Popover from "react-bootstrap/esm/Popover";
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
