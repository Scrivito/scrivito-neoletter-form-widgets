import * as React from "react";
import * as Scrivito from "scrivito";
import { isEmpty } from "../utils/lodashPolyfills";
import { getCaptchaOptions } from "../../../config/scrivitoConfig";
import { FriendlyCaptcha } from "./FriendlyCaptchaComponent";
import { GoogleReCaptcha } from "./GoogleReCaptchaComponent";
interface FormCaptchaProps {
  widget: Scrivito.Widget;
  alignment: string;
  hidden: boolean;
  onChangeCaptcha: React.Dispatch<React.SetStateAction<string | null>>;
}

export const FormCaptcha: React.FC<FormCaptchaProps> = ({
  onChangeCaptcha,
  widget,
  alignment,
  hidden
}) => {
  const options = getCaptchaOptions();
  if (Scrivito.isInPlaceEditingActive() && isEmpty(options.siteKey)) {
    return (
      <div className="text-center missing-site-key">
        <span>Warning: You activated CAPTCHA but did not set a site key!</span>
      </div>
    );
  }
  if (isEmpty(options.siteKey)) {
    return null;
  }

  return (
    <div hidden={hidden} className={`mb-3 captcha-container ${alignment}`}>
      {options.captchaType == "google-recaptcha" ? (
        <GoogleReCaptcha
          onChangeCaptcha={onChangeCaptcha}
          siteKey={options.siteKey}
          widget={widget}
        />
      ) : (
        <FriendlyCaptcha
          onChangeCaptcha={onChangeCaptcha}
          siteKey={options.siteKey}
          widget={widget}
          endpoint={"global"}
        />
      )}
    </div>
  );
};
