import * as React from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { CaptchaTheme } from "../../../../types/types";

interface GoogleReCaptchaProps {
  siteKey: string;
  theme: CaptchaTheme;
  language: string;
  onChangeCaptcha: React.Dispatch<React.SetStateAction<string | null>>;
}

export const GoogleReCaptcha: React.FC<GoogleReCaptchaProps> = ({ siteKey, theme, language, onChangeCaptcha }) => {
  return (
    <ReCAPTCHA
      sitekey={siteKey}
      onChange={onChangeCaptcha}
      theme={theme}
      hl={language}
    />
  );
}
