import * as React from "react";
import * as Scrivito from "scrivito";
import { CaptchaTheme } from "../../../../types/types";
import { isEmpty } from "../utils/lodashPolyfills";

interface GoogleReCaptchaProps {
  siteKey: string;
  onChangeCaptcha: React.Dispatch<React.SetStateAction<string | null>>;
  widget: Scrivito.Widget;
}

export const GoogleReCaptcha: React.FC<GoogleReCaptchaProps> = ({
  siteKey,
  onChangeCaptcha,
  widget
}) => {
  const theme = (widget.get("googleRecaptchaTheme") as CaptchaTheme) || "light";
  const language = widget.get("googleRecaptchaLanguage") as string;
  const [callbackName, setCallbackName] = React.useState("");

  React.useEffect(() => {
    // check if the script is already attached
    const existingScript = document.querySelector(
      'script[src^="https://www.google.com/recaptcha"]'
    );
    if (!existingScript) {
      attachGoogleRecaptchaScript(language);
    }

    setCallbackName(
      `googleRecaptchaCallback_${Math.random().toString(36).substring(2)}`
    );
  }, []);

  React.useEffect(() => {
    // attach callback to window object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)[callbackName] = onChangeCaptcha;

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any)[callbackName];
    };
  }, [callbackName, onChangeCaptcha]);

  return (
    <div
      className="g-recaptcha"
      data-sitekey={siteKey}
      data-theme={theme}
      data-callback={callbackName}
      data-expired-callback={callbackName}
    ></div>
  );
};

const attachGoogleRecaptchaScript = (hl: string) => {
  const lang = !isEmpty(hl) ? `?hl=${hl}` : "";
  const script = document.createElement("script");
  script.src = `https://www.google.com/recaptcha/api.js${lang}`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};
