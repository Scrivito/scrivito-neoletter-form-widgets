import { Widget } from "scrivito";
import { isCustomType } from "../isCustomType";
import { isFieldNameUnique } from "../isFieldNameUnique";
import { validateCustomFieldName } from "./validateCustomFieldName";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const customFieldNameValidation: any = [
  "customFieldName",

  (customFieldName: string, { widget }: { widget: Widget }): string => {
    if (!isCustomType(widget)) {
      return "";
    }

    return validateCustomFieldName(customFieldName, widget);
  }
];
