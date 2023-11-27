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
      trigger="hover"
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
      <i className="fa fa-question-circle-o fa-1x ml-1"></i>
    </OverlayTrigger>
  );
};
