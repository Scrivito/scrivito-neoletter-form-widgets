const NEOLETTER_TRACKING_ID_KEY = "neo_tid";
const NEOLETTER_TRACKING_ID_FIELD_NAME = "tracking_id";

/**
 * Appends the Neoletter tracking ID to the provided FormData object.
 * @param {FormData} formData - The FormData object to append the tracking ID to.
 */
export const appendTrackingIDToFormData = (formData: FormData) => {
  const trackingID = getNeoletterTrackingID();
  if (trackingID) {
    formData.set(NEOLETTER_TRACKING_ID_FIELD_NAME, trackingID);
  }
};

/**
 * Retrieves the Neoletter tracking ID from local storage.
 * @returns {string} The tracking ID or an empty string if not found or in case of an error.
 */
const getNeoletterTrackingID = (): string => {
  try {
    return localStorage.getItem(NEOLETTER_TRACKING_ID_KEY) || "";
  } catch (error) {
    return "";
  }
};
