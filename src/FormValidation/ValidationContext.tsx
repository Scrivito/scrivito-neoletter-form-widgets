import React, { createContext, useContext, useState } from "react";
import { StringMap } from "../../types/types";

interface ValidationContextProps {
	invalidFields: StringMap<boolean>;
	mandatoryFields: StringMap<boolean>;
	firstInvalidField: string | null;
	setFirstInvalidField: React.Dispatch<string | null>
	updateValidationState: (fieldName: string, isValid: boolean) => void;
	registerField: (fieldName: string, isMandatory: boolean) => void;
	validate: (formId: string, currentStep: number) => boolean;
}

const ValidationContext = createContext<ValidationContextProps | undefined>(undefined);

export const useValidationContext = () => {
	const context = useContext(ValidationContext);
	if (!context) {
		throw new Error("useValidationContext must be used within a ValidationProvider");
	}
	return context;
};

export const ValidationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [invalidFields, setInvalidFields] = useState<StringMap<boolean>>({});
	const [mandatoryFields, setMandatoryFields] = useState<StringMap<boolean>>({});
	const [firstInvalidField, setFirstInvalidField] = useState<string | null>(null);

	const updateValidationState = (fieldName: string, isValid: boolean) => {
		setInvalidFields(prev => {
			return { ...prev, [fieldName]: !isValid };
		});
	};

	const registerField = (fieldName: string, isMandatory: boolean) => {
		setMandatoryFields(prev => ({
			...prev,
			[fieldName]: isMandatory
		}));
	};

	const validate = (formId: string, currentStep: number): boolean => {
		let isValid = true;
		let firstInvalidFound = false;

		const form = document.getElementById(formId);
		if (form) {
			const step = form.querySelector(`[data-step-number='${currentStep}']`);
			if (step) {
				const allInputs: NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> =
					step.querySelectorAll("input, select, textarea");

				allInputs.forEach(node => {
					const fieldName = node.name;
					const value = (node.value || "").trim();
					const isMandatory = mandatoryFields[fieldName] || false;
					const fieldType = node.type;

					if (!isMandatory) {
						updateValidationState(fieldName, true);
						return;
					}

					if (fieldType === "radio" || fieldType === "checkbox") {
						const checkedInputs = step.querySelectorAll(`input[name='${fieldName}']:checked`);
						if (checkedInputs.length === 0) {
							updateValidationState(fieldName, false);
							isValid = false;
						} else {
							updateValidationState(fieldName, true);
						}
					} else if (!value || !node.checkValidity()) {
						updateValidationState(fieldName, false);
						isValid = false;
					} else {
						updateValidationState(fieldName, true);
					}

					if (!firstInvalidFound && !isValid) {
						setFirstInvalidField(fieldName);
						firstInvalidFound = true;
					}
				});

				if (isValid) {
					setFirstInvalidField(null);
				}
			}
		}

		return isValid;
	};

	return (
		<ValidationContext.Provider value={{ invalidFields, mandatoryFields, firstInvalidField, setFirstInvalidField, updateValidationState, registerField, validate }}>
			{children}
		</ValidationContext.Provider>
	);
};
