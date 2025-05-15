import React, { createContext, useContext, useState, useCallback } from 'react';

type CaptchaContextValue = {
	captchaToken: string | null;
	setCaptchaToken: (token: string | null) => void;
	registerCaptchaTrigger: (fn: () => Promise<string>) => void;
	triggerCaptcha: () => Promise<string>;
	isCaptchaResolved: boolean;
};

const CaptchaContext = createContext<CaptchaContextValue | undefined>(undefined);

export const CaptchaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [captchaToken, setCaptchaToken] = useState<string | null>(null);
	const [triggerFn, setTriggerFn] = useState<() => Promise<string>>(() => async () => '');

	const registerCaptchaTrigger = useCallback((fn: () => Promise<string>) => {
		setTriggerFn(() => fn);
	}, []);

	const triggerCaptcha = useCallback(async () => {
		const token = await triggerFn();
		setCaptchaToken(token);
		return token;
	}, [triggerFn]);

	return (
		<CaptchaContext.Provider
			value={{
				captchaToken,
				setCaptchaToken,
				registerCaptchaTrigger,
				triggerCaptcha,
				isCaptchaResolved: !!captchaToken,
			}}
		>
			{children}
		</CaptchaContext.Provider>
	);
};

export const useCaptcha = () => {
	const context = useContext(CaptchaContext);
	if (!context) throw new Error('useCaptcha must be used within CaptchaProvider');
	return context;
};