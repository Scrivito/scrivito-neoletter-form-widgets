import React, { createContext, useContext } from "react";
import { FormWidgetAttributes } from "../../../types/types";

const FormAttributesContext = createContext<FormWidgetAttributes | undefined>(undefined);

export const useFormAttributesContext = (): FormWidgetAttributes => {
	const context = useContext(FormAttributesContext);
	if (!context) {
		throw new Error("useFormAttributes must be used within a FormAttributesProvider");
	}
	return context;
}

export const FormAttributesProvider: React.FC<{ values: FormWidgetAttributes, children: React.ReactNode }> = ({
	values,

	children,
}) => {


	return (
		<FormAttributesContext.Provider value={values}>
			{children}
		</FormAttributesContext.Provider>
	);
};