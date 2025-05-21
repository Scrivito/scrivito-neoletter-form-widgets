import { useState, useEffect, useRef } from "react";
import { isInPlaceEditingActive, Widget } from "scrivito";
import { StringMap } from "../../../types/types";
import { getFormData, submitForm } from "./utils/submitForm";
import { scrollIntoView } from "./utils/scrollIntoView";
import { useValidationContext } from "../../FormValidation/ValidationContext";
import { useCaptcha } from "./CaptchaContext";
import { getCaptchaOptions } from "../../config/scrivitoConfig";
import { useFormAttributesContext } from "./FormAttributesContext";

export const useFormStepContainer = (widget: Widget, tenant: string) => {
  const [currentStep, setCurrentStepNumber] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successfullySent, setSuccessfullySent] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [formData, setFormData] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [totalFormHeight, setTotalFormHeight] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { formType, steps, showCaptcha, fixedFormHeight, formId, formOverscrollBehavior, formScrollbarWidth, showFailedPreview, showSubmittedPreview, showSubmittingPreview } = useFormAttributesContext();
  const stepsLength = steps.length;
  const isLastPage = currentStep === stepsLength;
  const isSingleStep = formType === "single-step";


  const { validate } = useValidationContext();
  const { captchaType } = getCaptchaOptions();
  const {
    triggerCaptcha,
    isCaptchaResolved
  } = useCaptcha();

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
  }, [steps]);

  useEffect(() => {
    if (fixedFormHeight && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      setTotalFormHeight(containerRect.height);
    }
  }, [fixedFormHeight]);

  useEffect(() => {
    if (captchaType == "google-recaptcha-v3") {
      setIsSubmitDisabled(false);
    } else if (showCaptcha && isLastPage) {
      setIsSubmitDisabled(!isCaptchaResolved);
    }
  }, [isCaptchaResolved, showCaptcha, isLastPage]);

  const getStepInfo = (stepId: string) => {
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
    if (isInPlaceEditingActive() && formType == "multi-step") {
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

      if (captchaType === "google-recaptcha-v3") {
        const token = await triggerCaptcha();
        // Inject v3 captcha token manually
        completeFormData["g-recaptcha-response"] = token;
      }

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
