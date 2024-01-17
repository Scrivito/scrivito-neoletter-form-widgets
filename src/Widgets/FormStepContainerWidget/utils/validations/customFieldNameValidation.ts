import { Widget } from "scrivito";
import { isCustomType } from "../isCustomType";
import { isFieldNameUnique } from "../isFieldNameUnique";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const customFieldNameValidation: any = [
  "customFieldName",

  (customFieldName: string, { widget }: { widget: Widget }): string => {
    if (!isCustomType(widget)) {
      return "";
    }

    if (!customFieldName.startsWith("custom_")) {
      return 'Custom field names must start with "custom_".';
    }

    if (customFieldName.length <= "custom_".length) {
      return "Specify the custom field's name.";
    }

    if (customFieldName.match(/^[A-Za-z_][A-Za-z0-9_]*$/) === null) {
      return 'Custom field names may consist of the following characters: "a-z", "A-Z", "0-9", "_".';
    }

    if (customFieldName.length > 50) {
      return `Custom field names may be up to 50 characters long. This name is ${customFieldName.length} characters long.`;
    }

    if (!isFieldNameUnique(widget)) {
      return "Specify a unique custom field name. There is at least one other element with the same custom field name.";
    }
    return "";
  }
];
