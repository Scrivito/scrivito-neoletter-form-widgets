import * as React from "react";

interface ResetInputsProps {
  text: string;
  parentRef: React.RefObject<HTMLDivElement>;
  onReset: () => void;
}

export const ResetInputs: React.FC<ResetInputsProps> = ({
  parentRef,
  text,
  onReset
}) => {
  const doReset = () => {
    if (parentRef.current) {
      const inputs = parentRef.current.getElementsByTagName("input");
      const inputArray = Array.from(inputs);
      inputArray.forEach((input) => {
        if (input.type === "radio") {
          input.checked = false;
        }
      });
      onReset();
    }
  };

  return (
    <div className={`text-end  fade-in`}>
      <div className="reset-label" onClick={doReset}>
        <span>{text}</span>
      </div>
    </div>
  );
};
