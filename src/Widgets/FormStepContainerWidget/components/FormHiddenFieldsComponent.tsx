import * as React from "react";
import * as Scrivito from "scrivito";
import { Location } from "history";
import { getHistory } from "../../../config/history";

type props = { widget: Scrivito.Widget };
export const FormHiddenFields = ({ widget }: props) => {
  const [browserLocation, setBrowserLocation] = React.useState<string | null>(
    null
  );
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
      <input
        type="hidden"
        name="form_id"
        value={widget.get("formId") as string}
      />
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
    <input autoComplete="off" role="presentation" name="fax" tabIndex={-1} />
  </div>
);

function locationToUrl(location: Location) {
  return `${window.location.origin}${location.pathname}${location.search}`;
}
