import { screen, fireEvent } from '@testing-library/react';
import * as Scrivito from "scrivito";
import { FormRatingWidget } from '../../../src/Widgets/FormRatingWidget/FormRatingWidgetClass';
import '../../../src/Widgets/FormRatingWidget/FormRatingWidgetComponent';
import PageRenderer from "../../helpers/pageRenderer";

Scrivito.configure({ tenant: "inMemory" });

const pageRenderer = new PageRenderer();

const widgetProps = {
  title: "Test Rating Title",
  helpText: "Sample help text",
  icon: "bi-star-fill",
  size: "bi-default",
  hoverEffect: true,
};

describe('FormRatingWidget Component', () => {

  it('renders FormRatingWidget with selected icons and help text', () => {
    pageRenderer.render({
      body: [new FormRatingWidget(widgetProps)],
    });

    const title = screen.getByText(widgetProps.title);
    const ratingIcons = document.querySelectorAll(".rating-icon");

    expect(title).toBeInTheDocument();

    fireEvent.click(ratingIcons[0]);
    fireEvent.click(ratingIcons[1]);
    fireEvent.click(ratingIcons[2]);

    const hiddenInput = document.querySelector('[type="hidden"]')!
    expect(hiddenInput).toHaveValue("3");
  });

  it('renders FormRatingWidget without selected icons or help text', () => {
    pageRenderer.render({
      body: [new FormRatingWidget({ ...widgetProps, helpText: "" })],
    });

    const title = screen.getByText(widgetProps.title);
    const ratingIcons = document.querySelectorAll(".rating-icon");

    expect(title).toBeInTheDocument();
    expect(ratingIcons).toHaveLength(5);

    // No selection, so the hidden input should have an empty value
    const hiddenInput = document.querySelector('[type="hidden"]')!
    expect(hiddenInput).toHaveValue("");
  });

  it('renders correctly', () => {
    const tree = pageRenderer.getAsJSON({ body: [new FormRatingWidget(widgetProps)] })
    expect(tree).toMatchSnapshot();
  });
});
