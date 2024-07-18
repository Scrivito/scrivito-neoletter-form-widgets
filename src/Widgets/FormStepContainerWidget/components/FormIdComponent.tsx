import * as React from "react";
import * as Scrivito from "scrivito";
import { FormIdInput } from "../../../Components/FormIdInput";
import { getInstanceId } from "../../../config/scrivitoConfig";
import { pseudoRandom32CharHex } from "../utils/pseudoRandom32CharHex";

interface FormIdComponentProps {
  widget: Scrivito.Widget;
}

export const FormIdComponent: React.FC<FormIdComponentProps> = ({ widget }) => {
  const [currentId, setCurrentId] = React.useState<string>(widget.get("formId") as string);
  const initialId = React.useRef<string>(widget.get("formId") as string);
  const uiContext = Scrivito.uiContext();
  if (!uiContext) return null;

  const onGenerateNewId = () => {
    const id = pseudoRandom32CharHex();
    widget.update({ formId: id });
    setCurrentId(id);
  };

  const onRestoreId = () => {
    widget.update({ formId: initialId.current });
    setCurrentId(initialId.current);
  };

  const onViewSubmissions = () => {
    const formSubmissionsHref = currentId.length === 32
      ? `https://edit.neoletter.com/i/${getInstanceId()}/forms/${currentId}`
      : null;
    if (formSubmissionsHref) {
      window.open(formSubmissionsHref, "_blank", "noopener,noreferrer");
    }
  };

  const isFormIdValid = () => {
    const validationResults = Scrivito.validationResultsFor(widget, "formId");
    if (validationResults.length > 0 && validationResults[0].severity) {
      return false;
    }
    return true;
  }

  const handleInputChange = (newValue: string) => {
    setCurrentId(newValue);
    widget.update({ formId: newValue });
  };

  return (
    <div className={`neoletter-form-id-tab-container scrivito-${uiContext.theme}`}>
      <div className="detail-content">
        <div className="detail-content-inner">
          <FormIdInput
            widget={widget}
            title="Form ID"
            description="This ID identifies the form in Neoletter."
            initialId={initialId.current}
            currentId={currentId}
            onGenerateNewId={onGenerateNewId}
            onRestoreId={onRestoreId}
            onInputChange={handleInputChange}
          />
          <button
            className={`btn scrivito-button scrivito-blue`}
            onClick={onViewSubmissions}
            disabled={!isFormIdValid()}
          >
            View submissions
          </button>
        </div>
      </div>
    </div>
  );
}

Scrivito.registerComponent("FormIdComponent", FormIdComponent);
