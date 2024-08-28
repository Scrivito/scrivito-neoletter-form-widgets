import * as Scrivito from "scrivito";
import 'jest-canvas-mock';
import { fireEvent } from "@testing-library/react";
import { FormSignatureWidget } from "../../../src/Widgets/FormSignatureWidget/FormSignatureWidgetClass";
import "../../../src/Widgets/FormSignatureWidget/FormSignatureWidgetComponent";
import PageRenderer from "../../helpers/pageRenderer";

Scrivito.configure({ tenant: "inMemory" });

const pageRenderer = new PageRenderer();

describe("FormSignatureWidget", () => {
	const widgetProps = {
		title: "Signature Title",
		helpText: "<p>This is a help text</p>",
		deleteButtonText: "Clear Signature",
		strokeColor: "black",
		strokeThickness: 2,
		backgroundColor: "#ffffff",
		deleteButtonAlignment: "block"
	};

	it("handles signature change and updates hidden input value", () => {
		pageRenderer.render({
			body: [new FormSignatureWidget(widgetProps)]
		});

		const signatureCanvas = document.querySelector("canvas")!;
		const hiddenInput: HTMLInputElement = document.querySelector('input[type="hidden"]')!;

		expect(signatureCanvas).toBeInTheDocument();
		expect(hiddenInput).toBeInTheDocument();
		expect(hiddenInput.value).toBe("");

		const emptyBase64String = "data:image/png;base64,00";
		expect(signatureCanvas.toDataURL()).toMatch(emptyBase64String);


		fireEvent.mouseDown(signatureCanvas, { clientX: 50, clientY: 50 });
		fireEvent.mouseMove(signatureCanvas, { clientX: 100, clientY: 100 });
		fireEvent.mouseUp(signatureCanvas);

		const ctx = signatureCanvas.getContext("2d")!;
		const base64Result = signatureCanvas.toDataURL();

		expect(ctx.moveTo).toHaveBeenCalled();
		expect(ctx.lineTo).toHaveBeenCalled();
		expect(ctx.stroke).toHaveBeenCalled();

		expect(hiddenInput.value).toBe(base64Result);
	});

	it("renders correctly", () => {
		const tree = pageRenderer.getAsJSON({
			body: [new FormSignatureWidget(widgetProps)]
		});
		expect(tree).toMatchSnapshot();
	});
});
