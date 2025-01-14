import { Widget } from "scrivito";

export const isURLParamType = (widget: Widget): boolean => {
	return widget.get("type") == "urlParam";
}
