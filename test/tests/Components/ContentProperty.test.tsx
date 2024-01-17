import React from "react";
import { render } from "@testing-library/react";
import * as Scrivito from "scrivito";
import { ContentProperty } from "../../../src/Components/ContentProperty";
import { validationResults } from "../../helpers/testData";
import renderer from "react-test-renderer";

describe("ContentProperty Component", () => {
  it("renders the ContentProperty component with validation results", () => {
    const content = {} as Scrivito.Widget;
    const attribute = "testAttribute";
    const title = "Test Title";
    const description = "Test Description";

    const { getByText } = render(
      <ContentProperty
        content={content}
        attribute={attribute}
        title={title}
        description={description}
      />
    );

    const contentElement = getByText("Test Title");
    expect(contentElement).toBeInTheDocument();

    validationResults.forEach(result => {
      const validationResultElement = getByText(result.message);
      expect(validationResultElement).toBeInTheDocument();
    });
  });
  it("renders correctly", () => {
    const content = {} as Scrivito.Widget;
    const attribute = "testAttribute";
    const title = "Test Title";
    const description = "Test Description";

    const tree = renderer
      .create(
        <ContentProperty
          content={content}
          attribute={attribute}
          title={title}
          description={description}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
