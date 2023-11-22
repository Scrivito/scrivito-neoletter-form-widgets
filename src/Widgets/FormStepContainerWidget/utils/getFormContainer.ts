import * as Scrivito from "scrivito";

/** Returns the first `FormContainerWidget` or  `FormStepContainerWidget` container it can find. `null` otherwise. */
export function getFormContainer(childWidget: Scrivito.Widget) {
  let candidate = childWidget.container();
  while (candidate instanceof Scrivito.Widget) {
    const objClass = candidate.objClass();
    if (
      objClass === "FormStepContainerWidget" ||
      objClass === "FormContainerWidget"
    ) {
      return candidate;
    }
    candidate = candidate.container();
  }

  return null;
}
