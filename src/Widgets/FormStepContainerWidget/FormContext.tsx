import React, { createContext, useContext } from "react";
import { StringMap } from "../../../types/types";

interface FormContextProps {
	getStepInfo: (stepId: string) => { stepNumber: number; isActive: boolean; isSingleStep: boolean };
	navigateOnClick: () => void;
	onInputChange: (fieldUpdates: StringMap<string> | string, value?: string) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = () => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error("useFormContext must be used within a FormProvider");
	}
	return context;
};

interface FormProviderProps {
	children: React.ReactNode;
	value: FormContextProps;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children, value }) => {
	return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
