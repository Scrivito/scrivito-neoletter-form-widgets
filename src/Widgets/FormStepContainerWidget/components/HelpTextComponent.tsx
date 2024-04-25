import * as React from "react";
import * as Scrivito from "scrivito";
interface HelpTextProps {
  widget: Scrivito.Widget;
}

export const HelpText: React.FC<HelpTextProps> = ({ widget }) => {
  const [showPopover, setShowPopover] = React.useState(false);

  const handleMouseEnter = () => {
    setShowPopover(true);
  };

  const handleMouseLeave = () => {
    setShowPopover(false);
  };

  return (
    <div className="helptext-container">
      <i
        className="bi bi-question-circle"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></i>

      {showPopover && (
        <div className="form-popover-container">
          <div className="form-popover-body">
            <Scrivito.InPlaceEditingOff>
              <Scrivito.ContentTag content={widget} attribute="helpText" />
            </Scrivito.InPlaceEditingOff>
          </div>
        </div>
      )}
    </div>
  );
};
