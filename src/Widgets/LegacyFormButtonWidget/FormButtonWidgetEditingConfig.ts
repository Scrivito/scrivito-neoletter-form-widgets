import * as Scrivito from "scrivito";

Scrivito.provideEditingConfig("FormButtonWidget", {
  title: "Legacy Form Button",
  hideInSelectionDialogs: true,
  attributes: {
    buttonText: {
      title: "Button Text"
    },
    alignment: {
      title: "Alignment",
      values: [
        { value: "left", title: "Left" },
        { value: "center", title: "Center" },
        { value: "right", title: "Right" },
        { value: "block", title: "Full width" }
      ]
    }
  },
  properties: ["buttonText", "alignment"],
  initialContent: {
    buttonText: "send message",
    alignment: "center"
  },
  validations: [
    [
      "alignment",
      alignment => {
        if (!alignment) {
          return "Select the alignment.";
        }
      }
    ]
  ]
});
