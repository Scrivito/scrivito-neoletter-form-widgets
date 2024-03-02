import * as React from "react";
import * as Scrivito from "scrivito";
import ReCAPTCHA from "react-google-recaptcha";
import { isEmpty } from "lodash-es";
import { getReCaptchaSiteKey } from "../../../config/scrivitoConfig";
interface FormReCaptchaProps {
	showReCaptcha: boolean;
	alignment: string;
	onChangeReCaptcha: React.Dispatch<React.SetStateAction<string | null>>;
}

//TODO: add more props to reCAPTCHA component (hl, theme, size...)
export const FormReCaptcha: React.FC<FormReCaptchaProps> = ({ showReCaptcha, onChangeReCaptcha, alignment }) => {
	const siteKey = getReCaptchaSiteKey();
	if (Scrivito.isInPlaceEditingActive() && isEmpty(siteKey) && showReCaptcha) {
		return (
			<div className="text-center missing-site-key">
				<span >Warning: You activated reCAPTCHA but did not set a site key!</span>
			</div>
		);
	}
	return (
		showReCaptcha && !isEmpty(siteKey) ?
			<>
				<div className={`mb-3 recaptcha-container ${alignment}`}>
					<ReCAPTCHA
						sitekey={siteKey}
						onChange={onChangeReCaptcha}
					/>
				</div>
			</> :
			null
	);
};
