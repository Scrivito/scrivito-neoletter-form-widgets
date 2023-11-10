import * as Scrivito from "scrivito";
import formConditionWidgetIcon from "../../assets/images/form_widget_condition.svg";

Scrivito.provideEditingConfig("FormConditionWidget", {
  title: "Neoletter Form Condition",
  titleForContent(obj) {
    return "Condition: " + obj.get("title");
  },
  thumbnail: formConditionWidgetIcon,
  attributes: {
    title: { title: "Title" },
    content: { title: "Content" },
  },
  properties: ["title", "content"],
});
