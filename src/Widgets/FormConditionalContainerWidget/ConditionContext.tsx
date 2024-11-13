import React, { createContext, useContext } from "react";

interface ConditionContextProps {
	getConditionData: (conditionId: string) => { isActive: boolean };
}

const ConditionContext = createContext<ConditionContextProps | undefined>(undefined);

export const useConditionContext = () => {
	const context = useContext(ConditionContext);
	if (!context) {
		throw new Error("useConditionContext must be used within a ConditionProvider");
	}
	return context;
};

interface ConditionProviderProps {
	children: React.ReactNode;
	value: ConditionContextProps;
}

export const ConditionProvider: React.FC<ConditionProviderProps> = ({ children, value }) => {
	return <ConditionContext.Provider value={value}>{children}</ConditionContext.Provider>;
};
