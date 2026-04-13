export const getUrlParameter = (parameterKey: string): string => {
	if (typeof window === "undefined") {
		return ""
	}
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(parameterKey) || "";
}
