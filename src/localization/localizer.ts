import * as Scrivito from "scrivito";

const SUPPORTED_LANGUAGES = ["en", "de", "fr"];

type SupportedLanguages = typeof SUPPORTED_LANGUAGES[number];

//TODO: improve/separate 
export const LOCALIZATION_KEYS = {
	alignment: "alignment",
	left: "left",
	right: "right",
	center: "center",
	title: "title",
	required: "required",
	fieldName: "fieldName",
	helpText: "helpText"
};
type LocalizationKeys = keyof typeof LOCALIZATION_KEYS;


class Localizer {
	private currentLanguage: SupportedLanguages = "en";
	private localizations: Record<LocalizationKeys, string> = {} as Record<LocalizationKeys, string>;

	public async initialize(): Promise<void> {
		const editorLanguage = await Scrivito.load(() => Scrivito.editorLanguage() || "en");
		const fallbackLanguage: SupportedLanguages = "en";

		if (this.isSupportedLanguage(editorLanguage)) {
			this.currentLanguage = editorLanguage as SupportedLanguages;
		} else {
			this.currentLanguage = fallbackLanguage;
		}

		await this.loadLocale(this.currentLanguage);
	}

	public localize(key: LocalizationKeys): string {
		return this.localizations[key];
	}

	private async loadLocale(language: SupportedLanguages): Promise<void> {
		try {
			this.localizations = await import(`./locales/${language}.json`);
		} catch (error) {
			console.error(`Error loading locale for language: ${language}`, error);
			this.localizations = (await import("./locales/en.json"));
		}
	}
	private isSupportedLanguage(language: string): language is SupportedLanguages {
		return SUPPORTED_LANGUAGES.includes(language);
	}
}

const localizer = new Localizer();
export default localizer;
