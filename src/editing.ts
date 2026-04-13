declare const require: {
	context: (
		directory: string,
		useSubdirectories: boolean,
		regExp: RegExp
	) => {
		(key: string): unknown;
		keys: () => string[];
	};
};

export function loadEditingConfigs(): void {
	try {
		const widgetImportsContext = require.context(
			"./Widgets",
			true,
			/WidgetEditingConfig\.tsx?$/
		);
		widgetImportsContext.keys().forEach(widgetImportsContext);
		return;
	} catch (_error) {
		// Continue with the Vite loader below.
	}

	if (typeof (import.meta as any).glob === "function") {
		(import.meta as any).glob(["./Widgets/**/*WidgetEditingConfig.ts"], {
			eager: true
		});
	}
}
