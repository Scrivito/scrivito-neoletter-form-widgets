import * as React from "react";
import * as Scrivito from "scrivito";

interface ValidationResultObject {
  severity?: string;
  message: string;
}
interface FormIdInputProps {
  widget: Scrivito.Widget;
  title: string;
  description: string;
  initialId: string;
  currentId: string;
  onGenerateNewId: () => void;
  onRestoreId: () => void;
  onInputChange: (newValue: string) => void;
}

export const FormIdInput = Scrivito.connect(
  ({ widget, title, description, initialId, currentId, onGenerateNewId, onRestoreId, onInputChange }: FormIdInputProps) => {
    const validationResults = Scrivito.validationResultsFor(widget, "formId");
    const highestSeverity = findHighestSeverity(validationResults);
    const severityClass = highestSeverity && `scrivito-${highestSeverity}`;
    const [value, setValue] = React.useState<string>(widget.get("formId") as string);
    const [isModified, setIsModified] = React.useState<boolean>(false);

    React.useEffect(() => {
      setValue(currentId);
      setIsModified(currentId !== initialId);
    }, [widget, initialId, currentId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      setIsModified(newValue !== initialId);
      onInputChange(newValue);
    };

    const handleButtonClick = () => {
      if (isModified) {
        onRestoreId();
        setValue(initialId);
        setIsModified(false);
      } else {
        onGenerateNewId();
        setIsModified(true);
      }
    };

    return (
      <>
        <div className={`detail-label ${severityClass}`}>
          {severityClass && (
            <i className="scrivito-icon scrivito-icon-error"></i>
          )}
          <span>{title}</span>
        </div>
        <div className={`content-property-input ${severityClass}`}>
          <div className="input-container">
            <input
              type="text"
              value={value}
              onChange={handleChange}
              className=""
            />
            <button className="icon-button" onClick={handleButtonClick}>
              {isModified ? <i className="bi bi-arrow-counterclockwise"></i> : <i className="bi bi-plus-circle"></i>}
            </button>
          </div>
        </div>
        <div>
          {validationResults.map(v => (
            <div
              key={`${v.severity}${v.message}`}
              className={`validation-notice scrivito-${v.severity}`}>
              <span className="validation-message">{v.message}</span>
            </div>
          ))}
        </div>
        {description && (
          <div className="notice-body">{description}</div>
        )}
      </>
    );
  }
);

function findHighestSeverity(
  validationResults: ValidationResultObject[]
): string {
  const highestSeverityValidation =
    validationResults.find(v => v.severity === "error") ||
    validationResults.find(v => v.severity === "warning") ||
    validationResults.find(v => v.severity === "info");
  return highestSeverityValidation?.severity || "";
}
