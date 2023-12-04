import * as React from "react";
import { each } from "lodash-es";

interface ResetLabelProps {
  label: string;
  parentRef: React.RefObject<HTMLDivElement>;
  setSelectedCallback: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ResetLabel: React.FC<ResetLabelProps> = ({
  parentRef,
  setSelectedCallback,
  label,
}) => {
  const doReset = () => {
    if (parentRef.current) {
      const inputs = parentRef.current.getElementsByTagName("input");
      const inputArray = Array.from(inputs);
      console.log(inputArray);
      each(inputArray, (input) => {
        if (input.type === "radio") {
          input.checked = false;
        }
      });
      setSelectedCallback(false);
    }
  };

  return (
    <div className={`text-end  fade-in`}>
      <div className="reset-label" onClick={doReset}>
        <span>{label}</span>
      </div>
    </div>
  );
};
