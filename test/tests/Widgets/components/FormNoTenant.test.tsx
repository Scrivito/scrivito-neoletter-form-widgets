import * as React from "react";
import { render } from "@testing-library/react";
import { FormNoTenant } from "../../../../src/Widgets/FormStepContainerWidget/components/FormNoTenantComponent";
import renderer from "react-test-renderer";

describe("FormNoTenant", () => {
  it("renders the correct warning message and class", () => {
    const { getByText, container } = render(<FormNoTenant />);
    const warningMessage = getByText(
      "Warning! instanceId has not been configured for the form widget."
    );
    const missingIdElement = container.querySelector(".missing-id");

    expect(warningMessage).toBeInTheDocument();
    expect(missingIdElement).toBeInTheDocument();
  });
  it("renders correctly", () => {
    const tree = renderer.create(<FormNoTenant />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
