import { WidgetInstance } from "./friendlyChallenge";

export { };

declare global {
	interface Window {
		grecaptcha: {
			render?: (
				container: HTMLElement | string,
				parameters: {
					sitekey: string;
					theme: string;
					callback: (response: string) => void;
					"expired-callback": (response: string) => void;
					hl?: string;
				}
			) => number;
			ready?: (callback: () => void) => void;
			reset: (widgetId?: number) => void;
		};
		onloadCallback?: () => void;
		friendlyChallenge: {
			WidgetInstance: typeof WidgetInstance;
		}
	}
}
