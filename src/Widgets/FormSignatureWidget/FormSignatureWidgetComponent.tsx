import * as React from "react";
import * as Scrivito from "scrivito";
import { HelpText } from "../FormStepContainerWidget/components/HelpTextComponent";
import { FormSignatureWidget } from "./FormSignatureWidgetClass";
import { getFieldName } from "../FormStepContainerWidget/utils/getFieldName";
import { Signature } from "../FormStepContainerWidget/components/SignatureComponent";
import { useFormContext } from "../FormStepContainerWidget/FormContext";
import { MessageBlock } from "../FormStepContainerWidget/components/MessageBlock";
import "./FormSignatureWidget.scss";

Scrivito.provideComponent(FormSignatureWidget, ({ widget }) => {
  const [signatureDataUrl, setSignatureDataUrl] = React.useState<string>("")
  const ctx = useFormContext();
  if (!ctx) {
    return <MessageBlock type="noContext" />;
  }

  const onChangeSignature = (dataUrl: string) => {
    setSignatureDataUrl(dataUrl);
    ctx.onInputChange(getFieldName(widget), dataUrl);
  }

  return (
    <div className="form-signature mb-3">
      {widget.get("title") && <div className="signature-title">
        <Scrivito.ContentTag
          attribute="title"
          content={widget}
          tag="span"
        />
        {widget.get("helpText") && <HelpText widget={widget} />}
      </div>
      }
      <Signature
        id={widget.id()}
        onChange={onChangeSignature}
        deleteButtonText={widget.get("deleteButtonText") || "Delete"}
        strokeColor={widget.get("strokeColor") || "black"}
        strokeThickness={widget.get("strokeThickness") || 2}
        backgroundColor={widget.get("backgroundColor") || "#ffffff"}
        deleteButtonAlignment={widget.get("deleteButtonAlignment") || "block"}
      ></Signature>
      <input
        type="hidden"
        name={getFieldName(widget)}
        value={signatureDataUrl}></input>
    </div>
  );
});
