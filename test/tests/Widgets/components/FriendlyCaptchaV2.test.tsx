import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { Widget } from "scrivito";
import { FriendlyCaptchaV2 } from "../../../../src/Widgets/FormStepContainerWidget/components/FriendlyCaptchaV2Component";
import { CaptchaProvider, useCaptcha } from "../../../../src/Widgets/FormStepContainerWidget/CaptchaContext";
import { DummyWidget } from "../../../helpers/dummyWidget";
import { FormCaptcha } from "../../../../src/Widgets/FormStepContainerWidget/components/FormCaptchaComponent";
import { renderWithFormContext } from "../../../helpers/renderWithFormContext";

jest.mock("../../../../src/config/scrivitoConfig", () => ({
  getCaptchaOptions: () => ({ siteKey: "FC-test", captchaType: "friendly-captcha-v2" })
}));

const mockCreateWidget = jest.fn();
jest.mock("https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@1.1.1/sdk.js", () => ({
  FriendlyCaptchaSDK: jest.fn().mockImplementation(() => ({ createWidget: mockCreateWidget }))
}), { virtual: true });

function CaptchaState() {
  const { captchaToken, isCaptchaResolved } = useCaptcha();
  return <output data-testid="captcha-state">{isCaptchaResolved ? captchaToken : "unresolved"}</output>;
}

const widget = new DummyWidget({
  friendlyCaptchaStartMode: "focus",
  friendlyCaptchaLanguage: "de"
}) as unknown as Widget;

function renderCaptcha(theme: "light" | "dark" = "light") {
  return (
    <CaptchaProvider>
      <FriendlyCaptchaV2 siteKey="FC-test" widget={widget} theme={theme} />
      <CaptchaState />
    </CaptchaProvider>
  );
}

describe("Friendly Captcha v2", () => {
  let listener: (event: CustomEvent<{ state: string; response: string }>) => void;
  let destroy: jest.Mock;

  beforeEach(() => {
    destroy = jest.fn();
    mockCreateWidget.mockImplementation(() => ({
      addEventListener: (_name: string, callback: typeof listener) => { listener = callback; },
      destroy
    }));
  });

  function changeState(state: string, response = "") {
    act(() => listener(new CustomEvent("frc:widget.statechange", { detail: { state, response } })));
  }

  it("selects v2 through the public captcha option", async () => {
    const { container } = renderWithFormContext(
      <CaptchaProvider>
        <FormCaptcha widget={widget} hidden={false} />
      </CaptchaProvider>
    );
    await waitFor(() => expect(mockCreateWidget).toHaveBeenCalledTimes(1));
    expect(container.querySelector(".frc-captcha")).toBeInTheDocument();
    expect(container.querySelector(".g-recaptcha")).toBeNull();
  });

  it("creates a widget with the existing form settings and destroys it on unmount", async () => {
    const { container, unmount } = render(renderCaptcha());
    await waitFor(() => expect(mockCreateWidget).toHaveBeenCalledTimes(1));
    expect(mockCreateWidget).toHaveBeenCalledWith({
      element: container.querySelector(".frc-captcha"),
      sitekey: "FC-test",
      theme: "light",
      startMode: "focus",
      language: "de"
    });
    unmount();
    expect(destroy).toHaveBeenCalledTimes(1);
  });

  it.each(["expired", "reset", "error"])("clears a completed token when the widget is %s", async (state) => {
    render(renderCaptcha());
    await waitFor(() => expect(mockCreateWidget).toHaveBeenCalledTimes(1));
    changeState("completed", "v2-response");
    expect(screen.getByTestId("captcha-state")).toHaveTextContent("v2-response");
    changeState(state);
    expect(screen.getByTestId("captcha-state")).toHaveTextContent("unresolved");
  });

  it("recreates the widget and clears the token when the theme changes", async () => {
    const { rerender } = render(renderCaptcha());
    await waitFor(() => expect(mockCreateWidget).toHaveBeenCalledTimes(1));
    changeState("completed", "v2-response");
    rerender(renderCaptcha("dark"));
    await waitFor(() => expect(mockCreateWidget).toHaveBeenCalledTimes(2));
    expect(destroy).toHaveBeenCalledTimes(1);
    expect(mockCreateWidget).toHaveBeenLastCalledWith(expect.objectContaining({ theme: "dark" }));
    expect(screen.getByTestId("captcha-state")).toHaveTextContent("unresolved");
  });

  it("does not create a widget if it unmounts before the SDK is ready", async () => {
    const { unmount } = render(renderCaptcha());
    unmount();
    await act(async () => { await Promise.resolve(); });
    expect(mockCreateWidget).not.toHaveBeenCalled();
  });
});
