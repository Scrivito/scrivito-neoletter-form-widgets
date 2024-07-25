import { Widget } from "scrivito";

export function getIconColor(widget: Widget): string {
  const type = widget.get("colorType");
  switch (type) {
    case "custom":
      return `${widget.get("customColor")} !important`;
    case "secondary":
      return "var(--bs-secondary, #f03a47) !important";
    case "primary":
      return "var(--bs-primary, #5c9dcd) !important";
    default:
      return "gold !important";
  }
}
