import { Widget } from "scrivito";
import { compact } from "lodash-es";
import { getFieldName } from "./getFieldName";

export async function submitForm(
  formElement: HTMLFormElement,
  formEndpoint: string,
  formWidget: Widget
) {
  const formData = getFormData(formElement, formWidget);
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
  // workaround to send all field-names with equal name
  // as a comma separated string
  for (const [name, value] of data) {
    if (dataToSend.has(name)) {
      continue;
    } else {
      dataToSend.set(name, data.getAll(name).join(", "));
    }
  }

  const formWidgets = formWidget.widgets();
  const fieldNames = compact(formWidgets.map((w) => getFieldName(w)));
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
