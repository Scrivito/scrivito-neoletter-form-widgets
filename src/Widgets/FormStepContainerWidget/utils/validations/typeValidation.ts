import { Widget } from "scrivito";
import { isCustomType } from "../isCustomType";
import { isFieldNameUnique } from "../isFieldNameUnique";
import { isURLParamType } from "../isURLParamType";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const typeValidation: any = [
  "type",
  (type: string, { widget }: { widget: Widget }) => {
    if (!type) {
      return "Select the input type.";
    }

    if (!isCustomType(widget) && !isFieldNameUnique(widget) && !isURLParamType(widget)) {
      return `There must be only one element with the input type “${type.replace(
        /_/,
        " "
      )}”.`;
    }
  }
];
