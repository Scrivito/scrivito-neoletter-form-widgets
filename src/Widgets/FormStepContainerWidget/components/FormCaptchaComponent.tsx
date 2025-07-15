import * as React from "react";
import * as Scrivito from "scrivito";
import { isEmpty } from "../utils/lodashPolyfills";
import { getCaptchaOptions } from "../../../config/scrivitoConfig";
import { FriendlyCaptcha } from "./FriendlyCaptchaComponent";
import { GoogleReCaptcha } from "./GoogleReCaptchaComponent";
import { CaptchaTheme } from "../../../../types/types";
import { useFormAttributesContext } from "../FormAttributesContext";
import { MessageBlock } from "./MessageBlock";

interface FormCaptchaProps {
  widget: Scrivito.Widget;
  hidden: boolean;
}

export const FormCaptcha: React.FC<FormCaptchaProps> = ({
  widget,
  hidden
}) => {
  const options = getCaptchaOptions();
  const { captchaAlignment, captchaTheme } = useFormAttributesContext()
  if (Scrivito.isInPlaceEditingActive() && isEmpty(options.siteKey)) {
    return <MessageBlock type="noCaptcha" />;
  }
  if (isEmpty(options.siteKey)) {
    return null;
  }

  return (
    <div hidden={hidden} className={`mb-3 captcha-container ${captchaAlignment}`}>
      {options.captchaType === "friendly-captcha" ? (
        <FriendlyCaptcha
          siteKey={options.siteKey}
          widget={widget}
          endpoint={"global"}
          theme={captchaTheme}
        />
      ) : (
        <GoogleReCaptcha
          siteKey={options.siteKey}
          type={options.captchaType}
          widget={widget}
          theme={captchaTheme}
          key={captchaTheme} // force re-render on theme change.
        />
      )}
    </div>
  );
};
