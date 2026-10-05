import * as React from "react";
import * as Scrivito from "scrivito";
import { CaptchaTheme, FriendlyCaptchaStartMode } from "../../../../types/types";
import { useCaptcha } from "../CaptchaContext";

interface FriendlyCaptchaV2Props {
  siteKey: string;
  widget: Scrivito.Widget;
  theme: CaptchaTheme;
}

interface CaptchaHandle {
  addEventListener: (name: "frc:widget.statechange", listener: (event: CustomEvent<{ state: string; response: string }>) => void) => void;
  destroy: () => void;
}

interface CaptchaSDK {
  createWidget: (options: {
    element: HTMLElement;
    sitekey: string;
    theme: CaptchaTheme;
    startMode: FriendlyCaptchaStartMode;
    language?: string;
  }) => CaptchaHandle;
}

const SDK_URL = "https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@1.1.1/sdk.js";
let sdkPromise: Promise<CaptchaSDK> | undefined;

// Load once in the browser and share the SDK between forms.
function getSDK(): Promise<CaptchaSDK> {
  return sdkPromise ??= import(/* webpackIgnore: true */ /* @vite-ignore */ SDK_URL)
    .then(({ FriendlyCaptchaSDK }) => new FriendlyCaptchaSDK())
    .catch((error) => {
      sdkPromise = undefined;
      throw error;
    });
}

export const FriendlyCaptchaV2: React.FC<FriendlyCaptchaV2Props> = ({
  siteKey,
  widget,
  theme
}) => {
  const container = React.useRef<HTMLDivElement>(null);
  const { setCaptchaToken } = useCaptcha();
  const startMode = (widget.get("friendlyCaptchaStartMode") as FriendlyCaptchaStartMode) || "none";
  const language = (widget.get("friendlyCaptchaLanguage") as string) || undefined;

  React.useEffect(() => {
    const element = container.current;
    if (!element) return;
    let cancelled = false;
    let captcha: CaptchaHandle | undefined;

    getSDK().then((sdk) => {
      if (cancelled) return;
      captcha = sdk.createWidget({ element, sitekey: siteKey, theme, startMode, language });
      captcha.addEventListener("frc:widget.statechange", (event) => {
        setCaptchaToken(event.detail.state === "completed" ? event.detail.response : null);
      });
    }).catch((error) => {
      if (!cancelled) {
        setCaptchaToken(null);
        console.error("Failed to load Friendly Captcha v2", error);
      }
    });

    return () => {
      cancelled = true;
      captcha?.destroy();
      setCaptchaToken(null);
    };
  }, [siteKey, theme, startMode, language, setCaptchaToken]);

  return <div ref={container} className="frc-captcha" />;
};
