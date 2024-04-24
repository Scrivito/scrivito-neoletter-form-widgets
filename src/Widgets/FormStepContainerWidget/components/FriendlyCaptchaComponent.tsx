import * as React from "react";
import * as Scrivito from "scrivito";
import { WidgetInstance } from "friendly-challenge";
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
  const container = React.useRef<HTMLDivElement>(null);
  const widgetInstance = React.useRef<WidgetInstance>();
  const theme = (widget.get("friendlyCaptchaTheme") as string) || "light";
  const startMode =
    (widget.get("friendlyCaptchaStartMode") as FriendlyCaptchaStartMode) ||
    "none";
  const language = isEmpty(widget.get("friendlyCaptchaLanguage"))
    ? undefined
    : (widget.get("friendlyCaptchaLanguage") as string);

  React.useEffect(() => {
    if (!widgetInstance.current && container.current) {
      widgetInstance.current = new WidgetInstance(container.current, {
        startMode: startMode,
        doneCallback: onChangeCaptcha,
        sitekey: siteKey,
        language: language as never,
        puzzleEndpoint: endpoint == "eu" ? EU_ENDPOINT : GLOBAL_ENDPOINT
      });
    }
    return () => {
      if (widgetInstance.current) {
        widgetInstance.current.reset();
      }
    };
  }, [container]);

  return <div ref={container} className={`frc-captcha ${theme}`} />;
};
