import { isEmpty, map, uniq } from "lodash-es";
import { Widget } from "scrivito";
import { getFieldName } from "./getFieldName";
import { InputValidationElement, ReviewContent } from "../../../../types/types";

export function prepareReviewContent(widget: Widget): ReviewContent {
  const form = document.getElementById(
    widget.get("formId") as string,
  ) as HTMLFormElement;
  const data = new FormData(form);
  const joinedFormData = new FormData();
  // show all field-names with equal name as a comma separated string
  for (const [name, value] of data) {
    if (joinedFormData.has(name)) {
      continue;
    } else {
      joinedFormData.set(name, data.getAll(name).join(", "));
    }
  }

  const steps = widget.get("steps") as Widget[];
  const widgets = steps.flatMap((s) => s.widgets());
  const includeEmptyAnswers = widget.get("includeEmptyAnswers");
  const inputs: InputValidationElement[] = Array.from(
    form.querySelectorAll("input, select, textarea"),
  );
  const inputNames = uniq(map(inputs, (i) => i.name));
  const reviewData: ReviewContent = [];

  for (const key of inputNames) {
    const answer = joinedFormData.get(key) as string;
    if (isEmpty(answer) && !includeEmptyAnswers) {
      // do not show empty answers
      continue;
    }
    // check if is hidden
    const input = inputs.find((i) => i.name == key);
    if (
      key == "fax" ||
      (input &&
        input.type == "hidden" &&
        !input.classList.contains("show-in-review"))
    ) {
      // do not show hidden inputs
      continue;
    }
    // get title && step number
    const widget = widgets.find((w) => getFieldName(w) == key);
    if (widget) {
      const step = steps.find((s) =>
        s.widgets().find((w) => getFieldName(w) == key),
      );
      const stepNumber = step?.get("stepNumber") as number;
      const title = (widget.get("label") ||
        widget.get("title") ||
        "") as string;

      if (!reviewData[stepNumber]) {
        reviewData[stepNumber] = [];
      }
      reviewData[stepNumber].push({
        title: title,
        value: getAnswerValue(answer, widget),
      });
    }
  }
  return reviewData;
}

function getAnswerValue(answer: string, widget: Widget): string {
  const emptyValue = "-";
  if (!answer || answer.length <= 0) {
    return emptyValue;
  }
  const className = widget.objClass();
  if (className != "FormDateWidget") {
    return answer;
  }
  const type = widget.get("dateType");
  if (type == "date") {
    return new Date(answer).toLocaleDateString();
  } else if (type == "datetime-local") {
    return new Date(answer).toLocaleString();
  }
  return answer;
}
