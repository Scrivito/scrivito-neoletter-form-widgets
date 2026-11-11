import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Widget } from "scrivito";
import { initNeoletterFormWidgets } from "../../../../src/config/scrivitoConfig";
import { CaptchaProvider, useCaptcha } from "../../../../src/Widgets/FormStepContainerWidget/CaptchaContext";
import { GoogleReCaptchaV2 } from "../../../../src/Widgets/FormStepContainerWidget/components/GoogleReCaptchaComponent";
import { FriendlyCaptcha } from "../../../../src/Widgets/FormStepContainerWidget/components/FriendlyCaptchaComponent";
import { WidgetInstance } from "../../../../types/friendlyChallenge";
import { DummyWidget } from "../../../helpers/dummyWidget";
import { hydrateRoot } from "react-dom/client";

const { renderToString } = jest.requireActual<typeof import("react-dom/server")>("react-dom/server.node");

const widget = new DummyWidget({
  googleRecaptchaLanguage: "de",
  friendlyCaptchaLanguage: "de",
  friendlyCaptchaStartMode: "none"
}) as unknown as Widget;

function CaptchaState() {
  const { captchaToken } = useCaptcha();
  return <output data-testid="captcha-token">{captchaToken}</output>;
}

function captchaTree(type: "google-recaptcha-v2" | "friendly-captcha", count = 1) {
  return (
    <CaptchaProvider>
      {Array.from({ length: count }, (_, index) => type === "google-recaptcha-v2" ? (
        <GoogleReCaptchaV2 key={index} siteKey="test-key" widget={widget} theme="light" />
      ) : (
        <FriendlyCaptcha key={index} siteKey="test-key" widget={widget} theme="light" endpoint="global" />
      ))}
      <CaptchaState />
    </CaptchaProvider>
  );
}

function mountCaptcha(type: "google-recaptcha-v2" | "friendly-captcha", count = 1, strict = false) {
  initNeoletterFormWidgets({ captchaOptions: { captchaType: type, siteKey: "test-key" } });
  const tree = captchaTree(type, count);
  const view = render(strict ? <React.StrictMode>{tree}</React.StrictMode> : tree);
  const script = document.querySelector<HTMLScriptElement>("script")!;
  return { ...view, script };
}

afterEach(() => {
  cleanup();
  document.querySelectorAll("script").forEach((script) => script.remove());
  Reflect.deleteProperty(window, "grecaptcha");
  Reflect.deleteProperty(window, "friendlyChallenge");
  delete window.neoletterRecaptchaOnload;
});

describe("Google reCAPTCHA v2 loading", () => {
  const renderWidget = jest.fn((_element: HTMLElement | string, _options: { callback: (token: string) => void }) => 0);

  function installAPI(ready = (callback: () => void) => callback()) {
    window.grecaptcha = { ready, render: renderWidget, reset: jest.fn() };
  }

  function finishLoading(script: HTMLScriptElement) {
    installAPI();
    const callbackName = new URL(script.src).searchParams.get("onload");
    expect(callbackName).toBe("neoletterRecaptchaOnload");
    act(() => window.neoletterRecaptchaOnload!());
  }

  it("renders when Google loads after the form mounts", () => {
    const { script } = mountCaptcha("google-recaptcha-v2");
    expect(renderWidget).not.toHaveBeenCalled();
    finishLoading(script);
    expect(renderWidget).toHaveBeenCalledTimes(1);
    const options = renderWidget.mock.calls[0][1];
    act(() => options.callback("google-token"));
    expect(screen.getByTestId("captcha-token")).toHaveTextContent("google-token");
  });

  it("renders once when Google is already loaded", () => {
    installAPI();
    const { script } = mountCaptcha("google-recaptcha-v2");
    finishLoading(script);
    expect(renderWidget).toHaveBeenCalledTimes(1);
  });

  it("renders every mounted form when Google finishes loading", () => {
    const { script } = mountCaptcha("google-recaptcha-v2", 2);
    finishLoading(script);
    expect(renderWidget).toHaveBeenCalledTimes(2);
    expect(renderWidget.mock.calls[0][0]).not.toBe(renderWidget.mock.calls[1][0]);
  });

  it("does not render if the form unmounts before Google loads", () => {
    const { script, unmount } = mountCaptcha("google-recaptcha-v2");
    unmount();
    finishLoading(script);
    expect(renderWidget).not.toHaveBeenCalled();
  });

  it("ignores a queued ready callback after unmount", () => {
    let readyCallback: () => void = () => {};
    installAPI((callback) => { readyCallback = callback; });
    const { unmount } = mountCaptcha("google-recaptcha-v2");
    unmount();
    act(() => readyCallback());
    expect(renderWidget).not.toHaveBeenCalled();
  });

  it.each([false, true])("renders once in Strict Mode (API preloaded: %s)", (preloaded) => {
    if (preloaded) installAPI();
    const { script } = mountCaptcha("google-recaptcha-v2", 1, true);
    if (!preloaded) finishLoading(script);
    expect(renderWidget).toHaveBeenCalledTimes(1);
  });

  it("does not inject a second script when another form initializes", () => {
    const { script } = mountCaptcha("google-recaptcha-v2");
    initNeoletterFormWidgets({ captchaOptions: { captchaType: "google-recaptcha-v2", siteKey: "test-key" } });
    expect(document.querySelectorAll("script")).toHaveLength(1);
    finishLoading(script);
    expect(renderWidget).toHaveBeenCalledTimes(1);
  });
});

describe("Friendly CAPTCHA v1 loading", () => {
  const createWidget = jest.fn();

  function installSDK() {
    createWidget.mockImplementation(() => ({ reset: jest.fn() }));
    window.friendlyChallenge = { WidgetInstance: createWidget as unknown as typeof WidgetInstance };
  }

  it("creates a configured widget when the SDK loads after the form mounts", () => {
    const { script, container } = mountCaptcha("friendly-captcha");
    const element = container.querySelector(".frc-captcha");
    expect(element).toHaveAttribute("data-attached", "1");
    expect(createWidget).not.toHaveBeenCalled();
    installSDK();
    fireEvent.load(script);
    expect(createWidget).toHaveBeenCalledTimes(1);
    expect(createWidget).toHaveBeenCalledWith(element, expect.objectContaining({
      sitekey: "test-key", language: "de", startMode: "none"
    }));
    act(() => createWidget.mock.calls[0][1].doneCallback("friendly-token"));
    expect(screen.getByTestId("captcha-token")).toHaveTextContent("friendly-token");
    fireEvent.load(script);
    expect(createWidget).toHaveBeenCalledTimes(1);
  });

  it("creates a widget when the SDK is already loaded", () => {
    installSDK();
    mountCaptcha("friendly-captcha");
    expect(createWidget).toHaveBeenCalledTimes(1);
  });

  it("creates a widget for every form after the SDK loads", () => {
    const { script } = mountCaptcha("friendly-captcha", 2);
    installSDK();
    fireEvent.load(script);
    expect(createWidget).toHaveBeenCalledTimes(2);
  });

  it("does not create a widget after the form unmounts", () => {
    const { script, unmount } = mountCaptcha("friendly-captcha");
    unmount();
    installSDK();
    fireEvent.load(script);
    expect(createWidget).not.toHaveBeenCalled();
  });

  it.each([false, true])("creates one widget in Strict Mode (SDK preloaded: %s)", (preloaded) => {
    if (preloaded) installSDK();
    const { script } = mountCaptcha("friendly-captcha", 1, true);
    if (!preloaded) {
      installSDK();
      fireEvent.load(script);
    }
    expect(createWidget).toHaveBeenCalledTimes(1);
  });
});

it.each(["google-recaptcha-v2", "friendly-captcha"] as const)("hydrates %s without a mismatch", async (type) => {
  const tree = captchaTree(type);
  const container = document.createElement("div");
  container.innerHTML = renderToString(tree);
  document.body.appendChild(container);
  const recoverableError = jest.fn();
  let root: ReturnType<typeof hydrateRoot>;
  if (type === "google-recaptcha-v2") {
    window.grecaptcha = {
      ready: (callback) => callback(),
      render: (element) => {
        (element as HTMLElement).appendChild(document.createElement("iframe"));
        return 0;
      },
      reset: jest.fn()
    };
  } else {
    window.friendlyChallenge = {
      WidgetInstance: jest.fn((element: HTMLElement) => {
        element.appendChild(document.createElement("button"));
        return { reset: jest.fn() };
      }) as unknown as typeof WidgetInstance
    };
  }
  try {
    await act(async () => {
      root = hydrateRoot(container, tree, { onRecoverableError: recoverableError });
    });
    expect(recoverableError).not.toHaveBeenCalled();
    expect(container.querySelector(type === "google-recaptcha-v2" ? "iframe" : "button")).not.toBeNull();
  } finally {
    act(() => root!.unmount());
    container.remove();
  }
});
