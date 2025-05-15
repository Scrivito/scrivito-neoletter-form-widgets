import * as React from "react";
import * as Scrivito from "scrivito";
import { CaptchaTheme, CaptchaType } from "../../../../types/types";
import { useCaptcha } from '../CaptchaContext';
import { getCaptchaOptions } from "../../../config/scrivitoConfig";

interface GoogleReCaptchaV2Props {
  siteKey: string;
  widget: Scrivito.Widget;
  theme: CaptchaTheme;
}

export const GoogleReCaptchaV2: React.FC<GoogleReCaptchaV2Props> = ({
  siteKey,
  widget,
  theme
}) => {
  const language = widget.get("googleRecaptchaLanguage") as string;
  const captchaRef = React.useRef<HTMLDivElement>(null);
  const captchaIdRef = React.useRef<number | null>(null);
  const { setCaptchaToken } = useCaptcha();
  const renderCaptcha = React.useCallback(() => {
    if (captchaRef.current && captchaIdRef.current === null && window.grecaptcha.render) {
      captchaIdRef.current = window.grecaptcha.render(captchaRef.current, {
        sitekey: siteKey,
        theme,
        callback: setCaptchaToken,
        "expired-callback": () => setCaptchaToken(null),
        hl: language
      });
    }
  }, [siteKey, theme, setCaptchaToken, language]);

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

interface GoogleReCaptchaV3Props {
  siteKey: string;
}

export const GoogleReCaptchaV3: React.FC<GoogleReCaptchaV3Props> = ({
  siteKey,
}) => {
  const { registerCaptchaTrigger } = useCaptcha();

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    attachGoogleRecaptchaV3Script();

  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const trigger = async () => {
      return new Promise<string>((resolve) => {
        if (window.grecaptcha) {
          (window.grecaptcha as any).ready(() => {
            (window.grecaptcha as any).execute(siteKey, { action: 'submit' }).then(resolve);
          });
        } else {
          resolve('');
        }
      });
    };

    registerCaptchaTrigger(trigger);
  }, [siteKey, registerCaptchaTrigger]);

  return null; // No UI for V3, just executes captcha
};

interface GoogleReCaptchaProps {
  siteKey: string;
  widget: Scrivito.Widget;
  theme: CaptchaTheme;
  type: CaptchaType;
}

export const GoogleReCaptcha: React.FC<GoogleReCaptchaProps> = ({
  siteKey,
  widget,
  theme,
  type
}) => {
  if (type === "google-recaptcha-v2" || type === "google-recaptcha") {
    return <GoogleReCaptchaV2 siteKey={siteKey} widget={widget} theme={theme} />;
  } else if (type === "google-recaptcha-v3") {
    return <GoogleReCaptchaV3 siteKey={siteKey} />;
  } else {
    return null;
  }
};

const attachGoogleRecaptchaV3Script = () => {
  if (document.getElementById("google-recaptcha-v3")) return;

  const { siteKey } = getCaptchaOptions();
  const script = document.createElement("script");
  script.id = "google-recaptcha-v3";
  script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};