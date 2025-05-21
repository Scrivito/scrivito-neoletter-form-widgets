import { Widget } from "scrivito";
import { CaptchaTheme, FormWidgetAttributes } from "../../../types/types";

export function useFormWidgetAttributes(widget: Widget): FormWidgetAttributes {
	return {
		showReview: widget.get("showReview") as boolean || false,
		showCaptcha: widget.get("showCaptcha") as boolean || false,
		containerClassNames: widget.get("customClassNames") as string || "",
		fixedFormHeight: widget.get("fixedFormHeight") as boolean || false,
		formHeight: widget.get("formHeight") as number || 35,
		captchaAlignment: widget.get("captchaAlignment") as string || "center",
		captchaTheme: widget.get("captchaTheme") as CaptchaTheme || "light",
		showBorder: widget.get("showBorder") as boolean || false,
		submittingMessage: widget.get("submittingMessage") as string || "",
		submittingMessageType: widget.get("submittingMessageType") as string || "default",
		submittedMessage: widget.get("submittedMessage") as string || "",
		submittedMessageType: widget.get("submittedMessageType") as string || "default",
		failedMessage: widget.get("failedMessage") as string || "",
		failedMessageType: widget.get("failedMessageType") as string || "default",
		showRetryButton: widget.get("showRetryButton") as boolean || false,
		retryButtonText: widget.get("retryButtonText") as string || "",
		retryButtonAlignment: widget.get("retryButtonAlignment") as string || "text-center",
		formId: widget.get("formId") as string,
		showSubmittingPreview: widget.get("previewSubmittingMessage") as boolean || false,
		showSubmittedPreview: widget.get("previewSubmittedMessage") as boolean || false,
		showFailedPreview: widget.get("previewFailedMessage") as boolean || false,
		formScrollbarWidth: widget.get("scrollbarWidth") as string || "default",
		formOverscrollBehavior: widget.get("overscrollBehavior") as string || "default",
		steps: widget.get("steps") as Widget[] || [],
		formType: widget.get("formType") as string || "single-step",
	};
}