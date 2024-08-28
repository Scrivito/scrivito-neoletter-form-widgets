import React, { useState, useRef, useEffect } from "react";

interface Point {
	x: number;
	y: number;
}

interface DrawingState {
	clickX: number[];
	clickY: number[];
	clickDrag: boolean[];
}

type SignatureDrawEvent = React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>;

export function useSignatureCanvas(onChange: (dataUrl: string) => void, strokeThickness: number, strokeColor: string, backgroundColor: string) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [drawingState, setDrawingState] = useState<DrawingState>({
		clickX: [],
		clickY: [],
		clickDrag: []
	});
	const [isDrawing, setIsDrawing] = useState(false);

	useEffect(() => {
		const element = canvasRef.current;
		if (element) addCanvasListeners(element);
		return () => {
			if (element) removeCanvasListeners(element);
		};
	}, []);

	useEffect(() => {
		draw();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [backgroundColor, strokeColor, strokeThickness]);

	useEffect(() => {
		if (!isDrawing && canvasRef.current) {
			if (drawingState.clickDrag.length > 0) {
				const data = canvasRef.current.toDataURL();
				onChange(data);
			}
		}
	}, [isDrawing, drawingState.clickDrag.length, onChange]);

	function handleDrawStart(e: SignatureDrawEvent): void {
		setIsDrawing(true);
		addClick(getPointerPos(e, canvasRef), false);
		draw();
	}

	function handleDrawEnd(): void {
		setIsDrawing(false);
	}

	function draw() {
		if (!canvasRef.current) return;

		const context = canvasRef.current.getContext("2d");
		if (!context) return;

		context.canvas.width = canvasRef.current.getBoundingClientRect().width;
		context.canvas.height = canvasRef.current.getBoundingClientRect().height;
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.lineJoin = "round";
		context.lineWidth = strokeThickness;
		context.strokeStyle = strokeColor;
		context.fillStyle = backgroundColor;
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		drawStrokes(context);
	}

	function drawStrokes(context: CanvasRenderingContext2D): void {
		for (let i = 0; i < drawingState.clickX.length; i++) {
			context.beginPath();
			if (drawingState.clickDrag[i] && i) {
				context.moveTo(drawingState.clickX[i - 1], drawingState.clickY[i - 1]);
			} else {
				context.moveTo(drawingState.clickX[i] - 1, drawingState.clickY[i]);
			}
			context.lineTo(drawingState.clickX[i], drawingState.clickY[i]);
			context.closePath();
			context.stroke();
		}
	}

	function handleDrawMove(e: SignatureDrawEvent): void {
		if (!isDrawing) return;
		addClick(getPointerPos(e, canvasRef), true);
		draw();
	}

	function addClick(point: Point | null, isDragging: boolean): void {
		if (!point) return;
		setDrawingState((prevState) => ({
			...prevState,
			clickX: [...prevState.clickX, point.x],
			clickY: [...prevState.clickY, point.y],
			clickDrag: [...prevState.clickDrag, isDragging]
		}));
	}

	function deleteSignature(e: React.SyntheticEvent): void {
		e.preventDefault();
		e.stopPropagation();
		setDrawingState({
			clickX: [],
			clickY: [],
			clickDrag: []
		});
		if (canvasRef.current) {
			const context = canvasRef.current.getContext("2d");
			if (context) {
				context.clearRect(0, 0, context.canvas.width, context.canvas.height);

				// redraw the background color
				context.fillStyle = backgroundColor;
				context.fillRect(0, 0, context.canvas.width, context.canvas.height);
			}
		}
		onChange("");
	}

	return {
		canvasRef,
		handleDrawStart,
		handleDrawEnd,
		handleDrawMove,
		deleteSignature
	};
}

function getPointerPos(e: SignatureDrawEvent, canvasRef: React.RefObject<HTMLCanvasElement>): Point | null {
	const rect = canvasRef.current?.getBoundingClientRect();
	if (!rect) return null;
	const nativeEvent = e.nativeEvent;
	if (nativeEvent instanceof MouseEvent) {
		return {
			x: nativeEvent.clientX - rect.left,
			y: nativeEvent.clientY - rect.top
		};
	} else if (nativeEvent instanceof TouchEvent) {
		const touch = nativeEvent.touches[0];
		return {
			x: touch.clientX - rect.left,
			y: touch.clientY - rect.top
		};
	}
	return null;
}

const preventDefaultOnCanvas = (e: Event) => {
	e.preventDefault();
};

const listenerTypes = ["touchstart", "touchmove", "touchend", "touchcancel", "mouseup", "mousedown", "mousemove", "mouseout"];

const addCanvasListeners = (canvas: HTMLCanvasElement) => {
	const nonPassive = { passive: false };
	listenerTypes.forEach((type) => canvas.addEventListener(type, preventDefaultOnCanvas, nonPassive));
};

const removeCanvasListeners = (canvas: HTMLCanvasElement) => {
	listenerTypes.forEach((type) => canvas.removeEventListener(type, preventDefaultOnCanvas));
};
