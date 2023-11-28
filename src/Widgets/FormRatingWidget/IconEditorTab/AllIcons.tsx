import * as React from "react";
import { fontAwesomeIcons } from "../../FormStepContainerWidget/utils/fontAwesomeIcons";
import { FAIcon, StringMap } from "../../../../types/types";

interface AllIconsProps {
  setWidgetIcon: Function;
  currentIcon: string;
  hide: boolean;
}
interface CategoriesAndIconsProps {
  categoryMap: StringMap<FAIcon[]>;
  currentIcon: string;
  setWidgetIcon: Function;
}
interface CategoryProps {
  category: string;
  icons: FAIcon[];
  currentIcon: string;
  setWidgetIcon: Function;
}

export const AllIcons: React.FC<AllIconsProps> = ({
  setWidgetIcon,
  currentIcon,
  hide,
}) => {
  const categoryMap = React.useMemo(() => {
    const result: StringMap<FAIcon[]> = {};
    fontAwesomeIcons.forEach((icon) =>
      icon.categories.forEach((category) => {
        if (!result[category]) result[category] = [];
        result[category].push(icon);
      }),
    );
    return result;
  }, []);

  if (hide) return null;

  return (
    <div id="icons">
      {
        <CategoriesAndIcons
          categoryMap={categoryMap}
          currentIcon={currentIcon}
          setWidgetIcon={setWidgetIcon}
        />
      }
    </div>
  );
};

const CategoriesAndIcons: React.FC<CategoriesAndIconsProps> = ({
  categoryMap,
  currentIcon,
  setWidgetIcon,
}) => {
  return Object.keys(categoryMap).map((category) => (
    <Category
      key={category}
      category={category}
      icons={categoryMap[category]}
      currentIcon={currentIcon}
      setWidgetIcon={setWidgetIcon}
    />
  ));
};

const Category: React.FC<CategoryProps> = ({
  category,
  icons,
  currentIcon,
  setWidgetIcon,
}) => {
  return (
    <section>
      <span className="headline">{category}</span>
      <div className="row">
        {icons.map((icon, innerIndex) => {
          const cssIcon = `fa-${icon.id}`;

          const aClassNames = [];
          if (currentIcon === cssIcon) aClassNames.push("active");
          // Note: It is up to 10% faster to inline the SingleIcon component,
          // instead of creating one SingleIcon component for each of the 675 icons.
          return (
            <div
              key={`${icon.id}-${category.replaceAll(" ", "-")}`}
              className="fa-hover col-md-3 col-sm-4"
            >
              <a
                href="#"
                className={aClassNames.join(" ")}
                onClick={(e) => setWidgetIcon(e, cssIcon)}
              >
                <i className={["fa", cssIcon].join(" ")} aria-hidden="true" />
                <span className="sr-only">Example of </span>
                {icon.name}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};
