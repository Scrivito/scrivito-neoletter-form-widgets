import * as React from "react";
import * as Scrivito from "scrivito";
import {
  CaptchaTheme,
  FriendlyCaptchaEndpoint,
  FriendlyCaptchaStartMode
} from "../../../../types/types";
import { isEmpty } from "../utils/lodashPolyfills";
import { WidgetInstance } from "../../../../types/friendlyChallenge";

interface FriendlyCaptchaProps {
  onChangeCaptcha: React.Dispatch<React.SetStateAction<string | null>>;
  siteKey: string;
  widget: Scrivito.Widget;
  theme: CaptchaTheme
  endpoint: FriendlyCaptchaEndpoint;
}
const GLOBAL_ENDPOINT = "https://api.friendlycaptcha.com/api/v1/puzzle";
const EU_ENDPOINT = "https://eu-api.friendlycaptcha.eu/api/v1/puzzle";

export const FriendlyCaptcha: React.FC<FriendlyCaptchaProps> = ({
  siteKey,
  onChangeCaptcha,
  widget,
  theme,
  endpoint
}) => {
  const startMode =
    (widget.get("friendlyCaptchaStartMode") as FriendlyCaptchaStartMode) ||
    "none";
  const language = isEmpty(widget.get("friendlyCaptchaLanguage"))
    ? undefined
    : (widget.get("friendlyCaptchaLanguage") as string);

  const widgetInstance = React.useRef<WidgetInstance>();
  const container = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!widgetInstance.current && container.current && (window as any).friendlyChallenge) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      widgetInstance.current = new (window as any).friendlyChallenge.WidgetInstance(container.current, {
        startMode: startMode,
        doneCallback: onChangeCaptcha,
        sitekey: siteKey,
        language: language,

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
