import { useState, useEffect, useRef } from "react";
import { isInPlaceEditingActive, Widget } from "scrivito";
import { StringMap } from "../../../types/types";
import { getFormData, submitForm } from "./utils/submitForm";
import { scrollIntoView } from "./utils/scrollIntoView";
import { useValidationContext } from "../../FormValidation/ValidationContext";

export const useFormStepContainer = (widget: Widget, tenant: string) => {
  const [currentStep, setCurrentStepNumber] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successfullySent, setSuccessfullySent] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [reCaptchaToken, setReCaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [totalFormHeight, setTotalFormHeight] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const stepsLength = (widget.get("steps") as Widget[]).length;
  const isLastPage = currentStep === stepsLength;
  const isSingleStep = widget.get("formType") === "single-step";
  const showCaptcha = widget.get("showCaptcha");
  const formId = widget.get("formId") as string;
  const showSubmittingPreview = widget.get("previewSubmittingMessage") || false;
  const showSubmittedPreview = widget.get("previewSubmittedMessage") || false;
  const showFailedPreview = widget.get("previewFailedMessage") || false;

  const fixedFormHeight = widget.get("fixedFormHeight") || false;
  const formScrollbarWidth = widget.get("scrollbarWidth");
  const formOverscrollBehavior = widget.get("overscrollBehavior");

  const { validate } = useValidationContext();

  useEffect(() => {
    if (!isInPlaceEditingActive()) {
      return;
    }
    if (showSubmittingPreview) {
      indicateProgress();
    } else if (showSubmittedPreview) {
      indicateSuccess();
    } else if (showFailedPreview) {
      indicateFailure();
    } else {
      setIsSubmitting(false);
      setSubmissionFailed(false);
      setSuccessfullySent(false);
    }
  }, [showFailedPreview, showSubmittedPreview, showSubmittingPreview]);

  useEffect(() => {
    if (!isInPlaceEditingActive()) {
      return;
    }
    // in order to show step number in the props title of each step
    const steps = widget.get("steps") as Widget[];
    steps.forEach((step, i) => {
      const stepNumber = i + 1;
      step.update({
        stepNumber: stepNumber,
        isSingleStep: isSingleStep
      });
    });
    if (stepsLength > 1 && isSingleStep) {
      widget.update({ formType: "multi-step" });
    } else if (stepsLength == 1 && !isSingleStep) {
      widget.update({ formType: "single-step" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widget.get("steps")]);

  useEffect(() => {
    if (fixedFormHeight && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      setTotalFormHeight(containerRect.height);
    }
  }, [fixedFormHeight]);

  useEffect(() => {
    if (showCaptcha && isLastPage) {
      setIsSubmitDisabled(reCaptchaToken == null);
    }
  }, [reCaptchaToken, showCaptcha, isLastPage]);

  const getStepInfo = (stepId: string) => {
    const steps = widget.get("steps") as Widget[] || [];
    let isActive = false;
    let stepNumber = 0;

    steps.some((step: Widget, index: number) => {
      if (step.id() === stepId) {
        stepNumber = index + 1;
        isActive = stepNumber === currentStep;
        return true;
      }
      return false;
    });

    return { stepNumber, isActive, isSingleStep };
  };

  const handleInputChange = (fieldUpdates: StringMap<string> | string, value?: string) => {
    if (typeof fieldUpdates === "string") {
      setFormData(prevState => ({
        ...prevState,
        [fieldUpdates]: value || ""
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        ...fieldUpdates
      }));
    }
  };

  const onSubmit = async () => {
    if (!formData) {
      return;
    }
    if (isInPlaceEditingActive() && widget.get("formType") == "multi-step") {
      // eslint-disable-next-line no-console
      console.log("In edit mode, only the first step will be validated for mandatory fields.");
    }
    const isValid = validateCurrentStep();
    if (!isValid) {
      return;
    }
    const formElement = document.getElementById(formId) as HTMLFormElement;
    formElement && scrollIntoView(formElement);

    indicateProgress();
    try {
      const completeFormData = Object.fromEntries(getFormData(widget)!);
      setFormData(completeFormData);
      await submitForm(completeFormData as StringMap<string>, tenant);
      indicateSuccess();
    } catch (e) {
      console.error(e);
      indicateFailure();
    }
  }

  const onPageChange = (nextPage: boolean) => {
    let isValid = true;

    if (isInPlaceEditingActive()) {
      // eslint-disable-next-line no-console
      console.log("Navigation buttons do not work in edit mode.");
      return;
    }
    if (nextPage) {
      isValid = validateCurrentStep();
    }
    if (!isValid) {
      return;
    }
    const stepNumber = nextPage
      ? Math.min(currentStep + 1, stepsLength)
      : Math.max(currentStep - 1, 1);
    setCurrentStepNumber(stepNumber);
    setTimeout(() => {
      const formElement = document.getElementById(formId) as HTMLFormElement;
      scrollIntoView(formElement);
    }, 0);
  };

  const indicateProgress = () => {
    setIsSubmitting(true);
    setSuccessfullySent(false);
    setSubmissionFailed(false);
  };

  const indicateSuccess = () => {
    setIsSubmitting(false);
    setSuccessfullySent(true);
    setSubmissionFailed(false);
  };

  const indicateFailure = () => {
    setIsSubmitting(false);
    setSuccessfullySent(false);
    setSubmissionFailed(true);
  };

  const validateCurrentStep = (): boolean => {
    return validate(formId, currentStep);
  };

  const getFormClassNames = () => {
    const classNames = [];

    if (fixedFormHeight) {
      classNames.push("fixed-container-height");
      if (formOverscrollBehavior == "none") {
        classNames.push("no-overscroll-y");
      }
      if (formScrollbarWidth == "thin") {
        classNames.push("thin-scrollbar");
      } else if (formScrollbarWidth == "none") {
        classNames.push("hidden-scrollbar");
      }
    }
    return classNames.join(" ");
  }

  return {
    currentStep,
    isSingleStep,
    stepsLength,
    isSubmitting,
    successfullySent,
    submissionFailed,
    totalFormHeight,
    containerRef,
    setReCaptchaToken,
    isSubmitDisabled,
    handleInputChange,
    getStepInfo,
    onSubmit,
    onPageChange,
    indicateProgress,
    indicateSuccess,
    indicateFailure,
    getFormClassNames
  };
};
