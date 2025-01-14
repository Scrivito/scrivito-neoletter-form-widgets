import { Widget } from "scrivito";
import { isFieldNameUnique } from "../isFieldNameUnique";

/**
 * Validates the provided custom field name based on predefined rules.
 * @param customFieldName - The name of the custom field to validate.
 * @param widget - The Scrivito widget associated with the custom field.
 * @returns An error message if validation fails, or an empty string if the name is valid.
 */
export const validateCustomFieldName = (customFieldName: string, widget: Widget): string => {
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
};
