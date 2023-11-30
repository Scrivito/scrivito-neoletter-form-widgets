declare module "scrivito-neoletter-form-widgets" {
  import { Widget } from "scrivito";

  export function insideFormContainerValidation(widget: Widget): string;
  export function initNeoletterFormWidgets(instanceId: string): void;
  export function getFormContainer(childWidget: Widget): Widget;
  export function customFieldNameValidation(): void;
}
