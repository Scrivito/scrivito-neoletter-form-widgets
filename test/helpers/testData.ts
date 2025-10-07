import { CaptchaTheme } from "../../types/types";

export const validationResults: any[] = [
  { severity: "error", message: "Error message 1" },
  { severity: "warning", message: "Warning message 1" }
];
export const mockUiContext = { theme: "dark" };

export const defaultFormContextAttrValues = {
  showReview: false,
  showCaptcha: false,
  containerClassNames: "",
  fixedFormHeight: false,
  formHeight: 35,
  captchaAlignment: "center",
  captchaTheme: "light" as CaptchaTheme,
  showBorder: false,
  submittingMessage: "Submitting...",
  submittingMessageType: "default",
  submittedMessage: "Submission successful!",
  submittedMessageType: "default",
  failedMessage: "Submission failed!",
  failedMessageType: "default",
  showRetryButton: false,
  retryButtonText: "",
  retryButtonAlignment: "text-center",
  buttonsSize: "btn-md",
  buttonsStyle: "btn-primary",
  formId: "",
  showSubmittingPreview: false,
  showSubmittedPreview: false,
  showFailedPreview: false,
  formScrollbarWidth: "default",
  formOverscrollBehavior: "default",
  steps: [],
  formType: "single-step",
  backwardButtonText: "Backward",
  forwardButtonText: "Forward",
  submitButtonText: "Submit",
  reviewButtonText: "Review",
  singleSubmitButtonAlignment: "block",
}
