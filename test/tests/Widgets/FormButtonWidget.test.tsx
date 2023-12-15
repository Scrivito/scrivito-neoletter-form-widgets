import * as Scrivito from 'scrivito';
import { screen } from '@testing-library/react';
import { FormButtonWidget } from '../../../src/Widgets/LegacyFormButtonWidget/FormButtonWidgetClass';
import PageRenderer from '../../helpers/pageRenderer';
import '../../../src/Widgets/LegacyFormButtonWidget/FormButtonWidgetComponent';

Scrivito.configure({ tenant: 'inMemory' });

const pageRenderer = new PageRenderer();

describe('FormButtonWidget', () => {

  it('renders button with default alignment', () => {
    const widgetProps = {
      alignment: null,
      buttonText: 'Submit',
    };

    pageRenderer.render({
      body: [new FormButtonWidget(widgetProps)],
    });

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Submit');
  });

  it('renders button with center alignment', () => {
    const widgetProps = {
      alignment: 'center',
      buttonText: 'Center Button',
    };

    pageRenderer.render({
      body: [new FormButtonWidget(widgetProps)],
    });

    const buttonElement = screen.getByRole('button');
    const container = document.querySelector('.text-center');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Center Button');
    expect(container).toHaveClass('text-center');

  });

  it('renders button with block alignment', () => {
    const widgetProps = {
      alignment: 'block',
      buttonText: 'Block Button',
    };

    pageRenderer.render({
      body: [new FormButtonWidget(widgetProps)],
    });

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Block Button');
    expect(buttonElement.className).toContain('btn-block');
  });

  it('renders button with right alignment', () => {
    const widgetProps = {
      alignment: 'right',
      buttonText: 'Right Button',
    };

    pageRenderer.render({
      body: [new FormButtonWidget(widgetProps)],
    });

    const buttonElement = screen.getByRole('button');
    const container = document.querySelector('.text-end');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Right Button');
    expect(container).toHaveClass('text-end');
  });

  it('renders correctly', () => {
    const widgetProps = {
      alignment: 'center',
      buttonText: 'Center Button',
    };
    const tree = pageRenderer.getAsJSON({ body: [new FormButtonWidget(widgetProps)] })
    expect(tree).toMatchSnapshot();
  });
});
