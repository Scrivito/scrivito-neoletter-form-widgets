import * as React from "react";
import { createPortal } from "react-dom";
import { Review } from "./ReviewComponent";
import { Widget } from "scrivito";
import { ReviewContent } from "../../../../types/types";

interface ReviewPortalProps {
	widget: Widget;
	reviewContent: ReviewContent;
	onHide: () => void;
}

export const ReviewPortal: React.FC<ReviewPortalProps> = ({
	widget,
	reviewContent,
	onHide
}) => {
	return createPortal(
		<Review widget={widget} reviewContent={reviewContent} onHide={onHide} />,
		document.body
	);
};
