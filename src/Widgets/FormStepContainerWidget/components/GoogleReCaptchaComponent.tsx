import * as React from "react"
import * as Scrivito from "scrivito";
import ReCAPTCHA from "react-google-recaptcha"
import { CaptchaTheme } from "../../../../types/types";

interface GoogleReCaptchaProps {
  siteKey: string;
  onChangeCaptcha: React.Dispatch<React.SetStateAction<string | null>>;
  widget: Scrivito.Widget;
}

export const GoogleReCaptcha: React.FC<GoogleReCaptchaProps> = ({ siteKey, onChangeCaptcha, widget }) => {
  const theme = widget.get("googleRecaptchaTheme") as CaptchaTheme || "light";
  const language = widget.get("googleRecaptchaLanguage") as string;
  return (
    <ReCAPTCHA
      sitekey={siteKey}
      onChange={onChangeCaptcha}
      theme={theme}
      hl={language}
    />
  );
}
