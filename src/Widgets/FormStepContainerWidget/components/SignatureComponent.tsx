import React from "react";
import { useSignatureCanvas } from "./hooks/useSignatureCanvas";

interface SignatureProps {
	id: string;
	onChange: (dataUrl: string) => void;
	strokeThickness: number;
	strokeColor: string;
	backgroundColor: string;
	deleteButtonText: string;
	deleteButtonAlignment: string;
}

export const Signature: React.FC<SignatureProps> = ({ id, onChange, deleteButtonText, strokeColor, strokeThickness, backgroundColor, deleteButtonAlignment }) => {
	const { canvasRef, handleDrawStart, handleDrawEnd, handleDrawMove, deleteSignature } = useSignatureCanvas(onChange, strokeThickness, strokeColor, backgroundColor);

	return (
		<div id={id} className="signature">
			<canvas
				ref={canvasRef}
				className="neoletter-form-canvas"
				onMouseDown={(e) => handleDrawStart(e)}
				onMouseMove={(e) => handleDrawMove(e)}
				onMouseUp={handleDrawEnd}
				onMouseOut={handleDrawEnd}
				onTouchStart={(e) => handleDrawStart(e)}
				onTouchMove={(e) => handleDrawMove(e)}
				onTouchEnd={handleDrawEnd}
				onTouchCancel={handleDrawEnd}
			></canvas>
			<div className={`${deleteButtonAlignment === "block" ? "" : deleteButtonAlignment}`}>
				<button className={`delete btn btn-primary${deleteButtonAlignment === "block" ? " btn-block" : ""}`} onClick={deleteSignature}>
					<span className="delete-text">{deleteButtonText}</span>
				</button>
			</div>
		</div>
	);
};
