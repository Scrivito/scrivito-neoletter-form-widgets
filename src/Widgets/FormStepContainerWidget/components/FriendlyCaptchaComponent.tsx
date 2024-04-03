import * as React from "react";
import { WidgetInstance } from 'friendly-challenge';
import { CaptchaEndpoint, CaptchaStartMode } from "../../../../types/types";

interface FriendlyCaptchaProps {
  onChangeCaptcha: React.Dispatch<React.SetStateAction<string | null>>;
  siteKey: string;
  theme: string;
  language: string | undefined;
  startMode: CaptchaStartMode;
  endpoint: CaptchaEndpoint;
}
const GLOBAL_ENDPOINT = "https://api.friendlycaptcha.com/api/v1/puzzle";
const EU_ENDPOINT = "https://eu-api.friendlycaptcha.eu/api/v1/puzzle";

export const FriendlyCaptcha: React.FC<FriendlyCaptchaProps> = ({ siteKey, theme, onChangeCaptcha, startMode, language, endpoint }) => {
  const container = React.useRef<HTMLDivElement>(null);
  const widget = React.useRef<WidgetInstance>();
 
  React.useEffect(() => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        startMode: startMode,
        doneCallback: onChangeCaptcha,
        sitekey: siteKey,
        language: language as never,
        puzzleEndpoint: endpoint == "eu" ? EU_ENDPOINT : GLOBAL_ENDPOINT
      });
    }
    return () => {
      if (widget.current) {
        widget.current.reset();
      }
    }
  }, [container]);

  return (
    <div ref={container} className={`frc-captcha ${theme}`} />
  );
}
