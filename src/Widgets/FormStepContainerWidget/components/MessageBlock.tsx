import React from "react";

type MessageType = "noTenant" | "noContext" | "noCaptcha";
const WARNING = "Warning:";
const EDITORS_INFO = "Editor's info:";

const messages = {
	noTenant: { prefix: WARNING, content: "Tenant has not been configured for the form widget." },
	noContext: { prefix: EDITORS_INFO, content: "This widget must be placed within a Neoletter Form." },
	noCaptcha: { prefix: WARNING, content: "You activated CAPTCHA but did not set a site key." },
};

interface Props {
	className?: string;
	type: MessageType;
}


export const MessageBlock: React.FC<Props> = ({ className, type }) => {

	const message = messages[type];

	return (
		<div className="qst-message-block-container">
			<div className={`message-block alert fade show ${message.prefix == EDITORS_INFO ? "alert-warning" : "alert-error"} ${className || ''}`}>
				<p className='m-0'>
					<strong>{message.prefix}</strong> {message.content}
				</p>
			</div>
		</div>
	);
};

