const UTM_SOURCE_KEY = "utm_source";
const UTM_SOURCE_FIELD_NAME = "custom_utm_source";

/**
 * Appends the `utm_source` query parameter from the current URL to the provided FormData object.
 * If the `utm_source` parameter is not found in the URL, an empty string is set instead.
 *
 * @param dataToSend 
 */
export const appendUrlParamsToFormData = (dataToSend: FormData) => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get(UTM_SOURCE_KEY) || "";
  dataToSend.set(UTM_SOURCE_FIELD_NAME, utmSource);
};