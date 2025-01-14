export const getUrlParameter = (parameterKey: string): string => {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(parameterKey) || "";
}
