import * as React from "react";
import * as Scrivito from "scrivito";
import { CaptchaTheme } from "../../../../types/types";

interface GoogleReCaptchaProps {
  siteKey: string;
  onChangeCaptcha: React.Dispatch<React.SetStateAction<string | null>>;
  widget: Scrivito.Widget;
  theme: CaptchaTheme;
}

export const GoogleReCaptcha: React.FC<GoogleReCaptchaProps> = ({
  siteKey,
  onChangeCaptcha,
  widget,
  theme
}) => {
  const language = widget.get("googleRecaptchaLanguage") as string;
  const captchaRef = React.useRef<HTMLDivElement>(null);
  const captchaIdRef = React.useRef<number | null>(null);

  const renderCaptcha = React.useCallback(() => {
    if (captchaRef.current && captchaIdRef.current === null && window.grecaptcha.render) {
      captchaIdRef.current = window.grecaptcha.render(captchaRef.current, {
        sitekey: siteKey,
        theme,
        callback: onChangeCaptcha,
        "expired-callback": onChangeCaptcha,
        hl: language
      });
    }
  }, [siteKey, theme, onChangeCaptcha, language]);

  React.useEffect(() => {
    const onloadCallback = () => {
      if (window.grecaptcha?.ready) {
        window.grecaptcha.ready(() => {
          renderCaptcha();
        });
      }
    };

    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(() => {
        renderCaptcha();
      });
    } else {
      window.onloadCallback = onloadCallback;
      onloadCallback();
    }
    return () => {
      if (captchaIdRef.current !== null) {
        window.grecaptcha.reset(captchaIdRef.current);
      }
    };
  }, [renderCaptcha]);

  React.useLayoutEffect(() => {
    if (captchaRef.current && window.grecaptcha?.render) {
      renderCaptcha();
    }
  }, [renderCaptcha]);

  return <div ref={captchaRef} className="g-recaptcha"></div>;
};
