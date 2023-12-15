import React from 'react';
import { render } from '@testing-library/react';
import { IconSearchResults } from '../../../../src/Widgets/FormRatingWidget/IconEditorTab/IconSearchResults';
import renderer from 'react-test-renderer';

const mockSetWidgetIcon = jest.fn();
const searchValue = 'moon';
const currentIcon = 'bi-current';

describe('IconSearchResults component', () => {
  it('renders search results correctly for the searchValue', () => {
    const { getByText } = render(
      <IconSearchResults
        searchValue={searchValue}
        setWidgetIcon={mockSetWidgetIcon}
        currentIcon={currentIcon}
      />
    );

    const searchLabel = getByText(`Search for '${searchValue}'`);
    expect(searchLabel).toBeInTheDocument();

    const expectedIcons = [
      'moon-fill',
      'moon-stars',
      'moon-stars-fill',
      'cloud-moon',
      'cloud-moon-fill',
    ];

    expectedIcons.forEach((icon) => {
      const iconText = getByText(icon);
      expect(iconText).toBeInTheDocument();
    });
  });

  it('does not render search results when searchValue is empty', () => {
    const { container } = render(
      <IconSearchResults
        searchValue=""
        setWidgetIcon={mockSetWidgetIcon}
        currentIcon=""
      />
    );

    const searchResults = container.querySelector('#search-results');
    expect(searchResults).toBeNull();
  });

  it('renders correctly', () => {
    const searchValue = 'moon';

    const tree = renderer
      .create(
        <IconSearchResults
          searchValue={searchValue}
          setWidgetIcon={mockSetWidgetIcon}
          currentIcon={currentIcon}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
