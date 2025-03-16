import { useEffect, useRef, useState } from "react";
import { useValidationContext } from "../ValidationContext";

export const useValidationField = (fieldName: string, mandatory: boolean) => {
	const ref = useRef<HTMLDivElement>(null);
	const { invalidFields, firstInvalidField, setFirstInvalidField, registerField } = useValidationContext();
	const [isLocallyValid, setIsLocallyValid] = useState(true);

	useEffect(() => {
		registerField(fieldName, mandatory);
	}, [fieldName, mandatory]);

	useEffect(() => {
		if (invalidFields[fieldName] !== undefined) {
			setIsLocallyValid(!invalidFields[fieldName]);
		}
	}, [invalidFields, fieldName]);

	useEffect(() => {
		if (firstInvalidField === fieldName && ref.current) {
			requestAnimationFrame(() => {
				ref.current!.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest",
				});
				setFirstInvalidField(null);
			});
		}
	}, [firstInvalidField]);

	return { isLocallyValid, setIsLocallyValid, ref };
};