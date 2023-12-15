import * as Scrivito from 'scrivito';
import { screen } from '@testing-library/react';
import { FormCheckboxWidget } from '../../../src/Widgets/FormCheckboxWidget/FormCheckboxWidgetClass';
import '../../../src/Widgets/FormCheckboxWidget/FormCheckboxWidgetComponent';
import PageRenderer from '../../helpers/pageRenderer';

Scrivito.configure({ tenant: 'inMemory' });

const pageRenderer = new PageRenderer();

const widgetProps = {
  label: 'Test Checkbox',
  required: true,
  helpText: 'This is a test help text',
  type: "custom",
  customFieldName: "custom_test"

};

describe('FormCheckboxWidget', () => {

  it('displays the checkbox label, Mandatory component, and HelpText', () => {
    pageRenderer.render({
      body: [new FormCheckboxWidget(widgetProps)],
    });

    const checkboxLabel = screen.getByText(widgetProps.label);
    const mandatoryText = screen.getByText('*', { selector: '.text-mandatory' });
    const helpTextElement = document.querySelector('i');

    expect(checkboxLabel).toBeInTheDocument();
    expect(mandatoryText).toBeInTheDocument();
    expect(helpTextElement).toBeInTheDocument();
  });

  it('renders the checkbox input field correctly', () => {
    pageRenderer.render({
      body: [new FormCheckboxWidget(widgetProps)],
    });

    const checkboxInput = screen.getByRole('checkbox');

    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput).toHaveAttribute('name', "custom_test");
  });

  it('renders correctly', () => {
    const tree = pageRenderer.getAsJSON({ body: [new FormCheckboxWidget(widgetProps)] })
    expect(tree).toMatchSnapshot();
  });

});
