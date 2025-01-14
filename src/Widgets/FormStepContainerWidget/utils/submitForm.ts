import { Widget } from "scrivito";

import { isTrackingEnabled } from "../../../config/scrivitoConfig";
import { getFieldName } from "./getFieldName";
import { appendTrackingIDToFormData } from "./appendNeoletterTrackingIDtoFormData";
import { StringMap } from "../../../../types/types";
import { isEmpty } from "./lodashPolyfills";

export async function submitForm(
  formData: StringMap<string>,
  tenant: string,
) {
  if (isEmpty(tenant)) {
    console.warn("Unable to submit form, tenant not found!");
    return;
  }
  const formEndpoint = `https://api.justrelate.com/neoletter/instances/${tenant}/form_submissions`;
  const body = new URLSearchParams(formData);
  // uncomment below to log the data to be fetched.
  // console.log("submitting", Object.fromEntries(body.entries()));
  const response = await fetch(formEndpoint, { method: "post", body });
  if (!response.ok) {
    throw new Error(
      `Response was not successful. Status code: ${response.status}.`
    );
  }
}

export function getFormData(formWidget: Widget) {
  const formId = formWidget.get("formId") as string;
  const formElement = document.getElementById(formId) as HTMLFormElement;
  if (!formElement) {
    return;
  }
  const data = new FormData(formElement);
  const dataToSend = new FormData();

  if (isTrackingEnabled()) {
    appendTrackingIDToFormData(dataToSend);
  }
  
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
