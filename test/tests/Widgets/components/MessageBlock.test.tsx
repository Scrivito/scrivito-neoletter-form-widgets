import * as React from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MessageBlock } from "../../../../src/Widgets/FormStepContainerWidget/components/MessageBlock";

describe("MessageBlock", () => {
  it("renders the correct warning message for noContext", () => {
    const { getByText } = render(<MessageBlock type="noContext" />);
    const warningMessage = getByText(
      "This widget must be placed within a Neoletter Form."
    );

    expect(warningMessage).toBeInTheDocument();
  });
  it("renders correctly", () => {
    const tree = renderer.create(<MessageBlock type="noContext" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
