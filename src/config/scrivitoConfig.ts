/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Scrivito from "scrivito";
import { CaptchaOptions } from "../../types/types";
import { isEmpty } from "../Widgets/FormStepContainerWidget/utils/lodashPolyfills";

const GLOBAL_OBJ = typeof window !== 'undefined' ? window : global;

export const initNeoletterFormWidgets = (
	instanceId?: string,
	captchaOptions?: CaptchaOptions
): void => {
	if (instanceId) {
		(GLOBAL_OBJ as any).neoletterFormInstanceId = instanceId;
	}
	(GLOBAL_OBJ as any).neoletterFormCaptchaOptions = captchaOptions
		? captchaOptions
		: { siteKey: "", captchaType: null };

	loadWidgets();
	attachCaptchaScript();
};

export const getInstanceId = (): string => {
	return (
		(GLOBAL_OBJ as any).neoletterFormInstanceId ||
		(Scrivito.getInstanceId && Scrivito.getInstanceId()) ||
		""
	);
};

export const getCaptchaOptions = (): CaptchaOptions => {
	return (GLOBAL_OBJ as any).neoletterFormCaptchaOptions;
};

function loadWidgets(): void {
	if (isEmpty(import.meta)) {
		const widgetImportsContext = require.context(
			"../Widgets",
			true,
			/Widget(Class|Component)\.tsx?$/
		);
		widgetImportsContext.keys().forEach(widgetImportsContext);
	} else {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(import.meta as any).glob(
			["../Widgets/**/*WidgetClass.ts", "../Widgets/**/*WidgetComponent.tsx"],
			{
				eager: true
			}
		);
	}
}

function attachCaptchaScript() {
	if (isEmpty(getCaptchaOptions().siteKey)) {
		return;
	}
	if (getCaptchaOptions().captchaType == "friendly-captcha") {
		attachFriendlyCaptchaScript();
	} else {
		attachGoogleRecaptchaScript();
	}
}

const attachFriendlyCaptchaScript = () => {
	// check if the script is already attached
	const existingScript = document.querySelector(
		'script[src^="https://cdn.jsdelivr.net/npm/friendly-challenge"]'
	);
	if (existingScript) {
		return;
	}
	const script = document.createElement("script");
	script.type = "module";
	script.src = "https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.14/widget.module.min.js";
	script.async = true;
	script.defer = true;
	document.body.appendChild(script);
};

const attachGoogleRecaptchaScript = () => {
	// check if the script is already attached
	const existingScript = document.querySelector(
		'script[src^="https://www.google.com/recaptcha/api.js"]'
	);
	if (existingScript) {
		return;
	}
	const script = document.createElement("script");
	script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
	script.async = true;
	script.defer = true;
	document.body.appendChild(script);
};
