import { Widget } from "scrivito";

export const isAlignmentEnabled = (widget: Widget) => {
	const inlineViewEnabled = widget.get("inlineView") as boolean;
	const floatingLabelEnabled = widget.get("useFloatingLabel") as boolean;
	const type = widget.get("selectionType") as string;
	if (type == "dropdown") {
		return !floatingLabelEnabled;
	}
	if (type == "radio" || type == "multi") {
		return inlineViewEnabled;
	}
	return true;
}
