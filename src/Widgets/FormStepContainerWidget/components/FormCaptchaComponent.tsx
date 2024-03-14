import * as React from "react";
import * as Scrivito from "scrivito";
import { isEmpty } from "lodash-es";
import { getCaptchaOptions } from "../../../config/scrivitoConfig";
import { FriendlyCaptcha } from "./FriendlyCaptchaComponent";
import { GoogleReCaptcha } from "./GoogleReCaptchaComponent";
import { CaptchaStartMode, CaptchaTheme } from "../../../../types/types";
interface FormCaptchaProps {
	alignment: string;
	theme: string;
	startMode: CaptchaStartMode;
	language: string;
	onChangeCaptcha: React.Dispatch<React.SetStateAction<string | null>>;
}

export const FormCaptcha: React.FC<FormCaptchaProps> = ({ onChangeCaptcha, theme, startMode, alignment, language }) => {
	const options = getCaptchaOptions();

	if (Scrivito.isInPlaceEditingActive() && isEmpty(options.siteKey)) {
		return (
			<div className="text-center missing-site-key">
				<span >Warning: You activated CAPTCHA but did not set a site key!</span>
			</div>
		);
	}
	if (isEmpty(options.siteKey)) {
		return null;
	}

	return (
		<div className={`mb-3 captcha-container ${alignment}`}>
			{options.captchaType == "google-recaptcha" ?
				<GoogleReCaptcha
					onChangeCaptcha={onChangeCaptcha}
					siteKey={options.siteKey}
					theme={theme as CaptchaTheme}
					language={language}
				/>
				:
				<FriendlyCaptcha
					onChangeCaptcha={onChangeCaptcha}
					siteKey={options.siteKey}
					theme={theme}
					startMode={startMode}
					language={isEmpty(language) ? undefined : language}
					endpoint={options.endpoint}
				/>
			}
		</div>
	);
};
