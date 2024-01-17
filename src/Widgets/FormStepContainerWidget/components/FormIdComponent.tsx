import * as React from "react";
import * as Scrivito from "scrivito";
import { ContentProperty } from "../../../Components/ContentProperty";
import { getInstanceId } from "../../../config/scrivitoConfig";

interface FormIdComponentProps {
  widget: Scrivito.Widget;
}

export const FormIdComponent: React.FC<FormIdComponentProps> = Scrivito.connect(
  ({ widget }) => {
    const formSubmissionsHref = widget.get("formId")
      ? `https://edit.neoletter.com/i/${getInstanceId()}/forms/${widget.get(
          "formId"
        )}`
      : null;
    const uiContext = Scrivito.uiContext();
    if (!uiContext) return null;

    return (
      <div className={`scrivito_${uiContext.theme}`}>
        <div className="scrivito_detail_content">
          <div className="attribute_form_id_item">
            <ContentProperty
              content={widget}
              attribute="formId"
              title="Form ID"
              description="This ID identifies the form in Neoletter."
            />

            <a
              className={`scrivito_button ${
                formSubmissionsHref ? "scrivito_blue" : "scrivito_disabled"
              }`}
              href={formSubmissionsHref ? formSubmissionsHref : ""}
              target="_blank"
              rel="noreferrer">
              View submissions
            </a>
          </div>
        </div>
      </div>
    );
  }
);
