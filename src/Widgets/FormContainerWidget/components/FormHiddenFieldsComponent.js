import * as React from "react";
import * as Scrivito from "scrivito";
import { getHistory } from "../../../config/history";

export const FormHiddenFields = ({ widget }) => {
  const [browserLocation, setBrowserLocation] = React.useState(null);
  React.useEffect(() => {
    const history = getHistory();
    if (!history) return;
    setBrowserLocation(locationToUrl(history.location));

    return history.listen(({ location }) =>
      setBrowserLocation(locationToUrl(location))
    );
  }, []);
  return (
    <>
      <input type="hidden" name="form_id" value={widget.get("formId")} />
      <input
        type="hidden"
        name="url"
        value={browserLocation || Scrivito.urlFor(widget.obj())}
      />
      <Scrivito.InPlaceEditingOff>
        <Scrivito.ContentTag content={widget} attribute="hiddenFields" />
      </Scrivito.InPlaceEditingOff>

      <HoneypotField />
    </>
  );
};

const HoneypotField = () => (
  <div aria-hidden="true" className="winnie-the-pooh">
    <input autoComplete="off" name="fax" tabIndex="-1" />
  </div>
);

function locationToUrl(location) {
  return `${window.location.origin}${location.pathname}${location.search}`;
}
