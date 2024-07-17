import { Widget } from "scrivito";
import { getFieldName } from "./getFieldName";

export async function submitForm(
  formElement: HTMLFormElement,
  formEndpoint: string,
  formWidget: Widget
) {
  const formData = getFormData(formElement, formWidget);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body = new URLSearchParams(formData as any);
  // uncomment below to log the data to be fetched.
  // console.log("submitting", Object.fromEntries(body.entries()));
  const response = await fetch(formEndpoint, { method: "post", body });
  if (!response.ok) {
    throw new Error(
      `Response was not successful. Status code: ${response.status}.`
    );
  }
}

function getFormData(formElement: HTMLFormElement, formWidget: Widget) {
  const data = new FormData(formElement);
  const dataToSend = new FormData();

  appendTrackingIDToFormData(dataToSend);

  // workaround to send all field-names with equal name
  // as a comma separated string
  for (const [name] of data) {
    if (dataToSend.has(name)) {
      continue;
    } else {
      dataToSend.set(name, data.getAll(name).join(", "));
    }
  }

  const formWidgets = formWidget.widgets();
  const fieldNames = formWidgets.map((w) => getFieldName(w)).filter(Boolean);
  // loop over all form widgets & add unanswered ones
  // e.g. conditionals which are not selected
  for (const name of fieldNames) {
    if (dataToSend.has(name)) {
      continue;
    } else {
      dataToSend.set(name, "");
    }
  }
  return dataToSend;
}

const NEOLETTER_TRACKING_ID_KEY = "neo_tid";
const NEOLETTER_TRACKING_ID_FIELD_NAME = "tracking_id";

/**
 * Appends the Neoletter tracking ID to the provided FormData object.
 * @param {FormData} formData - The FormData object to append the tracking ID to.
 */
const appendTrackingIDToFormData = (formData: FormData) => {
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
