import * as React from "react";
import Fuse from "fuse.js";
import { fontAwesomeIcons } from "../../FormStepContainerWidget/utils/fontAwesomeIcons";
import { SingleIcon } from "./SingleIcon";

interface IconSearchResultsProps {
  searchValue: string;
  setWidgetIcon: Function;
  currentIcon: string;
}
export const IconSearchResults: React.FC<IconSearchResultsProps> = ({
  searchValue,
  setWidgetIcon,
  currentIcon,
}) => {
  const fuse = React.useMemo(() => {
    const fuseOptions = {
      threshold: 0.2,
      keys: ["name", "id", "filter", "aliases"],
    };

    return new Fuse(fontAwesomeIcons, fuseOptions);
  }, []);

  if (!searchValue.length) return null;

  const results = fuse.search(searchValue);

  return (
    <div id="search-results">
      <div className="scrivito_detail_label">
        <span>{`Search for '${searchValue}'`}</span>
      </div>
      <div className="row">
        {results.map((result, index) => {
          const icon = result.item;

          return (
            <SingleIcon
              key={`${icon.id}${index}`}
              icon={icon}
              currentIcon={currentIcon}
              setWidgetIcon={setWidgetIcon}
            />
          );
        })}
      </div>
    </div>
  );
};
