import * as React from "react";
import * as Scrivito from "scrivito";
import {
  FriendlyCaptchaEndpoint,
  FriendlyCaptchaStartMode
} from "../../../../types/types";
import { isEmpty } from "../utils/lodashPolyfills";

interface FriendlyCaptchaProps {
  onChangeCaptcha: React.Dispatch<React.SetStateAction<string | null>>;
  siteKey: string;
  widget: Scrivito.Widget;
  endpoint: FriendlyCaptchaEndpoint;
}
const GLOBAL_ENDPOINT = "https://api.friendlycaptcha.com/api/v1/puzzle";
const EU_ENDPOINT = "https://eu-api.friendlycaptcha.eu/api/v1/puzzle";

export const FriendlyCaptcha: React.FC<FriendlyCaptchaProps> = ({
  siteKey,
  onChangeCaptcha,
  widget,
  endpoint
}) => {
  const theme = (widget.get("friendlyCaptchaTheme") as string) || "light";
  const startMode =
    (widget.get("friendlyCaptchaStartMode") as FriendlyCaptchaStartMode) ||
    "none";
  const language = isEmpty(widget.get("friendlyCaptchaLanguage"))
    ? undefined
    : (widget.get("friendlyCaptchaLanguage") as string);

  const [callbackName, setCallbackName] = React.useState("");

  React.useEffect(() => {
    // check if the script is already attached
    const existingScript = document.querySelector(
      'script[src^="https://cdn.jsdelivr.net/npm/friendly-challenge"]'
    );
    if (!existingScript) {
      attachFriendlyCaptchaScript();
    }
    setCallbackName(
      `friendlyChallengeCallback_${Math.random().toString(36).substring(2)}`
    );
  }, []);

  React.useEffect(() => {
    if (!callbackName) {
      return;
    }
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
      data-start={startMode}
      data-lang={language}
      data-sitekey={siteKey}
      data-puzzle-endpoint={endpoint == "eu" ? EU_ENDPOINT : GLOBAL_ENDPOINT}
      data-callback={callbackName}
      className={`frc-captcha ${theme}`}
    />
  );
};

const attachFriendlyCaptchaScript = () => {
  const script = document.createElement("script");
  script.type = "module";
  script.src =
    "https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.14/widget.module.min.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};
