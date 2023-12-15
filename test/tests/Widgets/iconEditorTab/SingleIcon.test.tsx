import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SingleIcon } from '../../../../src/Widgets/FormRatingWidget/IconEditorTab/SingleIcon';
import renderer from 'react-test-renderer';

const mockSetWidgetIcon = jest.fn();
const currentIcon = 'bi-example';
const icon = 'example';
describe('SingleIcon component', () => {
  it('renders the icon and triggers onClick correctly', () => {

    const { getByText } = render(
      <SingleIcon
        icon={icon}
        setWidgetIcon={mockSetWidgetIcon}
        currentIcon={currentIcon}
      />
    );

    const iconElement = getByText(icon);
    expect(iconElement).toBeInTheDocument();

    fireEvent.click(iconElement);

    expect(mockSetWidgetIcon).toHaveBeenCalledWith(expect.anything(), `bi-${icon}`);
  });

  it('renders with active class when currentIcon matches', () => {

    const { container } = render(
      <SingleIcon
        icon={icon}
        setWidgetIcon={mockSetWidgetIcon}
        currentIcon={currentIcon}
      />
    );

    const aElement = container.querySelector('a');
    expect(aElement).toHaveClass('active');
  });

  it('renders correctly', () => {
    const searchValue = 'moon';

    const tree = renderer
      .create(
        <SingleIcon
          icon={icon}
          setWidgetIcon={mockSetWidgetIcon}
          currentIcon={currentIcon}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
